# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN cd client && \
    echo "=== Starting Client Build ===" && \
    npm install && \
    echo "=== Running Client Build ===" && \
    cd .. && \
    npm run build && \
    echo "=== Client Build Complete ===" && \
    echo "=== Current Directory ===" && \
    pwd && \
    echo "=== Directory Contents ===" && \
    ls -la

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && \
    npm install cross-env

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/public ./client/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]