import { fail, ok } from '../lib/http';
import { parseCreateCampaignRequest } from '../lib/requests';
import { createSupabaseAdmin } from '../lib/supabase-admin';
import {
  createCampaign,
  getCampaignById,
  listCampaigns,
  listCampaignsByOwner,
  updateCampaignChainData,
} from '../repositories/campaigns';
import { type DbClient } from '../repositories/types';

export async function createCampaignRuntime(body: unknown, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    return ok(await createCampaign(db, parseCreateCampaignRequest(body)), 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Campaign creation failed');
  }
}

export async function getCampaignRuntime(id: string, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    return ok(await getCampaignById(db, id));
  } catch {
    return fail('Campaign not found', 404);
  }
}

export async function listCampaignsRuntime(ownerAddress?: string, db = createSupabaseAdmin() as unknown as DbClient) {
  try {
    return ok(ownerAddress ? await listCampaignsByOwner(db, ownerAddress) : await listCampaigns(db));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Campaign list failed');
  }
}

export async function attachCampaignChainDataRuntime(
  id: string,
  input: { chainCampaignId?: number; metadataUri?: string; createTxHash?: string },
  db = createSupabaseAdmin() as unknown as DbClient,
) {
  try {
    return ok(
      await updateCampaignChainData(db, id, {
        chain_campaign_id: input.chainCampaignId,
        metadata_uri: input.metadataUri,
        create_tx_hash: input.createTxHash,
      }),
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Campaign chain update failed');
  }
}
