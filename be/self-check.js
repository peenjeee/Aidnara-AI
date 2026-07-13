const { createHash } = require('crypto');
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

const root = __dirname;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256Hex(input) {
  return createHash('sha256').update(input).digest('hex');
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, sortObject(child)]),
  );
}

function stableJsonHash(value) {
  return sha256Hex(JSON.stringify(sortObject(value)));
}

function assertWalletAddress(address) {
  assert(/^0x[a-fA-F0-9]{40}$/.test(address), 'wallet validation failed');
}

function assertTrustScore(score) {
  assert(Number.isInteger(score) && score >= 0 && score <= 100, 'trust score validation failed');
}

function assertRepositoryExport(file, exportName) {
  const path = join(root, 'src', 'repositories', file);
  assert(existsSync(path), `${file} missing`);
  assert(readFileSync(path, 'utf8').includes(exportName), `${exportName} missing in ${file}`);
}

function assertSourceExport(relativePath, exportName) {
  const path = join(root, 'src', relativePath);
  assert(existsSync(path), `${relativePath} missing`);
  assert(readFileSync(path, 'utf8').includes(exportName), `${exportName} missing in ${relativePath}`);
}

const payloadA = { b: 2, a: { d: 4, c: 3 } };
const payloadB = { a: { c: 3, d: 4 }, b: 2 };
assert(stableJsonHash(payloadA) === stableJsonHash(payloadB), 'stable hash must ignore key order');

assertWalletAddress('0x0000000000000000000000000000000000000000');
assertTrustScore(87);

const report = {
  summary: 'Proof is consistent.',
  detectedItems: ['receipt'],
  consistency: 'Matches claim.',
  risk: 'Low',
  estimatedImpact: '15 students helped.',
  trustScore: 87,
  certificateImpactText: 'Supported learning access.',
  warnings: [],
};

assert(['Low', 'Medium', 'High'].includes(report.risk), 'risk enum failed');
assertTrustScore(report.trustScore);

assertRepositoryExport('campaigns.ts', 'createCampaign');
assertRepositoryExport('donations.ts', 'createDonation');
assertRepositoryExport('donations.ts', 'linkDonationCertificate');
assertRepositoryExport('proofs.ts', 'createProof');
assertRepositoryExport('certificates.ts', 'createCertificate');
assertSourceExport('lib/requests.ts', 'parseImpactReportRequest');
assertSourceExport('lib/requests.ts', 'parseCertificateGenerateRequest');
assertSourceExport('lib/requests.ts', 'parseSignedUploadRequest');
assertSourceExport('lib/requests.ts', 'parseCreateCampaignRequest');
assertSourceExport('lib/requests.ts', 'parseCreateDonationRequest');
assertSourceExport('lib/requests.ts', 'parseLinkDonationCertificateRequest');
assertSourceExport('lib/requests.ts', 'parseCreateProofRequest');
assertSourceExport('lib/rate-limit.ts', 'assertRateLimit');
assertSourceExport('lib/rate-limit.ts', 'backendRateLimits');
assertSourceExport('routes/ai-impact-report.ts', 'handleCreateImpactReport');
assertSourceExport('routes/certificates.ts', 'handleGenerateCertificate');
assertSourceExport('routes/storage.ts', 'prepareSignedUpload');
assertSourceExport('routes/certificate-lookup.ts', 'lookupCertificate');
assertSourceExport('services/ai-provider.ts', 'callGeminiJson');
assertSourceExport('services/ai-provider.ts', 'parseJsonText');
assertSourceExport('runtime/certificates.ts', 'generateAndStoreCertificate');
assertSourceExport('runtime/certificates.ts', 'lookupCertificateFromSupabase');
assertSourceExport('runtime/certificates.ts', 'backendRateLimits.certificate');
assertSourceExport('runtime/campaigns.ts', 'createCampaignRuntime');
assertSourceExport('runtime/campaigns.ts', 'listCampaignsRuntime');
assertSourceExport('runtime/donations.ts', 'createDonationRuntime');
assertSourceExport('runtime/donations.ts', 'listDonationsRuntime');
assertSourceExport('runtime/donations.ts', 'linkDonationCertificateRuntime');
assertSourceExport('runtime/impact-report.ts', 'createImpactReportWithGemini');
assertSourceExport('runtime/impact-report.ts', 'backendRateLimits.aiReport');
assertSourceExport('runtime/onchain.ts', 'validateDonationTransactionRuntime');
assertSourceExport('runtime/onchain.ts', 'validateProofTransactionRuntime');
assertSourceExport('runtime/onchain.ts', 'validateCertificateTransactionRuntime');
assertSourceExport('runtime/onchain-sync.ts', 'syncAidnaraEventsRuntime');
assertSourceExport('runtime/proofs.ts', 'createProofRuntime');
assertSourceExport('runtime/proofs.ts', 'backendRateLimits.proof');
assertSourceExport('runtime/proofs.ts', 'attachProofImpactReportRuntime');
assertSourceExport('runtime/storage.ts', 'prepareSupabaseSignedUpload');
assertSourceExport('runtime/storage.ts', 'backendRateLimits.upload');
assertSourceExport('services/onchain.ts', 'validateDonationEvent');
assertSourceExport('services/onchain.ts', 'DonationReceived');
assertSourceExport('services/onchain-events.ts', 'listAidnaraEvents');
assertSourceExport('services/onchain-events.ts', 'normalizeArgs');
assertSourceExport('adapters/web.ts', 'handleCreateCampaignRequest');
assertSourceExport('adapters/web.ts', 'handleImpactReportRequest');
assertSourceExport('adapters/web.ts', 'handleSignedUploadRequest');

console.log('OK: BE self-check passed.');
