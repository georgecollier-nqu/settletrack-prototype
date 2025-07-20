// Database schema for bug bounty reports
// This can be used with your preferred ORM (Prisma, Drizzle, etc.)

export interface BugReport {
  id: string
  caseId: string
  issueType: 'incorrect_value' | 'missing_data' | 'wrong_citation' | 'calculation_error' | 'formatting_issue' | 'other'
  fieldPath: string
  currentValue: string
  suggestedValue?: string
  description: string
  status: 'pending' | 'in_review' | 'resolved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  
  // Reporter information
  reportedBy: string // email or 'anonymous'
  reportedAt: Date
  
  // Resolution information
  resolution?: {
    action: 'accepted' | 'rejected'
    notes: string
    resolvedBy: string
    resolvedAt: Date
    
    // If accepted, track what was changed
    changes?: {
      field: string
      oldValue: string
      newValue: string
    }[]
  }
  
  // Future payment tracking (deferred for now)
  payment?: {
    amount: number
    currency: string
    status: 'pending' | 'approved' | 'paid' | 'rejected'
    paidAt?: Date
    transactionId?: string
  }
}

// SQL Schema Example (PostgreSQL)
export const bugReportsTableSQL = `
CREATE TABLE bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id VARCHAR(255) NOT NULL,
  issue_type VARCHAR(50) NOT NULL CHECK (issue_type IN ('incorrect_value', 'missing_data', 'wrong_citation', 'calculation_error', 'formatting_issue', 'other')),
  field_path VARCHAR(255) NOT NULL,
  current_value TEXT NOT NULL,
  suggested_value TEXT,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'resolved', 'rejected')),
  priority VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  
  -- Reporter information
  reported_by VARCHAR(255) NOT NULL,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Resolution information (stored as JSONB for flexibility)
  resolution JSONB,
  
  -- Payment information (for future use)
  payment JSONB,
  
  -- Indexes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

CREATE INDEX idx_bug_reports_case_id ON bug_reports(case_id);
CREATE INDEX idx_bug_reports_status ON bug_reports(status);
CREATE INDEX idx_bug_reports_priority ON bug_reports(priority);
CREATE INDEX idx_bug_reports_reported_at ON bug_reports(reported_at);
`;

// Prisma Schema Example
export const bugReportsPrismaSchema = `
model BugReport {
  id            String   @id @default(uuid())
  caseId        String
  issueType     IssueType
  fieldPath     String
  currentValue  String
  suggestedValue String?
  description   String
  status        BugReportStatus @default(PENDING)
  priority      Priority @default(MEDIUM)
  
  reportedBy    String
  reportedAt    DateTime @default(now())
  
  resolution    Json?
  payment       Json?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  case          Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
  
  @@index([caseId])
  @@index([status])
  @@index([priority])
  @@index([reportedAt])
}

enum IssueType {
  INCORRECT_VALUE
  MISSING_DATA
  WRONG_CITATION
  CALCULATION_ERROR
  FORMATTING_ISSUE
  OTHER
}

enum BugReportStatus {
  PENDING
  IN_REVIEW
  RESOLVED
  REJECTED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
`;