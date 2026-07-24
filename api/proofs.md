# Proofs API

## POST /api/proofs

Creates proof metadata and triggers asynchronous Gemini evaluation.

### Request

```json
{
  "campaign_id": "campaign-uuid",
  "title": "Pembelian perangkat belajar",
  "description": "Nota dan foto perangkat.",
  "amount_used": "0.03",
  "impact_claim": "Dana digunakan untuk membeli router.",
  "file_url": "https://example.com/proof.png",
  "file_hash": "0xproofhash"
}
```

## Response

Returns created proof row with `ai_status` initially pending or incomplete depending on database defaults.

## GET /api/campaigns/:id/proofs

Returns proof timeline for one campaign.

## Errors

- Invalid campaign UUID returns `400`.
- Query failure returns `500`.
