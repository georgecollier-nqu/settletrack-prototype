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
  selectedExtractionIndex?: number;
  onEdit: (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string
  ) => void;
  onSelectModelExtraction?: (fieldKey: string, modelIndex: number) => void;
}

export function DataField({
  icon,
  label,
  data,
  fieldKey,
  fieldType = FIELD_TYPES.TEXT,
  selectedExtractionIndex = 0,
  onEdit,
  onSelectModelExtraction,
}: DataFieldProps) {
  // Don't render if no value and no source
  if (!data.value && !data.source.document) return null;

  const displayValue = (value: unknown, displayValueOverride?: string) => {
    if (fieldType === FIELD_TYPES.BOOLEAN) {
      return value ? "Yes" : "No";
    } else if (fieldType === FIELD_TYPES.ARRAY) {
      return Array.isArray(value) ? value.join(", ") : "";
    } else if (displayValueOverride) {
      return displayValueOverride;
    } else {
      return value?.toString() || "Not specified";
    }
  };

  // Check if we have multiple model extractions
  const hasMultipleExtractions =
    data.modelExtractions && data.modelExtractions.length > 1;

  const handleSelectModelExtraction = (fieldKey: string, index: number) => {
    if (onSelectModelExtraction) {
      onSelectModelExtraction(fieldKey, index);
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

      {hasMultipleExtractions ? (
        // Show multiple model extractions
        <div className="space-y-3">
          {data.modelExtractions!.map((extraction, index) => {
            const isSelected = selectedExtractionIndex === index;
            return (
              <div
                key={`${fieldKey}-${extraction.model}`}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleSelectModelExtraction(fieldKey, index)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name={`${fieldKey}-selection`}
                        checked={isSelected}
                        onChange={() =>
                          handleSelectModelExtraction(fieldKey, index)
                        }
                        className="text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-lg font-semibold">
                        {displayValue(
                          extraction.value,
                          extraction.displayValue
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
                      <span className="font-medium text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {extraction.model}
                      </span>
                    </div>
                  </div>
                </div>

                {extraction.source.document && (
                  <div className="bg-gray-50 rounded p-2 space-y-1 text-sm ml-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span className="font-medium">
                        {extraction.source.document}
                      </span>
                      {extraction.source.page > 0 && (
                        <span>• Page {extraction.source.page}</span>
                      )}
                    </div>
                    {extraction.source.text && (
                      <p className="text-gray-600 italic text-xs">
                        &quot;{extraction.source.text}&quot;
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Show single value (original behavior)
        <>
          <div className="text-lg font-semibold">
            {displayValue(data.value, data.displayValue)}
          </div>

          {data.source.document && (
            <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-3 w-3" />
                <span className="font-medium">{data.source.document}</span>
                {data.source.page > 0 && (
                  <span>• Page {data.source.page}</span>
                )}
              </div>
              {data.source.text && (
                <p className="text-gray-600 italic">
                  &quot;{data.source.text}&quot;
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}