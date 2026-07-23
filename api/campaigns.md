# Campaigns API

## GET /api/campaigns

Returns campaign list from the Go backend.

## POST /api/campaigns

Creates a campaign record.

### Request

```json
{
  "owner_address": "0x0000000000000000000000000000000000000001",
  "title": "Bantu Anak Desa Belajar Online",
  "short_description": "Campaign pendidikan transparan.",
  "long_description": "Campaign untuk membantu akses belajar online dengan bukti penggunaan dana.",
  "category": "education",
  "target_amount": "0.05",
  "cover_image_url": "https://example.com/cover.png",
  "beneficiary_name": "Siswa Desa",
  "location": "Indonesia",
  "expected_impact": "Membantu 15 siswa mendapatkan akses belajar online."
}
```

## GET /api/campaigns/:id

Returns one campaign by UUID.

## GET /api/campaigns/:id/donations

Returns donations for one campaign.

## Errors

- Invalid UUID returns `400`.
- Missing campaign returns `404`.
