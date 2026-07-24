# Storage (Local VPS)

Upload storage is now managed directly by the Go backend via local disk, eliminating the need for Supabase Storage.

## Initialization

Upon server startup (`main.go`), `services.InitStorage()` automatically creates the required local directories inside `be/uploads/`:
- `uploads/campaign-covers`
- `uploads/proofs`
- `uploads/certificates`

## File Serving

Files are served statically using Fiber:
```go
app.Static("/uploads", "./uploads")
```
Access a file directly via HTTP: `http://localhost:3000/uploads/proofs/123-receipt.png`

## Upload Route

Clients upload files using `multipart/form-data`.

```http
POST /api/uploads
```

Fields:

- `kind`: `campaign-cover`, `proof`, or `certificate`
- `file`: uploaded file

Validation:

- Maximum size: 5 MiB
- `campaign-cover`: `.jpg`, `.jpeg`, `.png`, `.webp`
- `proof`: `.jpg`, `.jpeg`, `.png`, `.webp`, `.pdf`
- `certificate`: `.jpg`, `.jpeg`, `.png`, `.pdf`

Response:

```json
{
  "path": "/uploads/proofs/generated-name.png"
}
```
