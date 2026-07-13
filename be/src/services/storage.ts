import { assertProofFile } from '../lib/validate';

export type UploadCandidate = {
  name: string;
  type: string;
  size: number;
};

export function buildStoragePath(kind: 'campaign-cover' | 'proof' | 'certificate', fileName: string) {
  const safeName = fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
  return `${kind}/${Date.now()}-${safeName}`;
}

export function validateProofUpload(file: UploadCandidate) {
  assertProofFile(file);
  return buildStoragePath('proof', file.name);
}
