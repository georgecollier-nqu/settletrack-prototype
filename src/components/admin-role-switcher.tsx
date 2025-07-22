"use client";

import { useAdminRole } from "@/contexts/admin-role-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, UserCog } from "lucide-react";

export function AdminRoleSwitcher() {
  const { role, setRole } = useAdminRole();

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 z-50">
      <Label className="text-xs font-medium mb-2 block">
        Demo: Switch Admin Role
      </Label>
      <Select
        value={role}
        onValueChange={(value) => setRole(value as "reviewer" | "supervisor")}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reviewer">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <div>
                <div className="font-medium">Human Reviewer</div>
                <div className="text-xs text-muted-foreground">
                  QC workflow access only
                </div>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="supervisor">
            <div className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <div>
                <div className="font-medium">Human Supervisor</div>
                <div className="text-xs text-muted-foreground">
                  Full admin privileges
                </div>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
