// Constants for case management system

// AI Model names
export const AI_MODELS = {
  GEMINI_25_PRO: "Gemini 2.5 Pro",
  GPT_41: "GPT 4.1",
} as const;

export type AIModelName = typeof AI_MODELS[keyof typeof AI_MODELS];

// Settlement types
export const SETTLEMENT_TYPES = {
  PRELIMINARY: "Preliminary",
  FINAL: "Final",
} as const;

// Attorney fees methods
export const ATTORNEY_FEES_METHODS = {
  PERCENTAGE: "Percentage",
  LODESTAR: "Lodestar",
} as const;

// Excess funds disposition types
export const EXCESS_FUNDS_DISPOSITION = {
  REDISTRIBUTION: "Redistribution",
  CY_PRES: "Cy pres",
  REVERSION: "Reversion",
} as const;

// Field types for the edit dialog
export const FIELD_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  CURRENCY: "currency",
  PERCENTAGE: "percentage",
  BOOLEAN: "boolean",
  DATE: "date",
  SELECT: "select",
  ARRAY: "array",
} as const;

// Select field options
export const SELECT_OPTIONS = {
  SETTLEMENT_TYPE: Object.values(SETTLEMENT_TYPES),
  ATTORNEY_FEES_METHOD: Object.values(ATTORNEY_FEES_METHODS),
  EXCESS_FUNDS_DISPOSITION: Object.values(EXCESS_FUNDS_DISPOSITION),
} as const;

// Case status types
export const CASE_STATUS = {
  FLAGGED: "flagged",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;