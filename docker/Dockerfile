# Multi-stage Dockerfile for BMAD Context Engineering MVP

# Stage 1: Build the React client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build and run the server
FROM node:18-alpine
WORKDIR /app

# Install SQLite and other dependencies
RUN apk add --no-cache sqlite sqlite-dev python3 make g++

# Copy server files
COPY server/package.json ./server/
WORKDIR /app/server
# Clean install to ensure correct architecture
RUN npm install --production --build-from-source

# Copy server source
COPY server/ ./

# Copy built client from stage 1
COPY --from=client-builder /app/client/build /app/client/build

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]