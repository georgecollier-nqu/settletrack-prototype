import { FieldComparison, QCWorkflowCase } from "@/types/admin";

// Mock function to generate dual model outputs for all fields
export const generateDualModelOutputs = (): FieldComparison[] => {
  const fields = [
    // Basic Information
    { key: "name", label: "Case Name", type: "text" },
    { key: "docketId", label: "Docket ID", type: "text" },
    { key: "court", label: "Court", type: "text" },
    { key: "state", label: "State", type: "text" },
    { key: "year", label: "Year", type: "number" },
    { key: "date", label: "Settlement Date", type: "date" },
    { key: "judgeName", label: "Judge Name", type: "text" },
    { key: "settlementType", label: "Settlement Type", type: "text" },
    { key: "summary", label: "Case Summary", type: "text" },

    // Financial Fields
    {
      key: "settlementAmount",
      label: "Total Settlement Amount",
      type: "currency",
    },
    {
      key: "baseSettlementAmount",
      label: "Base Settlement Amount",
      type: "currency",
    },
    {
      key: "contingentSettlementAmount",
      label: "Contingent Settlement Amount",
      type: "currency",
    },
    { key: "isSettlementCapped", label: "Settlement Capped", type: "boolean" },

    // Attorney Fees
    {
      key: "attorneyFeesMethod",
      label: "Fee Calculation Method",
      type: "select",
    },
    {
      key: "attorneyFeesPercentage",
      label: "Attorney Fees Percentage",
      type: "percentage",
    },
    {
      key: "attorneyFeesPaidFromFund",
      label: "Fees Paid from Fund",
      type: "boolean",
    },
    { key: "lodestardAmount", label: "Lodestar Amount", type: "currency" },
    { key: "multiplier", label: "Lodestar Multiplier", type: "number" },
    {
      key: "attorneyFeesReimbursement",
      label: "Attorney Fees Reimbursement",
      type: "currency",
    },
    {
      key: "attorneyFeesReimbursementFromFund",
      label: "Reimbursement from Fund",
      type: "boolean",
    },

    // Class Information
    { key: "classSize", label: "Class Size", type: "number" },
    { key: "classType", label: "Class Type", type: "array" },
    { key: "hasMinorSubclass", label: "Has Minor Subclass", type: "boolean" },
    {
      key: "isMultiDistrictLitigation",
      label: "Multi-District Litigation",
      type: "boolean",
    },

    // Claims Data
    { key: "claimsSubmitted", label: "Claims Submitted", type: "number" },
    {
      key: "claimsSubmittedPercent",
      label: "Claims Submitted %",
      type: "percentage",
    },
    { key: "claimsAdminCosts", label: "Claims Admin Costs", type: "currency" },
    {
      key: "claimsAdminCostsFromFund",
      label: "Admin Costs from Fund",
      type: "boolean",
    },

    // Individual Compensation
    {
      key: "baseCashCompensation",
      label: "Base Cash Compensation",
      type: "currency",
    },
    {
      key: "maxReimbursementOutOfPocket",
      label: "Max Out-of-Pocket Reimbursement",
      type: "currency",
    },
    {
      key: "maxReimbursementDocumentedTime",
      label: "Max Documented Time Reimbursement",
      type: "currency",
    },
    {
      key: "maxHoursDocumented",
      label: "Max Hours Documented",
      type: "number",
    },
    {
      key: "ratePerHourDocumented",
      label: "Rate per Hour (Documented)",
      type: "currency",
    },
    {
      key: "maxReimbursementUndocumented",
      label: "Max Undocumented Reimbursement",
      type: "currency",
    },
    {
      key: "maxHoursUndocumented",
      label: "Max Hours Undocumented",
      type: "number",
    },
    {
      key: "ratePerHourUndocumented",
      label: "Rate per Hour (Undocumented)",
      type: "currency",
    },
    {
      key: "allowBothDocAndUndoc",
      label: "Allow Both Doc & Undoc",
      type: "boolean",
    },
    {
      key: "hasProRataAdjustment",
      label: "Has Pro Rata Adjustment",
      type: "boolean",
    },
    { key: "proRataAmount", label: "Pro Rata Amount", type: "currency" },
    {
      key: "supplementalReimbursement",
      label: "Supplemental Reimbursement",
      type: "currency",
    },

    // Class Representative Awards
    {
      key: "classRepServiceAwards",
      label: "Service Awards Amount",
      type: "currency",
    },
    {
      key: "classRepAwardsFromFund",
      label: "Awards from Fund",
      type: "boolean",
    },

    // Breach Information
    { key: "piiAffected", label: "PII Affected", type: "array" },
    { key: "causeOfBreach", label: "Cause of Breach", type: "text" },

    // Parties
    { key: "defenseCounsel", label: "Defense Counsel", type: "text" },
    { key: "plaintiffCounsel", label: "Plaintiff Counsel", type: "text" },

    // Injunctive Relief
    {
      key: "injunctiveRelief",
      label: "Injunctive Relief Measures",
      type: "array",
    },
    {
      key: "injunctiveReliefAmount",
      label: "Injunctive Relief Amount",
      type: "currency",
    },
    {
      key: "thirdPartyAssessments",
      label: "Third Party Assessments",
      type: "array",
    },

    // Additional Benefits
    {
      key: "creditMonitoring",
      label: "Credit Monitoring Offered",
      type: "boolean",
    },
    {
      key: "creditMonitoringAmount",
      label: "Credit Monitoring Amount",
      type: "currency",
    },
    {
      key: "excessFundsDisposition",
      label: "Excess Funds Disposition",
      type: "select",
    },
  ];

  return fields.map((field) => {
    const comparison: FieldComparison = {
      fieldKey: field.key,
      label: field.label,
      geminiOutput: generateMockModelOutput("gemini", field),
      gptOutput: generateMockModelOutput("gpt", field),
    };

    // Simulate some fields having discrepancies
    if (Math.random() < 0.25) {
      comparison.gptOutput.value = generateVariantValue(
        comparison.geminiOutput.value,
        field.type,
      );
      comparison.gptOutput.displayValue = formatValue(
        comparison.gptOutput.value,
        field.type,
      );
    }

    return comparison;
  });
};

function generateMockModelOutput(
  model: "gemini" | "gpt",
  field: { type: string; key: string; label: string },
) {
  const value = generateMockValue(field.type, field.key);
  return {
    model,
    value,
    displayValue: formatValue(value, field.type),
    source: {
      document: selectRandomDocument(),
      page: Math.floor(Math.random() * 30) + 1,
      text: generateMockCitation(field.label, value),
    },
    confidence: 0.75 + Math.random() * 0.24, // 0.75 to 0.99
  };
}

function generateMockValue(type: string, key: string): unknown {
  switch (type) {
    case "text":
      return getMockTextValue(key);
    case "number":
      return Math.floor(Math.random() * 50000) + 1000;
    case "currency":
      return Math.floor(Math.random() * 5000000) + 10000;
    case "percentage":
      return Math.floor(Math.random() * 40) + 10;
    case "boolean":
      return Math.random() > 0.5;
    case "date":
      return "2024-03-15";
    case "array":
      return getMockArrayValue(key);
    case "select":
      return getMockSelectValue(key);
    default:
      return "Mock Value";
  }
}

function getMockTextValue(key: string): string {
  const textValues: Record<string, string> = {
    name: "In re Data Breach Litigation",
    docketId: "1:2024cv04221",
    court: "S.D.N.Y.",
    state: "NY",
    judgeName: "Hon. Sarah Johnson",
    settlementType: "Final",
    summary:
      "Class action settlement regarding data breach affecting customer information",
    causeOfBreach: "Ransomware",
    defenseCounsel: "Smith & Associates LLP",
    plaintiffCounsel: "Johnson Law Group",
  };
  return textValues[key] || "Mock Text Value";
}

function getMockArrayValue(key: string): string[] {
  const arrayValues: Record<string, string[]> = {
    classType: ["Consumers", "Employees"],
    piiAffected: ["SSN", "Name", "Address", "DOB"],
    injunctiveRelief: [
      "Employee training",
      "Security assessments",
      "Vendor requirements",
    ],
    thirdPartyAssessments: ["SOC 2", "ISO 27001"],
  };
  return arrayValues[key] || ["Value 1", "Value 2"];
}

function getMockSelectValue(key: string): string {
  const selectValues: Record<string, string> = {
    attorneyFeesMethod: "Percentage",
    excessFundsDisposition: "Cy pres",
  };
  return selectValues[key] || "Option A";
}

function generateVariantValue(originalValue: unknown, type: string): unknown {
  switch (type) {
    case "number":
    case "currency":
      return Math.floor(Number(originalValue) * (0.8 + Math.random() * 0.4));
    case "percentage":
      return Number(originalValue) + (Math.random() > 0.5 ? 3 : -3);
    case "boolean":
      return !originalValue;
    case "text":
      return originalValue + " (variant)";
    default:
      return originalValue;
  }
}

function formatValue(value: unknown, type: string): string {
  switch (type) {
    case "currency":
      return `$${Number(value).toLocaleString()}`;
    case "percentage":
      return `${value}%`;
    case "number":
      return Number(value).toLocaleString();
    case "boolean":
      return value ? "Yes" : "No";
    case "array":
      return Array.isArray(value) ? value.join(", ") : "";
    default:
      return value?.toString() || "";
  }
}

function selectRandomDocument(): string {
  const documents = [
    "settlement_agreement.pdf",
    "complaint.pdf",
    "notice_of_class.pdf",
    "fairness_hearing.pdf",
    "docket.pdf",
    "claims_report.pdf",
  ];
  return documents[Math.floor(Math.random() * documents.length)];
}

function generateMockCitation(label: string, value: unknown): string {
  const templates = [
    `...${label} shall be ${value}...`,
    `...the ${label} is determined to be ${value}...`,
    `...regarding ${label}: ${value}...`,
    `...${value} for ${label} as specified...`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Mock QC workflow cases with dual model outputs
export const mockQCWorkflowCases: QCWorkflowCase[] = [
  {
    id: "SET-123456-A",
    caseData: {
      id: "SET-123456-A",
      title: "In re Data Breach Litigation",
      court: "Southern District of NY",
      dateAdded: "2024-03-15",
    },
    fieldComparisons: generateDualModelOutputs(),
    changeLogs: [],
    reviewStatus: "pending_review",
  },
  {
    id: "SET-789012-B",
    caseData: {
      id: "SET-789012-B",
      title: "Johnson v. Tech Corp",
      court: "Northern District of CA",
      dateAdded: "2024-03-14",
    },
    fieldComparisons: generateDualModelOutputs(),
    changeLogs: [],
    reviewStatus: "under_review",
    reviewerId: "sarah.johnson@settletrack.com",
    reviewerName: "Sarah Johnson",
    reviewStartedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "SET-345678-C",
    caseData: {
      id: "SET-345678-C",
      title: "Smith v. Healthcare Inc",
      court: "Eastern District of TX",
      dateAdded: "2024-03-13",
    },
    fieldComparisons: generateDualModelOutputs(),
    changeLogs: [],
    reviewStatus: "pending_approval",
    reviewerId: "m.chen@settletrack.com",
    reviewerName: "Michael Chen",
    reviewStartedAt: "2024-03-14T09:00:00Z",
    reviewCompletedAt: "2024-03-15T14:00:00Z",
  },
];
