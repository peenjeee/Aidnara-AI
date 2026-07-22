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
	UploadDir = "./uploads"
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
	ext := filepath.Ext(originalName)
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes) + ext, nil
}

// SaveFile saves a multipart file to the specified kind's directory and returns the public path.
func SaveFile(kind string, file *multipart.FileHeader) (string, error) {
	// Map 'kind' to the correct subdirectory
	subDir := ""
	switch kind {
	case "campaign-cover":
		subDir = "campaign-covers"
	case "proof":
		subDir = "proofs"
	case "certificate":
		subDir = "certificates"
	default:
		return "", fmt.Errorf("invalid storage kind: %s", kind)
	}

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// Ensure unique filename to avoid overwrites
	filename, err := GenerateFilename(file.Filename)
	if err != nil {
		return "", err
	}

	// Create destination file
	destPath := filepath.Join(UploadDir, subDir, filename)
	dest, err := os.Create(destPath)
	if err != nil {
		return "", err
	}
	defer dest.Close()

	if _, err := io.Copy(dest, src); err != nil {
		return "", err
	}

	// Return public URL path
	// Assuming fiber serves ./uploads at /uploads
	publicPath := fmt.Sprintf("/uploads/%s/%s", subDir, filename)
	return strings.ReplaceAll(publicPath, "\\", "/"), nil
}
