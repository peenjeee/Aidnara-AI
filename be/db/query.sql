-- name: GetCampaign :one
SELECT * FROM campaigns
WHERE id = $1 LIMIT 1;

-- name: ListCampaigns :many
SELECT * FROM campaigns
ORDER BY created_at DESC;

-- name: CreateCampaign :one
INSERT INTO campaigns (
  owner_address, title, short_description, long_description, category, target_amount, cover_image_url, beneficiary_name, location, expected_impact
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
)
RETURNING *;

-- name: GetDonationsByCampaign :many
SELECT * FROM donations
WHERE campaign_id = $1
ORDER BY created_at DESC;

-- name: GetDonation :one
SELECT * FROM donations
WHERE id = $1 LIMIT 1;

-- name: GetDonationByTxHash :one
SELECT * FROM donations
WHERE tx_hash = $1 LIMIT 1;

-- name: CreateDonation :one
INSERT INTO donations (
  campaign_id, donor_address, amount, tx_hash
) VALUES (
  $1, $2, $3, $4
)
RETURNING *;

-- name: LinkDonationCertificate :exec
UPDATE donations
SET certificate_id = $2
WHERE id = $1;

-- name: GetProof :one
SELECT * FROM proofs
WHERE id = $1 LIMIT 1;

-- name: GetProofsByCampaign :many
SELECT * FROM proofs
WHERE campaign_id = $1
ORDER BY created_at DESC;

-- name: CreateProof :one
INSERT INTO proofs (
  campaign_id, title, description, amount_used, impact_claim, file_url, file_hash
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
)
RETURNING *;

-- name: UpdateProofAIAssessment :exec
UPDATE proofs
SET ai_status = $2, ai_summary = $3, ai_detected_items = $4, ai_consistency = $5, ai_risk = $6, ai_estimated_impact = $7, ai_trust_score = $8
WHERE id = $1;

-- name: UpdateProofTxHash :exec
UPDATE proofs
SET submit_tx_hash = $2
WHERE id = $1;

-- name: GetCertificate :one
SELECT * FROM certificates
WHERE id = $1 LIMIT 1;

-- name: CreateCertificate :one
INSERT INTO certificates (
  campaign_id, donation_id, proof_id, recipient_address, certificate_type, certificate_hash
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: UpdateCertificateTxHash :exec
UPDATE certificates
SET issue_tx_hash = $2, status = 'issued', issued_at = NOW()
WHERE id = $1;
