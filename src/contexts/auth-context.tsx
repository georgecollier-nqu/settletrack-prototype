"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User, AuthState, LoginCredentials, MFAVerification, MFASetup } from "@/types/user";
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ requiresMFA: boolean }>;
  verifyMFA: (verification: MFAVerification) => Promise<void>;
  logout: () => void;
  setupMFA: () => Promise<MFASetup>;
  enableMFA: (code: string) => Promise<void>;
  disableMFA: (password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@lawfirm.com",
    avatar: "/avatar.jpg",
    role: "firm_admin",
    firmId: "firm1",
    firmName: "Smith & Associates Law Firm",
    jobTitle: "Managing Partner",
    status: "active",
    lastActive: "Just now",
    mfaEnabled: false,
    marketingOptIn: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@lawfirm.com",
    role: "user",
    firmId: "firm1",
    firmName: "Smith & Associates Law Firm",
    jobTitle: "Senior Associate",
    status: "active",
    lastActive: "2 hours ago",
    mfaEnabled: false,
    marketingOptIn: false,
    createdAt: "2024-02-20",
    updatedAt: "2024-12-10",
  },
];

// Mock function to generate QR code (in real app, this would call backend)
const generateMockQRCode = (email: string, secret: string) => {
  // This is a mock - in reality, you'd use a library like qrcode to generate actual QR codes
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/SettleTrack:${email}?secret=${secret}&issuer=SettleTrack`;
};

// Mock function to generate backup codes
const generateBackupCodes = () => {
  const codes = [];
  for (let i = 0; i < 8; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
  }
  return codes;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    mfaRequired: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        mfaRequired: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // Mock authentication
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === "password") { // Mock password check
      if (user.mfaEnabled) {
        setAuthState({
          user,
          isAuthenticated: false,
          isLoading: false,
          mfaRequired: true,
        });
        return { requiresMFA: true };
      } else {
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          mfaRequired: false,
        });
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
        return { requiresMFA: false };
      }
    }
    
    throw new Error("Invalid credentials");
  }, [router]);

  const verifyMFA = useCallback(async (verification: MFAVerification) => {
    // Mock MFA verification
    if (verification.code === "123456" && authState.user) { // Mock code check
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        mfaRequired: false,
      }));
      localStorage.setItem("user", JSON.stringify(authState.user));
      router.push("/dashboard");
    } else {
      throw new Error("Invalid MFA code");
    }
  }, [authState.user, router]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      mfaRequired: false,
    });
    router.push("/login");
  }, [router]);

  const setupMFA = useCallback(async (): Promise<MFASetup> => {
    // Generate a mock secret (in reality, this would come from the backend)
    const secret = Math.random().toString(36).substring(2, 20).toUpperCase();
    const qrCode = generateMockQRCode(authState.user?.email || "", secret);
    const backupCodes = generateBackupCodes();

    return {
      secret,
      qrCode,
      backupCodes,
    };
  }, [authState.user]);

  const enableMFA = useCallback(async (code: string) => {
    if (code === "123456" && authState.user) { // Mock verification
      const updatedUser = { ...authState.user, mfaEnabled: true };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      throw new Error("Invalid verification code");
    }
  }, [authState.user]);

  const disableMFA = useCallback(async (password: string) => {
    if (password === "password" && authState.user) { // Mock password check
      const updatedUser = { ...authState.user, mfaEnabled: false };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      throw new Error("Invalid password");
    }
  }, [authState.user]);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        verifyMFA,
        logout,
        setupMFA,
        enableMFA,
        disableMFA,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}