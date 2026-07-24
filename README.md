# Aidnara AI

<div align="center">
  <img src="https://raw.githubusercontent.com/RamsNotes31/Aidnara-AI/main/docs/logo/aidnara_ai_logo.png" alt="Aidnara AI logo" width="160" />
</div>

**Transparent Aid, Verified Impact**

Aidnara AI is a transparent donation platform with blockchain-backed campaign tracking, AI-assisted proof review, and verifiable impact certificates.

## Stack

- Backend: Go + Fiber + PostgreSQL + sqlc
- Frontend: SolidStart + SolidJS + Tailwind CSS
- Blockchain: BNB Smart Chain Testnet
- Smart contracts: Solidity + Hardhat
- Explorer: BscScan Testnet

## Repo Layout

- `fe/` - frontend app
- `be/` - Go backend API
- `api/` - endpoint contracts and docs
- `blockchain/` - smart contracts and deploy scripts
- `docs/prd/` - product requirements
- `scripts/` - local verification checks

## What It Does

1. Organizer creates a campaign.
2. Donor sends funds on-chain.
3. Organizer uploads proof.
4. AI reviews the proof and generates a report.
5. Certificates can be issued and verified by hash.

## Local Checks

- `node scripts/verify-mvp.js`

## Notes

- Keep private keys and service role keys out of git.
- Treat AI output as untrusted until validated.
- The old local TypeScript/Next branch was backed up before the stack switch.
