import { createCampaignRuntime } from './runtime/campaigns';
import { createDonationRuntime, linkDonationCertificateRuntime, listDonationsRuntime } from './runtime/donations';
import { createProofRuntime } from './runtime/proofs';
import { generateCertificate } from './routes/certificates';
import { prepareSignedUpload } from './routes/storage';
import { type DbClient } from './repositories/types';

type Row = Record<string, unknown>;

class MemoryDb implements DbClient {
  tables: Record<string, Row[]> = {
    campaigns: [],
    donations: [],
    proofs: [],
    certificates: [],
  };

  from<TInsert, TSelect>(table: string) {
    const rows = this.tables[table] || (this.tables[table] = []);

    return {
      insert: (value: TInsert) => ({
        select: () => ({
          single: async () => {
            const row = {
              id: `${table}-${rows.length + 1}`,
              created_at: new Date(0).toISOString(),
              updated_at: new Date(0).toISOString(),
              latest_trust_score: null,
              certificate_id: null,
              ai_status: 'pending',
              ...value,
            } as Row;

            rows.push(row);
            return { data: row as TSelect, error: null };
          },
        }),
      }),
      select: () => ({
        order: async (column: string, options?: { ascending?: boolean }) => {
          return { data: sortRows(rows, column, options?.ascending) as TSelect[], error: null };
        },
        eq: (column: string, value: string | number) => ({
          single: async () => {
            const row = rows.find((item) => item[column] === value);
            return row
              ? { data: row as TSelect, error: null }
              : { data: null, error: new Error(`${table} row not found`) };
          },
          order: async (orderColumn: string, options?: { ascending?: boolean }) => {
            const matched = rows.filter((item) => item[column] === value);
            return { data: sortRows(matched, orderColumn, options?.ascending) as TSelect[], error: null };
          },
        }),
      }),
      update: (value: Partial<TSelect>) => ({
        eq: (column: string, expected: string | number) => ({
          select: () => ({
            single: async () => {
              const row = rows.find((item) => item[column] === expected);
              if (!row) return { data: null, error: new Error(`${table} row not found`) };
              Object.assign(row, value);
              return { data: row as TSelect, error: null };
            },
          }),
        }),
      }),
    };
  }
}

function sortRows(rows: Row[], column: string, ascending = true) {
  return [...rows].sort((a, b) => {
    const left = String(a[column] || '');
    const right = String(b[column] || '');
    return ascending ? left.localeCompare(right) : right.localeCompare(left);
  });
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function main() {
  const db = new MemoryDb();
  const owner = '0x0000000000000000000000000000000000000001';
  const donor = '0x0000000000000000000000000000000000000002';

  const campaign = await createCampaignRuntime(
    {
      ownerAddress: owner,
      title: 'Bantu Anak Desa Belajar Online',
      shortDescription: 'Campaign pendidikan transparan.',
      longDescription: 'Campaign untuk membantu akses belajar online dengan bukti penggunaan dana.',
      category: 'education',
      targetAmount: '0.05',
      coverImageUrl: 'https://example.com/cover.png',
      beneficiaryName: 'Siswa Desa',
      location: 'Indonesia',
      expectedImpact: 'Membantu 15 siswa mendapatkan akses belajar online.',
    },
    db,
  );

  assert(campaign.ok, 'campaign runtime should create campaign');

  const deniedProof = await createProofRuntime(
    {
      ownerAddress: donor,
      campaignId: campaign.body.id,
      title: 'Proof',
      description: 'Receipt',
      amountUsed: '0.01',
      impactClaim: 'Bought router.',
      fileUrl: 'https://example.com/proof.png',
      fileHash: '0xproof',
    },
    db,
  );

  assert(!deniedProof.ok && deniedProof.status === 403, 'non-owner proof should be blocked');

  const proof = await createProofRuntime(
    {
      ownerAddress: owner,
      campaignId: campaign.body.id,
      title: 'Proof',
      description: 'Receipt',
      amountUsed: '0.01',
      impactClaim: 'Bought router.',
      fileUrl: 'https://example.com/proof.png',
      fileHash: '0xproof',
    },
    db,
  );

  assert(proof.ok, 'owner proof should be created');

  const donation = await createDonationRuntime(
    {
      campaignId: campaign.body.id,
      donorAddress: donor,
      amount: '0.01',
      txHash: '0xdonation',
    },
    db,
  );

  assert(donation.ok, 'donation should be created');

  const donations = await listDonationsRuntime(campaign.body.id, db);
  assert(donations.ok && donations.body.length === 1, 'donation list should include donation');

  const certificate = generateCertificate({
    type: 'donor',
    campaignId: campaign.body.id,
    campaignTitle: campaign.body.title,
    recipientAddress: donor,
    amount: '0.01',
    referenceTxHash: '0xdonation',
    impactText: 'Supported transparent education impact.',
  });

  assert(certificate.certificateHash.startsWith('0x'), 'certificate hash should be hex prefixed');

  const linked = await linkDonationCertificateRuntime(
    { donationId: donation.body.id, certificateId: 'certificates-1' },
    db,
  );

  assert(linked.ok, 'donation certificate should link');

  const upload = prepareSignedUpload({
    kind: 'proof',
    fileName: 'receipt.png',
    contentType: 'image/png',
    size: 1000,
  });

  assert(upload.ok && upload.body.path.startsWith('proof/'), 'proof upload path should be prepared');

  console.log('OK: BE runtime self-check passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
