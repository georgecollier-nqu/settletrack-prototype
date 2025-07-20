#!/bin/bash

# Setup script for SettleTrack Prototype
# This script installs all dependencies and sets up the development environment

set -e  # Exit on any error

echo "🚀 Setting up SettleTrack development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists, if not create from example
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📝 Creating .env file from .env.example..."
        cp .env.example .env
        echo "⚠️  Please update .env with your configuration"
    else
        echo "📝 Creating default .env file..."
        cat > .env << EOF
# Environment variables
NODE_ENV=development
PORT=3000
EOF
        echo "⚠️  Created basic .env file. Please update with your configuration if needed."
    fi
else
    echo "✅ .env file already exists"
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Run any database migrations or setup if needed
# (Add database setup commands here if applicable)

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Available commands:"
echo "  npm run dev       - Start development server"
echo "  npm run build     - Build for production"
echo "  npm run preview   - Preview production build"
echo "  npm run lint      - Run linter"
echo "  npm run test      - Run tests (if configured)"
echo ""