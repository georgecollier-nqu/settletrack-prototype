export type AdminRole = "human_reviewer" | "human_supervisor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  organization: string;
  role: AdminRole;
  status: "active" | "inactive";
  lastActive: string;
  addedBy?: string;
  addedAt?: string;
}

export interface ModelOutput {
  model: "gemini" | "gpt";
  value: unknown;
  displayValue?: string;
  source: {
    document: string;
    page: number;
    text: string;
  };
  confidence?: number;
}

export interface FieldComparison {
  fieldKey: string;
  label: string;
  geminiOutput: ModelOutput;
  gptOutput: ModelOutput;
  selectedModel?: "gemini" | "gpt";
  reviewerEdit?: {
    value: unknown;
    displayValue?: string;
    source: {
      document: string;
      page: number;
      text: string;
    };
  };
}

export interface ChangeLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: AdminRole;
  fieldKey: string;
  fieldLabel: string;
  action: "edit" | "select" | "approve" | "reject";
  before: {
    value: unknown;
    displayValue?: string;
    source?: {
      document: string;
      page: number;
      text: string;
    };
  };
  after: {
    value: unknown;
    displayValue?: string;
    source?: {
      document: string;
      page: number;
      text: string;
    };
  };
  reason: string;
}

export interface QCWorkflowCase {
  id: string;
  caseData: {
    id: string;
    title: string;
    court: string;
    dateAdded: string;
  };
  fieldComparisons: FieldComparison[];
  changeLogs: ChangeLog[];
  reviewStatus:
    | "pending_review"
    | "under_review"
    | "pending_approval"
    | "approved"
    | "rejected";
  reviewerId?: string;
  reviewerName?: string;
  reviewStartedAt?: string;
  reviewCompletedAt?: string;
  supervisorId?: string;
  supervisorName?: string;
  approvalDate?: string;
  rejectionReason?: string;
}
