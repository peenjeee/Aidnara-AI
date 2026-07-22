# PRD 08 - Security Requirements

## Wallet And Authorization

- Only connected campaign owner can upload proof for that campaign.
- Never trust wallet address from request body without signature, session, or contract ownership check.
- Validate chain ID before transactions.
- Show testnet warning in UI.
- Prevent duplicate transaction submit while pending.

## Smart Contract

- Use owner checks for proof submission and withdrawal.
- Emit events for campaign creation, donation, proof, withdrawal, and certificate issuance.
- Do not store private data on-chain.
- Avoid unbounded loops in write functions.
- Use checks-effects-interactions for withdrawals.
- Validate campaign exists before donate, proof, certificate, or withdrawal.
- Certificate hash must not be reused for multiple certificates.

## File Upload

- Limit accepted file types to `image/png`, `image/jpeg`, `image/webp`, and `application/pdf`.
- Limit file size to 5 MB for MVP.
- Compute SHA-256 hash before storing proof metadata.
- Store uploads in non-executable buckets.
- Never render uploaded SVG as trusted HTML.

## AI Safety

- AI output must be parsed and validated against expected schema.
- AI must not produce legal, medical, or financial certainty claims.
- Treat all AI output as untrusted text before rendering.
- Escape rendered AI text.
- Store raw AI response only if it contains no secrets and is needed for debugging.

## Secrets

- API keys must be in environment variables.
- No `.env` files should be committed.
- No private keys in frontend code.
- Service role keys must only be used server-side.
- Public anon keys are allowed only when intended by provider.

## Database Security

- Validate wallet ownership on backend APIs and database queries.
- Server-only writes are preferred for proofs, AI reports, and certificates.
- Validate ownership on server before inserting proof or certificate records.
- Do not expose service role key to browser bundles.

## Abuse Limits

- Rate limit AI report generation per wallet/campaign.
- Limit proof retry attempts.
- Limit certificate generation retry attempts.
- Reject empty or extremely long text inputs.

## Automated Security Check

Run:

```bash
node scripts/verify-mvp.js
```

The script checks PRD completeness, risky committed secrets, and required security sections.

## Security Acceptance Criteria

- Build output must not contain server-only secret names with values.
- Unsupported chain transactions cannot be submitted.
- Non-owner proof submission is blocked.
- Unknown certificate hash shows invalid state.
- Upload validation blocks unsupported file types.
