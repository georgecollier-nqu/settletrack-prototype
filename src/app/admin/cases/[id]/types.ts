// Type definitions for case details page

export interface FieldSource {
  document: string;
  page: number;
  text: string;
}

export interface ExtractedField<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
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