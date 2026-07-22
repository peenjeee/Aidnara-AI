FROM golang:alpine AS builder

WORKDIR /app

# Install dependencies first (for caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application
COPY . .

# Build the statically linked binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

# Production stage
FROM alpine:latest
WORKDIR /app

# Install ca-certificates just in case for external API calls
RUN apk --no-cache add ca-certificates

# Copy the binary and necessary files from builder
COPY --from=builder /app/server .
COPY --from=builder /app/db/migrations ./db/migrations

ENV PORT=8080

EXPOSE 8080

# Run the binary
CMD ["./server"]
