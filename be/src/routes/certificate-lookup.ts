import { fail, ok } from '../lib/http';
import { getCertificateByHash } from '../repositories/certificates';
import { type DbClient } from '../repositories/types';

export async function lookupCertificate(db: DbClient, certificateHash: string) {
  try {
    const certificate = await getCertificateByHash(db, certificateHash);
    return ok({ status: certificate.status === 'revoked' ? 'REVOKED' : 'VALID', certificate });
  } catch {
    return fail('Certificate not found', 404);
  }
}
