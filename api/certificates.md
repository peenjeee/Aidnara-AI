# Certificates API

## POST /api/certificates/generate

Generates certificate payload, hash, and verification path.

### Request

```json
{
  "type": "donor",
  "campaignId": "campaign-uuid",
  "campaignTitle": "Bantu Anak Desa Belajar Online",
  "recipientAddress": "0x0000000000000000000000000000000000000000",
  "amount": "0.01",
  "referenceTxHash": "0xtransactionhash",
  "impactText": "Kontribusi ini mendukung akses belajar online untuk sekitar 15 siswa."
}
```

### Response

```json
{
  "payload": {
    "type": "donor",
    "campaignId": "campaign-uuid",
    "campaignTitle": "Bantu Anak Desa Belajar Online",
    "recipientAddress": "0x0000000000000000000000000000000000000000",
    "amount": "0.01",
    "referenceTxHash": "0xtransactionhash",
    "impactText": "Kontribusi ini mendukung akses belajar online untuk sekitar 15 siswa.",
    "issuedAt": "2026-07-13T00:00:00.000Z"
  },
  "certificateHash": "0xhash",
  "verificationPath": "/verify/certificate/0xhash"
}
```

## GET /api/certificates/[hash]

Looks up certificate verification status by hash.

### Response

```json
{
  "status": "VALID",
  "certificateHash": "0xhash",
  "certificateType": "donor",
  "recipientAddress": "0x0000000000000000000000000000000000000000",
  "campaignTitle": "Bantu Anak Desa Belajar Online",
  "issuedAt": "2026-07-13T00:00:00.000Z"
}
```

## Rules

- Unknown hash returns `NOT_FOUND`.
- Certificate hash must be generated from final stable certificate payload.
- Contract registration happens after payload/hash generation.
