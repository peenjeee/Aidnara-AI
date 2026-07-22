# Aidnara AI

<div align="center">
  <img src="https://raw.githubusercontent.com/RamsNotes31/Aidnara-AI/main/docs/logo/aidnara_ai_logo.png" alt="Aidnara AI logo" width="160" />
</div>

**Transparent Aid, Verified Impact**

Aidnara AI builds transparent donation tools powered by **BNB Smart Chain** and AI-assisted impact verification.

<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,go,solidjs,tailwind,postgres,solidity&theme=dark" alt="Aidnara AI tech stack icons" />
  <br />
  <br />
  <img src="https://img.shields.io/badge/BNB%20Smart%20Chain-F3BA2F?style=for-the-badge&logo=binance&logoColor=black" alt="BNB Smart Chain" />
  <img src="https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=ethereum&logoColor=111111" alt="Hardhat" />
  <img src="https://img.shields.io/badge/ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white" alt="ethers.js" />
  <img src="https://img.shields.io/badge/SolidJS-2C4F7C?style=for-the-badge&logo=solid&logoColor=white" alt="SolidJS" />
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
  <img src="https://img.shields.io/badge/BscScan-121D33?style=for-the-badge&logo=binance&logoColor=F3BA2F" alt="BscScan" />
</div>

## Meaning

**Aidnara AI** means **human-centered aid with AI-verified impact**.

- **Aid** represents help, donation, and social support.
- **Nara** gives the brand a people-first identity, focused on beneficiaries and real stories.
- **AI** represents automated proof analysis and impact report generation.

## Problem

Many donation campaigns collect funds through chats, forms, or social media, but donors often cannot clearly see how funds are used. Small organizers also struggle to create professional, structured, and verifiable impact reports.

Aidnara AI solves this by combining blockchain transparency, AI-assisted proof review, and verifiable impact certificates.

## Core Idea

Aidnara AI provides one public flow:

1. Organizer creates a donation campaign.
2. Donor donates using wallet on BNB Smart Chain Testnet.
3. Donation transaction is recorded on-chain.
4. Organizer uploads proof of fund usage.
5. AI analyzes proof and generates an impact report.
6. System generates donor and organizer certificates.
7. Anyone can verify certificates through QR/hash on-chain.

## Main Features

- Campaign creation
- Wallet connect
- Native `tBNB` donation
- On-chain donation record
- Proof upload
- AI impact report
- Trust score
- Public transparency dashboard
- Donor certificate
- Organizer certificate
- QR-based certificate verification
- Automated PRD, deployment, testing, and security checks

## Repository Structure

```text
fe/           Frontend app (SolidStart + Tailwind)
be/           Backend services (Go + Fiber + PostgreSQL)
api/          API contract and endpoint specifications
blockchain/   Smart contracts, deployment scripts, and contract tests
docs/prd/     Product requirements documents
scripts/      Local verification and security checks
```

## PRD Documents

- `docs/prd/00-name-options.md`: brand name, meaning, and tagline
- `docs/prd/01-overview.md`: product overview
- `docs/prd/02-scope.md`: MVP scope
- `docs/prd/03-users-and-flows.md`: roles and user journeys
- `docs/prd/04-features.md`: feature requirements
- `docs/prd/05-ai-impact-report.md`: AI report requirements
- `docs/prd/06-certificate.md`: certificate requirements
- `docs/prd/07-architecture.md`: architecture and repository boundaries
- `docs/prd/08-security.md`: security requirements
- `docs/prd/09-testing.md`: testing plan
- `docs/prd/10-deployment.md`: deployment plan

## Automated Check

Run:

```bash
npm run check:mvp
```

or:

```bash
node scripts/verify-mvp.js
```

The check validates:

- required PRD files
- required folder boundaries
- required security sections
- BNB Smart Chain references
- basic secret leakage patterns

## MVP Demo Flow

1. Open landing page.
2. Connect organizer wallet.
3. Create campaign: `Bantu Anak Desa Belajar Online`.
4. Connect donor wallet.
5. Donate with `tBNB`.
6. Show transaction on BscScan Testnet.
7. Upload proof image or receipt.
8. Generate AI impact report.
9. Generate certificates.
10. Verify certificate through QR/hash.

## Security Notes

- Never commit private keys or service role keys.
- Keep AI API keys server-side only.
- Validate wallet ownership before proof or certificate writes.
- Store only hashes and metadata references on-chain.
- Treat AI output as untrusted text before rendering.

## Status

Current repository status: PRD, backend baseline, blockchain contract, and Hardhat test suite prepared. Frontend scaffold and API runtime are next.
Built with Go and SolidStart.

© 2026 Aidnara AI. All rights reserved.
