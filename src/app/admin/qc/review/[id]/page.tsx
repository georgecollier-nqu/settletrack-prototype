"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Copy, 
  X, 
  Edit2, 
  Save, 
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  User,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// Field names for the medical case
const fieldNames = {
  patientName: "Patient Name",
  dob: "Date of Birth",
  gender: "Gender",
  surgeryDate: "Surgery Date",
  surgeryType: "Surgery Type",
  medicalRecordNumber: "Medical Record Number",
  surgeonName: "Surgeon Name",
  hospitalName: "Hospital Name",
  preOpDiagnosis: "Pre-Op Diagnosis",
  postOpDiagnosis: "Post-Op Diagnosis",
  complications: "Complications",
  complicationDetails: "Complication Details",
  readmission: "Readmission",
  readmissionReason: "Readmission Reason",
} as const;

// Mock data for model outputs
const mockModelOutputs = {
  gemini: {
    modelName: "Gemini",
    modelVersion: "1.5-pro",
    outputData: {
      patientName: "Jane Smith",
      dob: "1965-05-15",
      gender: "Female",
      surgeryDate: "2023-11-20",
      surgeryType: "Total Knee Replacement",
      medicalRecordNumber: "MRN-123456",
      surgeonName: "Dr. Michael Roberts",
      hospitalName: "St. Mary's Medical Center",
      preOpDiagnosis: "Severe osteoarthritis of the left knee",
      postOpDiagnosis: "Status post left total knee arthroplasty",
      complications: "Yes",
      complicationDetails: "Post-op infection requiring antibiotics",
      readmission: "Yes",
      readmissionReason: "Infection at surgical site",
    },
    confidence: {
      patientName: 0.99,
      dob: 0.98,
      surgeryType: 0.95,
      complications: 0.92,
    },
  },
  gpt: {
    modelName: "GPT-4",
    modelVersion: "2024-01",
    outputData: {
      patientName: "Jane Smith",
      dob: "1965-05-15",
      gender: "Female",
      surgeryDate: "2023-11-20",
      surgeryType: "TKR - Total Knee Replacement",
      medicalRecordNumber: "MRN-123456",
      surgeonName: "Dr. Michael Roberts",
      hospitalName: "St. Mary's Medical Center",
      preOpDiagnosis: "Severe osteoarthritis of the left knee",
      postOpDiagnosis: "Status post left total knee arthroplasty",
      complications: "Yes",
      complicationDetails: "Post-operative infection treated with IV antibiotics",
      readmission: "Yes",
      readmissionReason: "SSI - Surgical site infection",
    },
    confidence: {
      patientName: 0.98,
      dob: 0.97,
      surgeryType: 0.93,
      complications: 0.94,
    },
  },
};

// Mock change log
const mockChangeLog = [
  {
    id: "1",
    fieldName: "surgeryType",
    previousValue: "Total Knee Replacement",
    newValue: "Total Knee Replacement (TKR)",
    annotation: "Standardized abbreviation for consistency",
    user: "Sarah Miller",
    createdAt: new Date("2024-01-15T11:30:00"),
  },
  {
    id: "2",
    fieldName: "complicationDetails",
    previousValue: "Post-op infection requiring antibiotics",
    newValue: "Post-operative infection requiring IV antibiotics (7-day course)",
    annotation: "Added specific treatment duration from medical records",
    user: "Sarah Miller",
    createdAt: new Date("2024-01-15T11:35:00"),
  },
];

export default function QCReviewPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("compare");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Record<string, string>>({});
  const [reviewNotes, setReviewNotes] = useState("");
  const [supervisorNotes, setSupervisorNotes] = useState("");
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [changeAnnotation, setChangeAnnotation] = useState("");

  useEffect(() => {
    // Initialize edited data with Gemini output
    setEditedData(mockModelOutputs.gemini.outputData);
  }, []);

  const handleDuplicateAndEdit = () => {
    setEditedData({ ...mockModelOutputs.gemini.outputData });
    setEditMode(true);
    setActiveTab("edit");
    toast.success("Duplicated Gemini output for editing");
  };

  const handleSaveEdit = (fieldName: string, newValue: string) => {
    if (editedData[fieldName] !== newValue && changeAnnotation) {
      // Would save to change log
      toast.success(`Saved change to ${fieldName}`);
      setEditedData({ ...editedData, [fieldName]: newValue });
      setChangeAnnotation("");
    } else if (!changeAnnotation) {
      toast.error("Please provide an annotation for this change");
    }
  };

  const handleApproveReview = () => {
    // Would update review status
    toast.success("Review approved and forwarded to supervisor");
    setShowApprovalDialog(false);
    router.push("/admin/qc");
  };

  const handleRejectReview = () => {
    // Would update review status
    toast.success("Review rejected with feedback");
    setShowRejectDialog(false);
    router.push("/admin/qc");
  };

  const getFieldDifference = (field: string) => {
    const geminiValue = mockModelOutputs.gemini.outputData[field as keyof typeof mockModelOutputs.gemini.outputData];
    const gptValue = mockModelOutputs.gpt.outputData[field as keyof typeof mockModelOutputs.gpt.outputData];
    return geminiValue !== gptValue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/qc")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">QC Review: CASE-2024-001</h1>
            <p className="text-muted-foreground">Compare model outputs and make corrections</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!editMode && (
            <Button onClick={handleDuplicateAndEdit}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate & Edit
            </Button>
          )}
          <Button variant="default" onClick={() => setShowApprovalDialog(true)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Changes
          </Button>
        </div>
      </div>

      {/* Review Info */}
      <Card>
        <CardHeader>
          <CardTitle>Review Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground">Reviewer</Label>
              <p className="font-medium">Sarah Miller</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <Badge variant="default">In Review</Badge>
            </div>
            <div>
              <Label className="text-muted-foreground">Started</Label>
              <p className="font-medium">{format(new Date(), "MMM d, yyyy HH:mm")}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Models</Label>
              <div className="flex gap-1">
                <Badge variant="outline">Gemini 1.5</Badge>
                <Badge variant="outline">GPT-4</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="compare">Compare Outputs</TabsTrigger>
          <TabsTrigger value="edit">Edit Output</TabsTrigger>
          <TabsTrigger value="changes">Change Log</TabsTrigger>
        </TabsList>

        {/* Compare Tab */}
        <TabsContent value="compare" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Side-by-Side Comparison</CardTitle>
              <CardDescription>
                Fields with differences are highlighted. Click &quot;Duplicate &amp; Edit&quot; to create an editable version.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {Object.entries(fieldNames).map(([fieldKey, fieldLabel]) => {
                    const isDifferent = getFieldDifference(fieldKey);
                    const geminiValue = mockModelOutputs.gemini.outputData[fieldKey as keyof typeof mockModelOutputs.gemini.outputData] || "";
                    const gptValue = mockModelOutputs.gpt.outputData[fieldKey as keyof typeof mockModelOutputs.gpt.outputData] || "";
                    const geminiConfidence = mockModelOutputs.gemini.confidence[fieldKey as keyof typeof mockModelOutputs.gemini.confidence];
                    const gptConfidence = mockModelOutputs.gpt.confidence[fieldKey as keyof typeof mockModelOutputs.gpt.confidence];

                    return (
                      <div key={fieldKey} className={`space-y-2 ${isDifferent ? 'p-4 border rounded-lg border-orange-200 bg-orange-50' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Label className="text-base font-medium">{fieldLabel}</Label>
                          {isDifferent && (
                            <Badge variant="outline" className="text-orange-600">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Different
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm text-muted-foreground">Gemini</Label>
                              {geminiConfidence && (
                                <Badge variant="secondary" className="text-xs">
                                  {(geminiConfidence * 100).toFixed(0)}% conf
                                </Badge>
                              )}
                            </div>
                            <div className="p-3 border rounded-md bg-background">
                              <p className="text-sm">{geminiValue || "-"}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm text-muted-foreground">GPT-4</Label>
                              {gptConfidence && (
                                <Badge variant="secondary" className="text-xs">
                                  {(gptConfidence * 100).toFixed(0)}% conf
                                </Badge>
                              )}
                            </div>
                            <div className="p-3 border rounded-md bg-background">
                              <p className="text-sm">{gptValue || "-"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Tab */}
        <TabsContent value="edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Edit Output</CardTitle>
              <CardDescription>
                Make corrections to the duplicated output. All changes require an annotation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(fieldNames).map(([fieldKey, fieldLabel]) => {
                      const currentValue = editedData[fieldKey] || "";
                      const originalValue = mockModelOutputs.gemini.outputData[fieldKey as keyof typeof mockModelOutputs.gemini.outputData] || "";
                      const hasChanged = currentValue !== originalValue;

                      return (
                        <div key={fieldKey} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>{fieldLabel}</Label>
                            {hasChanged && (
                              <Badge variant="outline" className="text-blue-600">
                                <Edit2 className="h-3 w-3 mr-1" />
                                Modified
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Textarea
                              value={currentValue}
                              onChange={(e) => setEditedData({ ...editedData, [fieldKey]: e.target.value })}
                              className="min-h-[60px]"
                            />
                            {hasChanged && (
                              <div className="space-y-2">
                                <Input
                                  placeholder="Annotation for this change (required)"
                                  value={changeAnnotation}
                                  onChange={(e) => setChangeAnnotation(e.target.value)}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(fieldKey, currentValue)}
                                  disabled={!changeAnnotation}
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Save Change
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Click &quot;Duplicate &amp; Edit&quot; to create an editable version of the output
                  </p>
                  <Button onClick={handleDuplicateAndEdit}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate & Edit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Log Tab */}
        <TabsContent value="changes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change History</CardTitle>
              <CardDescription>
                All modifications made during the review process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Previous Value</TableHead>
                    <TableHead>New Value</TableHead>
                    <TableHead>Annotation</TableHead>
                    <TableHead>Changed By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChangeLog.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell className="font-medium">
                        {fieldNames[change.fieldName as keyof typeof fieldNames]}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm">{change.previousValue}</p>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm">{change.newValue}</p>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm">{change.annotation}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="text-sm">{change.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{format(change.createdAt, "MMM d, HH:mm")}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Review Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Review Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Reviewer Notes</Label>
                <Textarea
                  placeholder="Add notes about your review..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Supervisor Notes</Label>
                <Textarea
                  placeholder="Add supervisor notes..."
                  value={supervisorNotes}
                  onChange={(e) => setSupervisorNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.push("/admin/qc")}>
                  Cancel
                </Button>
                <Button onClick={() => setShowApprovalDialog(true)}>
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this review? This will mark it as complete and save all changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-sm font-medium">Summary of Changes:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 2 fields modified</li>
                <li>• All changes annotated</li>
                <li>• Review notes included</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveReview}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Review</DialogTitle>
            <DialogDescription>
              Provide feedback for why this review is being rejected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectReview}>
              <X className="h-4 w-4 mr-2" />
              Reject Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}