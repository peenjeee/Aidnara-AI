import { handleImpactReportRequest } from '@aidnara/be';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return handleImpactReportRequest(request);
}
