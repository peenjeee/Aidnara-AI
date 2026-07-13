# PRD 07 - Architecture

## Recommended Stack

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Web3 frontend:

- wagmi
- RainbowKit
- viem
- WalletConnect-compatible wallet flow

Backend:

- Next.js API routes or route handlers
- Supabase Postgres
- Supabase Storage for MVP
- Gemini Vision or OpenAI Vision

Blockchain:

- Solidity
- Hardhat
- ethers.js
- BNB Smart Chain Testnet
- BscScan Testnet

Web3 and blockchain logo sources:

- `skillicons.dev`: Solidity and Ethereum-style EVM icon.
- `img.shields.io`: BNB Smart Chain, Hardhat, ethers.js, viem, wagmi, RainbowKit, and BscScan badges.
- README badges should follow the style used in `RamsNotes31/RamsNotes31`.

Deployment:

- Vercel
- Supabase
- Block explorer for testnet verification

## System Components

- Web app: pages, wallet connect, dashboard, certificate UI.
- API routes: AI report generation, certificate generation, upload metadata normalization.
- Database: campaign, donations, proofs, AI reports, certificates.
- Storage: cover images, proof files, certificate files.
- Smart contract: campaign registry, donations, proof hashes, certificate hashes.

## Repository Structure

```text
fe/          Frontend app and UI implementation.
be/          Backend service code, database access, storage orchestration, server-only logic.
api/         API contracts, endpoint specs, request/response schemas.
blockchain/  Solidity contracts, deployment scripts, and contract tests.
docs/prd/    Product requirements and implementation constraints.
scripts/     Local verification and security checks.
```

## Boundary Rules

- `fe/` must not contain service role keys, AI keys, private keys, or direct admin database access.
- `be/` owns server-side validation, secret usage, storage orchestration, and persistence.
- `api/` documents the contract between frontend and backend; runtime code can still live in `be/` or framework route handlers.
- `blockchain/` owns contract source, ABI output, deployment records, and contract tests.
- Shared constants should be duplicated only when tiny; add shared package later if duplication becomes painful.

## Data Storage Strategy

On-chain:

- campaign owner
- metadata URI
- target amount
- total donated
- proof URI/hash
- certificate URI/hash
- timestamps

Off-chain:

- long campaign content
- images and PDFs
- AI reports
- generated certificate files
- cached transaction/event data

## Smart Contract MVP

```solidity
createCampaign(string metadataURI, uint256 targetAmount)
donate(uint256 campaignId)
submitProof(uint256 campaignId, string proofURI, bytes32 proofHash)
issueCertificate(uint256 campaignId, address recipient, string certificateType, string certificateURI, bytes32 certificateHash)
verifyCertificate(bytes32 certificateHash)
withdraw(uint256 campaignId, uint256 amount)
```

## Smart Contract Events

```solidity
CampaignCreated(uint256 indexed campaignId, address indexed owner, string metadataURI, uint256 targetAmount)
DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount)
ProofSubmitted(uint256 indexed campaignId, bytes32 indexed proofHash, string proofURI)
CertificateIssued(uint256 indexed campaignId, address indexed recipient, bytes32 indexed certificateHash, string certificateType)
FundsWithdrawn(uint256 indexed campaignId, address indexed owner, uint256 amount)
```

## Database Tables

### `campaigns`

- `id`
- `chain_campaign_id`
- `owner_address`
- `title`
- `short_description`
- `long_description`
- `category`
- `target_amount`
- `cover_image_url`
- `beneficiary_name`
- `location`
- `expected_impact`
- `metadata_uri`
- `create_tx_hash`
- `latest_trust_score`
- `created_at`
- `updated_at`

### `donations`

- `id`
- `campaign_id`
- `donor_address`
- `amount`
- `tx_hash`
- `certificate_id`
- `created_at`

### `proofs`

- `id`
- `campaign_id`
- `title`
- `description`
- `amount_used`
- `impact_claim`
- `file_url`
- `file_hash`
- `proof_uri`
- `submit_tx_hash`
- `ai_status`
- `ai_summary`
- `ai_detected_items`
- `ai_consistency`
- `ai_risk`
- `ai_estimated_impact`
- `ai_trust_score`
- `ai_certificate_impact_text`
- `created_at`

### `certificates`

- `id`
- `campaign_id`
- `donation_id`
- `proof_id`
- `recipient_address`
- `certificate_type`
- `certificate_uri`
- `certificate_hash`
- `issue_tx_hash`
- `status`
- `issued_at`

## API Routes

- `POST /api/ai/impact-report`
- `POST /api/certificates/generate`
- `GET /api/certificates/[hash]`
- `POST /api/storage/signed-upload` if direct upload is needed.

API route contracts must be documented under `api/` before implementation.

## Chain Choice

Recommended default: BNB Smart Chain Testnet.

Reason:

- EVM-compatible, so Solidity, wagmi, viem, Hardhat, and Thirdweb remain usable.
- Low-cost transactions for demo and MVP testing.
- BscScan testnet explorer supports public verification links.
- Strong brand recognition for blockchain competition context.

Network defaults:

- Chain name: `BNB Smart Chain Testnet`
- Chain ID: `97`
- Native token: `tBNB`
- Explorer: `https://testnet.bscscan.com`

Production target after MVP:

- Chain name: `BNB Smart Chain Mainnet`
- Chain ID: `56`
- Native token: `BNB`
- Explorer: `https://bscscan.com`
