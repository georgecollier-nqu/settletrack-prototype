"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import {
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import type { Flag as FlagType } from "@/app/api/flags/route";

export default function FlagsAdminPage() {
  const [flags, setFlags] = useState<FlagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<FlagType | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const response = await fetch("/api/flags");
      const data = await response.json();
      setFlags(data.flags || []);
    } catch {
      toast.error("Failed to fetch flags");
    } finally {
      setLoading(false);
    }
  };

  const updateFlagStatus = async (
    flagId: string,
    status: FlagType["status"],
  ) => {
    try {
      const response = await fetch("/api/flags", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: flagId,
          status,
          resolvedBy: "Admin", // In production, use actual user
          resolutionNotes: resolutionNotes || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to update flag");

      toast.success(`Flag ${status}`);
      setSelectedFlag(null);
      setResolutionNotes("");
      fetchFlags();
    } catch {
      toast.error("Failed to update flag status");
    }
  };

  const getStatusBadge = (status: FlagType["status"]) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock },
      reviewing: { variant: "default" as const, icon: AlertCircle },
      resolved: { variant: "default" as const, icon: CheckCircle },
      rejected: { variant: "destructive" as const, icon: XCircle },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getFlagTypeBadge = (type: string) => {
    const typeLabels: Record<string, string> = {
      "incorrect-data": "Incorrect Data",
      "missing-information": "Missing Information",
      "outdated-information": "Outdated Information",
      "citation-issue": "Citation Issue",
      "calculation-error": "Calculation Error",
      other: "Other",
    };

    return <Badge variant="outline">{typeLabels[type] || type}</Badge>;
  };

  const filterFlagsByStatus = (status: string) => {
    if (status === "all") return flags;
    return flags.filter((flag) => flag.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-orange-500" />
            <h1 className="text-xl font-serif font-bold">Flagged Issues</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Flags</p>
                    <p className="text-2xl font-bold">{flags.length}</p>
                  </div>
                  <Flag className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {flags.filter((f) => f.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {flags.filter((f) => f.status === "resolved").length}
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                      {flags.filter((f) => f.status === "rejected").length}
                    </p>
                  </div>
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flags Table */}
          <Card>
            <CardHeader>
              <CardTitle>Flagged Issues</CardTitle>
              <CardDescription>
                Review and manage user-reported data quality issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">
                    Pending ({filterFlagsByStatus("pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="reviewing">
                    Reviewing ({filterFlagsByStatus("reviewing").length})
                  </TabsTrigger>
                  <TabsTrigger value="resolved">
                    Resolved ({filterFlagsByStatus("resolved").length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejected ({filterFlagsByStatus("rejected").length})
                  </TabsTrigger>
                  <TabsTrigger value="all">All ({flags.length})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading flags...
                    </div>
                  ) : filterFlagsByStatus(activeTab).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No flags found in this category
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Case</TableHead>
                          <TableHead>Issue Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterFlagsByStatus(activeTab).map((flag) => (
                          <TableRow key={flag.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{flag.caseName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {flag.caseId}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getFlagTypeBadge(flag.flagType)}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate">{flag.description}</p>
                              {flag.fieldContext?.fieldName && (
                                <p className="text-sm text-muted-foreground">
                                  Field: {flag.fieldContext.fieldName}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(flag.status)}</TableCell>
                            <TableCell className="text-sm">
                              {formatDate(flag.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedFlag(flag)}
                                >
                                  Review
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={`/dashboard/cases/${flag.caseId}`}
                                    target="_blank"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Review Dialog */}
      <Dialog
        open={!!selectedFlag}
        onOpenChange={(open) => !open && setSelectedFlag(null)}
      >
        {selectedFlag && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Flagged Issue</DialogTitle>
              <DialogDescription>
                Review the details and take appropriate action
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Case</Label>
                  <p className="text-sm">{selectedFlag.caseName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFlag.caseId}
                  </p>
                </div>
                <div>
                  <Label>Issue Type</Label>
                  <div className="mt-1">
                    {getFlagTypeBadge(selectedFlag.flagType)}
                  </div>
                </div>
              </div>

              {selectedFlag.fieldContext && (
                <div>
                  <Label>Field Information</Label>
                  <p className="text-sm">
                    {selectedFlag.fieldContext.fieldName}
                    {selectedFlag.fieldContext.fieldValue &&
                      `: ${selectedFlag.fieldContext.fieldValue}`}
                  </p>
                </div>
              )}

              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap">
                  {selectedFlag.description}
                </p>
              </div>

              <div>
                <Label>Submitted</Label>
                <p className="text-sm">
                  {formatDate(selectedFlag.createdAt)} by{" "}
                  {selectedFlag.userId || "Anonymous"}
                </p>
              </div>

              <div>
                <Label>Current Status</Label>
                <div className="mt-1">
                  {getStatusBadge(selectedFlag.status)}
                </div>
              </div>

              {(selectedFlag.status === "resolved" ||
                selectedFlag.status === "rejected") &&
                selectedFlag.resolutionNotes && (
                  <div>
                    <Label>Resolution Notes</Label>
                    <p className="text-sm mt-1 whitespace-pre-wrap">
                      {selectedFlag.resolutionNotes}
                    </p>
                  </div>
                )}

              {selectedFlag.status === "pending" && (
                <div>
                  <Label htmlFor="resolution-notes">
                    Resolution Notes (Optional)
                  </Label>
                  <Textarea
                    id="resolution-notes"
                    placeholder="Add notes about how this issue was addressed..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedFlag(null)}>
                Cancel
              </Button>
              {selectedFlag.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateFlagStatus(selectedFlag.id, "reviewing")
                    }
                  >
                    Mark as Reviewing
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      updateFlagStatus(selectedFlag.id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() =>
                      updateFlagStatus(selectedFlag.id, "resolved")
                    }
                  >
                    Resolve
                  </Button>
                </>
              )}
              {selectedFlag.status === "reviewing" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      updateFlagStatus(selectedFlag.id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() =>
                      updateFlagStatus(selectedFlag.id, "resolved")
                    }
                  >
                    Resolve
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
