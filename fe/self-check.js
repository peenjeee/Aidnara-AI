const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

const root = __dirname;
const required = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/api/campaigns/route.ts',
  'app/api/donations/route.ts',
  'app/api/proofs/route.ts',
  'app/api/ai/impact-report/route.ts',
  'app/api/certificates/generate/route.ts',
  'app/api/storage/signed-upload/route.ts',
];

for (const file of required) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) throw new Error(`${file} missing`);
}

const page = readFileSync(join(root, 'app/page.tsx'), 'utf8');
if (!page.includes('Transparent Aid, Verified Impact')) throw new Error('Landing tagline missing');

const api = readFileSync(join(root, 'app/api/campaigns/route.ts'), 'utf8');
if (!api.includes('@aidnara/be')) throw new Error('Backend adapter import missing');

console.log('OK: FE self-check passed.');
