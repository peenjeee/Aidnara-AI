# Blockchain

Smart contract workspace for Aidnara AI.

## Responsibility

- Campaign registry.
- Donation handling.
- Proof hash registry.
- Certificate hash registry.
- Withdrawal rules.

## Suggested Stack

- Solidity
- Hardhat
- ethers.js
- BNB Smart Chain Testnet
- BscScan Testnet

## Stack Logos

<div align="center">
  <img src="https://skillicons.dev/icons?i=solidity,ethereum&theme=dark" alt="Solidity and EVM icons" />
  <br />
  <br />
  <img src="https://img.shields.io/badge/BNB%20Smart%20Chain-F3BA2F?style=for-the-badge&logo=binance&logoColor=black" alt="BNB Smart Chain" />
  <img src="https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=ethereum&logoColor=111111" alt="Hardhat" />
  <img src="https://img.shields.io/badge/ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white" alt="ethers.js" />
  <img src="https://img.shields.io/badge/BscScan-121D33?style=for-the-badge&logo=binance&logoColor=F3BA2F" alt="BscScan" />
</div>

## Network

- Testnet chain ID: `97`
- Testnet token: `tBNB`
- Testnet explorer: `https://testnet.bscscan.com`
- Mainnet chain ID: `56`
- Mainnet token: `BNB`
- Mainnet explorer: `https://bscscan.com`

## MVP Contract Functions

- `createCampaign(string metadataURI, uint256 targetAmount)`
- `donate(uint256 campaignId)`
- `submitProof(uint256 campaignId, string proofURI, bytes32 proofHash)`
- `issueCertificate(uint256 campaignId, address recipient, string certificateType, string certificateURI, bytes32 certificateHash)`
- `verifyCertificate(bytes32 certificateHash)`
- `withdraw(uint256 campaignId, uint256 amount)`
