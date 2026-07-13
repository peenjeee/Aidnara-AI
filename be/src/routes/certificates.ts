import {
  createCertificateHash,
  createCertificatePayload,
  createVerificationPath,
  type CertificatePayload,
} from '../services/certificate';
import { fail, ok } from '../lib/http';
import { parseCertificateGenerateRequest } from '../lib/requests';

export function generateCertificate(input: Omit<CertificatePayload, 'issuedAt'>) {
  const payload = createCertificatePayload(input);
  const certificateHash = createCertificateHash(payload);

  return {
    payload,
    certificateHash,
    verificationPath: createVerificationPath(certificateHash),
  };
}

export function handleGenerateCertificate(body: unknown) {
  try {
    return ok(generateCertificate(parseCertificateGenerateRequest(body)), 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Certificate generation failed');
  }
}
