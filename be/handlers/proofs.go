package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"aidnara-be/db/sqlc"
	"aidnara-be/services"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type ProofHandler struct {
	Queries *db.Queries
	Conn    *pgx.Conn
}

func NewProofHandler(conn *pgx.Conn) *ProofHandler {
	return &ProofHandler{
		Queries: db.New(conn),
		Conn:    conn,
	}
}

// GET /api/campaigns/:id/proofs
func (h *ProofHandler) ListProofsByCampaign(c *fiber.Ctx) error {
	idParam := c.Params("id")
	campaignUUID, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Campaign ID"})
	}

	proofs, err := h.Queries.GetProofsByCampaign(c.Context(), pgtype.UUID{Bytes: campaignUUID, Valid: true})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get proofs"})
	}

	return c.JSON(proofs)
}

// POST /api/proofs
func (h *ProofHandler) CreateProof(c *fiber.Ctx) error {
	type Request struct {
		CampaignID  string `json:"campaign_id"`
		Title       string `json:"title"`
		Description string `json:"description"`
		AmountUsed  string `json:"amount_used"`
		ImpactClaim string `json:"impact_claim"`
		FileUrl     string `json:"file_url"`
		FileHash    string `json:"file_hash"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	campaignUUID, err := uuid.Parse(req.CampaignID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Campaign ID"})
	}

	var amountNum pgtype.Numeric
	amountNum.Scan(req.AmountUsed)

	proof, err := h.Queries.CreateProof(context.Background(), db.CreateProofParams{
		CampaignID:  pgtype.UUID{Bytes: campaignUUID, Valid: true},
		Title:       req.Title,
		Description: req.Description,
		AmountUsed:  amountNum,
		ImpactClaim: req.ImpactClaim,
		FileUrl:     req.FileUrl,
		FileHash:    req.FileHash,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create proof"})
	}

	// Trigger AI verification in background
	go h.analyzeProofWithAI(proof)

	return c.Status(fiber.StatusCreated).JSON(proof)
}

func (h *ProofHandler) analyzeProofWithAI(proof db.Proof) {
	// Call Gemini Provider
	prompt := fmt.Sprintf("Analyze this proof for a campaign.\nTitle: %s\nDescription: %s\nClaim: %s\nEvaluate trust score (0-100), consistency, and risk.", proof.Title, proof.Description, proof.ImpactClaim)
	
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		fmt.Println("AI Provider skipped: GEMINI_API_KEY is not configured")
		return
	}

	opts := services.GeminiOptions{
		APIKey: apiKey,
		Model:  os.Getenv("GEMINI_MODEL"),
	}

	result, err := services.CallGeminiJSON(prompt, opts)
	if err != nil {
		fmt.Printf("AI Provider failed: %v\n", err)
		return
	}

	// Process the JSON map and update proof
	// Simplification for porting: we extract some fields as strings
	var summary, consistency, risk, estimatedImpact string
	if v, ok := result["summary"].(string); ok {
		summary = v
	}
	if v, ok := result["consistency"].(string); ok {
		consistency = v
	}
	if v, ok := result["risk"].(string); ok {
		risk = v
	}
	if v, ok := result["estimatedImpact"].(string); ok {
		estimatedImpact = v
	}

	var trustScore int32 = 50
	if val, ok := result["trustScore"].(float64); ok {
		trustScore = int32(val)
	}

	detectedItemsBytes, _ := json.Marshal(result["detectedItems"])

	h.Queries.UpdateProofAIAssessment(context.Background(), db.UpdateProofAIAssessmentParams{
		ID:                proof.ID,
		AiStatus:          "completed",
		AiSummary:         pgtype.Text{String: summary, Valid: true},
		AiDetectedItems:   detectedItemsBytes,
		AiConsistency:     pgtype.Text{String: consistency, Valid: true},
		AiRisk:            pgtype.Text{String: risk, Valid: true},
		AiEstimatedImpact: pgtype.Text{String: estimatedImpact, Valid: true},
		AiTrustScore:      pgtype.Int4{Int32: trustScore, Valid: true},
	})
}
