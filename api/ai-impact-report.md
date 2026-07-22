# POST /api/proofs

Creates a new proof for a campaign and triggers an asynchronous AI-assisted impact report evaluation using Google Gemini.

## Request

```json
{
  "campaign_id": "uuid-string",
  "title": "Pembelian perangkat belajar",
  "description": "Nota dan foto perangkat",
  "amount_used": "0.03",
  "impact_claim": "Dana digunakan untuk membeli 3 laptop dan 1 router.",
  "file_url": "/uploads/proofs/123-receipt.png",
  "file_hash": "0xhashofimage"
}
```

## Background Processing (AI Evaluation)

After creation, the backend triggers a goroutine to evaluate the proof using Gemini 1.5 Flash. It assesses the text claim and updates the database record with:
- `ai_summary`
- `ai_consistency`
- `ai_risk`
- `ai_estimated_impact`
- `ai_trust_score`

## Rules

- Returns a `201 Created` with the initial database record immediately.
- AI evaluation happens in the background to prevent blocking the user interface.
- Errors during AI generation log to the server but do not fail the initial creation request.
