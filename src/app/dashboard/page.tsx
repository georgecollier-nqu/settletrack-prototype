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
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Search,
  FileText,
  Bookmark,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const savedSearches = [
    { id: "1", name: "Data Breach > $10M", count: 156 },
    { id: "2", name: "California Class Actions", count: 89 },
    { id: "3", name: "2024 Settlements", count: 234 },
  ];

  return (
    <>
      <DashboardHeader title="Dashboard">
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
      </DashboardHeader>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Saved Searches */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Searches</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/saved-searches">
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
                      href={`/dashboard/cases/search?saved=${search.id}`}
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
                  <Link href="/dashboard/cases/search">
                    <Search className="mr-2 h-4 w-4" />
                    Create New Search
                  </Link>
                </Button>
              </CardContent>
            </Card>

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
                        <span className="font-medium">Sarah Johnson</span> saved
                        a new search for
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
                        <span className="font-medium">Wilson v. DataCorp</span>{" "}
                        - $15.2M settlement
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
        </div>
      </main>
    </>
  );
}
