# Deployment Notes

## Target Network

- Network: BNB Smart Chain Testnet
- Chain ID: 97
- Token: tBNB
- Explorer: https://testnet.bscscan.com

Temporary fallback network:

- Network: Polygon Amoy
- Chain ID: 80002
- Token: POL
- Explorer: https://amoy.polygonscan.com

## Contract

- contracts/AidnaraAidRegistry.sol

## Required Environment Variables

```text
BNB_TESTNET_RPC_URL=
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology
DEPLOYER_PRIVATE_KEY=
BSCSCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

## Deployment Output To Save

- contract address
- ABI
- deploy transaction hash
- BscScan testnet URL

## Frontend/Backend Env Updates

For BNB Testnet:
```text
VITE_CHAIN_ID=97
VITE_CONTRACT_ADDRESS=<deployed-contract-address>
```

For Polygon Amoy fallback:

```text
VITE_CHAIN_ID=80002
VITE_CONTRACT_ADDRESS=<deployed-contract-address>
```
