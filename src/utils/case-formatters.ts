import { ExtractedField, FieldType } from "@/types/case";

export function formatFieldValue(
  data: ExtractedField,
  fieldType: FieldType,
): string {
  if (!data.value && data.value !== 0 && data.value !== false) {
    return "Not specified";
  }

  switch (fieldType) {
    case "boolean":
      return data.value ? "Yes" : "No";

    case "array":
      return Array.isArray(data.value) ? data.value.join(", ") : "";

    case "currency":
      if (data.displayValue) return data.displayValue;
      return formatCurrency(data.value as number);

    case "percentage":
      if (data.displayValue) return data.displayValue;
      return `${data.value}%`;

    case "number":
      if (data.displayValue) return data.displayValue;
      return formatNumber(data.value as number);

    default:
      return data.displayValue || data.value?.toString() || "Not specified";
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function parseArrayInput(input: string): string[] {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function hasValidValue(data: ExtractedField): boolean {
  return !!(data.value || data.source.document);
}
