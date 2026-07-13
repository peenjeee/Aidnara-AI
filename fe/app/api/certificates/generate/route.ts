import { handleGenerateCertificateRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return handleGenerateCertificateRequest(request);
}
