"use client";

import { useUser } from "@/contexts/user-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Shield } from "lucide-react";

export function RoleSwitcher() {
  const { user, setUser } = useUser();

  const handleRoleChange = (newRole: string) => {
    if (user) {
      setUser({
        ...user,
        role: newRole as "regular_user" | "firm_admin",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 z-50">
      <Label className="text-xs font-medium mb-2 block">
        Demo: Switch User Role
      </Label>
      <Select
        value={user?.role || "regular_user"}
        onValueChange={handleRoleChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="regular_user">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Regular User
            </div>
          </SelectItem>
          <SelectItem value="firm_admin">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Firm Admin
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
