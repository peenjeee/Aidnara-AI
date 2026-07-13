# BE

Backend services for Aidnara AI.

## Responsibility

- Supabase database access.
- Server-side ownership validation.
- Storage upload orchestration.
- AI impact report persistence.
- Certificate generation persistence.
- Event indexing/cache jobs if needed.

## Suggested Stack

- Next.js route handlers or Node.js service
- Supabase Postgres
- Supabase Storage

## Server-Only Rules

- Keep service role keys here only.
- Never expose AI keys to frontend.
- Validate wallet ownership before proof or certificate writes.

## Current Baseline

- `db/schema.sql`: Supabase-compatible database schema.
- `db/migrations/`: versioned schema and RLS migrations.
- `db/storage.md`: storage bucket plan and upload rules.
- `src/services/`: AI report, certificate, and storage service helpers.
- `src/services/ai-provider.ts`: Gemini JSON provider boundary.
- `src/runtime/impact-report.ts`: ready-to-wire Gemini impact report runtime.
- `src/runtime/certificates.ts`: certificate generation, persistence, and lookup runtime.
- `src/runtime/campaigns.ts`: campaign create/list/detail and chain metadata runtime.
- `src/runtime/donations.ts`: donation cache, donation history, and donor certificate linking runtime.
- `src/runtime/proofs.ts`: owner-checked proof creation and AI report persistence runtime.
- `src/runtime/storage.ts`: Supabase signed upload runtime.
- `src/lib/supabase-admin.ts`: server-only Supabase service role client.
- `src/services/supabase-storage.ts`: Supabase signed upload helper.
- `src/routes/`: runtime-agnostic route handlers.
- `src/lib/requests.ts`: request validation for API payloads.
- `src/lib/rate-limit.ts`: dependency-free abuse guard for AI, proof, upload, and certificate actions.
- `src/repositories/`: thin database repository layer.
- `self-check.js`: dependency-free backend sanity check.

## Check

```bash
npm run check
npm run typecheck
```
