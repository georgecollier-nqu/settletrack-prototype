# SettleTrack Development Environment Setup

This guide will help you set up your development environment for the SettleTrack project.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For version control ([Download](https://git-scm.com/))

## Quick Setup

We provide automated setup scripts for different platforms:

### macOS/Linux

```bash
./setup-dev.sh
```

### Windows (PowerShell)

```powershell
.\setup-dev.ps1
```

### Windows (Command Prompt)

```cmd
setup-dev.bat
```

These scripts will:

1. ✅ Check prerequisites (Node.js, npm)
2. 📦 Install all dependencies
3. 🔧 Create and configure environment variables
4. 🎣 Set up Git hooks (Husky)
5. 🔍 Run initial code checks
6. 🚀 Start the development server

## Manual Setup

If you prefer to set up manually or the scripts don't work:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and update the values as needed.

### 3. Set Up Git Hooks (Optional)

```bash
npx husky install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and auto-fix issues
- `npm run lint:check` - Check for linting issues without fixing
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests (if configured)

## Environment Variables

Key environment variables to configure:

### Required

- `NEXTAUTH_SECRET` - Authentication secret (generate with `openssl rand -base64 32`)
- `DATABASE_URL` - Database connection string (if using a database)

### Optional but Recommended

- `NEXT_PUBLIC_APP_URL` - Application URL (default: http://localhost:3000)
- `OPENAI_API_KEY` - For AI features
- `STRIPE_SECRET_KEY` & `STRIPE_PUBLISHABLE_KEY` - For billing features
- `TASK_MASTER_API_KEY` - For Task Master AI integration

See `.env.example` for a complete list of available environment variables.

## Troubleshooting

### Port 3000 is already in use

Kill the process using port 3000:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies installation fails

Clear npm cache and try again:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

Run TypeScript compiler to see all errors:

```bash
npx tsc --noEmit
```

### Linting errors

Auto-fix linting issues:

```bash
npm run lint
```

## Next Steps

1. Review and update environment variables in `.env.local`
2. Familiarize yourself with the project structure
3. Check out the main README.md for project documentation
4. Run `npm run dev` and start developing!

## Support

If you encounter any issues:

1. Check the error message carefully
2. Ensure all prerequisites are installed
3. Try the manual setup steps
4. Check if the issue is listed in Troubleshooting
5. Ask for help in the team chat or create an issue

Happy coding! 🚀
