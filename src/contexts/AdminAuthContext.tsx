"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AdminUser } from "@/types/admin";

interface AdminAuthContextType {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  isHumanReviewer: boolean;
  isHumanSupervisor: boolean;
  login: (user: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  // Mock logged-in user - in production this would come from actual auth
  const [currentUser, setCurrentUser] = useState<AdminUser | null>({
    id: "1",
    name: "Jackie Admin",
    email: "jackie@settletrack.com",
    organization: "SettleTrack",
    role: "human_supervisor",
    status: "active",
    lastActive: "Just now",
  });

  const login = (user: AdminUser) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value: AdminAuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isHumanReviewer: currentUser?.role === "human_reviewer",
    isHumanSupervisor: currentUser?.role === "human_supervisor",
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
