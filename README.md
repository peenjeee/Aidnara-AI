# Aidnara AI

**Transparent Aid, Verified Impact**

Aidnara AI is a transparent donation platform on **BNB Smart Chain** that helps donors track fund usage, view AI-generated impact reports, and verify certificate of impact records on-chain.

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

## Blockchain

MVP chain:

- Network: **BNB Smart Chain Testnet**
- Chain ID: `97`
- Native token: `tBNB`
- Explorer: `https://testnet.bscscan.com`

Production target:

- Network: **BNB Smart Chain Mainnet**
- Chain ID: `56`
- Native token: `BNB`
- Explorer: `https://bscscan.com`

## AI Role

AI is used as an assistive reviewer, not as a legal auditor.

AI helps with:

- reading uploaded proof images or receipts
- summarizing fund usage
- checking consistency between claim and proof
- generating impact summaries
- assigning simple risk and trust score labels
- creating certificate impact wording

## Certificate System

Aidnara AI generates two certificate types:

- **Donor Certificate**: issued after a confirmed donation.
- **Organizer Certificate**: issued after proof upload and AI impact report generation.

Each certificate includes:

- campaign reference
- recipient wallet
- transaction or proof reference
- certificate hash
- QR verification link
- on-chain verification status

## Repository Structure

```text
fe/           Frontend app and UI implementation
be/           Backend services and server-only logic
api/          API contract and endpoint specifications
blockchain/   Smart contracts, deployment scripts, and contract tests
docs/prd/     Product requirements documents
scripts/      Local verification and security checks
```

## Suggested Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,nextjs,tailwind,nodejs,postgres,supabase,solidity,ethereum,vercel&theme=dark" alt="Aidnara AI tech stack icons" />
  <br />
  <br />
  <img src="https://img.shields.io/badge/BNB%20Smart%20Chain-F3BA2F?style=for-the-badge&logo=binance&logoColor=black" alt="BNB Smart Chain" />
  <img src="https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=ethereum&logoColor=111111" alt="Hardhat" />
  <img src="https://img.shields.io/badge/ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white" alt="ethers.js" />
  <img src="https://img.shields.io/badge/viem-111111?style=for-the-badge&logo=ethereum&logoColor=white" alt="viem" />
  <img src="https://img.shields.io/badge/wagmi-000000?style=for-the-badge&logo=walletconnect&logoColor=white" alt="wagmi" />
  <img src="https://img.shields.io/badge/RainbowKit-0E76FD?style=for-the-badge&logo=walletconnect&logoColor=white" alt="RainbowKit" />
  <img src="https://img.shields.io/badge/BscScan-121D33?style=for-the-badge&logo=binance&logoColor=F3BA2F" alt="BscScan" />
</div>

### Stack Breakdown

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- wagmi
- RainbowKit
- viem

Backend:

- Next.js route handlers or Node.js service
- Supabase Postgres
- Supabase Storage
- Gemini Vision or OpenAI Vision

Blockchain:

- Solidity
- Hardhat
- ethers.js
- BNB Smart Chain Testnet
- BscScan Testnet

Web3 frontend:

- wagmi
- viem
- RainbowKit
- WalletConnect-compatible wallet flow

Deployment:

- Vercel
- Supabase
- BscScan Testnet

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
