"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  Search,
  TrendingUp,
  Bookmark,
  Settings,
  CreditCard,
  Users,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isTeamLeader = true; // This would come from auth context

  const isActivePath = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
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
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="SettleTrack"
                width={186}
                height={42}
                className="h-8 w-auto"
              />
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard"
                    className={getActiveClasses("/dashboard")}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard/cases/search"
                    className={getActiveClasses("/dashboard/cases/search")}
                  >
                    <Search className="h-5 w-5" />
                    Case Search
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard/cases/trends"
                    className={getActiveClasses("/dashboard/cases/trends")}
                  >
                    <TrendingUp className="h-5 w-5" />
                    Case Trends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard/saved-searches"
                    className={getActiveClasses("/dashboard/saved-searches")}
                  >
                    <Bookmark className="h-5 w-5" />
                    Saved Searches
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Separator */}
              <div className="my-4 border-t" />

              {isTeamLeader && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/dashboard/team"
                        className={getActiveClasses("/dashboard/team")}
                      >
                        <Users className="h-5 w-5" />
                        Team Management
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        href="/dashboard/billing"
                        className={getActiveClasses("/dashboard/billing")}
                      >
                        <CreditCard className="h-5 w-5" />
                        Billing
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard/settings"
                    className={getActiveClasses("/dashboard/settings")}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help at bottom */}
              <div className="mt-auto pt-4 border-t">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href="/dashboard/help"
                      className={getActiveClasses("/dashboard/help")}
                    >
                      <HelpCircle className="h-5 w-5" />
                      Help & Support
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
    </SidebarProvider>
  );
}
