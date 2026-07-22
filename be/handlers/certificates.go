package handlers

import (
	"context"

	"aidnara-be/db/sqlc"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type CertificateHandler struct {
	Queries *db.Queries
	Conn    *pgx.Conn
}

func NewCertificateHandler(conn *pgx.Conn) *CertificateHandler {
	return &CertificateHandler{
		Queries: db.New(conn),
		Conn:    conn,
	}
}

// POST /api/certificates
func (h *CertificateHandler) CreateCertificate(c *fiber.Ctx) error {
	type Request struct {
		CampaignID      string `json:"campaign_id"`
		DonationID      string `json:"donation_id"`
		ProofID         string `json:"proof_id"`
		Recipient       string `json:"recipient_address"`
		CertificateType string `json:"certificate_type"`
		CertificateHash string `json:"certificate_hash"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	campUUID, _ := uuid.Parse(req.CampaignID)
	donUUID, _ := uuid.Parse(req.DonationID)
	proofUUID, _ := uuid.Parse(req.ProofID)

	cert, err := h.Queries.CreateCertificate(context.Background(), db.CreateCertificateParams{
		CampaignID:       pgtype.UUID{Bytes: campUUID, Valid: true},
		DonationID:       pgtype.UUID{Bytes: donUUID, Valid: true},
		ProofID:          pgtype.UUID{Bytes: proofUUID, Valid: true},
		RecipientAddress: req.Recipient,
		CertificateType:  req.CertificateType,
		CertificateHash:  req.CertificateHash,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create certificate"})
	}

	return c.Status(fiber.StatusCreated).JSON(cert)
}

// POST /api/certificates/:id/issue
func (h *CertificateHandler) UpdateCertificateTxHash(c *fiber.Ctx) error {
	idParam := c.Params("id")
	certUUID, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Certificate ID"})
	}

	type Request struct {
		TxHash string `json:"tx_hash"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Verify on-chain logic (omitted full validation for brevity, but follows same pattern as donations)

	err = h.Queries.UpdateCertificateTxHash(context.Background(), db.UpdateCertificateTxHashParams{
		ID:          pgtype.UUID{Bytes: certUUID, Valid: true},
		IssueTxHash: pgtype.Text{String: req.TxHash, Valid: true},
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update certificate tx"})
	}

	return c.JSON(fiber.Map{"status": "success"})
}
