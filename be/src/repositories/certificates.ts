import { type CertificatePayload, type CertificateType } from '../services/certificate';
import { type DbClient, unwrap } from './types';

export type CertificateInsert = {
  campaign_id: string;
  donation_id?: string;
  proof_id?: string;
  recipient_address: string;
  certificate_type: CertificateType;
  certificate_uri?: string;
  certificate_hash: string;
  issue_tx_hash?: string;
  status?: 'pending' | 'generated' | 'registered' | 'failed' | 'revoked';
};

export type Certificate = CertificateInsert & {
  id: string;
  issued_at: string;
};

export async function createCertificate(db: DbClient, input: CertificateInsert) {
  const result = await db.from<CertificateInsert, Certificate>('certificates').insert(input).select().single();
  return unwrap(result, 'Certificate was not created');
}

export async function getCertificateByHash(db: DbClient, certificateHash: string) {
  const result = await db
    .from<never, Certificate>('certificates')
    .select('*')
    .eq('certificate_hash', certificateHash)
    .single();

  return unwrap(result, 'Certificate not found');
}

export function mapPayloadToCertificateInsert(
  payload: CertificatePayload,
  certificateHash: string,
  certificateUri?: string,
): CertificateInsert {
  return {
    campaign_id: payload.campaignId,
    recipient_address: payload.recipientAddress,
    certificate_type: payload.type,
    certificate_uri: certificateUri,
    certificate_hash: certificateHash,
    status: 'generated',
  };
}
