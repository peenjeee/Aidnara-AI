#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'README.md',
  'fe/README.md',
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
  'api/certificates.md',
  'api/storage.md',
  'be/db/schema.sql',
  'be/db/migrations/001_initial_schema.sql',
  'be/db/migrations/002_public_read_rls.sql',
  'be/db/storage.md',
  'be/package.json',
  'be/self-check.js',
  'be/src/config/env.ts',
  'be/src/lib/hash.ts',
  'be/src/lib/validate.ts',
  'be/src/repositories/campaigns.ts',
  'be/src/repositories/certificates.ts',
  'be/src/repositories/proofs.ts',
  'be/src/repositories/types.ts',
  'be/src/services/ai-impact-report.ts',
  'be/src/services/certificate.ts',
  'be/src/services/storage.ts',
  'be/src/routes/ai-impact-report.ts',
  'be/src/routes/certificates.ts',
  'be/src/index.ts',
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
  ['fe/README.md', ['Frontend app', 'Pages']],
  ['be/README.md', ['Backend services', 'Server-Only Rules']],
  ['api/README.md', ['API contract', 'MVP Endpoints']],
  ['api/ai-impact-report.md', ['POST /api/ai/impact-report', 'trustScore']],
  ['api/certificates.md', ['POST /api/certificates/generate', 'GET /api/certificates/[hash]']],
  ['api/storage.md', ['POST /api/storage/signed-upload', 'Max proof file size']],
  ['blockchain/README.md', ['Smart contract workspace', 'BNB Smart Chain Testnet', 'MVP Contract Functions']],
  ['README.md', ['BNB Smart Chain', 'skillicons.dev', 'wagmi', 'RainbowKit', 'BscScan']],
  ['blockchain/contracts/AidnaraAidRegistry.sol', ['contract AidnaraAidRegistry', 'createCampaign', 'donate', 'submitProof', 'issueCertificate', 'verifyCertificate', 'totalWithdrawn']],
  ['blockchain/hardhat.config.ts', ['bnbTestnet', 'chainId: 97']],
  ['blockchain/package.json', ['compile', 'test', 'deploy:testnet']],
  ['blockchain/scripts/deploy.ts', ['AidnaraAidRegistry deployed to']],
  ['blockchain/test/AidnaraAidRegistry.ts', ['creates a campaign', 'issues and verifies certificate']],
  ['blockchain/deploy/README.md', ['BNB Smart Chain Testnet', 'NEXT_PUBLIC_CONTRACT_ADDRESS']],
  ['blockchain/test/AidnaraAidRegistry.test-plan.md', ['Campaign', 'Donation', 'Proof', 'Certificate', 'Withdrawal']],
  ['be/README.md', ['Current Baseline', 'db/migrations', 'self-check.js']],
  ['be/db/schema.sql', ['create table if not exists campaigns', 'create table if not exists certificates']],
  ['be/db/migrations/001_initial_schema.sql', ['create extension if not exists pgcrypto', 'create table if not exists campaigns', 'create table if not exists certificates']],
  ['be/db/migrations/002_public_read_rls.sql', ['enable row level security', 'public can read campaigns', 'server-only']],
  ['be/db/storage.md', ['Supabase Storage Plan', 'campaign-covers', 'proofs', 'certificates']],
  ['be/package.json', ['check', 'self-check.js']],
  ['be/self-check.js', ['BE self-check passed', 'stableJsonHash']],
  ['be/src/repositories/campaigns.ts', ['createCampaign', 'getCampaignById']],
  ['be/src/repositories/proofs.ts', ['createProof', 'mapImpactReportToProofUpdate']],
  ['be/src/repositories/certificates.ts', ['createCertificate', 'getCertificateByHash']],
  ['be/src/services/ai-impact-report.ts', ['parseImpactReport', 'buildImpactReportPrompt']],
  ['be/src/services/certificate.ts', ['createCertificateHash', 'createVerificationPath']],
  ['be/src/services/storage.ts', ['validateProofUpload', 'buildStoragePath']],
  ['docs/prd/00-name-options.md', ['Final Name', 'Meaning', 'Official Tagline', 'Required Availability Checks']],
  ['docs/prd/01-overview.md', ['Product Goals', 'Non Goals', 'Product Principles']],
  ['docs/prd/02-scope.md', ['MVP Feature Priority', 'Success Criteria', 'Acceptance Criteria']],
  ['docs/prd/03-users-and-flows.md', ['Roles', 'Page Requirements', 'Error States']],
  ['docs/prd/04-features.md', ['Campaign Creation', 'Donation', 'Proof Upload', 'Transparency Dashboard']],
  ['docs/prd/05-ai-impact-report.md', ['Required Output Schema', 'Prompt Guardrails', 'Failure Handling']],
  ['docs/prd/06-certificate.md', ['Donor Certificate', 'Organizer Certificate', 'Certificate Lifecycle', 'Verification Rules']],
  ['docs/prd/07-architecture.md', ['BNB Smart Chain Testnet', 'Repository Structure', 'Boundary Rules', 'Smart Contract Events', 'Database Tables', 'API Routes']],
  ['docs/prd/08-security.md', ['Database Security', 'Abuse Limits', 'Security Acceptance Criteria']],
  ['docs/prd/09-testing.md', ['Manual Demo Tests', 'Smart Contract Tests', 'API Tests', 'Regression Checklist']],
  ['docs/prd/10-deployment.md', ['BNB Smart Chain Testnet', 'Deployment Steps', 'Production Smoke Test', 'Rollback Plan']],
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
    if (['.git', 'node_modules', '.next', 'dist', 'build'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(fullPath);
  }
  return files;
}

for (const file of walk(root)) {
  const relative = path.relative(root, file).replace(/\\/g, '/');
  if (!/\.(md|js|ts|tsx|json|env|sol)$/i.test(relative)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      fail(`Potential secret found in ${relative}`);
    }
  }
}

if (!process.exitCode) {
  console.log('OK: Aidnara AI PRD, deployment, testing, and security checks passed.');
}
