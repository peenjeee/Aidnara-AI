# Certificates API

## POST /api/certificates

Registers a new certificate record linking a campaign, a donation, and a proof.

### Request

```json
{
  "campaign_id": "uuid-string",
  "donation_id": "uuid-string",
  "proof_id": "uuid-string",
  "recipient_address": "0x0000000000000000000000000000000000000000",
  "certificate_type": "donor",
  "certificate_hash": "0xhash"
}
```

## POST /api/certificates/:id/issue

Updates the on-chain issuance transaction hash for an existing certificate.

### Request

```json
{
  "tx_hash": "0xhashofissuance"
}
```

## Rules

- Certificate records must match existing campaigns, donations, and proofs in the PostgreSQL database.
- Smart Contract verification ensures the actual issuance exists on-chain before the `tx_hash` is updated.
