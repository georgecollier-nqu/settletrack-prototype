export type UserRole = "user" | "firm_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  firmId?: string;
  firmName?: string;
  jobTitle?: string;
  status: "active" | "inactive";
  lastActive: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  marketingOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MFASetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface MFAVerification {
  code: string;
  rememberDevice?: boolean;
}