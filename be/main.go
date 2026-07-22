package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"aidnara-be/handlers"
	"aidnara-be/services"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file, falling back to OS env or defaults")
	}

	// Initialize Local Storage Directories
	if err := services.InitStorage(); err != nil {
		log.Fatalf("Failed to init storage: %v", err)
	}

	// Database connection string (adjust with your local credentials)
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:pnj123@localhost:5433/aidnara?sslmode=disable"
	}

	// Run Database Migrations Automatically
	log.Println("Running database migrations...")
	m, err := migrate.New("file://db/migrations", dbURL)
	if err != nil {
		log.Fatalf("Migration initialization failed: %v", err)
	}
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("An error occurred while syncing the database.. %v", err)
	}
	log.Println("Database migrated successfully.")

	// Connect to PostgreSQL using pgx
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, dbURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(ctx)

	// Handlers
	campaignHandler := handlers.NewCampaignHandler(conn)
	donationHandler := handlers.NewDonationHandler(conn)
	proofHandler := handlers.NewProofHandler(conn)
	certHandler := handlers.NewCertificateHandler(conn)

	// Initialize Fiber app
	app := fiber.New()

	// Serve Static files for local uploads (replacing Supabase)
	app.Static("/uploads", "./uploads")

	// API Group
	api := app.Group("/api")

	// Routes - Campaigns
	api.Get("/campaigns", campaignHandler.ListCampaigns)
	api.Post("/campaigns", campaignHandler.CreateCampaign)
	api.Get("/campaigns/:id", campaignHandler.GetCampaign)
	api.Get("/campaigns/:id/donations", donationHandler.ListDonationsByCampaign)

	// Routes - Donations
	api.Post("/donations", donationHandler.CreateDonation)

	// Routes - Proofs & Impact Reports
	api.Post("/proofs", proofHandler.CreateProof)

	// Routes - Certificates
	api.Post("/certificates", certHandler.CreateCertificate)
	api.Post("/certificates/:id/issue", certHandler.UpdateCertificateTxHash)

	// Simple health check route
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
			"db":     "connected",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Starting server on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
