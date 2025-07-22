#!/bin/bash

# SettleTrack Development Environment Setup Script
# This script installs dependencies, initializes environment variables, and starts the development server

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Function to print section headers
print_header() {
    echo ""
    print_color "$BLUE" "=========================================="
    print_color "$BLUE" "$1"
    print_color "$BLUE" "=========================================="
    echo ""
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node -v | cut -d'v' -f2)
        REQUIRED_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_color "$GREEN" "✅ Node.js version $NODE_VERSION is compatible"
            return 0
        else
            print_color "$YELLOW" "⚠️  Node.js version $NODE_VERSION detected. Version 18+ is recommended."
            return 1
        fi
    else
        print_color "$RED" "❌ Node.js is not installed"
        return 1
    fi
}

# Main setup function
main() {
    print_header "SettleTrack Development Environment Setup"
    
    # Check if we're in the correct directory
    if [ ! -f "package.json" ]; then
        print_color "$RED" "❌ Error: package.json not found. Please run this script from the project root directory."
        exit 1
    fi
    
    # Step 1: Check prerequisites
    print_header "Step 1: Checking Prerequisites"
    
    # Check Node.js
    if ! check_node_version; then
        print_color "$RED" "Please install Node.js 18 or higher: https://nodejs.org/"
        exit 1
    fi
    
    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm -v)
        print_color "$GREEN" "✅ npm version $NPM_VERSION is installed"
    else
        print_color "$RED" "❌ npm is not installed"
        exit 1
    fi
    
    # Step 2: Install dependencies
    print_header "Step 2: Installing Dependencies"
    
    if [ -d "node_modules" ]; then
        print_color "$YELLOW" "⚠️  node_modules directory exists. Cleaning and reinstalling..."
        rm -rf node_modules package-lock.json
    fi
    
    print_color "$YELLOW" "📦 Installing npm packages..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_color "$GREEN" "✅ Dependencies installed successfully"
    else
        print_color "$RED" "❌ Failed to install dependencies"
        exit 1
    fi
    
    # Step 3: Setup environment variables
    print_header "Step 3: Setting Up Environment Variables"
    
    if [ -f ".env.local" ]; then
        print_color "$YELLOW" "⚠️  .env.local already exists. Backing up to .env.local.backup"
        cp .env.local .env.local.backup
    fi
    
    # Create .env.local from .env.example
    if [ -f ".env.example" ]; then
        print_color "$YELLOW" "📝 Creating .env.local from .env.example..."
        cp .env.example .env.local
        print_color "$GREEN" "✅ .env.local created successfully"
    else
        print_color "$YELLOW" "⚠️  .env.example not found. Creating default .env.local..."
        # Create a default .env.local with placeholder values
        cat > .env.local << 'EOF'
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SettleTrack

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_BASE_URL=http://localhost:3000

# Authentication (Replace with your actual values in production)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-development-secret-key-change-in-production

# Database Configuration (if needed)
DATABASE_URL=

# Third-party Services
# Add your API keys here as needed
# OPENAI_API_KEY=
# STRIPE_SECRET_KEY=
# STRIPE_PUBLISHABLE_KEY=

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true

# Task Master AI Integration (if using)
TASK_MASTER_API_KEY=

# Bubble Integration (if using)
BUBBLE_API_KEY=
BUBBLE_APP_ID=

# Email Service (if needed)
EMAIL_FROM=noreply@settletrack.com
# SENDGRID_API_KEY=
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
EOF
        print_color "$GREEN" "✅ .env.local created with default values"
    fi
    
    print_color "$YELLOW" "📌 Please review and update the environment variables in .env.local"
    
    # Step 4: Setup git hooks (if not already setup)
    print_header "Step 4: Setting Up Git Hooks"
    
    if [ -d ".git" ]; then
        print_color "$YELLOW" "🔧 Setting up Husky git hooks..."
        npx husky install
        print_color "$GREEN" "✅ Git hooks configured"
    else
        print_color "$YELLOW" "⚠️  Not a git repository. Skipping git hooks setup."
    fi
    
    # Step 5: Run initial checks
    print_header "Step 5: Running Initial Checks"
    
    # Check linting
    print_color "$YELLOW" "🔍 Checking code style..."
    npm run lint:check || {
        print_color "$YELLOW" "⚠️  Some linting issues found. Run 'npm run lint' to auto-fix."
    }
    
    # Check TypeScript
    print_color "$YELLOW" "🔍 Checking TypeScript..."
    npx tsc --noEmit || {
        print_color "$YELLOW" "⚠️  Some TypeScript errors found. Please fix them before proceeding."
    }
    
    # Step 6: Start development server
    print_header "Step 6: Starting Development Server"
    
    print_color "$GREEN" "✅ Setup completed successfully!"
    print_color "$YELLOW" "🚀 Starting development server..."
    print_color "$YELLOW" "📱 The application will be available at http://localhost:3000"
    print_color "$YELLOW" ""
    print_color "$YELLOW" "Press Ctrl+C to stop the server"
    echo ""
    
    # Start the development server
    npm run dev
}

# Run the main function
main