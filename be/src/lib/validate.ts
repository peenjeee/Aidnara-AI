export const proofFileTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
]);

export const maxProofFileBytes = 5 * 1024 * 1024;

export function assertWalletAddress(address: string) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid wallet address');
  }
}

export function assertProofFile(file: { type: string; size: number }) {
  if (!proofFileTypes.has(file.type)) throw new Error('Unsupported proof file type');
  if (file.size > maxProofFileBytes) throw new Error('Proof file is too large');
}

export function assertTrustScore(score: number) {
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw new Error('Invalid trust score');
  }
}
