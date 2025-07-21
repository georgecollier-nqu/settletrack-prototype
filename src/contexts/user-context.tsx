"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "regular_user" | "firm_admin";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  firmId: string;
  firmName: string;
  mfaEnabled: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user data for prototype
  const [user, setUser] = useState<User | null>({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@lawfirm.com",
    role: "firm_admin", // Can be changed to "regular_user" for testing
    firmId: "firm1",
    firmName: "Acme Law Firm",
    mfaEnabled: false,
  });

  const isAdmin = user?.role === "firm_admin";

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
