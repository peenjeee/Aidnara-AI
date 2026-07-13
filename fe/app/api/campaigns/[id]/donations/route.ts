import { handleListDonationsRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => handleListDonationsRequest(request, id));
}
