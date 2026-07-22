package handlers

import (
	"context"

	"aidnara-be/db/sqlc"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type CampaignHandler struct {
	Queries *db.Queries
	Conn    *pgx.Conn
}

func NewCampaignHandler(conn *pgx.Conn) *CampaignHandler {
	return &CampaignHandler{
		Queries: db.New(conn),
		Conn:    conn,
	}
}

// GET /api/campaigns
func (h *CampaignHandler) ListCampaigns(c *fiber.Ctx) error {
	campaigns, err := h.Queries.ListCampaigns(context.Background())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to list campaigns"})
	}

	return c.JSON(campaigns)
}

// GET /api/campaigns/:id
func (h *CampaignHandler) GetCampaign(c *fiber.Ctx) error {
	idParam := c.Params("id")
	campaignUUID, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Campaign ID"})
	}

	pgUUID := pgtype.UUID{Bytes: campaignUUID, Valid: true}
	campaign, err := h.Queries.GetCampaign(context.Background(), pgUUID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Campaign not found"})
	}

	return c.JSON(campaign)
}

// POST /api/campaigns
func (h *CampaignHandler) CreateCampaign(c *fiber.Ctx) error {
	var req db.CreateCampaignParams
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	campaign, err := h.Queries.CreateCampaign(context.Background(), req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create campaign"})
	}

	return c.Status(fiber.StatusCreated).JSON(campaign)
}
