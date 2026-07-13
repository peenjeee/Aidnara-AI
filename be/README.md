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
- `src/routes/`: runtime-agnostic route handlers.
- `src/lib/requests.ts`: request validation for API payloads.
- `src/repositories/`: thin database repository layer.
- `self-check.js`: dependency-free backend sanity check.

## Check

```bash
npm run check
```
