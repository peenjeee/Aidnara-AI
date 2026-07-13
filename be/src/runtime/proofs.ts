import { fail, ok } from '../lib/http';
import { parseCreateProofRequest } from '../lib/requests';
import { createSupabaseAdmin } from '../lib/supabase-admin';
import { getCampaignById, updateCampaignTrustScore } from '../repositories/campaigns';
import {
  createProof,
  listProofsByCampaign,
  markProofAiFailed,
  updateProofImpactReport,
} from '../repositories/proofs';
import { type DbClient } from '../repositories/types';
import { type ImpactReport } from '../services/ai-impact-report';

export async function createProofRuntime(body: unknown, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    const { ownerAddress, proof } = parseCreateProofRequest(body);
    const campaign = await getCampaignById(db, proof.campaign_id);

    if (campaign.owner_address.toLowerCase() !== ownerAddress.toLowerCase()) {
      return fail('Only campaign owner can submit proof', 403);
    }

    return ok(await createProof(db, proof), 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Proof creation failed');
  }
}

export async function listProofsRuntime(campaignId: string, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    return ok(await listProofsByCampaign(db, campaignId));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Proof list failed');
  }
}

export async function attachProofImpactReportRuntime(
  proofId: string,
  campaignId: string,
  report: ImpactReport,
  db = createSupabaseAdmin() as unknown as DbClient,
) {
  try {
    const proof = await updateProofImpactReport(db, proofId, report);
    await updateCampaignTrustScore(db, campaignId, report.trustScore);
    return ok(proof);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Proof AI report update failed');
  }
}

export async function markProofAiFailedRuntime(proofId: string, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    return ok(await markProofAiFailed(db, proofId));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Proof AI failure update failed');
  }
}
