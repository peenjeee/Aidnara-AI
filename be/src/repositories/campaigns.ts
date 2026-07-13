import { type DbClient, unwrap, unwrapList } from './types';

export type CampaignInsert = {
  chain_campaign_id?: number;
  owner_address: string;
  title: string;
  short_description: string;
  long_description: string;
  category: 'education' | 'health' | 'disaster' | 'community' | 'environment';
  target_amount: string;
  cover_image_url: string;
  beneficiary_name: string;
  location: string;
  expected_impact: string;
  metadata_uri?: string;
  create_tx_hash?: string;
};

export type Campaign = CampaignInsert & {
  id: string;
  latest_trust_score: number | null;
  created_at: string;
  updated_at: string;
};

export async function createCampaign(db: DbClient, input: CampaignInsert) {
  const result = await db.from<CampaignInsert, Campaign>('campaigns').insert(input).select().single();
  return unwrap(result, 'Campaign was not created');
}

export async function getCampaignById(db: DbClient, id: string) {
  const result = await db.from<never, Campaign>('campaigns').select('*').eq('id', id).single();
  return unwrap(result, 'Campaign not found');
}

export async function getCampaignByChainId(db: DbClient, chainCampaignId: number) {
  const result = await db
    .from<never, Campaign>('campaigns')
    .select('*')
    .eq('chain_campaign_id', chainCampaignId)
    .single();

  return unwrap(result, 'Campaign not found');
}

export async function listCampaigns(db: DbClient) {
  const result = await db.from<never, Campaign>('campaigns').select('*').order('created_at', { ascending: false });
  return unwrapList(result);
}

export async function listCampaignsByOwner(db: DbClient, ownerAddress: string) {
  const result = await db
    .from<never, Campaign>('campaigns')
    .select('*')
    .eq('owner_address', ownerAddress)
    .order('created_at', { ascending: false });

  return unwrapList(result);
}

export async function updateCampaignChainData(
  db: DbClient,
  id: string,
  input: Pick<CampaignInsert, 'chain_campaign_id' | 'metadata_uri' | 'create_tx_hash'>,
) {
  const result = await db.from<never, Campaign>('campaigns').update(input).eq('id', id).select().single();
  return unwrap(result, 'Campaign was not updated');
}

export async function updateCampaignTrustScore(db: DbClient, id: string, latestTrustScore: number) {
  const result = await db
    .from<never, Campaign>('campaigns')
    .update({ latest_trust_score: latestTrustScore })
    .eq('id', id)
    .select()
    .single();

  return unwrap(result, 'Campaign trust score was not updated');
}
