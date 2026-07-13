import { stableJsonHash } from '../lib/hash';
import { assertWalletAddress } from '../lib/validate';

export type CertificateType = 'donor' | 'organizer';

export type CertificatePayload = {
  type: CertificateType;
  campaignId: string;
  campaignTitle: string;
  recipientAddress: string;
  amount?: string;
  referenceTxHash?: string;
  proofHash?: string;
  impactText: string;
  issuedAt: string;
};

export function createCertificatePayload(input: Omit<CertificatePayload, 'issuedAt'>): CertificatePayload {
  assertWalletAddress(input.recipientAddress);

  return {
    ...input,
    issuedAt: new Date().toISOString(),
  };
}

export function createCertificateHash(payload: CertificatePayload) {
  return `0x${stableJsonHash(payload)}`;
}

export function createVerificationPath(certificateHash: string) {
  return `/verify/certificate/${certificateHash}`;
}
