# PRD 10 - Deployment

## Deployment Goal

Deploy a stable public demo where judges can open the app, inspect campaign transparency, and verify certificates without local setup.

## Environments

- Local development: developer testing.
- Vercel preview: full demo rehearsal.
- Vercel production: final competition URL.

## Required Services

- VPS (Ubuntu/Linux) for Go Backend and PostgreSQL Database.
- Vercel or similar for SolidStart Frontend hosting.
- BNB Smart Chain Testnet for smart contract.
- Gemini API for AI vision analysis.
- Block explorer for public transaction links.

## Deployment Units

- `fe/`: deployed to Vercel (or static hosting) as the public web app.
- `be/`: deployed to a VPS as a long-running Go application.
- `api/`: documentation/spec source, not deployed as runtime by default.
- `blockchain/`: deployed to selected testnet before frontend production demo.

## Required Environment Variables

Backend (`be/.env`):
```text
PORT=3000
DATABASE_URL=
GEMINI_API_KEY=
RPC_URL=
CONTRACT_ADDRESS=
```

Frontend (`fe/.env`):
```text
VITE_API_URL=
VITE_CHAIN_ID=
VITE_CONTRACT_ADDRESS=
```

## Deployment Steps

1. Deploy `blockchain/` smart contract to BNB Smart Chain Testnet.
2. Verify contract address and explorer URL.
3. Prepare the VPS: install PostgreSQL, setup database schema (`db/schema.sql`).
4. Build the Go Backend: `go build` and run as a service (e.g. via `systemd`).
5. Configure environment variables for the Go Backend.
6. Deploy `fe/` app to Vercel or VPS.
7. Configure `VITE_API_URL` environment variables in Frontend hosting to point to the VPS Backend.
8. Run full manual demo flow on production URL.
9. Run smoke test on production URL.

## Production Smoke Test

- Landing page loads.
- Campaign list loads.
- Campaign detail loads.
- Wallet connect opens.
- Verification page works for known certificate hash.
- Invalid certificate hash shows `NOT FOUND`.
- No secret values are visible in client source or logs.

## Pre-Demo Checklist

- Testnet wallet has enough faucet funds.
- Contract address points to BNB Smart Chain Testnet.
- AI API key works.
- Storage upload works.
- Explorer links open correctly.
- Certificate QR opens verification page.
- Demo campaign data is prepared.
- Backup screenshots are prepared in case testnet RPC is slow.
- No secrets are committed.

## Rollback Plan

- Keep previous Vercel deployment available.
- Keep demo campaign id and certificate hash documented.
- If AI provider fails, show last generated AI report from database.
- If RPC is slow, show explorer transaction links and cached dashboard data.

## Post-Demo Improvements

- Add NFT certificate.
- Add stablecoin donations.
- Add organizer profile and reputation.
- Add stricter proof review workflow.
- Add batch certificates.
