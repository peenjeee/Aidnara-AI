import { type ImpactReport } from '../services/ai-impact-report';
import { type DbClient, unwrap } from './types';

export type ProofInsert = {
  campaign_id: string;
  title: string;
  description: string;
  amount_used: string;
  impact_claim: string;
  file_url: string;
  file_hash: string;
  proof_uri?: string;
  submit_tx_hash?: string;
};

export type Proof = ProofInsert & {
  id: string;
  ai_status: 'pending' | 'generated' | 'failed';
  ai_summary: string | null;
  ai_detected_items: string[];
  ai_consistency: string | null;
  ai_risk: ImpactReport['risk'] | null;
  ai_estimated_impact: string | null;
  ai_trust_score: number | null;
  ai_certificate_impact_text: string | null;
  created_at: string;
};

export async function createProof(db: DbClient, input: ProofInsert) {
  const result = await db.from<ProofInsert, Proof>('proofs').insert(input).select().single();
  return unwrap(result, 'Proof was not created');
}

export function mapImpactReportToProofUpdate(report: ImpactReport) {
  return {
    ai_status: 'generated' as const,
    ai_summary: report.summary,
    ai_detected_items: report.detectedItems,
    ai_consistency: report.consistency,
    ai_risk: report.risk,
    ai_estimated_impact: report.estimatedImpact,
    ai_trust_score: report.trustScore,
    ai_certificate_impact_text: report.certificateImpactText,
  };
}
