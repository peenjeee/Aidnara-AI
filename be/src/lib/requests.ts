import { type ImpactReportInput } from '../services/ai-impact-report';
import { type CertificatePayload, type CertificateType } from '../services/certificate';
import { type UploadCandidate } from '../services/storage';
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

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('JSON body is required');
  return value as Record<string, unknown>;
}
