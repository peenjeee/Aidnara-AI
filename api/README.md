# API

API contract and endpoint specifications for the new Aidnara AI Go Backend.

## Responsibility

- Define request and response shapes.
- Document route behavior for Campaigns, Donations, Proofs, and Certificates.
- Outline integration points for Web3, AI, and Storage.

## Go Backend Endpoints

### Campaigns
- `GET /api/campaigns`
- `POST /api/campaigns`
- `GET /api/campaigns/:id`
- `GET /api/campaigns/:id/donations`

### Donations
- `POST /api/donations`

### Proofs & AI Impact Report
- `POST /api/proofs` (Triggers asynchronous Gemini AI evaluation)

### Certificates
- `POST /api/certificates`
- `POST /api/certificates/:id/issue`

### System
- `GET /api/health`

## Rule

API specs live here. Runtime server code lives in `be/handlers/` using the Fiber framework.
