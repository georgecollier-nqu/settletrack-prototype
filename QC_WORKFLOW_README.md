# QC Workflow System - Implementation Guide

## Overview

The QC Workflow System has been implemented with the following features:

### Core Features Implemented

1. **Role-Based Access Control**
   - **Supervisor Role** (Full admin access - Jackie only)
   - **Reviewer Role** (Multiple users, limited to QC tools only)
   - **User Role** (Regular users with no QC access)

2. **Model Output Comparison**
   - Side-by-side comparison of Gemini and GPT-4 outputs
   - Confidence scores for each field
   - Visual highlighting of differences

3. **Review Workflow**
   - Duplicate and edit Output 1 functionality
   - Field-level change tracking
   - Required annotations for all changes
   - Multi-stage approval process

4. **Change Log System**
   - Tracks: User Name, Date, Field Changed, Before/After Values, Annotation
   - Complete audit trail for compliance
   - Chronological history view

5. **Supervisor Management**
   - Add/remove human reviewers
   - Change user roles
   - Monitor reviewer performance
   - Approve/reject reviewed cases

## Database Schema

The system uses PostgreSQL with Prisma ORM. Key models include:

- **User**: With roles (SUPERVISOR, REVIEWER, USER)
- **Case**: All 48 fields from the medical case schema
- **ModelOutput**: Stores AI model outputs (Gemini, GPT-4, etc.)
- **QCReview**: Manages the review workflow
- **ChangeLog**: Tracks all field-level changes
- **AuditLog**: System-wide audit trail

## Setup Instructions

### 1. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations (for production)
npm run db:migrate

# OR push schema directly (for development)
npm run db:push

# Seed the database with test data
npm run db:seed
```

### 2. Environment Variables

Add to your `.env` file:

```env
# Database URL (use your actual database)
DATABASE_URL="postgresql://user:password@localhost:5432/qc_workflow"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

### 3. Test Credentials

After seeding, use these credentials:

- **Supervisor**: jackie@johnsonlaw.com / password123
- **Reviewer**: sarah.miller@johnsonlaw.com / password123
- **Reviewer**: mike.chen@medreview.com / password123
- **Regular User**: john.doe@johnsonlaw.com / password123

## User Workflows

### For Supervisors (Jackie)

1. **Managing Reviewers**
   - Navigate to Admin → Users
   - Click "Add User" to create new reviewers
   - Use the dropdown menu to change roles
   - Monitor reviewer statistics

2. **Approving Reviews**
   - Navigate to Admin → QC Workflow
   - Click on "Pending Approval" tab
   - Review changes and annotations
   - Approve or request changes

### For Reviewers

1. **Starting a Review**
   - Navigate to Admin → QC Workflow
   - Click "Start Review" on assigned cases
   - Compare model outputs side-by-side

2. **Making Corrections**
   - Click "Duplicate & Edit" to create editable version
   - Modify fields as needed
   - Add annotation for each change (required)
   - Submit review for supervisor approval

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### QC Reviews
- `GET /api/qc/reviews` - List reviews
- `POST /api/qc/reviews` - Create review
- `GET /api/qc/reviews/:id` - Get review details
- `PATCH /api/qc/reviews/:id` - Update review
- `POST /api/qc/reviews/:id/approve` - Approve review
- `POST /api/qc/reviews/:id/changes` - Add change log
- `GET /api/qc/reviews/:id/changes` - Get change logs

### User Management (Supervisors only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

## Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Role-based Middleware** - Route protection
3. **Audit Logging** - All actions tracked
4. **Password Hashing** - bcrypt with salt rounds
5. **Session Management** - Secure HTTP-only cookies

## Next Steps for Production

1. **Email Integration**
   - Password reset emails
   - Review assignment notifications
   - Approval notifications

2. **Real AI Model Integration**
   - Connect to Gemini API
   - Connect to OpenAI GPT-4 API
   - Implement confidence scoring

3. **Advanced Features**
   - Bulk review operations
   - Review templates
   - Performance analytics
   - Export functionality

4. **Testing**
   - Unit tests for API routes
   - Integration tests for workflows
   - E2E tests for critical paths

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db push

# View database in Prisma Studio
npx prisma studio
```

### Authentication Issues
- Clear browser cookies
- Check JWT_SECRET in .env
- Verify user is active in database

### Permission Errors
- Verify user role in database
- Check middleware configuration
- Review audit logs for details