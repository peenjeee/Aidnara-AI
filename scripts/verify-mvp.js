#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'README.md',
  'fe/README.md',
  'fe/package.json',
  'fe/src/app.tsx',
  'fe/src/routes/index.tsx',
  'fe/src/routes/campaigns.tsx',
  'fe/src/routes/campaigns/create.tsx',
  'fe/src/routes/campaigns/[id].tsx',
  'fe/src/routes/verify/certificate/[hash].tsx',
  'fe/src/routes/demo-campaigns.ts',
  'be/README.md',
  'api/README.md',
  'blockchain/README.md',
  'blockchain/contracts/AidnaraAidRegistry.sol',
  'blockchain/deploy/README.md',
  'blockchain/hardhat.config.ts',
  'blockchain/package.json',
  'blockchain/scripts/deploy.ts',
  'blockchain/test/AidnaraAidRegistry.ts',
  'blockchain/tsconfig.json',
  'blockchain/test/AidnaraAidRegistry.test-plan.md',
  'api/ai-impact-report.md',
  'api/campaigns.md',
  'api/certificates.md',
  'api/donations.md',
  'api/event-sync.md',
  'api/onchain-validation.md',
  'api/proofs.md',
  'api/storage.md',
  'be/db/query.sql',
  'be/go.mod',
  'be/main.go',
  'be/handlers/campaigns.go',
  'be/handlers/donations.go',
  'be/handlers/proofs.go',
  'be/handlers/certificates.go',
  'be/handlers/uploads.go',
  'be/services/ai_provider.go',
  'be/services/onchain.go',
  'be/services/storage.go',
  'docs/prd/00-name-options.md',
  'docs/prd/01-overview.md',
  'docs/prd/02-scope.md',
  'docs/prd/03-users-and-flows.md',
  'docs/prd/04-features.md',
  'docs/prd/05-ai-impact-report.md',
  'docs/prd/06-certificate.md',
  'docs/prd/07-architecture.md',
  'docs/prd/08-security.md',
  'docs/prd/09-testing.md',
  'docs/prd/10-deployment.md',
];

const requiredTerms = [
  ['fe/README.md', ['SolidStart', 'Tailwind', 'TypeScript']],
  ['fe/package.json', ['@solidjs/start', 'solid-js']],
  ['be/README.md', ['Go', 'Fiber', 'PostgreSQL', 'sqlc', 'go-ethereum']],
  ['api/README.md', ['GET /api/campaigns', 'POST /api/donations', 'Runtime Contracts']],
  ['api/campaigns.md', ['GET /api/campaigns', 'POST /api/campaigns', 'GET /api/campaigns/:id']],
  ['api/donations.md', ['POST /api/donations', 'amount', 'donor_address']],
  ['api/proofs.md', ['POST /api/proofs', 'GET /api/campaigns/:id/proofs', 'Gemini', 'file_hash']],
  ['api/onchain-validation.md', ['DonationEventExpectation', 'Receipt', 'Event fields']],
  ['api/event-sync.md', ['Event sync persistence', 'DonationReceived', 'CertificateIssued']],
  ['fe/src/routes/campaigns.tsx', ['demoCampaigns', 'Campaign API unavailable', 'Start Campaign']],
  ['fe/src/routes/campaigns/create.tsx', ['owner_address', 'POST', '/api/uploads', '/api/campaigns', 'Create Campaign']],
  ['fe/src/routes/campaigns/[id].tsx', ['useParams', 'Campaign API unavailable', 'trust score', '/api/donations', '/api/uploads', '/api/proofs', 'SHA-256', '/api/certificates']],
  ['fe/src/routes/verify/certificate/[hash].tsx', ['Verify Certificate', '/api/certificates/hash/', 'demo-certificate-hash']],
  ['api/ai-impact-report.md', ['POST /api/proofs', 'trust_score']],
  ['api/certificates.md', ['POST /api/certificates', 'GET /api/certificates/hash/:hash', 'tx_hash']],
  ['api/storage.md', ['be/uploads/', 'Static', 'POST /api/uploads']],
  ['blockchain/README.md', ['Smart contract workspace', 'BNB Smart Chain Testnet']],
  ['README.md', ['BNB Smart Chain', 'Go', 'SolidStart', 'BscScan']],
  ['blockchain/contracts/AidnaraAidRegistry.sol', ['contract AidnaraAidRegistry', 'createCampaign', 'donate']],
  ['be/main.go', ['github.com/gofiber/fiber/v2', 'InitStorage', 'pgx.Connect']],
  ['be/handlers/campaigns.go', ['CreateCampaign', 'ListCampaigns']],
  ['be/handlers/donations.go', ['CreateDonation', 'ValidateDonationEvent', 'RPC_URL', 'Campaign is not linked on-chain']],
  ['be/handlers/proofs.go', ['CreateProof', 'ListProofsByCampaign', 'analyzeProofWithAI', 'GEMINI_API_KEY']],
  ['be/handlers/certificates.go', ['CreateCertificate', 'GetCertificateByHash', 'UpdateCertificateTxHash']],
  ['be/handlers/uploads.go', ['UploadFile', 'SaveFile', 'POST /api/uploads']],
  ['be/services/ai_provider.go', ['CallGeminiJSON']],
  ['be/services/onchain.go', ['ValidateDonationEvent', 'DonationEventExpectation']],
  ['be/services/storage.go', ['InitStorage']],
  ['docs/prd/00-name-options.md', ['Final Name', 'Meaning']],
];

const secretPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /AIza[0-9A-Za-z_-]{20,}/,
  /(?:private[_-]?key|secret[_-]?key)\s*=\s*['"][^'"]+['"]/i,
  /SUPABASE_SERVICE_ROLE_KEY[ \t]*=[ \t]*[^\s]+/,
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

for (const [file, terms] of requiredTerms) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      fail(`${file} is missing required term: ${term}`);
    }
  }
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.next', 'dist', 'build', 'legacy'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(fullPath);
  }
  return files;
}

for (const file of walk(root)) {
  const relative = path.relative(root, file).replace(/\\/g, '/');
  if (!/\.(md|js|ts|tsx|json|env|sol|go)$/i.test(relative)) continue;
  
  // Skip checking example environment files for secrets
  if (relative.endsWith('.env.example') || relative.endsWith('.env')) continue;
  
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      fail(`Potential secret found in ${relative}`);
    }
  }
}

if (!process.exitCode) {
  console.log('OK: Aidnara AI structure and security checks passed for the new Go/SolidStart architecture.');
}
