package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type GeminiOptions struct {
	APIKey string
	Model  string
}

type geminiRequest struct {
	Contents         []geminiContent `json:"contents"`
	GenerationConfig geminiGenConfig `json:"generationConfig"`
}

type geminiContent struct {
	Role  string       `json:"role"`
	Parts []geminiPart `json:"parts"`
}

type geminiPart struct {
	Text string `json:"text"`
}

type geminiGenConfig struct {
	ResponseMimeType string `json:"responseMimeType"`
}

type geminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

// CallGeminiJSON calls the Gemini REST API and parses the JSON response.
func CallGeminiJSON(prompt string, options GeminiOptions) (map[string]interface{}, error) {
	model := options.Model
	if model == "" {
		model = "gemini-1.5-flash"
	}

	url := fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s", model, options.APIKey)

	reqBody := geminiRequest{
		Contents: []geminiContent{
			{
				Role: "user",
				Parts: []geminiPart{
					{Text: prompt},
				},
			},
		},
		GenerationConfig: geminiGenConfig{
			ResponseMimeType: "application/json",
		},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("AI provider failed with status %d: %s", resp.StatusCode, string(bodyBytes))
	}

	var payload geminiResponse
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	var text strings.Builder
	for _, candidate := range payload.Candidates {
		for _, part := range candidate.Content.Parts {
			text.WriteString(part.Text)
		}
	}

	return ParseJSONText(text.String())
}

// ParseJSONText strips markdown fencing from the AI response and parses it into a map.
func ParseJSONText(text string) (map[string]interface{}, error) {
	trimmed := strings.TrimSpace(text)
	
	// Strip markdown fences
	trimmed = strings.TrimPrefix(trimmed, "```json")
	trimmed = strings.TrimPrefix(trimmed, "```")
	trimmed = strings.TrimSuffix(trimmed, "```")
	trimmed = strings.TrimSpace(trimmed)

	if trimmed == "" {
		return nil, fmt.Errorf("AI provider returned empty response")
	}

	var result map[string]interface{}
	if err := json.Unmarshal([]byte(trimmed), &result); err != nil {
		return nil, fmt.Errorf("failed to parse JSON from AI: %w", err)
	}

	return result, nil
}
