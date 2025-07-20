# User Management Implementation

## Overview

This implementation adds a complete user management system with two user types and Multi-Factor Authentication (MFA) support.

## User Types

### 1. Regular User (`user`)
- Access to Profile Information
- Access to Security & Privacy settings
- Can manage marketing communications preferences
- Standard case search and dashboard features

### 2. Firm Admin (`firm_admin`)
- All regular user features
- Team Management access
- Billing and subscription management
- Firm Details management

## Features Implemented

### Authentication System
- Mock authentication with AuthContext
- Session management using localStorage
- Protected routes for dashboard pages
- Role-based access control

### Multi-Factor Authentication (MFA)
- Optional MFA setup for all users
- QR code generation for authenticator apps
- Backup codes for recovery
- Enable/disable MFA from security settings

### Settings Page Updates
- Dynamic tabs based on user role
- Profile Information (all users)
- Security & Privacy (all users)
  - MFA management
  - Password change
  - Marketing communications preferences
- Team Management (firm admins only)
- Billing (firm admins only)
- Firm Details (firm admins only)

### Navigation Updates
- Sidebar dynamically shows/hides menu items based on permissions
- Team Management and Billing only visible to firm admins
- Admin Panel only visible to super admin (admin@settletrack.com)

## Demo Credentials

### Firm Admin
- Email: john@lawfirm.com
- Password: password
- Role: firm_admin

### Regular User
- Email: jane@lawfirm.com
- Password: password
- Role: user

### MFA Testing
- When MFA is enabled, use code: 123456

## File Structure

```
src/
├── types/
│   └── user.ts                 # User types and interfaces
├── contexts/
│   └── auth-context.tsx        # Authentication context and provider
├── hooks/
│   └── use-permissions.ts      # Permissions hook for role-based access
├── components/
│   └── auth/
│       ├── mfa-setup-dialog.tsx    # MFA setup component
│       ├── mfa-verification.tsx    # MFA verification component
│       └── protected-route.tsx     # Protected route wrapper
└── app/
    ├── login/
    │   └── page.tsx            # Updated login page with MFA support
    ├── dashboard/
    │   ├── layout.tsx          # Updated with auth and role-based navigation
    │   ├── settings/
    │   │   └── page.tsx        # Updated with role-based tabs and MFA
    │   ├── team/
    │   │   └── page.tsx        # Updated team management (firm admins only)
    │   └── billing/
    │       └── page.tsx        # Updated billing page (firm admins only)
    └── layout.tsx              # Root layout with AuthProvider

```

## Implementation Notes

1. **Mock Implementation**: This is a mock implementation for demonstration. In production:
   - Replace mock authentication with real API calls
   - Use proper JWT tokens or session management
   - Implement real MFA with TOTP libraries
   - Connect to a real database for user management

2. **Security Considerations**:
   - Passwords should be hashed (bcrypt, argon2)
   - MFA secrets should be encrypted at rest
   - Session tokens should have expiration
   - Implement CSRF protection

3. **Future Enhancements**:
   - Email verification for new accounts
   - Password reset functionality
   - Remember device option for MFA
   - Activity logs and audit trails
   - More granular permissions system