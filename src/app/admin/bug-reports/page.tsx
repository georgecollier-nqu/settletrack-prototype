"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Bug,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for bug reports
const mockBugReports = [
  {
    id: "BR001",
    caseId: "case1",
    caseName: "Smith v. MegaCorp Inc.",
    issueType: "incorrect_value",
    fieldPath: "settlementAmount",
    currentValue: "$5,500,000",
    suggestedValue: "$5,750,000",
    description:
      "The settlement amount appears to be incorrect. The final amended settlement agreement shows $5.75M, not $5.5M.",
    status: "pending",
    priority: "high",
    reportedAt: new Date("2024-01-15T10:30:00"),
    reportedBy: "user@example.com",
    resolution: null,
  },
  {
    id: "BR002",
    caseId: "case2",
    caseName: "Johnson v. DataCo LLC",
    issueType: "wrong_citation",
    fieldPath: "classSize",
    currentValue: "45,000",
    suggestedValue: "45,000",
    description:
      "The citation points to page 12, but the class size is actually mentioned on page 15 of the settlement agreement.",
    status: "pending",
    priority: "medium",
    reportedAt: new Date("2024-01-14T14:20:00"),
    reportedBy: "anonymous",
    resolution: null,
  },
  {
    id: "BR003",
    caseId: "case3",
    caseName: "Williams v. TechGiant Corp",
    issueType: "missing_data",
    fieldPath: "reimbursementRate",
    currentValue: "N/A",
    suggestedValue: "87%",
    description:
      "The reimbursement rate is missing but is clearly stated in the fairness hearing transcript.",
    status: "resolved",
    priority: "medium",
    reportedAt: new Date("2024-01-10T09:15:00"),
    reportedBy: "researcher@university.edu",
    resolution: {
      action: "accepted",
      notes:
        "Verified and updated the reimbursement rate to 87% based on the fairness hearing transcript page 45.",
      resolvedAt: new Date("2024-01-11T11:00:00"),
      resolvedBy: "admin@example.com",
    },
  },
];

const issueTypeLabels = {
  incorrect_value: "Incorrect Value",
  missing_data: "Missing Data",
  wrong_citation: "Wrong Citation",
  calculation_error: "Calculation Error",
  formatting_issue: "Formatting Issue",
  other: "Other",
};

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const;

export default function BugReportsPage() {
  const [selectedReport, setSelectedReport] = useState<
    (typeof mockBugReports)[0] | null
  >(null);
  const [resolutionDialog, setResolutionDialog] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const pendingReports = mockBugReports.filter((r) => r.status === "pending");
  const resolvedReports = mockBugReports.filter(
    (r) => r.status === "resolved" || r.status === "rejected",
  );

  const handleResolve = (action: "accept" | "reject") => {
    // TODO: Implement actual resolution logic
    console.log(
      "Resolving report:",
      selectedReport?.id,
      action,
      resolutionNotes,
    );
    setResolutionDialog(false);
    setResolutionNotes("");
  };

  return (
    <>
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-2">
              <Bug className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-serif font-bold">
                Bug Bounty Reports
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {pendingReports.length} pending reports
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Reports
                    </p>
                    <p className="text-2xl font-bold">
                      {mockBugReports.length}
                    </p>
                  </div>
                  <Bug className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pending Review
                    </p>
                    <p className="text-2xl font-bold text-warning">
                      {pendingReports.length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-warning/50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold text-success">
                      {
                        mockBugReports.filter((r) => r.status === "resolved")
                          .length
                      }
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success/50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      High Priority
                    </p>
                    <p className="text-2xl font-bold text-destructive">
                      {
                        mockBugReports.filter(
                          (r) =>
                            r.priority === "high" && r.status === "pending",
                        ).length
                      }
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-destructive/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bug Reports</CardTitle>
              <CardDescription>
                Review and manage data quality issues reported by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending ({pendingReports.length})
                  </TabsTrigger>
                  <TabsTrigger value="resolved">
                    Resolved ({resolvedReports.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case</TableHead>
                        <TableHead>Issue Type</TableHead>
                        <TableHead>Field</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Reported</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingReports.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-muted-foreground"
                          >
                            No pending reports
                          </TableCell>
                        </TableRow>
                      ) : (
                        pendingReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">
                              {report.caseName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {
                                  issueTypeLabels[
                                    report.issueType as keyof typeof issueTypeLabels
                                  ]
                                }
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {report.fieldPath}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  priorityColors[
                                    report.priority as keyof typeof priorityColors
                                  ]
                                }
                              >
                                {report.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(report.reportedAt, "MMM d, yyyy")}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedReport(report)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="resolved" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case</TableHead>
                        <TableHead>Issue Type</TableHead>
                        <TableHead>Field</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resolved</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resolvedReports.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-muted-foreground"
                          >
                            No resolved reports
                          </TableCell>
                        </TableRow>
                      ) : (
                        resolvedReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">
                              {report.caseName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {
                                  issueTypeLabels[
                                    report.issueType as keyof typeof issueTypeLabels
                                  ]
                                }
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {report.fieldPath}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  report.resolution?.action === "accepted"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {report.resolution?.action === "accepted"
                                  ? "Accepted"
                                  : "Rejected"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {report.resolution?.resolvedAt &&
                                format(
                                  report.resolution.resolvedAt,
                                  "MMM d, yyyy",
                                )}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedReport(report)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Report Details Dialog */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bug Report Details</DialogTitle>
            <DialogDescription>
              Review the reported issue and take appropriate action
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Case</Label>
                  <p className="mt-1 font-medium">{selectedReport.caseName}</p>
                </div>
                <div>
                  <Label>Issue Type</Label>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {
                        issueTypeLabels[
                          selectedReport.issueType as keyof typeof issueTypeLabels
                        ]
                      }
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Field</Label>
                  <p className="mt-1 font-mono text-sm">
                    {selectedReport.fieldPath}
                  </p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        priorityColors[
                          selectedReport.priority as keyof typeof priorityColors
                        ]
                      }
                    >
                      {selectedReport.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Value</Label>
                <div className="p-3 bg-muted rounded-md font-mono text-sm">
                  {selectedReport.currentValue}
                </div>
              </div>

              {selectedReport.suggestedValue && (
                <div className="space-y-2">
                  <Label>Suggested Value</Label>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md font-mono text-sm">
                    {selectedReport.suggestedValue}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Description</Label>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {selectedReport.description}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Reported By</Label>
                  <p className="mt-1">{selectedReport.reportedBy}</p>
                </div>
                <div>
                  <Label>Reported At</Label>
                  <p className="mt-1">
                    {format(selectedReport.reportedAt, "MMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>

              {selectedReport.resolution && (
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-medium">Resolution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          selectedReport.resolution.action === "accepted"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {selectedReport.resolution.action === "accepted"
                          ? "Accepted"
                          : "Rejected"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        by {selectedReport.resolution.resolvedBy} on{" "}
                        {format(
                          selectedReport.resolution.resolvedAt,
                          "MMM d, yyyy",
                        )}
                      </span>
                    </div>
                    <div className="p-3 bg-muted rounded-md text-sm">
                      {selectedReport.resolution.notes}
                    </div>
                  </div>
                </div>
              )}

              {selectedReport.status === "pending" && (
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedReport(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.open(
                        `/admin/cases/${selectedReport.caseId}`,
                        "_blank",
                      );
                    }}
                  >
                    View Case
                  </Button>
                  <Button onClick={() => setResolutionDialog(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Resolve
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolution Dialog */}
      <Dialog open={resolutionDialog} onOpenChange={setResolutionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Bug Report</DialogTitle>
            <DialogDescription>
              Provide resolution notes and choose an action
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resolution-notes">Resolution Notes *</Label>
              <Textarea
                id="resolution-notes"
                placeholder="Describe what action was taken..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setResolutionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleResolve("reject")}
              disabled={!resolutionNotes.trim()}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="default"
              onClick={() => handleResolve("accept")}
              disabled={!resolutionNotes.trim()}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept & Fix
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
