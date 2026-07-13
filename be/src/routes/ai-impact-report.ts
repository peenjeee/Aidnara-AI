import { buildImpactReportPrompt, parseImpactReport, type ImpactReportInput } from '../services/ai-impact-report';
import { fail, ok } from '../lib/http';
import { parseImpactReportRequest } from '../lib/requests';

export async function createImpactReport(input: ImpactReportInput, callAi: (prompt: string) => Promise<unknown>) {
  const prompt = buildImpactReportPrompt(input);
  const rawReport = await callAi(prompt);
  return parseImpactReport(rawReport);
}

export async function handleCreateImpactReport(body: unknown, callAi: (prompt: string) => Promise<unknown>) {
  try {
    const input = parseImpactReportRequest(body);
    return ok(await createImpactReport(input, callAi));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Impact report failed');
  }
}
