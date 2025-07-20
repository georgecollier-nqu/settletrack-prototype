"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FIELD_TYPES, SELECT_OPTIONS } from "@/lib/constants";
import type { EditFieldData, EditValues } from "../types";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editFieldData: EditFieldData | null;
  editValues: EditValues;
  onEditValuesChange: (values: EditValues) => void;
  onSave: () => void;
  documents: Array<{ name: string; size: string }>;
}

export function EditDialog({
  open,
  onOpenChange,
  editFieldData,
  editValues,
  onEditValuesChange,
  onSave,
  documents,
}: EditDialogProps) {
  const getSelectOptions = () => {
    if (!editFieldData) return [];

    switch (editFieldData.field) {
      case "settlementType":
        return SELECT_OPTIONS.SETTLEMENT_TYPE;
      case "attorneyFeesMethod":
        return SELECT_OPTIONS.ATTORNEY_FEES_METHOD;
      case "excessFundsDisposition":
        return SELECT_OPTIONS.EXCESS_FUNDS_DISPOSITION;
      default:
        return [];
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
              {editFieldData?.fieldType === FIELD_TYPES.BOOLEAN
                ? editFieldData.currentValue
                  ? "Yes"
                  : "No"
                : editFieldData?.fieldType === FIELD_TYPES.ARRAY
                  ? Array.isArray(editFieldData.currentValue)
                    ? editFieldData.currentValue.join(", ")
                    : ""
                  : editFieldData?.currentValue?.toString() || "Not specified"}
            </div>
          </div>

          {/* New Value Input */}
          <div className="space-y-2">
            <Label>New Value</Label>
            {editFieldData?.fieldType === FIELD_TYPES.BOOLEAN ? (
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
            ) : editFieldData?.fieldType === FIELD_TYPES.SELECT ? (
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
                  {getSelectOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : editFieldData?.fieldType === FIELD_TYPES.ARRAY ? (
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
            ) : (
              <Input
                type={
                  editFieldData?.fieldType === FIELD_TYPES.NUMBER ||
                  editFieldData?.fieldType === FIELD_TYPES.CURRENCY
                    ? "number"
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
            )}
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
