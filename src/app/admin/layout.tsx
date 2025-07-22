"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AdminRoleProvider, useAdminRole } from "@/contexts/admin-role-context";
import { AdminRoleSwitcher } from "@/components/admin-role-switcher";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart,
  Users,
  FileText,
  Shield,
  Building,
  CreditCard,
  Upload,
  CheckSquare,
  Flag,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { role } = useAdminRole();
  const { isHumanSupervisor } = useAdminAuth();

  const isActivePath = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.startsWith(path)) return true;
    return false;
  };

  const getActiveClasses = (path: string) => {
    return isActivePath(path)
      ? "flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary text-primary font-medium"
      : "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50";
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Image
                  src="/logo.png"
                  alt="SettleTrack"
                  width={186}
                  height={42}
                  className="h-8 w-auto"
                />
              </Link>
              <span className="text-xs font-medium text-muted-foreground bg-primary/10 text-primary px-2 py-1 rounded">
                ADMIN
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              {/* Reviewer menu items - QC workflow only */}
              {role === "reviewer" && !isHumanSupervisor && (
                <>
                  <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Quality Control
                  </p>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/qc-workflow"
                        className={getActiveClasses("/admin/qc-workflow")}
                      >
                        <CheckSquare className="h-5 w-5" />
                        QC Workflow
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/qc"
                        className={getActiveClasses("/admin/qc")}
                      >
                        <FileText className="h-5 w-5" />
                        QC Reviews
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Supervisor menu items - Full admin access */}
              {(role === "supervisor" || isHumanSupervisor) && (
                <>
                  <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    QC Management
                  </p>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/qc-workflow"
                        className={getActiveClasses("/admin/qc-workflow")}
                      >
                        <CheckSquare className="h-5 w-5" />
                        QC Workflow
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/qc"
                        className={getActiveClasses("/admin/qc")}
                      >
                        <FileText className="h-5 w-5" />
                        QC Reviews
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <div className="my-4 border-t pt-4">
                    <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Administration
                    </p>
                  </div>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin"
                        className={getActiveClasses("/admin")}
                      >
                        <BarChart className="h-5 w-5" />
                        Analytics
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/users"
                        className={getActiveClasses("/admin/users")}
                      >
                        <Users className="h-5 w-5" />
                        Users
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/cases"
                        className={getActiveClasses("/admin/cases")}
                      >
                        <FileText className="h-5 w-5" />
                        Cases
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/flags"
                        className={getActiveClasses("/admin/flags")}
                      >
                        <Flag className="h-5 w-5" />
                        Flagged Issues
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/organizations"
                        className={getActiveClasses("/admin/organizations")}
                      >
                        <Building className="h-5 w-5" />
                        Organizations
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/plans"
                        className={getActiveClasses("/admin/plans")}
                      >
                        <CreditCard className="h-5 w-5" />
                        Plans
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/admin/import"
                        className={getActiveClasses("/admin/import")}
                      >
                        <Upload className="h-5 w-5" />
                        Import
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Return to main app */}
              <div className="mt-auto pt-4 border-t">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                    >
                      <Shield className="h-5 w-5" />
                      Exit Admin
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content - Pages handle their own header and content */}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>

      {/* Floating Role Switcher */}
      <AdminRoleSwitcher />
    </SidebarProvider>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminRoleProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminRoleProvider>
    </AdminAuthProvider>
  );
}
