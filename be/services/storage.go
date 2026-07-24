package services

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
)

const (
	UploadDir     = "./uploads"
	MaxUploadSize = 5 << 20
)

// InitStorage ensures the upload directories exist
func InitStorage() error {
	dirs := []string{
		filepath.Join(UploadDir, "campaign-covers"),
		filepath.Join(UploadDir, "proofs"),
		filepath.Join(UploadDir, "certificates"),
	}

	for _, d := range dirs {
		if err := os.MkdirAll(d, 0755); err != nil {
			return fmt.Errorf("failed to create directory %s: %w", d, err)
		}
	}
	return nil
}

// GenerateFilename generates a secure, random filename while preserving the extension
func GenerateFilename(originalName string) (string, error) {
	ext := strings.ToLower(filepath.Ext(originalName))
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes) + ext, nil
}

// SaveFile saves a multipart file to the specified kind's directory and returns the public path.
func SaveFile(kind string, file *multipart.FileHeader) (string, error) {
	subDir, err := validateUpload(kind, file)
	if err != nil {
		return "", err
	}

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	filename, err := GenerateFilename(file.Filename)
	if err != nil {
		return "", err
	}

	destPath := filepath.Join(UploadDir, subDir, filename)
	dest, err := os.Create(destPath)
	if err != nil {
		return "", err
	}
	defer dest.Close()

	if _, err := io.Copy(dest, src); err != nil {
		return "", err
	}

	publicPath := fmt.Sprintf("/uploads/%s/%s", subDir, filename)
	return strings.ReplaceAll(publicPath, "\\", "/"), nil
}

func validateUpload(kind string, file *multipart.FileHeader) (string, error) {
	if file.Size <= 0 {
		return "", fmt.Errorf("file is empty")
	}
	if file.Size > MaxUploadSize {
		return "", fmt.Errorf("file exceeds 5 MiB limit")
	}

	ext := strings.ToLower(filepath.Ext(file.Filename))
	switch kind {
	case "campaign-cover":
		if !oneOf(ext, ".jpg", ".jpeg", ".png", ".webp") {
			return "", fmt.Errorf("campaign-cover must be jpg, png, or webp")
		}
		return "campaign-covers", nil
	case "proof":
		if !oneOf(ext, ".jpg", ".jpeg", ".png", ".webp", ".pdf") {
			return "", fmt.Errorf("proof must be image or pdf")
		}
		return "proofs", nil
	case "certificate":
		if !oneOf(ext, ".jpg", ".jpeg", ".png", ".pdf") {
			return "", fmt.Errorf("certificate must be image or pdf")
		}
		return "certificates", nil
	default:
		return "", fmt.Errorf("invalid storage kind: %s", kind)
	}
}

func oneOf(value string, allowed ...string) bool {
	for _, item := range allowed {
		if value == item {
			return true
		}
	}
	return false
}
