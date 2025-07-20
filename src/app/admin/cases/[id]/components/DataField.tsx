"use client";

import { Button } from "@/components/ui/button";
import { FileText, Edit2 } from "lucide-react";
import type { ExtractedField } from "../types";
import { FIELD_TYPES } from "@/lib/constants";

interface DataFieldProps {
  icon?: React.ReactNode;
  label: string;
  data: ExtractedField;
  fieldKey: string;
  fieldType?: string;
  onEdit: (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string
  ) => void;
}

export function DataField({
  icon,
  label,
  data,
  fieldKey,
  fieldType = FIELD_TYPES.TEXT,
  onEdit,
}: DataFieldProps) {
  // Don't render if no value and no source
  if (!data.value && !data.source.document) return null;

  const displayValue = () => {
    if (fieldType === FIELD_TYPES.BOOLEAN) {
      return data.value ? "Yes" : "No";
    } else if (fieldType === FIELD_TYPES.ARRAY) {
      return Array.isArray(data.value) ? data.value.join(", ") : "";
    } else if (data.displayValue) {
      return data.displayValue;
    } else {
      return data.value?.toString() || "Not specified";
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm">{label}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(fieldKey, label, data, fieldType)}
          className="h-8 w-8 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-lg font-semibold">{displayValue()}</div>

      {data.source.document && (
        <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span className="font-medium">{data.source.document}</span>
            {data.source.page > 0 && <span>• Page {data.source.page}</span>}
          </div>
          {data.source.text && (
            <p className="text-gray-600 italic">
              &quot;{data.source.text}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
}