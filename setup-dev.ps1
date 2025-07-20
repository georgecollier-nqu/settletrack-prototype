# SettleTrack Development Environment Setup Script (PowerShell)
# This script installs dependencies, initializes environment variables, and starts the development server

# Enable strict mode
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Color functions
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$ForegroundColor = "White"
    )
    Write-Host $Message -ForegroundColor $ForegroundColor
}

function Write-Header {
    param([string]$Title)
    Write-Host ""
    Write-ColorOutput "==========================================" -ForegroundColor Blue
    Write-ColorOutput $Title -ForegroundColor Blue
    Write-ColorOutput "==========================================" -ForegroundColor Blue
    Write-Host ""
}

function Test-CommandExists {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

function Test-NodeVersion {
    if (Test-CommandExists "node") {
        $nodeVersion = node -v
        $version = [version]($nodeVersion -replace '^v', '')
        $requiredVersion = [version]"18.0.0"
        
        if ($version -ge $requiredVersion) {
            Write-ColorOutput "✅ Node.js version $nodeVersion is compatible" -ForegroundColor Green
            return $true
        } else {
            Write-ColorOutput "⚠️  Node.js version $nodeVersion detected. Version 18+ is recommended." -ForegroundColor Yellow
            return $false
        }
    } else {
        Write-ColorOutput "❌ Node.js is not installed" -ForegroundColor Red
        return $false
    }
}

# Main setup function
function Start-Setup {
    Write-Header "SettleTrack Development Environment Setup"
    
    # Check if we're in the correct directory
    if (-not (Test-Path "package.json")) {
        Write-ColorOutput "❌ Error: package.json not found. Please run this script from the project root directory." -ForegroundColor Red
        exit 1
    }
    
    # Step 1: Check prerequisites
    Write-Header "Step 1: Checking Prerequisites"
    
    # Check Node.js
    if (-not (Test-NodeVersion)) {
        Write-ColorOutput "Please install Node.js 18 or higher: https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
    
    # Check npm
    if (Test-CommandExists "npm") {
        $npmVersion = npm -v
        Write-ColorOutput "✅ npm version $npmVersion is installed" -ForegroundColor Green
    } else {
        Write-ColorOutput "❌ npm is not installed" -ForegroundColor Red
        exit 1
    }
    
    # Step 2: Install dependencies
    Write-Header "Step 2: Installing Dependencies"
    
    if (Test-Path "node_modules") {
        Write-ColorOutput "⚠️  node_modules directory exists. Cleaning and reinstalling..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
        Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    }
    
    Write-ColorOutput "📦 Installing npm packages..." -ForegroundColor Yellow
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-ColorOutput "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    
    # Step 3: Setup environment variables
    Write-Header "Step 3: Setting Up Environment Variables"
    
    if (Test-Path ".env.local") {
        Write-ColorOutput "⚠️  .env.local already exists. Backing up to .env.local.backup" -ForegroundColor Yellow
        Copy-Item ".env.local" ".env.local.backup" -Force
    }
    
    # Create .env.local from .env.example
    if (Test-Path ".env.example") {
        Write-ColorOutput "📝 Creating .env.local from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env.local" -Force
        Write-ColorOutput "✅ .env.local created successfully" -ForegroundColor Green
    } else {
        Write-ColorOutput "⚠️  .env.example not found. Creating default .env.local..." -ForegroundColor Yellow
        # Create a default .env.local with placeholder values
        @"
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
"@ | Set-Content ".env.local"
        Write-ColorOutput "✅ .env.local created with default values" -ForegroundColor Green
    }
    
    Write-ColorOutput "📌 Please review and update the environment variables in .env.local" -ForegroundColor Yellow
    
    # Step 4: Setup git hooks (if not already setup)
    Write-Header "Step 4: Setting Up Git Hooks"
    
    if (Test-Path ".git") {
        Write-ColorOutput "🔧 Setting up Husky git hooks..." -ForegroundColor Yellow
        npx husky install
        Write-ColorOutput "✅ Git hooks configured" -ForegroundColor Green
    } else {
        Write-ColorOutput "⚠️  Not a git repository. Skipping git hooks setup." -ForegroundColor Yellow
    }
    
    # Step 5: Run initial checks
    Write-Header "Step 5: Running Initial Checks"
    
    # Check linting
    Write-ColorOutput "🔍 Checking code style..." -ForegroundColor Yellow
    npm run lint:check
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "⚠️  Some linting issues found. Run 'npm run lint' to auto-fix." -ForegroundColor Yellow
    }
    
    # Check TypeScript
    Write-ColorOutput "🔍 Checking TypeScript..." -ForegroundColor Yellow
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "⚠️  Some TypeScript errors found. Please fix them before proceeding." -ForegroundColor Yellow
    }
    
    # Step 6: Start development server
    Write-Header "Step 6: Starting Development Server"
    
    Write-ColorOutput "✅ Setup completed successfully!" -ForegroundColor Green
    Write-ColorOutput "🚀 Starting development server..." -ForegroundColor Yellow
    Write-ColorOutput "📱 The application will be available at http://localhost:3000" -ForegroundColor Yellow
    Write-ColorOutput "" -ForegroundColor Yellow
    Write-ColorOutput "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Start the development server
    npm run dev
}

# Run the setup
Start-Setup