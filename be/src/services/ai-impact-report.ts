import { assertTrustScore } from '../lib/validate';

export type ImpactRisk = 'Low' | 'Medium' | 'High';

export type ImpactReportInput = {
  campaignTitle: string;
  campaignCategory: string;
  campaignDescription: string;
  expectedImpact: string;
  proofTitle: string;
  proofDescription: string;
  amountUsed: string;
  impactClaim: string;
  proofFileUrl: string;
};

export type ImpactReport = {
  summary: string;
  detectedItems: string[];
  consistency: string;
  risk: ImpactRisk;
  estimatedImpact: string;
  trustScore: number;
  certificateImpactText: string;
  warnings: string[];
};

export function buildImpactReportPrompt(input: ImpactReportInput) {
  return `Return JSON only. Analyze this donation proof as assistive review, not legal audit.\n\n${JSON.stringify(input, null, 2)}`;
}

export function parseImpactReport(value: unknown): ImpactReport {
  if (!value || typeof value !== 'object') throw new Error('Invalid AI report');

  const report = value as Partial<ImpactReport>;
  const risks = new Set<ImpactRisk>(['Low', 'Medium', 'High']);

  if (typeof report.summary !== 'string') throw new Error('Missing summary');
  if (!Array.isArray(report.detectedItems)) throw new Error('Missing detectedItems');
  if (typeof report.consistency !== 'string') throw new Error('Missing consistency');
  if (!report.risk || !risks.has(report.risk)) throw new Error('Invalid risk');
  if (typeof report.estimatedImpact !== 'string') throw new Error('Missing estimatedImpact');
  if (typeof report.trustScore !== 'number') throw new Error('Missing trustScore');
  if (typeof report.certificateImpactText !== 'string') throw new Error('Missing certificateImpactText');
  if (!Array.isArray(report.warnings)) throw new Error('Missing warnings');

  assertTrustScore(report.trustScore);

  return {
    summary: report.summary,
    detectedItems: report.detectedItems.map(String).slice(0, 10),
    consistency: report.consistency,
    risk: report.risk,
    estimatedImpact: report.estimatedImpact,
    trustScore: report.trustScore,
    certificateImpactText: report.certificateImpactText,
    warnings: report.warnings.map(String),
  };
}
