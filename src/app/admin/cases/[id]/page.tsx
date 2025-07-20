"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CASE_STATUS, AI_MODELS } from "@/lib/constants";
import { mockCaseData, mockDocuments } from "@/lib/mock-case-details";
import type { ExtractedField, EditFieldData, EditValues, FieldSource } from "./types";
import {
  CaseHeader,
  DataFieldSection,
  DocumentsList,
  EditDialog,
} from "./components";

export default function CaseDetailsPage() {
  const router = useRouter();
  const [adminNotes, setAdminNotes] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFieldData, setEditFieldData] = useState<EditFieldData | null>(
    null
  );
  const [editValues, setEditValues] = useState<EditValues>({
    value: "",
    document: "",
    page: "",
    text: "",
  });

  // State to track selected model extractions for each field
  const [selectedExtractions, setSelectedExtractions] = useState<
    Record<string, number>
  >(() => {
    // Initialize with the default selected values from mockCaseData
    const initial: Record<string, number> = {};
    Object.entries(mockCaseData).forEach(([key, field]) => {
      if (typeof field === 'object' && field !== null && 'modelExtractions' in field) {
        const extractedField = field as ExtractedField;
        if (extractedField.modelExtractions && extractedField.modelExtractions.length > 0) {
          // Find the index of the selected extraction or default to 0
          const selectedIndex = extractedField.modelExtractions.findIndex(
            (ext) => ext.isSelected
          );
          initial[key] = selectedIndex >= 0 ? selectedIndex : 0;
        }
      }
    });
    return initial;
  });

  const handleEdit = (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string = "text"
  ) => {
    // If we have model extractions, use the selected one based on state
    let valueToEdit = data.value;
    let sourceToEdit = data.source;

    if (data.modelExtractions && data.modelExtractions.length > 0) {
      const selectedIndex = selectedExtractions[field] ?? 0;
      const selectedExtraction = data.modelExtractions[selectedIndex];
      if (selectedExtraction) {
        valueToEdit = selectedExtraction.value;
        sourceToEdit = selectedExtraction.source;
      }
    }

    setEditFieldData({
      field,
      label,
      currentValue: valueToEdit,
      currentSource: sourceToEdit,
      fieldType,
    });
    setEditValues({
      value: valueToEdit || "",
      document: sourceToEdit.document,
      page: sourceToEdit.page.toString(),
      text: sourceToEdit.text,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving edit:", editFieldData?.field, editValues);
    setShowEditDialog(false);
    setEditFieldData(null);
  };

  const handleApprove = () => {
    console.log("Approved case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  const handleReject = () => {
    console.log("Rejected case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  const handleRequestInfo = () => {
    console.log("Requested more info for case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  // Handle selecting a model extraction
  const handleSelectModelExtraction = (
    fieldKey: string,
    modelIndex: number
  ) => {
    console.log(
      `Selected ${fieldKey} extraction from model index ${modelIndex}`
    );
    setSelectedExtractions((prev) => ({
      ...prev,
      [fieldKey]: modelIndex,
    }));
  };

  return (
    <>
      <CaseHeader caseId={mockCaseData.id.value} caseName={mockCaseData.name.value} />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Status Banner */}
          {mockCaseData.status === CASE_STATUS.FLAGGED && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">
                    Case Flagged for Review
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Flagged by {mockCaseData.flaggedBy}: &quot;
                    {mockCaseData.flagReason}&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents Section */}
          <DocumentsList documents={mockDocuments} />

          {/* Data Sections */}
          <DataFieldSection 
            mockCaseData={mockCaseData} 
            selectedExtractions={selectedExtractions}
            onEdit={handleEdit}
            onSelectModelExtraction={handleSelectModelExtraction}
          />

          {/* Admin Notes */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground">
              Admin Notes
            </h3>
            <Textarea
              placeholder="Add your review notes here..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              Approve Case
            </Button>
            <Button variant="outline" onClick={handleRequestInfo}>
              Request More Info
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Case
            </Button>
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      <EditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        editFieldData={editFieldData}
        editValues={editValues}
        onEditValuesChange={setEditValues}
        onSave={handleSaveEdit}
        documents={mockDocuments}
      />
    </>
  );
}