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

export interface CaseDocument {
  name: string;
  size: string;
}

export interface CaseData {
  // Basic Information
  id: ExtractedField<string>;
  name: ExtractedField<string>;
  docketId: ExtractedField<string>;
  court: ExtractedField<string>;
  state: ExtractedField<string>;
  year: ExtractedField<number>;
  date: ExtractedField<string>;
  summary: ExtractedField<string>;
  judgeName: ExtractedField<string>;
  settlementType: ExtractedField<string>;

  // Financial Fields
  settlementAmount: ExtractedField<number>;
  baseSettlementAmount: ExtractedField<number>;
  contingentSettlementAmount: ExtractedField<number>;
  isSettlementCapped: ExtractedField<boolean>;

  // Attorney Fees
  attorneyFeesMethod: ExtractedField<string>;
  attorneyFeesPercentage: ExtractedField<number>;
  attorneyFeesPaidFromFund: ExtractedField<boolean>;
  lodestardAmount: ExtractedField<number | undefined>;
  multiplier: ExtractedField<number | undefined>;
  attorneyFeesReimbursement: ExtractedField<number>;
  attorneyFeesReimbursementFromFund: ExtractedField<boolean>;

  // Class Information
  classSize: ExtractedField<number>;
  classType: ExtractedField<string[]>;
  hasMinorSubclass: ExtractedField<boolean>;
  isMultiDistrictLitigation: ExtractedField<boolean>;

  // Claims Data
  claimsSubmitted: ExtractedField<number>;
  claimsSubmittedPercent: ExtractedField<number>;
  claimsAdminCosts: ExtractedField<number>;
  claimsAdminCostsFromFund: ExtractedField<boolean>;

  // Individual Compensation
  baseCashCompensation: ExtractedField<number>;
  maxReimbursementOutOfPocket: ExtractedField<number>;
  maxReimbursementDocumentedTime: ExtractedField<number>;
  maxHoursDocumented: ExtractedField<number>;
  ratePerHourDocumented: ExtractedField<number>;
  maxReimbursementUndocumented: ExtractedField<number>;
  maxHoursUndocumented: ExtractedField<number>;
  ratePerHourUndocumented: ExtractedField<number>;
  allowBothDocAndUndoc: ExtractedField<boolean>;
  hasProRataAdjustment: ExtractedField<boolean>;
  proRataAmount: ExtractedField<number | undefined>;
  supplementalReimbursement: ExtractedField<number | undefined>;

  // Class Representative Awards
  classRepServiceAwards: ExtractedField<number>;
  classRepAwardsFromFund: ExtractedField<boolean>;

  // Breach Information
  piiAffected: ExtractedField<string[]>;
  causeOfBreach: ExtractedField<string>;

  // Parties
  defenseCounsel: ExtractedField<string>;
  plaintiffCounsel: ExtractedField<string>;

  // Injunctive Relief
  injunctiveRelief: ExtractedField<string[]>;
  injunctiveReliefAmount: ExtractedField<number>;
  thirdPartyAssessments: ExtractedField<string[]>;

  // Additional Benefits
  creditMonitoring: ExtractedField<boolean>;
  creditMonitoringAmount: ExtractedField<number>;
  excessFundsDisposition: ExtractedField<string>;

  // Admin fields
  status: string;
  flaggedBy?: string;
  flagReason?: string;
}

export type FieldType =
  | "text"
  | "number"
  | "currency"
  | "percentage"
  | "boolean"
  | "array"
  | "select"
  | "date";

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
