# PRD 09 - Testing Plan

## Test Strategy

Keep testing focused on the demo-critical path. MVP is considered ready when automated checks pass and the full manual demo flow succeeds on the deployed preview URL.

## Automated Checks

Minimum command:

```bash
node scripts/verify-mvp.js
```

The check must fail when:

- PRD files are missing.
- Required sections are missing.
- Forbidden secret patterns are found.
- Deployment or security plan is missing.
- Certificate and AI requirements are incomplete.

## Manual Demo Tests

1. Create campaign from wallet A.
2. Confirm campaign creation tx appears in explorer.
3. Open campaign detail as public visitor.
4. Donate from wallet B.
5. Confirm donation tx appears in explorer.
6. Confirm dashboard total donated updates.
7. Confirm donor certificate is generated.
8. Open donor certificate verification QR.
9. Confirm verification page shows `VALID ON-CHAIN`.
10. Upload proof from wallet A.
11. Confirm wallet B cannot upload proof.
12. Generate AI report.
13. Confirm trust score and summary appear in dashboard.
14. Generate organizer certificate.
15. Open organizer certificate verification QR.
16. Confirm fake certificate hash shows `NOT FOUND`.

## Smart Contract Tests

Required when contract implementation exists:

- Create campaign stores owner and target.
- Donate increases total and emits event.
- Non-owner cannot submit proof.
- Owner can submit proof and emits event.
- Certificate hash can be issued once.
- `verifyCertificate` returns expected data.
- Owner can withdraw allowed amount.
- Non-owner cannot withdraw.

These tests belong under `blockchain/`.

## API Tests

Required when API implementation exists:

- AI endpoint rejects missing fields.
- AI endpoint validates JSON schema.
- Certificate generation rejects unknown campaign.
- Certificate generation rejects unsupported certificate type.
- Certificate lookup returns invalid for unknown hash.

These tests belong under `be/` or the chosen runtime test folder. API request/response examples belong under `api/`.

## UI Tests

Recommended if time allows:

- Landing page renders CTA.
- Campaign form validates required fields.
- Donate button requires wallet.
- Wrong chain disables transaction.
- Verification page shows valid and invalid states.

These tests belong under `fe/`.

## Folder Structure Test

The automated check must validate these folders exist:

- `fe/`
- `be/`
- `api/`
- `blockchain/`

## Regression Checklist Before Demo

- `node scripts/verify-mvp.js` passes.
- Wallet has testnet funds.
- Contract address is correct.
- AI API key works.
- Storage upload works.
- Certificate QR opens on mobile.
- VPS production URL can complete full flow.

---
*Updated for Go/SolidStart architecture.*
