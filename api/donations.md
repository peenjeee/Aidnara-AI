# Donations API

## POST /api/donations

Stores a confirmed donation transaction.

### Request

```json
{
  "campaign_id": "campaign-uuid",
  "tx_hash": "0xdonationtx",
  "amount": "10000000000000000",
  "donor_address": "0x0000000000000000000000000000000000000002"
}
```

## Rules

- `amount` is a string to avoid precision loss.
- Campaign must exist.
- On-chain validation is attempted before saving.
