import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditFieldData, EditValues, CaseDocument } from "@/types/case";
import {
  SETTLEMENT_TYPE_OPTIONS,
  ATTORNEY_FEES_METHOD_OPTIONS,
  EXCESS_FUNDS_OPTIONS,
} from "@/constants/case-fields";

interface EditFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editFieldData: EditFieldData | null;
  editValues: EditValues;
  onEditValuesChange: (values: EditValues) => void;
  onSave: () => void;
  documents: CaseDocument[];
}

export function EditFieldDialog({
  open,
  onOpenChange,
  editFieldData,
  editValues,
  onEditValuesChange,
  onSave,
  documents,
}: EditFieldDialogProps) {
  const getSelectOptions = (fieldKey: string): string[] => {
    switch (fieldKey) {
      case "settlementType":
        return SETTLEMENT_TYPE_OPTIONS;
      case "attorneyFeesMethod":
        return ATTORNEY_FEES_METHOD_OPTIONS;
      case "excessFundsDisposition":
        return EXCESS_FUNDS_OPTIONS;
      default:
        return [];
    }
  };

  const renderValueInput = () => {
    if (!editFieldData) return null;

    switch (editFieldData.fieldType) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editValues.value === true}
              onCheckedChange={(checked) =>
                onEditValuesChange({
                  ...editValues,
                  value: checked,
                })
              }
            />
            <Label className="font-normal">Yes</Label>
          </div>
        );

      case "select":
        return (
          <Select
            value={editValues.value as string}
            onValueChange={(value) =>
              onEditValuesChange({
                ...editValues,
                value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getSelectOptions(editFieldData.field).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "array":
        return (
          <Textarea
            value={editValues.value as string}
            onChange={(e) =>
              onEditValuesChange({
                ...editValues,
                value: e.target.value,
              })
            }
            placeholder="Enter comma-separated values"
            className="min-h-[80px]"
          />
        );

      default:
        return (
          <Input
            type={
              editFieldData.fieldType === "number" ||
              editFieldData.fieldType === "currency"
                ? "number"
                : editFieldData.fieldType === "date"
                  ? "date"
                  : "text"
            }
            value={editValues.value as string}
            onChange={(e) =>
              onEditValuesChange({
                ...editValues,
                value: e.target.value,
              })
            }
          />
        );
    }
  };

  const formatCurrentValue = () => {
    if (!editFieldData) return "";

    switch (editFieldData.fieldType) {
      case "boolean":
        return editFieldData.currentValue ? "Yes" : "No";
      case "array":
        return Array.isArray(editFieldData.currentValue)
          ? editFieldData.currentValue.join(", ")
          : "";
      default:
        return editFieldData.currentValue?.toString() || "Not specified";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {editFieldData?.label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Current Value Display */}
          <div className="space-y-2">
            <Label>Current Value</Label>
            <div className="p-3 bg-gray-50 rounded text-sm">
              {formatCurrentValue()}
            </div>
          </div>

          {/* New Value Input */}
          <div className="space-y-2">
            <Label>New Value</Label>
            {renderValueInput()}
          </div>

          {/* Citation Fields */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Update Citation</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Source Document</Label>
                <Select
                  value={editValues.document}
                  onValueChange={(value) =>
                    onEditValuesChange({
                      ...editValues,
                      document: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a document" />
                  </SelectTrigger>
                  <SelectContent>
                    {documents.map((doc) => (
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
                    onEditValuesChange({
                      ...editValues,
                      page: e.target.value,
                    })
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
                  onEditValuesChange({
                    ...editValues,
                    text: e.target.value,
                  })
                }
                placeholder="Enter the exact quote from the document that supports this value..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Reason for Change */}
          <div className="space-y-2">
            <Label>Reason for Change</Label>
            <Textarea
              placeholder="Explain why this value is being changed..."
              className="min-h-[80px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
