import { type ImpactReportInput } from '../services/ai-impact-report';
import { type CertificatePayload, type CertificateType } from '../services/certificate';
import { type UploadCandidate } from '../services/storage';
import { type CampaignInsert } from '../repositories/campaigns';
import { type ProofInsert } from '../repositories/proofs';
import { requireOptionalString, requirePositiveNumberString, requireString } from './http';
import { assertWalletAddress } from './validate';

export function parseImpactReportRequest(body: unknown): ImpactReportInput {
  const input = asRecord(body);

  return {
    campaignTitle: requireString(input.campaignTitle, 'campaignTitle'),
    campaignCategory: requireString(input.campaignCategory, 'campaignCategory'),
    campaignDescription: requireString(input.campaignDescription, 'campaignDescription'),
    expectedImpact: requireString(input.expectedImpact, 'expectedImpact'),
    proofTitle: requireString(input.proofTitle, 'proofTitle'),
    proofDescription: requireString(input.proofDescription, 'proofDescription'),
    amountUsed: requirePositiveNumberString(input.amountUsed, 'amountUsed'),
    impactClaim: requireString(input.impactClaim, 'impactClaim'),
    proofFileUrl: requireString(input.proofFileUrl, 'proofFileUrl'),
  };
}

export function parseCertificateGenerateRequest(body: unknown): Omit<CertificatePayload, 'issuedAt'> {
  const input = asRecord(body);
  const type = requireString(input.type, 'type') as CertificateType;

  if (type !== 'donor' && type !== 'organizer') throw new Error('type must be donor or organizer');

  const recipientAddress = requireString(input.recipientAddress, 'recipientAddress');
  assertWalletAddress(recipientAddress);

  return {
    type,
    campaignId: requireString(input.campaignId, 'campaignId'),
    campaignTitle: requireString(input.campaignTitle, 'campaignTitle'),
    recipientAddress,
    amount: requireOptionalString(input.amount, 'amount'),
    referenceTxHash: requireOptionalString(input.referenceTxHash, 'referenceTxHash'),
    proofHash: requireOptionalString(input.proofHash, 'proofHash'),
    impactText: requireString(input.impactText, 'impactText'),
  };
}

export function parseSignedUploadRequest(body: unknown): { kind: 'campaign-cover' | 'proof' | 'certificate'; file: UploadCandidate } {
  const input = asRecord(body);
  const kind = requireString(input.kind, 'kind');

  if (kind !== 'campaign-cover' && kind !== 'proof' && kind !== 'certificate') {
    throw new Error('kind is unsupported');
  }

  return {
    kind,
    file: {
      name: requireString(input.fileName, 'fileName'),
      type: requireString(input.contentType, 'contentType'),
      size: Number(requirePositiveNumberString(input.size, 'size')),
    },
  };
}

export function parseCreateCampaignRequest(body: unknown): CampaignInsert {
  const input = asRecord(body);
  const ownerAddress = requireString(input.ownerAddress, 'ownerAddress');
  assertWalletAddress(ownerAddress);

  const category = requireString(input.category, 'category') as CampaignInsert['category'];
  if (!['education', 'health', 'disaster', 'community', 'environment'].includes(category)) {
    throw new Error('category is unsupported');
  }

  return {
    owner_address: ownerAddress,
    title: requireString(input.title, 'title'),
    short_description: requireString(input.shortDescription, 'shortDescription'),
    long_description: requireString(input.longDescription, 'longDescription'),
    category,
    target_amount: requirePositiveNumberString(input.targetAmount, 'targetAmount'),
    cover_image_url: requireString(input.coverImageUrl, 'coverImageUrl'),
    beneficiary_name: requireString(input.beneficiaryName, 'beneficiaryName'),
    location: requireString(input.location, 'location'),
    expected_impact: requireString(input.expectedImpact, 'expectedImpact'),
    metadata_uri: requireOptionalString(input.metadataUri, 'metadataUri'),
    create_tx_hash: requireOptionalString(input.createTxHash, 'createTxHash'),
  };
}

export function parseCreateProofRequest(body: unknown): { ownerAddress: string; proof: ProofInsert } {
  const input = asRecord(body);
  const ownerAddress = requireString(input.ownerAddress, 'ownerAddress');
  assertWalletAddress(ownerAddress);

  return {
    ownerAddress,
    proof: {
      campaign_id: requireString(input.campaignId, 'campaignId'),
      title: requireString(input.title, 'title'),
      description: requireString(input.description, 'description'),
      amount_used: requirePositiveNumberString(input.amountUsed, 'amountUsed'),
      impact_claim: requireString(input.impactClaim, 'impactClaim'),
      file_url: requireString(input.fileUrl, 'fileUrl'),
      file_hash: requireString(input.fileHash, 'fileHash'),
      proof_uri: requireOptionalString(input.proofUri, 'proofUri'),
      submit_tx_hash: requireOptionalString(input.submitTxHash, 'submitTxHash'),
    },
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('JSON body is required');
  return value as Record<string, unknown>;
}
