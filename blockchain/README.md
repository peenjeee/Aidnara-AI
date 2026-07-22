# Aidnara AI - Blockchain

Smart contract workspace for the Aidnara AI platform, built on BNB Smart Chain.

## Responsibility

- Campaign registry (creation and metadata tracking).
- Donation handling (native tBNB transfers).
- Proof hash registry (verifiable IPFS/storage links).
- Certificate hash registry (for donor and organizer certificates).
- Withdrawal rules (secure fund routing to campaigns).

## Tech Stack

- Solidity
- Hardhat
- ethers.js
- BNB Smart Chain Testnet
- BscScan Testnet

## Network Config

Testnet:
- Chain ID: 97
- Token: tBNB
- Explorer: https://testnet.bscscan.com

Mainnet:
- Chain ID: 56
- Token: BNB
- Explorer: https://bscscan.com

## MVP Contract Functions

- createCampaign(string metadataURI, uint256 targetAmount)
- donate(uint256 campaignId)
- submitProof(uint256 campaignId, string proofURI, bytes32 proofHash)
- issueCertificate(uint256 campaignId, address recipient, string certificateType, string certificateURI, bytes32 certificateHash)
- verifyCertificate(bytes32 certificateHash)
- withdraw(uint256 campaignId, uint256 amount)

## Commands

Compile the smart contracts:
npm run compile

Run the tests:
npm run test

Deploy to Testnet:
npm run deploy:testnet
