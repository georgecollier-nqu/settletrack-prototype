"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  Search,
  Clock,
  TrendingUp,
  UserPlus,
  Database,
  Activity,
  MousePointer,
  FileSearch,
  Download,
  Eye,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const signupData = [
  { date: "Jan 1", signups: 12 },
  { date: "Jan 2", signups: 19 },
  { date: "Jan 3", signups: 15 },
  { date: "Jan 4", signups: 25 },
  { date: "Jan 5", signups: 22 },
  { date: "Jan 6", signups: 30 },
  { date: "Jan 7", signups: 28 },
];

// Feature usage data
const featureUsageData = [
  { name: "Case Search", value: 1232, percentage: 35 },
  { name: "Data Export", value: 856, percentage: 24 },
  { name: "Advanced Filters", value: 642, percentage: 18 },
  { name: "Trend Analysis", value: 428, percentage: 12 },
  { name: "Citation Links", value: 321, percentage: 9 },
  { name: "Other", value: 71, percentage: 2 },
];

// Daily feature usage breakdown
const dailyFeatureData = [
  { date: "Jan 1", search: 145, export: 89, filters: 67, trends: 45, citations: 34 },
  { date: "Jan 2", search: 189, export: 112, filters: 89, trends: 67, citations: 45 },
  { date: "Jan 3", search: 178, export: 98, filters: 78, trends: 56, citations: 41 },
  { date: "Jan 4", search: 290, export: 156, filters: 123, trends: 89, citations: 67 },
  { date: "Jan 5", search: 245, export: 134, filters: 101, trends: 78, citations: 56 },
  { date: "Jan 6", search: 320, export: 178, filters: 134, trends: 98, citations: 78 },
  { date: "Jan 7", search: 298, export: 167, filters: 125, trends: 91, citations: 71 },
];

// Colors for pie chart
const COLORS = ["#2E7D5B", "#3B9671", "#4BAF87", "#5BC89D", "#6BE1B3", "#7BFAC9"];

export default function AdminAnalyticsPage() {
  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">
              Analytics Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/cases" className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cases
                  </CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    +180 from last month
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/cases?status=pending" className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Awaiting Approval
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    5 flagged for review
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/users" className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+48 this week</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/organizations?filter=active" className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Organizations
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">
                    12 on paid plans
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Signups Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  User Signups Per Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={signupData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="date"
                        className="text-xs"
                        tick={{ fill: "#71717A" }}
                      />
                      <YAxis className="text-xs" tick={{ fill: "#71717A" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E4E4E7",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="signups"
                        stroke="#2E7D5B"
                        strokeWidth={2}
                        dot={{ fill: "#2E7D5B", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Feature Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Feature Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={featureUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {featureUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E4E4E7",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value} uses`, "Total"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Usage Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Feature Usage Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyFeatureData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="date"
                      className="text-xs"
                      tick={{ fill: "#71717A" }}
                    />
                    <YAxis className="text-xs" tick={{ fill: "#71717A" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E4E4E7",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="search"
                      stroke="#2E7D5B"
                      strokeWidth={2}
                      dot={false}
                      name="Case Search"
                    />
                    <Line
                      type="monotone"
                      dataKey="export"
                      stroke="#3B9671"
                      strokeWidth={2}
                      dot={false}
                      name="Data Export"
                    />
                    <Line
                      type="monotone"
                      dataKey="filters"
                      stroke="#4BAF87"
                      strokeWidth={2}
                      dot={false}
                      name="Advanced Filters"
                    />
                    <Line
                      type="monotone"
                      dataKey="trends"
                      stroke="#5BC89D"
                      strokeWidth={2}
                      dot={false}
                      name="Trend Analysis"
                    />
                    <Line
                      type="monotone"
                      dataKey="citations"
                      stroke="#6BE1B3"
                      strokeWidth={2}
                      dot={false}
                      name="Citation Links"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Feature Usage Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  Most Used Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {featureUsageData.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{feature.name}</span>
                    <span className="text-sm font-medium">{feature.value.toLocaleString()} uses</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Feature Adoption Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Case Search</span>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Citation Links</span>
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend Analysis</span>
                  <span className="text-sm font-medium text-green-600">+8%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Features/User</span>
                  <span className="text-sm font-medium">3.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Daily Active Users</span>
                  <span className="text-sm font-medium">423</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Feature Discovery</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
