import { fail, ok } from '../lib/http';
import { assertRateLimit, backendRateLimits } from '../lib/rate-limit';
import { parseSignedUploadRequest } from '../lib/requests';
import { createSupabaseAdmin } from '../lib/supabase-admin';
import { createSupabaseSignedUpload } from '../services/supabase-storage';

export async function prepareSupabaseSignedUpload(body: unknown, supabase = createSupabaseAdmin()) {
  try {
    const { kind, file } = parseSignedUploadRequest(body);
    assertRateLimit({ key: `upload:${kind}:${file.name}`, ...backendRateLimits.upload });

    return ok(await createSupabaseSignedUpload(supabase, body));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Signed upload failed');
  }
}
