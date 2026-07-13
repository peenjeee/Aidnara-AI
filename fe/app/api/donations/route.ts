import { handleCreateDonationRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return handleCreateDonationRequest(request);
}
