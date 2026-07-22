# PRD 04 - Feature Requirements

## Feature 1 - Campaign Creation

### Input Fields

- `title`: required, 5-80 characters.
- `shortDescription`: required, 20-160 characters.
- `longDescription`: required, 100-2000 characters.
- `category`: required, enum `education`, `health`, `disaster`, `community`, `environment`.
- `targetAmount`: required, positive decimal in native token.
- `coverImage`: required, image only.
- `beneficiaryName`: required.
- `location`: required.
- `expectedImpact`: required, 30-500 characters.

### Behavior

- Upload cover image to storage.
- Create metadata JSON and store off-chain.
- Call `createCampaign(metadataURI, targetAmount)`.
- Save returned campaign id and transaction hash in database.
- Redirect to campaign detail page.

### Acceptance Criteria

- Invalid target amount cannot be submitted.
- User cannot submit while wallet disconnected.
- User cannot submit on unsupported chain.
- Failed transaction does not create a fake successful campaign.

## Feature 2 - Donation

### Input Fields

- `amount`: required, positive decimal.

### Behavior

- Call `donate(campaignId)` with `msg.value`.
- Wait for confirmation.
- Store donation event in database cache.
- Generate donor certificate after confirmation.

### Acceptance Criteria

- Donation button shows pending state.
- Duplicate click during pending is blocked.
- Donation history shows donor wallet, amount, and tx hash.
- Donor certificate references the donation tx hash.

## Feature 3 - Proof Upload

### Input Fields

- `title`: required.
- `description`: required.
- `amountUsed`: required, positive decimal.
- `file`: required, image/PDF.
- `impactClaim`: required.

### Behavior

- Validate owner wallet.
- Upload file to storage.
- Compute SHA-256 file hash.
- Call `submitProof(campaignId, proofURI, proofHash)`.
- Generate AI impact report.
- Store proof and AI report in database.

### Acceptance Criteria

- Non-owner cannot upload proof.
- File hash is stored both off-chain and on-chain.
- AI failure does not delete uploaded proof.
- Proof timeline shows proof status.

## Feature 4 - AI Impact Report

### Behavior

- Send proof file, campaign context, amount used, and impact claim to AI endpoint.
- Parse strict JSON response.
- Save normalized fields to database.
- Update campaign latest trust score.

### Acceptance Criteria

- Malformed AI JSON is rejected and retryable.
- Trust score must be integer 0-100.
- Risk must be one of `Low`, `Medium`, `High`.
- UI must label AI report as assistant analysis, not final audit.

## Feature 5 - Certificate Generation

### Donor Certificate Trigger

After donation transaction confirmation.

### Organizer Certificate Trigger

After at least one proof has an AI report.

### Behavior

- Generate certificate HTML/PDF/image.
- Compute certificate hash.
- Store certificate file off-chain.
- Call `issueCertificate` with certificate URI and hash.
- Create QR link to verification page.

### Acceptance Criteria

- Certificate hash is deterministic for final certificate content.
- Verification page can find certificate by hash.
- Invalid hash does not show valid certificate data.

## Feature 6 - Transparency Dashboard

### Must Display

- Campaign target.
- Total donated.
- Total proof amount.
- Remaining balance estimate.
- Donation timeline.
- Proof timeline.
- Latest AI trust score.
- Certificate links.
- Blockchain explorer links.

### Acceptance Criteria

- Dashboard works for public users without wallet connection.
- Dashboard does not expose secret environment values.
- Data labels distinguish on-chain data and AI-generated analysis.

---
*Updated for Go/SolidStart architecture.*
