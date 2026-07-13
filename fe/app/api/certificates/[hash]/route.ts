import { handleLookupCertificateRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function GET(request: Request, { params }: { params: Promise<{ hash: string }> }) {
  return params.then(({ hash }) => handleLookupCertificateRequest(request, hash));
}
