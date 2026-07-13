import { type ImpactReport } from '../services/ai-impact-report';
import { type DbClient, unwrap, unwrapList } from './types';

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

export async function getProofById(db: DbClient, id: string) {
  const result = await db.from<never, Proof>('proofs').select('*').eq('id', id).single();
  return unwrap(result, 'Proof not found');
}

export async function listProofsByCampaign(db: DbClient, campaignId: string) {
  const result = await db
    .from<never, Proof>('proofs')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: false });

  return unwrapList(result);
}

export async function updateProofImpactReport(db: DbClient, proofId: string, report: ImpactReport) {
  const result = await db
    .from<never, Proof>('proofs')
    .update(mapImpactReportToProofUpdate(report))
    .eq('id', proofId)
    .select()
    .single();

  return unwrap(result, 'Proof AI report was not updated');
}

export async function markProofAiFailed(db: DbClient, proofId: string) {
  const result = await db
    .from<never, Proof>('proofs')
    .update({ ai_status: 'failed' })
    .eq('id', proofId)
    .select()
    .single();

  return unwrap(result, 'Proof AI status was not updated');
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
