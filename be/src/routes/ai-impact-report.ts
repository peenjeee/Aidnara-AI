import { buildImpactReportPrompt, parseImpactReport, type ImpactReportInput } from '../services/ai-impact-report';

export async function createImpactReport(input: ImpactReportInput, callAi: (prompt: string) => Promise<unknown>) {
  const prompt = buildImpactReportPrompt(input);
  const rawReport = await callAi(prompt);
  return parseImpactReport(rawReport);
}
