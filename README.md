# SettleTrack

A platform for law firms to explore, analyze, and predict settlement amounts based on judicial precedent. SettleTrack provides structured data from legal dockets, enabling data-driven insights for class-action lawsuits.

## Overview

SettleTrack transforms unstructured legal docket data into actionable insights, allowing law firms to:
- Search and filter settlements by multiple criteria
- Analyze settlement trends over time
- Compare similar cases side-by-side
- Export data for offline analysis
- Generate accurate settlement predictions

## Tech Stack

- **Frontend**: Next.js 15.3 with TypeScript
- **UI Components**: Radix UI with Tailwind CSS
- **Authentication**: Custom auth with multi-factor authentication support
- **Charts**: Recharts for data visualization
- **Export**: jsPDF for PDF generation, PapaParse for CSV export

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/georgecollier-nqu/settletrack-prototype.git
cd settletrack-prototype/semarang
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel (case management, QC, users)
│   ├── dashboard/         # Main user dashboard
│   ├── api/              # API routes
│   └── (auth pages)      # Login, signup, onboarding
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth/             # Authentication components
│   └── case-review/      # Case review components
├── contexts/             # React contexts for state management
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## Key Features

### For Law Firms
- **Advanced Search**: Filter cases by court, date, settlement amount, class size, PII affected, and more
- **Trend Analysis**: Visualize settlement patterns over time with customizable metrics
- **Case Details**: Deep dive into individual cases with source PDF verification
- **Export Options**: Download filtered results as CSV or formatted PDFs
- **Saved Searches**: Save and revisit frequently used filter combinations
- **Team Collaboration**: Share insights and notes within your firm

### For Administrators
- **Case Management**: Import and process new dockets, manage data quality
- **User Management**: Control firm subscriptions, user access, and permissions
- **Quality Control**: Review flagged data, approve edits, manage the review queue
- **Billing Integration**: Manage subscriptions, view revenue metrics
- **Feedback System**: Track and respond to user feedback and bug reports

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint and Prettier (with fixes)
npm run lint:check   # Check linting without fixes
npm run format       # Format code with Prettier
npm run format:check # Check formatting without fixes
```

## Development Guidelines

- Code is formatted automatically on commit using Husky and lint-staged
- Follow the existing component patterns in the codebase
- Use TypeScript for type safety
- Components use Radix UI primitives with Tailwind CSS styling
- API routes follow Next.js app router conventions

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary software. All rights reserved.