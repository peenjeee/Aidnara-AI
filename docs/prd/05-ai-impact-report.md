# PRD 05 - AI Impact Report

## Purpose

AI helps read proof evidence, summarize usage, identify simple inconsistencies, and generate donor-friendly impact wording. AI is a support tool, not a legal auditor.

## AI Provider

Preferred for MVP:

- Gemini Vision API for image/receipt analysis.
- OpenAI Vision is acceptable if already available.

Use one provider only for MVP. Do not add provider abstraction until needed.

## Inputs

- Campaign title.
- Campaign category.
- Campaign long description.
- Expected impact.
- Proof title.
- Proof description.
- Amount used.
- Impact claim.
- Proof file URL or uploaded file bytes.

## Required Output Schema

```json
{
  "summary": "string",
  "detectedItems": ["string"],
  "consistency": "string",
  "risk": "Low | Medium | High",
  "estimatedImpact": "string",
  "trustScore": 87,
  "certificateImpactText": "string",
  "warnings": ["string"]
}
```

## Field Rules

- `summary`: 1-3 sentences.
- `detectedItems`: max 10 items.
- `consistency`: explain whether proof matches campaign claim.
- `risk`: exactly `Low`, `Medium`, or `High`.
- `estimatedImpact`: must not exaggerate beyond given claim.
- `trustScore`: integer 0-100.
- `certificateImpactText`: short sentence suitable for certificate.
- `warnings`: empty array when no warning exists.

## Prompt Guardrails

- Return JSON only.
- Do not say proof is legally verified.
- Do not say funds are guaranteed honest.
- Mention low confidence when receipt is blurry or incomplete.
- If file does not look relevant, set risk to `High`.
- If amount used is missing from proof, mention it in warnings.

## Risk Scoring Guide

- `Low`: evidence is readable and aligns with claim.
- `Medium`: evidence partially aligns but has missing or unclear details.
- `High`: evidence is unrelated, unreadable, contradictory, or suspicious.

## Trust Score Guide

- 80-100: strong consistency.
- 60-79: mostly consistent but incomplete.
- 40-59: weak evidence or multiple missing details.
- 0-39: unrelated, unreadable, or contradictory proof.

## Example Output

```json
{
  "summary": "Bukti menunjukkan pembelian perangkat belajar berupa laptop dan router.",
  "detectedItems": ["laptop", "router", "receipt"],
  "consistency": "Bukti cukup konsisten dengan klaim penggunaan dana untuk akses belajar online.",
  "risk": "Low",
  "estimatedImpact": "Sekitar 15 siswa dapat terbantu akses belajar online sesuai klaim campaign.",
  "trustScore": 87,
  "certificateImpactText": "Kontribusi ini mendukung akses belajar online untuk sekitar 15 siswa.",
  "warnings": []
}
```

## Failure Handling

- If AI API fails, mark report status as `failed` and allow retry.
- If JSON parse fails, keep raw response server-side only if safe and allow retry.
- If file is too large, ask user to compress or upload a smaller proof.

## UI Copy Requirement

Show disclaimer near report:

`AI analysis is an assistive review based on uploaded proof. Final accountability remains with the campaign organizer.`

---
*Updated for Go/SolidStart architecture.*
