# POST /api/ai/impact-report

Generates an AI-assisted impact report from campaign context and proof evidence.

## Request

```json
{
  "campaignTitle": "Bantu Anak Desa Belajar Online",
  "campaignCategory": "education",
  "campaignDescription": "Campaign description",
  "expectedImpact": "Membantu 15 siswa mendapatkan akses belajar online.",
  "proofTitle": "Pembelian perangkat belajar",
  "proofDescription": "Nota dan foto perangkat",
  "amountUsed": "0.03",
  "impactClaim": "Dana digunakan untuk membeli 3 laptop dan 1 router.",
  "proofFileUrl": "https://storage.example/proof.png"
}
```

## Response

```json
{
  "summary": "Bukti menunjukkan pembelian perangkat belajar berupa laptop dan router.",
  "detectedItems": ["laptop", "router", "receipt"],
  "consistency": "Bukti cukup konsisten dengan klaim penggunaan dana.",
  "risk": "Low",
  "estimatedImpact": "Sekitar 15 siswa dapat terbantu akses belajar online.",
  "trustScore": 87,
  "certificateImpactText": "Kontribusi ini mendukung akses belajar online untuk sekitar 15 siswa.",
  "warnings": []
}
```

## Rules

- Return structured JSON only.
- Risk must be `Low`, `Medium`, or `High`.
- Trust score must be integer `0-100`.
- AI output is assistive analysis, not legal audit.
