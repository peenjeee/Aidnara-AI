FROM node:25-alpine AS builder

WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Production stage
FROM node:25-alpine AS runner
WORKDIR /app

# Copy the built assets from the builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the SSR server using Vinxi (SolidStart's default output for node server)
CMD ["node", ".output/server/index.mjs"]
