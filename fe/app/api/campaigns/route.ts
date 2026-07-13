import { handleCreateCampaignRequest, handleListCampaignsRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function GET(request: Request) {
  return handleListCampaignsRequest(request);
}

export function POST(request: Request) {
  return handleCreateCampaignRequest(request);
}
