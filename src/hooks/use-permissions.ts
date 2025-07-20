import { useAuth } from "@/contexts/auth-context";

interface Permissions {
  canAccessTeamManagement: boolean;
  canAccessBilling: boolean;
  canAccessFirmDetails: boolean;
  canManageUsers: boolean;
  canViewAllCases: boolean;
  canEditFirmSettings: boolean;
}

export function usePermissions(): Permissions {
  const { user } = useAuth();

  if (!user) {
    return {
      canAccessTeamManagement: false,
      canAccessBilling: false,
      canAccessFirmDetails: false,
      canManageUsers: false,
      canViewAllCases: false,
      canEditFirmSettings: false,
    };
  }

  const isFirmAdmin = user.role === "firm_admin";

  return {
    canAccessTeamManagement: isFirmAdmin,
    canAccessBilling: isFirmAdmin,
    canAccessFirmDetails: isFirmAdmin,
    canManageUsers: isFirmAdmin,
    canViewAllCases: true, // Both roles can view cases
    canEditFirmSettings: isFirmAdmin,
  };
}
