@echo off
REM SettleTrack Development Environment Setup Script (Windows Batch)
REM This script installs dependencies, initializes environment variables, and starts the development server

setlocal enabledelayedexpansion

REM Color codes
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
goto :main

:print_color
echo %~2%~1%NC%
exit /b

:print_header
echo.
call :print_color "==========================================" %BLUE%
call :print_color "%~1" %BLUE%
call :print_color "==========================================" %BLUE%
echo.
exit /b

:check_node_version
where node >nul 2>nul
if %errorlevel% neq 0 (
    call :print_color "X Node.js is not installed" %RED%
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
set NODE_VERSION=%NODE_VERSION:v=%

call :print_color "√ Node.js version %NODE_VERSION% is installed" %GREEN%

REM Simple version check (just check major version)
for /f "tokens=1 delims=." %%a in ("%NODE_VERSION%") do set MAJOR_VERSION=%%a
if %MAJOR_VERSION% LSS 18 (
    call :print_color "! Node.js version %NODE_VERSION% detected. Version 18+ is recommended." %YELLOW%
    exit /b 1
)

exit /b 0

:main
call :print_header "SettleTrack Development Environment Setup"

REM Check if we're in the correct directory
if not exist "package.json" (
    call :print_color "X Error: package.json not found. Please run this script from the project root directory." %RED%
    exit /b 1
)

REM Step 1: Check prerequisites
call :print_header "Step 1: Checking Prerequisites"

REM Check Node.js
call :check_node_version
if %errorlevel% neq 0 (
    call :print_color "Please install Node.js 18 or higher: https://nodejs.org/" %RED%
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    call :print_color "X npm is not installed" %RED%
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
call :print_color "√ npm version %NPM_VERSION% is installed" %GREEN%

REM Step 2: Install dependencies
call :print_header "Step 2: Installing Dependencies"

if exist "node_modules" (
    call :print_color "! node_modules directory exists. Cleaning and reinstalling..." %YELLOW%
    rd /s /q node_modules 2>nul
    del /f /q package-lock.json 2>nul
)

call :print_color "Installing npm packages..." %YELLOW%
call npm install

if %errorlevel% equ 0 (
    call :print_color "√ Dependencies installed successfully" %GREEN%
) else (
    call :print_color "X Failed to install dependencies" %RED%
    exit /b 1
)

REM Step 3: Setup environment variables
call :print_header "Step 3: Setting Up Environment Variables"

if exist ".env.local" (
    call :print_color "! .env.local already exists. Backing up to .env.local.backup" %YELLOW%
    copy /y ".env.local" ".env.local.backup" >nul
)

REM Create .env.local from .env.example
if exist ".env.example" (
    call :print_color "Creating .env.local from .env.example..." %YELLOW%
    copy /y ".env.example" ".env.local" >nul
    call :print_color "√ .env.local created successfully" %GREEN%
) else (
    call :print_color "! .env.example not found. Creating default .env.local..." %YELLOW%
    (
        echo # Application Configuration
        echo NEXT_PUBLIC_APP_URL=http://localhost:3000
        echo NEXT_PUBLIC_APP_NAME=SettleTrack
        echo.
        echo # API Configuration
        echo NEXT_PUBLIC_API_URL=http://localhost:3000/api
        echo API_BASE_URL=http://localhost:3000
        echo.
        echo # Authentication ^(Replace with your actual values in production^)
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=your-development-secret-key-change-in-production
        echo.
        echo # Database Configuration ^(if needed^)
        echo DATABASE_URL=
        echo.
        echo # Third-party Services
        echo # Add your API keys here as needed
        echo # OPENAI_API_KEY=
        echo # STRIPE_SECRET_KEY=
        echo # STRIPE_PUBLISHABLE_KEY=
        echo.
        echo # Feature Flags
        echo NEXT_PUBLIC_ENABLE_ANALYTICS=false
        echo NEXT_PUBLIC_ENABLE_DEBUG=true
        echo.
        echo # Task Master AI Integration ^(if using^)
        echo TASK_MASTER_API_KEY=
        echo.
        echo # Bubble Integration ^(if using^)
        echo BUBBLE_API_KEY=
        echo BUBBLE_APP_ID=
        echo.
        echo # Email Service ^(if needed^)
        echo EMAIL_FROM=noreply@settletrack.com
        echo # SENDGRID_API_KEY=
        echo # SMTP_HOST=
        echo # SMTP_PORT=
        echo # SMTP_USER=
        echo # SMTP_PASS=
    ) > .env.local
    call :print_color "√ .env.local created with default values" %GREEN%
)

call :print_color "Please review and update the environment variables in .env.local" %YELLOW%

REM Step 4: Setup git hooks (if not already setup)
call :print_header "Step 4: Setting Up Git Hooks"

if exist ".git" (
    call :print_color "Setting up Husky git hooks..." %YELLOW%
    call npx husky install
    call :print_color "√ Git hooks configured" %GREEN%
) else (
    call :print_color "! Not a git repository. Skipping git hooks setup." %YELLOW%
)

REM Step 5: Run initial checks
call :print_header "Step 5: Running Initial Checks"

REM Check linting
call :print_color "Checking code style..." %YELLOW%
call npm run lint:check
if %errorlevel% neq 0 (
    call :print_color "! Some linting issues found. Run 'npm run lint' to auto-fix." %YELLOW%
)

REM Check TypeScript
call :print_color "Checking TypeScript..." %YELLOW%
call npx tsc --noEmit
if %errorlevel% neq 0 (
    call :print_color "! Some TypeScript errors found. Please fix them before proceeding." %YELLOW%
)

REM Step 6: Start development server
call :print_header "Step 6: Starting Development Server"

call :print_color "√ Setup completed successfully!" %GREEN%
call :print_color "Starting development server..." %YELLOW%
call :print_color "The application will be available at http://localhost:3000" %YELLOW%
echo.
call :print_color "Press Ctrl+C to stop the server" %YELLOW%
echo.

REM Start the development server
call npm run dev