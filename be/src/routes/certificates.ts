import {
  createCertificateHash,
  createCertificatePayload,
  createVerificationPath,
  type CertificatePayload,
} from '../services/certificate';

export function generateCertificate(input: Omit<CertificatePayload, 'issuedAt'>) {
  const payload = createCertificatePayload(input);
  const certificateHash = createCertificateHash(payload);

  return {
    payload,
    certificateHash,
    verificationPath: createVerificationPath(certificateHash),
  };
}
