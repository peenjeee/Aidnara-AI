import { fail, ok } from '../lib/http';
import { assertRateLimit, backendRateLimits } from '../lib/rate-limit';
import { parseCertificateGenerateRequest } from '../lib/requests';
import { createSupabaseAdmin } from '../lib/supabase-admin';
import {
  createCertificate,
  mapPayloadToCertificateInsert,
  type Certificate,
} from '../repositories/certificates';
import { type DbClient } from '../repositories/types';
import { generateCertificate } from '../routes/certificates';
import { lookupCertificate } from '../routes/certificate-lookup';

export async function generateAndStoreCertificate(
  body: unknown,
  options: { db?: DbClient; certificateUri?: string } = {},
) {
  try {
    const payload = parseCertificateGenerateRequest(body);
    assertRateLimit({ key: `certificate:${payload.recipientAddress}:${payload.campaignId}`, ...backendRateLimits.certificate });

    const generated = generateCertificate(body as never);
    const db = options.db || (createSupabaseAdmin() as unknown as DbClient);
    const certificate = await createCertificate(
      db,
      mapPayloadToCertificateInsert(generated.payload, generated.certificateHash, options.certificateUri),
    );

    return ok({ ...generated, certificate }, 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Certificate generation failed');
  }
}

export async function lookupCertificateFromSupabase(certificateHash: string, db?: DbClient) {
  return lookupCertificate(db || (createSupabaseAdmin() as unknown as DbClient), certificateHash);
}

export function toCertificateVerificationResponse(certificate: Certificate) {
  return {
    status: certificate.status === 'revoked' ? 'REVOKED' : 'VALID',
    certificateHash: certificate.certificate_hash,
    certificateType: certificate.certificate_type,
    recipientAddress: certificate.recipient_address,
    issuedAt: certificate.issued_at,
  };
}
