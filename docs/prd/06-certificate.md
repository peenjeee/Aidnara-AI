# PRD 06 - Impact Certificate

## Purpose

Certificate gives donors and organizers a shareable proof of contribution and transparency. The certificate file is stored off-chain, while its hash is registered on-chain.

## Certificate Types

### Donor Certificate

Issued after a donation transaction is confirmed.

Required content:

- Certificate title: `Certificate of Impact`.
- Recipient wallet address.
- Optional recipient display name.
- Campaign title.
- Donation amount.
- Donation transaction hash.
- Campaign id.
- AI-generated impact text if available.
- Issued date.
- Certificate hash.
- QR verification link.

### Organizer Certificate

Issued after at least one proof has a valid AI impact report.

Required content:

- Certificate title: `Transparency Certificate`.
- Organizer wallet address.
- Campaign title.
- Total donated.
- Total proof amount.
- Latest trust score.
- Proof hash reference.
- AI impact summary.
- Issued date.
- Certificate hash.
- QR verification link.

## Certificate Lifecycle

States:

- `pending`: source transaction/proof confirmed, certificate not generated.
- `generated`: file generated and hash computed.
- `registered`: hash registered on-chain.
- `failed`: generation or on-chain registration failed.
- `revoked`: optional future state, not required for MVP UI.

## Verification Rules

- Verification by `certificateHash` is the source of truth.
- Page shows `VALID ON-CHAIN` only when smart contract has matching certificate record.
- Page shows `NOT FOUND` when hash does not exist.
- Page shows `REVOKED` only if future revocation is implemented.

## Verification Page Data

- status
- certificate type
- campaign id
- campaign title
- recipient wallet
- certificate URI
- certificate hash
- issued timestamp
- issue transaction hash if stored off-chain
- explorer link

## QR Format

Use this URL shape:

```text
/verify/certificate/[hash]
```

## File Generation

MVP options:

- HTML certificate rendered in app and printable.
- PDF generated server-side.
- PNG generated from HTML screenshot if needed.

Pick the simplest implementation that works for demo.

## Deferred

- NFT certificate.
- Batch certificate generation.
- Certificate revocation UI.
- Custom certificate template editor.

---
*Updated for Go/SolidStart architecture.*
