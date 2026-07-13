import { createCampaignRuntime, getCampaignRuntime, listCampaignsRuntime } from '../runtime/campaigns';
import { generateAndStoreCertificate, lookupCertificateFromSupabase } from '../runtime/certificates';
import { createDonationRuntime, listDonationsRuntime } from '../runtime/donations';
import { createImpactReportWithGemini } from '../runtime/impact-report';
import { createProofRuntime, listProofsRuntime } from '../runtime/proofs';
import { prepareSupabaseSignedUpload } from '../runtime/storage';
import { type ApiResult } from '../lib/http';

export async function handleCreateCampaignRequest(request: Request) {
  return toResponse(await createCampaignRuntime(await readJson(request)));
}

export async function handleListCampaignsRequest(request: Request) {
  const ownerAddress = new URL(request.url).searchParams.get('owner') || undefined;
  return toResponse(await listCampaignsRuntime(ownerAddress));
}

export async function handleGetCampaignRequest(_request: Request, id: string) {
  return toResponse(await getCampaignRuntime(id));
}

export async function handleCreateDonationRequest(request: Request) {
  return toResponse(await createDonationRuntime(await readJson(request)));
}

export async function handleListDonationsRequest(_request: Request, campaignId: string) {
  return toResponse(await listDonationsRuntime(campaignId));
}

export async function handleCreateProofRequest(request: Request) {
  return toResponse(await createProofRuntime(await readJson(request)));
}

export async function handleListProofsRequest(_request: Request, campaignId: string) {
  return toResponse(await listProofsRuntime(campaignId));
}

export async function handleImpactReportRequest(request: Request) {
  return toResponse(await createImpactReportWithGemini(await readJson(request)));
}

export async function handleGenerateCertificateRequest(request: Request) {
  return toResponse(await generateAndStoreCertificate(await readJson(request)));
}

export async function handleLookupCertificateRequest(_request: Request, hash: string) {
  return toResponse(await lookupCertificateFromSupabase(hash));
}

export async function handleSignedUploadRequest(request: Request) {
  return toResponse(await prepareSupabaseSignedUpload(await readJson(request)));
}

export function toResponse(result: ApiResult<unknown>) {
  return Response.json(result.body, { status: result.status });
}

async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
