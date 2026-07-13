# Supabase Storage Plan

## Buckets

- `campaign-covers`: public read, server-only write.
- `proofs`: public read for MVP, server-only write.
- `certificates`: public read, server-only write.

## File Limits

- Campaign cover: image only, max 3 MB.
- Proof: `image/png`, `image/jpeg`, `image/webp`, `application/pdf`, max 5 MB.
- Certificate: image/PDF/HTML artifact, max 5 MB.

## Path Convention

```text
campaign-cover/{timestamp}-{safe-file-name}
proof/{timestamp}-{safe-file-name}
certificate/{timestamp}-{safe-file-name}
```

## Security Rules

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to frontend.
- Generate upload paths server-side.
- Validate file type and size before upload.
- Store uploaded SVG only as download, never render it as trusted HTML.
- Proof and certificate hashes are computed before metadata is persisted.

## Future Upgrade

Move proofs to signed read URLs if campaigns need private evidence review.
