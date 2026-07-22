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

## Upload Routes (Planned)

Clients can upload files using standard `multipart/form-data` requests to the respective endpoints (to be integrated directly into `/api/proofs` or a dedicated `/api/upload` endpoint) where the Go server handles parsing, verifying file types/sizes, and writing to the disk securely.
