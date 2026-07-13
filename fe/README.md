# FE

Frontend app for Aidnara AI.

## Responsibility

- Landing page.
- Campaign list and detail pages.
- Wallet connection UI.
- Donation UI.
- Proof upload UI.
- AI impact report display.
- Certificate display and verification pages.

## Suggested Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- wagmi
- RainbowKit
- viem

Wallet dependencies are documented here but intentionally not installed until wallet UI starts.

## Pages

- `/`
- `/campaigns`
- `/campaigns/create`
- `/campaigns/[id]`
- `/campaigns/[id]/proofs/create`
- `/certificates/[id]`
- `/verify/certificate/[hash]`

## API Routes

- `/api/campaigns`
- `/api/campaigns/[id]`
- `/api/campaigns/[id]/donations`
- `/api/campaigns/[id]/proofs`
- `/api/donations`
- `/api/proofs`
- `/api/ai/impact-report`
- `/api/certificates/generate`
- `/api/certificates/[hash]`
- `/api/storage/signed-upload`

## Check

```bash
npm run check
npm run typecheck
```
