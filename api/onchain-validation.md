# On-Chain Validation

The Go backend validates BNB Smart Chain Testnet donation events in `be/services/onchain.go`.

## DonationEventExpectation

```json
{
  "tx_hash": "0xdonationtx",
  "campaign_id": "1",
  "donor_address": "0x0000000000000000000000000000000000000002",
  "amount": "10000000000000000"
}
```

## Rules

- Receipt must exist.
- Receipt status must be successful.
- Event contract address must match configured Aidnara contract.
- Event fields must match expected campaign, donor, and amount.
