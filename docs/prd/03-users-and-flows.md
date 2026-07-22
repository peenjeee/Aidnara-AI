# PRD 03 - Users And Flows

## Roles

### Campaign Owner

Creates campaign, receives donation, uploads proof, reviews AI report, and receives organizer certificate.

Permissions:

- Create campaign.
- Edit off-chain campaign metadata before first donation if MVP supports edit.
- Submit proof for own campaign.
- Generate organizer certificate.
- Withdraw funds if withdrawal is enabled.

### Donor

Donates to a campaign and receives donor certificate.

Permissions:

- Connect wallet.
- Donate.
- View donation history.
- Open and download donor certificate.

### Public Verifier

Views campaign transparency and verifies certificates.

Permissions:

- View public campaign.
- View proof timeline.
- View AI report summary.
- Verify certificate by hash or QR.

## Primary User Journey

1. Owner opens landing page.
2. Owner clicks `Mulai Campaign`.
3. Owner connects wallet.
4. Owner fills campaign form and submits.
5. Smart contract emits `CampaignCreated`.
6. Campaign detail page opens.
7. Donor opens campaign detail.
8. Donor connects wallet and donates.
9. Smart contract emits `DonationReceived`.
10. System generates donor certificate.
11. Owner uploads proof image/receipt and claim.
12. Smart contract emits `ProofSubmitted`.
13. AI generates impact report.
14. System generates organizer certificate.
15. Public verifier opens certificate QR.
16. Verification page checks hash and shows status.

## Required Pages

- `/`
- `/campaigns`
- `/campaigns/create`
- `/campaigns/[id]`
- `/campaigns/[id]/proofs/create`
- `/certificates/[id]`
- `/verify/certificate/[hash]`

## Page Requirements

### Landing Page

- Hero title and tagline.
- Explain 3-step flow: donate, prove, verify.
- CTA to create and explore campaigns.
- Short explanation of blockchain and AI roles.

### Campaign List

- Search by title.
- Filter by category.
- Cards with target, total donated, progress, and trust score.
- Empty state when no campaigns exist.

### Create Campaign

- Form validation for title, description, target, and cover image.
- Wallet and chain validation before submit.
- Transaction pending and success states.

### Campaign Detail

- Campaign story.
- Donate form.
- Donation progress.
- Donation timeline.
- Proof timeline.
- AI report card.
- Certificate section.
- Explorer links.

### Proof Create

- Owner-only access.
- Upload image/PDF.
- Claim input.
- Amount used input.
- AI report generation status.

### Certificate Detail

- Certificate visual.
- Recipient wallet.
- Campaign title.
- Transaction hash.
- Verification QR.
- Download button.

### Certificate Verification

- Status badge.
- Hash.
- Recipient.
- Campaign.
- Issued date.
- Explorer link.
- Clear invalid state.

## Error States

- Wallet disconnected.
- Wrong network.
- Transaction rejected.
- Transaction pending too long.
- Storage upload failed.
- AI generation failed.
- Certificate hash not found.
- Contract read failed.

---
*Updated for Go/SolidStart architecture.*
