import { readServerEnv } from '../config/env';
import { assertRateLimit, backendRateLimits } from '../lib/rate-limit';
import { parseImpactReportRequest } from '../lib/requests';
import { handleCreateImpactReport } from '../routes/ai-impact-report';
import { callGeminiJson } from '../services/ai-provider';

export async function createImpactReportWithGemini(body: unknown, env = readServerEnv()) {
  const input = parseImpactReportRequest(body);
  assertRateLimit({ key: `ai-report:${input.proofFileUrl}`, ...backendRateLimits.aiReport });

  return handleCreateImpactReport(body, (prompt) =>
    callGeminiJson(prompt, {
      apiKey: env.aiApiKey,
      model: env.aiModel,
    }),
  );
}
