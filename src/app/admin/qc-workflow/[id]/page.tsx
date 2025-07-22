"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  FileText,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Check,
  AlertCircle,
  Sparkles,
  Brain,
  History,
  User,
  Calendar,
  CheckCircle,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { FieldComparison, ChangeLog } from "@/types/admin";

// Mock data for dual model outputs
const generateMockComparisons = (): FieldComparison[] => {
  return [
    {
      fieldKey: "settlementAmount",
      label: "Total Settlement Amount",
      geminiOutput: {
        model: "gemini",
        value: 2500000,
        displayValue: "$2,500,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 12,
          text: "...the total settlement fund shall be TWO MILLION FIVE HUNDRED THOUSAND DOLLARS ($2,500,000)...",
        },
        confidence: 0.95,
      },
      gptOutput: {
        model: "gpt",
        value: 2800000,
        displayValue: "$2,800,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 14,
          text: "...total settlement including all fees: $2,800,000...",
        },
        confidence: 0.88,
      },
    },
    {
      fieldKey: "classSize",
      label: "Class Size",
      geminiOutput: {
        model: "gemini",
        value: 15000,
        displayValue: "15,000",
        source: {
          document: "notice_of_class.pdf",
          page: 3,
          text: "...approximately 15,000 individuals...",
        },
        confidence: 0.92,
      },
      gptOutput: {
        model: "gpt",
        value: 15000,
        displayValue: "15,000",
        source: {
          document: "notice_of_class.pdf",
          page: 3,
          text: "...approximately 15,000 individuals...",
        },
        confidence: 0.94,
      },
    },
    {
      fieldKey: "attorneyFeesPercentage",
      label: "Attorney Fees Percentage",
      geminiOutput: {
        model: "gemini",
        value: 33.3,
        displayValue: "33.3%",
        source: {
          document: "settlement_agreement.pdf",
          page: 18,
          text: "...fees not to exceed one-third (33.3%)...",
        },
        confidence: 0.98,
      },
      gptOutput: {
        model: "gpt",
        value: 30,
        displayValue: "30%",
        source: {
          document: "settlement_agreement.pdf",
          page: 18,
          text: "...attorneys' fees of thirty percent (30%)...",
        },
        confidence: 0.85,
      },
    },
  ];
};

const mockDocuments = [
  { name: "complaint.pdf", size: "2.3 MB" },
  { name: "settlement_agreement.pdf", size: "1.8 MB" },
  { name: "notice_of_class.pdf", size: "856 KB" },
];

export default function QCWorkflowDetailPage() {
  const router = useRouter();
  const { currentUser, isHumanSupervisor } = useAdminAuth();

  const [comparisons, setComparisons] = useState<FieldComparison[]>(
    generateMockComparisons(),
  );
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editValues, setEditValues] = useState({
    value: "",
    document: "",
    page: "",
    text: "",
    reason: "",
  });
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);

  const currentComparison = comparisons[currentFieldIndex];

  const handleSelectModel = (model: "gemini" | "gpt") => {
    const updatedComparisons = [...comparisons];
    updatedComparisons[currentFieldIndex].selectedModel = model;
    setComparisons(updatedComparisons);

    // Add to change log
    const changeLog: ChangeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: currentUser?.id || "",
      userName: currentUser?.name || "",
      userRole: currentUser?.role || "human_reviewer",
      fieldKey: currentComparison.fieldKey,
      fieldLabel: currentComparison.label,
      action: "select",
      before: {
        value:
          currentComparison.selectedModel === "gemini"
            ? currentComparison.gptOutput.value
            : currentComparison.geminiOutput.value,
      },
      after: {
        value:
          model === "gemini"
            ? currentComparison.geminiOutput.value
            : currentComparison.gptOutput.value,
      },
      reason: `Selected ${model.toUpperCase()} model output`,
    };
    setChangeLogs([...changeLogs, changeLog]);

    console.log(
      `Selected ${model.toUpperCase()} output for ${currentComparison.label}`,
    );
  };

  const handleEditField = () => {
    const selectedOutput =
      currentComparison.selectedModel === "gemini"
        ? currentComparison.geminiOutput
        : currentComparison.selectedModel === "gpt"
          ? currentComparison.gptOutput
          : currentComparison.reviewerEdit
            ? currentComparison.reviewerEdit
            : currentComparison.geminiOutput;

    setEditValues({
      value: selectedOutput.value?.toString() || "",
      document: selectedOutput.source?.document || "",
      page: selectedOutput.source?.page?.toString() || "",
      text: selectedOutput.source?.text || "",
      reason: "",
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedComparisons = [...comparisons];
    const previousValue =
      currentComparison.reviewerEdit?.value ||
      (currentComparison.selectedModel === "gemini"
        ? currentComparison.geminiOutput.value
        : currentComparison.gptOutput.value);

    updatedComparisons[currentFieldIndex].reviewerEdit = {
      value: editValues.value,
      displayValue: formatValue(editValues.value, currentComparison.fieldKey),
      source: {
        document: editValues.document,
        page: parseInt(editValues.page),
        text: editValues.text,
      },
    };
    updatedComparisons[currentFieldIndex].selectedModel = undefined;
    setComparisons(updatedComparisons);

    // Add to change log
    const changeLog: ChangeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: currentUser?.id || "",
      userName: currentUser?.name || "",
      userRole: currentUser?.role || "human_reviewer",
      fieldKey: currentComparison.fieldKey,
      fieldLabel: currentComparison.label,
      action: "edit",
      before: {
        value: previousValue,
        displayValue: formatValue(previousValue, currentComparison.fieldKey),
      },
      after: {
        value: editValues.value,
        displayValue: formatValue(editValues.value, currentComparison.fieldKey),
        source: {
          document: editValues.document,
          page: parseInt(editValues.page),
          text: editValues.text,
        },
      },
      reason: editValues.reason,
    };
    setChangeLogs([...changeLogs, changeLog]);

    setShowEditDialog(false);
    console.log(`Updated ${currentComparison.label} with custom value`);
  };

  const formatValue = (value: unknown, fieldKey: string): string => {
    if (fieldKey.includes("Amount") || fieldKey.includes("Compensation")) {
      return `$${parseInt(String(value)).toLocaleString()}`;
    }
    if (fieldKey.includes("Percentage")) {
      return `${value}%`;
    }
    if (fieldKey.includes("Size") || fieldKey.includes("Hours")) {
      return parseInt(String(value)).toLocaleString();
    }
    return value?.toString() || "";
  };

  const handleNext = () => {
    if (currentFieldIndex < comparisons.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  const handleSubmitForApproval = () => {
    console.log("Case has been submitted for supervisor approval");
    router.push("/admin/qc-workflow");
  };

  const handleApprove = () => {
    const changeLog: ChangeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: currentUser?.id || "",
      userName: currentUser?.name || "",
      userRole: "human_supervisor",
      fieldKey: "case",
      fieldLabel: "Case Approval",
      action: "approve",
      before: { value: "pending_approval" },
      after: { value: "approved" },
      reason: approvalNotes,
    };
    setChangeLogs([...changeLogs, changeLog]);

    setShowApprovalDialog(false);
    console.log("Case has been approved and saved to database");
    router.push("/admin/qc-workflow");
  };

  const getModelIcon = (model: "gemini" | "gpt") => {
    return model === "gemini" ? (
      <Sparkles className="h-4 w-4" />
    ) : (
      <Brain className="h-4 w-4" />
    );
  };

  // Confidence badge removed per requirements
  // const getConfidenceBadge = (confidence?: number) => {
  //   if (!confidence) return null;
  //   const variant =
  //     confidence >= 0.9
  //       ? "default"
  //       : confidence >= 0.8
  //         ? "secondary"
  //         : "outline";
  //   return (
  //     <Badge variant={variant} className="text-xs">
  //       {Math.round(confidence * 100)}%
  //     </Badge>
  //   );
  // };

  return (
    <TooltipProvider>
      <>
        {/* Header */}
        <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/qc-workflow")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to QC Workflow
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChangeLog(true)}
              className="gap-2"
            >
              <History className="h-4 w-4" />
              Change Log ({changeLogs.length})
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Case Title */}
            <div>
              <h1 className="text-2xl font-serif font-bold">
                QC Review: SET-123456-A
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                In re Data Breach Litigation
              </p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Review Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentFieldIndex + 1} of {comparisons.length} fields
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${((currentFieldIndex + 1) / comparisons.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Documents Reference */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-3">
                Reference Documents
              </h3>
              <div className="flex gap-3">
                {mockDocuments.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                    <span className="text-muted-foreground">({doc.size})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Comparison */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {currentComparison.label}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentFieldIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentFieldIndex === comparisons.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Model Outputs Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gemini Output */}
                  <div
                    className={`relative rounded-lg border-2 p-4 transition-all ${
                      currentComparison.selectedModel === "gemini"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getModelIcon("gemini")}
                        <span className="font-medium">Gemini Output</span>
                      </div>
                      <Button
                        variant={
                          currentComparison.selectedModel === "gemini"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleSelectModel("gemini")}
                        disabled={!!currentComparison.reviewerEdit}
                      >
                        {currentComparison.selectedModel === "gemini" ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-semibold">
                        {currentComparison.geminiOutput.displayValue}
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-gray-50 rounded p-3 space-y-1 text-sm cursor-pointer">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span className="font-medium">
                                {currentComparison.geminiOutput.source.document}
                              </span>
                              <span>
                                • Page{" "}
                                {currentComparison.geminiOutput.source.page}
                              </span>
                            </div>
                            <p className="text-gray-600 italic line-clamp-2">
                              &quot;{currentComparison.geminiOutput.source.text}
                              &quot;
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-md">
                          <div className="space-y-2">
                            <p className="font-medium">Citation Details</p>
                            <p className="text-sm">
                              {currentComparison.geminiOutput.source.text}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* GPT Output */}
                  <div
                    className={`relative rounded-lg border-2 p-4 transition-all ${
                      currentComparison.selectedModel === "gpt"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getModelIcon("gpt")}
                        <span className="font-medium">GPT-4 Output</span>
                      </div>
                      <Button
                        variant={
                          currentComparison.selectedModel === "gpt"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleSelectModel("gpt")}
                        disabled={!!currentComparison.reviewerEdit}
                      >
                        {currentComparison.selectedModel === "gpt" ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-semibold">
                        {currentComparison.gptOutput.displayValue}
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-gray-50 rounded p-3 space-y-1 text-sm cursor-pointer">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span className="font-medium">
                                {currentComparison.gptOutput.source.document}
                              </span>
                              <span>
                                • Page {currentComparison.gptOutput.source.page}
                              </span>
                            </div>
                            <p className="text-gray-600 italic line-clamp-2">
                              &quot;{currentComparison.gptOutput.source.text}
                              &quot;
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-md">
                          <div className="space-y-2">
                            <p className="font-medium">Citation Details</p>
                            <p className="text-sm">
                              {currentComparison.gptOutput.source.text}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Reviewer Edit Section */}
                {currentComparison.reviewerEdit && (
                  <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Edit2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">
                          Reviewer Edit
                        </span>
                        <Badge variant="default" className="bg-blue-600">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-2xl font-semibold text-blue-900">
                        {currentComparison.reviewerEdit.displayValue}
                      </div>
                      <div className="bg-white rounded p-3 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-3 w-3" />
                          <span className="font-medium">
                            {currentComparison.reviewerEdit.source.document}
                          </span>
                          <span>
                            • Page {currentComparison.reviewerEdit.source.page}
                          </span>
                        </div>
                        <p className="text-gray-600 italic">
                          &quot;{currentComparison.reviewerEdit.source.text}
                          &quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Model Discrepancy Alert */}
                {currentComparison.geminiOutput.value !==
                  currentComparison.gptOutput.value && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-orange-900">
                          Model Discrepancy Detected
                        </p>
                        <p className="text-orange-700 mt-1">
                          The two models have provided different values for this
                          field. Please review both citations carefully and
                          select the most accurate value, or provide a custom
                          edit.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleEditField}
                    className="gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Custom Edit
                  </Button>

                  {currentFieldIndex === comparisons.length - 1 && (
                    <div className="flex gap-2">
                      {isHumanSupervisor ? (
                        <Button
                          variant="default"
                          onClick={() => setShowApprovalDialog(true)}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve Case
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          onClick={handleSubmitForApproval}
                          className="gap-2"
                        >
                          <Shield className="h-4 w-4" />
                          Submit for Approval
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit {currentComparison?.label}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>New Value</Label>
                <Input
                  value={editValues.value}
                  onChange={(e) =>
                    setEditValues({ ...editValues, value: e.target.value })
                  }
                  placeholder="Enter the correct value"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source Document</Label>
                  <Select
                    value={editValues.document}
                    onValueChange={(value) =>
                      setEditValues({ ...editValues, document: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a document" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDocuments.map((doc) => (
                        <SelectItem key={doc.name} value={doc.name}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Page Number</Label>
                  <Input
                    type="number"
                    value={editValues.page}
                    onChange={(e) =>
                      setEditValues({ ...editValues, page: e.target.value })
                    }
                    placeholder="e.g., 12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quote from Document</Label>
                <Textarea
                  value={editValues.text}
                  onChange={(e) =>
                    setEditValues({ ...editValues, text: e.target.value })
                  }
                  placeholder="Enter the exact quote from the document that supports this value..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Reason for Change</Label>
                <Textarea
                  value={editValues.reason}
                  onChange={(e) =>
                    setEditValues({ ...editValues, reason: e.target.value })
                  }
                  placeholder="Explain why this value is being changed..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Log Dialog */}
        <Dialog open={showChangeLog} onOpenChange={setShowChangeLog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Change Log</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {changeLogs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No changes recorded yet
                </p>
              ) : (
                changeLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{log.userName}</span>
                        <Badge variant="outline">
                          {log.userRole.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{log.fieldLabel}</span> -{" "}
                        {log.action}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Before:</p>
                          <p className="font-mono bg-gray-50 p-2 rounded">
                            {log.before.displayValue ||
                              log.before.value?.toString()}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">After:</p>
                          <p className="font-mono bg-gray-50 p-2 rounded">
                            {log.after.displayValue ||
                              log.after.value?.toString()}
                          </p>
                        </div>
                      </div>
                      {log.reason && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Reason:
                          </p>
                          <p className="text-sm italic">{log.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Approval Dialog (Supervisor Only) */}
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Case</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Approval Notes</Label>
                <Textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="Add any notes about this approval..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>By approving this case, you confirm that:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>All field values have been reviewed and are accurate</li>
                  <li>
                    The settlement information will be saved to the database
                  </li>
                  <li>The case will be marked as complete</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApprovalDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve Case
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </TooltipProvider>
  );
}
