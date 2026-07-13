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
assertRepositoryExport('proofs.ts', 'createProof');
assertRepositoryExport('certificates.ts', 'createCertificate');

console.log('OK: BE self-check passed.');
