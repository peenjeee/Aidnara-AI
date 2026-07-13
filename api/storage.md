# POST /api/storage/signed-upload

Prepares a validated upload path for cover images, proofs, or certificates.

## Request

```json
{
  "kind": "proof",
  "fileName": "receipt.png",
  "contentType": "image/png",
  "size": 102400
}
```

## Response

```json
{
  "path": "proof/1720000000000-receipt.png",
  "uploadUrl": "https://storage.example/signed-url",
  "publicUrl": "https://storage.example/proof/1720000000000-receipt.png"
}
```

## Rules

- Proof upload types: `image/png`, `image/jpeg`, `image/webp`, `application/pdf`.
- Max proof file size: 5 MB.
- Service role keys must stay server-side.
