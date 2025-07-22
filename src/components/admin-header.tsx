"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminRole } from "@/contexts/admin-role-context";
import { User, UserCog } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminHeaderProps {
  title?: string;
  children?: ReactNode;
}

export function AdminHeader({ title, children }: AdminHeaderProps) {
  const { role, setRole } = useAdminRole();

  return (
    <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          {title && <h1 className="text-2xl font-serif font-bold">{title}</h1>}
        </div>

        <div className="flex items-center gap-4">
          {/* Role Switcher */}
          <Tabs
            value={role}
            onValueChange={(value) =>
              setRole(value as "reviewer" | "supervisor")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviewer" className="gap-2">
                <User className="h-4 w-4" />
                Reviewer
              </TabsTrigger>
              <TabsTrigger value="supervisor" className="gap-2">
                <UserCog className="h-4 w-4" />
                Supervisor
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Optional children for custom elements */}
          {children}
        </div>
      </div>
    </header>
  );
}
