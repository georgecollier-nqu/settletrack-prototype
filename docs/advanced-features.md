# Advanced Features Documentation

## Overview

This document describes the advanced features added to the Case Overview system:

1. **Bug Bounty Feature** - Allow users to report data quality issues
2. **PDF Deep Linking** - Click citation numbers to navigate directly to source documents

## Bug Bounty Feature

### User Interface

#### Report Issue Button
- Located in the case overview header
- Available on all case detail pages
- Opens a dialog for reporting issues

#### Report Issue Dialog
Users can report the following issue types:
- Incorrect Value
- Missing Data
- Wrong Citation
- Calculation Error
- Formatting Issue
- Other

Required fields:
- Issue Type
- Description

Optional fields:
- Suggested Value
- Email (for updates)

### Admin Interface

#### Bug Reports Dashboard (`/admin/bug-reports`)
- View all submitted bug reports
- Filter by status (Pending, Resolved)
- Review report details
- Accept or reject reports with resolution notes

#### Report Management
- Priority assignment (High, Medium, Low)
- Resolution tracking
- Audit trail of actions

### Implementation Details

#### Components
- `/src/components/bug-bounty/report-issue-button.tsx` - Trigger button
- `/src/components/bug-bounty/report-issue-dialog.tsx` - Report form dialog

#### API
- `POST /api/bug-reports` - Submit new bug report
- `GET /api/bug-reports` - List bug reports (admin only)

#### Database Schema
See `/src/lib/schema/bug-reports.ts` for:
- TypeScript interfaces
- SQL schema
- Prisma schema example

## PDF Deep Linking

### Features

#### Click-to-View Citations
- Click any cited value to open the source PDF
- Automatically navigates to the correct page
- Highlights the quoted text

#### PDF Viewer
- Full-featured PDF viewer dialog
- Page navigation controls
- Zoom in/out functionality
- Download option
- Highlight support for quoted text

### Implementation Details

#### Components
- `/src/components/pdf-viewer/pdf-viewer.tsx` - PDF viewer component
- Updated citation components to support deep linking:
  - `/src/components/ui/citation-tooltip.tsx`
  - `/src/components/ui/stat-with-tooltip.tsx`
  - `/src/components/ui/value-with-tooltip.tsx`

#### Document Mapping
- `/src/lib/document-mapping.ts` - Maps document names to URLs
- `/src/hooks/use-pdf-viewer.ts` - Hook for managing PDF viewer state

### Usage Example

```tsx
import { StatWithTooltip } from "@/components/ui/stat-with-tooltip"
import { usePDFViewer } from "@/hooks/use-pdf-viewer"

function CaseOverview({ caseId }) {
  const { openPDFViewer, getDocumentUrlForCitation } = usePDFViewer({ caseId })
  
  return (
    <StatWithTooltip
      label="Settlement Amount"
      value="$5,750,000"
      citation={citation}
      documentUrl={getDocumentUrlForCitation(citation)}
      onViewSource={() => citation && openPDFViewer(citation)}
    />
  )
}
```

## Integration Notes

### PDF Storage
In production, PDF documents should be:
1. Stored in a secure cloud storage service (S3, Azure Blob, etc.)
2. Served through a CDN for performance
3. Protected with appropriate access controls

### Bug Report Workflow
1. User reports issue → Status: Pending
2. Admin reviews → Status: In Review
3. Admin resolves → Status: Resolved/Rejected
4. (Future) Payment processing for accepted reports

### Security Considerations
- Validate all bug report submissions
- Implement rate limiting to prevent spam
- Authenticate admin access to bug reports
- Secure PDF access with signed URLs

## Future Enhancements

### Bug Bounty
- Automated payment processing
- Reputation system for reporters
- Batch processing of similar reports
- Integration with case update workflow

### PDF Viewer
- Full PDF.js integration for better rendering
- Text search within PDFs
- Annotation support
- Multi-document comparison view
- OCR for scanned documents

## Testing

### Manual Testing Steps

1. **Bug Bounty Feature**
   - Navigate to any case detail page
   - Click "Report Issue" button
   - Fill out the form and submit
   - Check admin panel at `/admin/bug-reports`
   - Test accept/reject workflow

2. **PDF Deep Linking**
   - Navigate to a case with citations
   - Click on any underlined cited value
   - Verify PDF viewer opens to correct page
   - Test navigation and zoom controls
   - Verify highlight appears for quoted text

### Automated Testing
- Unit tests for validation logic
- Integration tests for API endpoints
- E2E tests for user workflows