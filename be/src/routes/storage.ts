import { fail, ok } from '../lib/http';
import { parseSignedUploadRequest } from '../lib/requests';
import { buildStoragePath, validateProofUpload } from '../services/storage';

export function prepareSignedUpload(body: unknown) {
  try {
    const { kind, file } = parseSignedUploadRequest(body);
    const path = kind === 'proof' ? validateProofUpload(file) : buildStoragePath(kind, file.name);

    // ponytail: runtime adapter must replace uploadUrl with a real Supabase signed URL.
    return ok({ path, uploadUrl: null, publicUrl: null });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Invalid upload request');
  }
}
