# Multi-stage Dockerfile for BMAD Context Engineering MVP

# Stage 1: Build the React client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup complete application
FROM node:18-alpine
WORKDIR /app

# Install SQLite and other dependencies
RUN apk add --no-cache sqlite sqlite-dev python3 make g++

# Copy root package.json and startup script
COPY package.json start.js ./

# Copy server files
COPY server/package.json ./server/
WORKDIR /app/server
# Clean install to ensure correct architecture
RUN npm install --production --build-from-source

# Copy server source
COPY server/ ./

# Copy client files
WORKDIR /app
COPY client/package.json ./client/
WORKDIR /app/client
RUN npm install --production

# Copy client source and built files
COPY client/ ./
COPY --from=client-builder /app/client/build ./build

# Create data directory for SQLite
WORKDIR /app
RUN mkdir -p /app/data

# Expose ports
EXPOSE 3010 3011

# Install root dependencies (if any)
RUN npm install --production

# Start both services
CMD ["npm", "start"]