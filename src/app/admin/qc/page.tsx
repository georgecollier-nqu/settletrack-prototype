"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ClipboardCheck, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Mock data for QC reviews
const mockReviews = [
  {
    id: "1",
    caseId: "CASE-2024-001",
    patientName: "Jane Smith",
    status: "IN_REVIEW",
    reviewer: "Sarah Miller",
    assignedAt: new Date("2024-01-15T10:00:00"),
    modelOutput1: { name: "Gemini", version: "1.5-pro" },
    modelOutput2: { name: "GPT-4", version: "2024-01" },
  },
  {
    id: "2",
    caseId: "CASE-2024-002",
    patientName: "Robert Johnson",
    status: "REVIEWER_APPROVED",
    reviewer: "Mike Chen",
    assignedAt: new Date("2024-01-14T15:30:00"),
    reviewCompletedAt: new Date("2024-01-15T09:00:00"),
    modelOutput1: { name: "Gemini", version: "1.5-pro" },
    modelOutput2: { name: "GPT-4", version: "2024-01" },
  },
  {
    id: "3",
    caseId: "CASE-2024-003",
    patientName: "Maria Garcia",
    status: "PENDING",
    assignedAt: new Date("2024-01-15T14:00:00"),
    modelOutput1: { name: "Gemini", version: "1.5-pro" },
    modelOutput2: { name: "GPT-4", version: "2024-01" },
  },
];

const statusConfig = {
  PENDING: { label: "Pending", variant: "secondary" as const, icon: Clock },
  IN_REVIEW: { label: "In Review", variant: "default" as const, icon: ClipboardCheck },
  CHANGES_REQUESTED: { label: "Changes Requested", variant: "warning" as const, icon: AlertCircle },
  REVIEWER_APPROVED: { label: "Reviewer Approved", variant: "default" as const, icon: CheckCircle },
  SUPERVISOR_APPROVED: { label: "Supervisor Approved", variant: "success" as const, icon: CheckCircle },
  REJECTED: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
  COMPLETED: { label: "Completed", variant: "success" as const, icon: CheckCircle },
};

export default function QCDashboard() {
  const { user, canApproveChanges } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("my-reviews");

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch = review.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesTab = activeTab === "all-reviews" || 
      (activeTab === "my-reviews" && review.reviewer === user?.name) ||
      (activeTab === "pending-approval" && review.status === "REVIEWER_APPROVED");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const stats = {
    totalReviews: mockReviews.length,
    inProgress: mockReviews.filter(r => r.status === "IN_REVIEW").length,
    pendingApproval: mockReviews.filter(r => r.status === "REVIEWER_APPROVED").length,
    completed: mockReviews.filter(r => r.status === "COMPLETED").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">QC Workflow</h1>
        <p className="text-muted-foreground">Review and compare model outputs for quality control</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApproval}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>QC Reviews</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="REVIEWER_APPROVED">Reviewer Approved</SelectItem>
                  <SelectItem value="SUPERVISOR_APPROVED">Supervisor Approved</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
              <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
              {canApproveChanges() && (
                <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Models</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => {
                    const status = statusConfig[review.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    
                    return (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.caseId}</TableCell>
                        <TableCell>{review.patientName}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Badge variant="outline">{review.modelOutput1.name}</Badge>
                            <Badge variant="outline">{review.modelOutput2.name}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{review.reviewer || "Unassigned"}</TableCell>
                        <TableCell>
                          {format(review.assignedAt, "MMM d, yyyy HH:mm")}
                        </TableCell>
                        <TableCell>
                          <Button asChild size="sm">
                            <Link href={`/admin/qc/review/${review.id}`}>
                              {review.status === "PENDING" ? "Start Review" : "View"}
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}