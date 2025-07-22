#!/bin/bash

# Setup script for SettleTrack Prototype
# This script installs all dependencies and sets up the development environment

set -e  # Exit on any error

echo "🚀 Setting up SettleTrack development environment..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/"
    exit 1
fi

echo "✅ Git detected"

# Check if we're in a git repository
if [ -d .git ]; then
    echo "📥 Fetching latest changes from remote..."
    
    # Store current branch
    CURRENT_BRANCH=$(git branch --show-current)
    
    # Fetch all remote branches
    git fetch --all
    
    # Check if there are uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "⚠️  You have uncommitted changes. Please commit or stash them before pulling."
        echo "   Run 'git stash' to temporarily save your changes"
        read -p "Do you want to stash changes and continue? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git stash push -m "Auto-stash before setup script pull"
            echo "✅ Changes stashed"
            STASHED=true
        else
            echo "❌ Setup cancelled. Please handle your changes manually."
            exit 1
        fi
    fi
    
    # Pull latest changes
    echo "📥 Pulling latest changes..."
    git pull origin "$CURRENT_BRANCH"
    
    # If we stashed, offer to pop the stash
    if [ "$STASHED" = true ]; then
        read -p "Do you want to restore your stashed changes? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git stash pop
            echo "✅ Stashed changes restored"
        fi
    fi
    
    echo "✅ Repository updated to latest version"
else
    echo "⚠️  Not in a git repository. Skipping git operations."
    echo "   To clone the repository, run:"
    echo "   git clone <repository-url>"
fi

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

# Clean install dependencies (remove node_modules for fresh install)
if [ -d "node_modules" ]; then
    echo "🧹 Cleaning old dependencies..."
    rm -rf node_modules
fi

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

# Show git status
if [ -d .git ]; then
    echo "📊 Current git status:"
    git status --short
fi