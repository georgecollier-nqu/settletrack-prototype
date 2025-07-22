"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type AdminRole = "reviewer" | "supervisor";

interface AdminRoleContextType {
  role: AdminRole;
  setRole: (role: AdminRole) => void;
}

const AdminRoleContext = createContext<AdminRoleContextType | undefined>(
  undefined,
);

export function AdminRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AdminRole>("reviewer");

  return (
    <AdminRoleContext.Provider value={{ role, setRole }}>
      {children}
    </AdminRoleContext.Provider>
  );
}

export function useAdminRole() {
  const context = useContext(AdminRoleContext);
  if (context === undefined) {
    throw new Error("useAdminRole must be used within a AdminRoleProvider");
  }
  return context;
}
