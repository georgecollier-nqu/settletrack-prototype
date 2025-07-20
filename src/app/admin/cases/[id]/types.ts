// Type definitions for case details page
import type { AIModelName } from "@/lib/constants";

export interface FieldSource {
  document: string;
  page: number;
  text: string;
}

export interface ModelExtraction<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
  model: AIModelName;
  isSelected?: boolean;
}

export interface ExtractedField<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
  // Support multiple model extractions
  modelExtractions?: ModelExtraction<T>[];
}

export interface EditFieldData {
  field: string;
  label: string;
  currentValue: unknown;
  currentSource: FieldSource;
  fieldType: string;
}

export interface EditValues {
  value: unknown;
  document: string;
  page: string;
  text: string;
}