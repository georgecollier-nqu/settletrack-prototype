"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown";
import {
  Search,
  TrendingUp,
  FileText,
  Bookmark,
  Settings,
  Users,
  LogOut,
  HelpCircle,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Briefcase,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const isTeamLeader = true; // This would come from auth context

  // Mock data for recent activity
  const recentCases = [
    {
      id: "1",
      name: "In re Christie's Data Breach",
      court: "S.D.N.Y.",
      date: "2024-12-15",
      amount: "$8.5M",
    },
    {
      id: "2",
      name: "Smith v. TechCorp Privacy",
      court: "N.D. Cal.",
      date: "2024-12-10",
      amount: "$12.3M",
    },
    {
      id: "3",
      name: "Johnson Class Action",
      court: "E.D. Tex.",
      date: "2024-12-08",
      amount: "$5.2M",
    },
  ];

  const savedSearches = [
    { id: "1", name: "Data Breach > $10M", count: 156 },
    { id: "2", name: "California Class Actions", count: 89 },
    { id: "3", name: "2024 Settlements", count: 234 },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Quick search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <NotificationsDropdown />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john@lawfirm.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold">
                Welcome back, John
              </h2>
              <p className="text-muted-foreground mt-1">
                Here&apos;s what&apos;s happening with your settlement research
              </p>
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              New Search
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="!py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Cases Viewed
                    </p>
                    <p className="text-2xl font-bold mt-1">142</p>
                    <p className="text-xs text-success mt-1">+12% this month</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="!py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Saved Searches
                    </p>
                    <p className="text-2xl font-bold mt-1">8</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 active alerts
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Bookmark className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="!py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. Settlement
                    </p>
                    <p className="text-2xl font-bold mt-1">$8.7M</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your searches
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="!py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Team Members
                    </p>
                    <p className="text-2xl font-bold mt-1">12</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 active today
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Cases */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recently Viewed Cases</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/history">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCases.map((case_) => (
                      <div
                        key={case_.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <Link
                            href={`/cases/${case_.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {case_.name}
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {case_.court}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {case_.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {case_.amount}
                          </p>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/cases/${case_.id}`}>
                              View
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Saved Searches */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Searches</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/saved-searches">
                        Manage
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedSearches.map((search) => (
                      <Link
                        key={search.id}
                        href={`/cases/search?saved=${search.id}`}
                        className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{search.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {search.count} matching cases
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/cases/search">
                      <Search className="mr-2 h-4 w-4" />
                      Create New Search
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/cases/search">
                      <Search className="mr-2 h-4 w-4" />
                      Search Cases
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/cases/trends">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Trends
                    </Link>
                  </Button>
                  {isTeamLeader && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/dashboard/team">
                        <Users className="mr-2 h-4 w-4" />
                        Invite Team Member
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                What&apos;s happening in your firm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Sarah Johnson</span> saved a
                      new search for
                      <span className="font-medium">
                        {" "}
                        &quot;2024 Data Breach Settlements&quot;
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      New case added:{" "}
                      <span className="font-medium">Wilson v. DataCorp</span> -
                      $15.2M settlement
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Michael Chen</span> joined
                      your team
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
