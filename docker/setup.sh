#!/bin/bash

# BMAD Context Engineering MVP Setup Script

echo "🚀 Setting up BMAD Context Engineering MVP..."

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed. It's required for local development."
fi

echo "✅ Prerequisites checked"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data

# Build and start Docker container
echo "🐳 Building Docker container..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 5

# Check if services are running
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ Server is running!"
else
    echo "⚠️  Server might still be starting. Check logs with: docker-compose logs -f"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📍 Access the web interface at: http://localhost:3000"
echo "📍 View logs: docker-compose logs -f"
echo "📍 Stop services: docker-compose down"
echo "📍 Restart services: docker-compose restart"
echo ""
echo "Happy coding! 🚀"