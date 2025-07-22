import { CaseData, CaseDocument } from "@/types/case";

export const mockCaseData: CaseData = {
  // Basic Information
  id: {
    value: "SET-123456-A",
    source: { document: "docket.pdf", page: 1, text: "Case No. SET-123456-A" },
  },
  name: {
    value: "In re Data Breach Litigation",
    source: {
      document: "complaint.pdf",
      page: 1,
      text: "In re Data Breach Litigation",
    },
  },
  docketId: {
    value: "1:2024cv04221",
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Docket No. 1:2024cv04221",
    },
  },
  court: {
    value: "S.D.N.Y.",
    source: {
      document: "complaint.pdf",
      page: 1,
      text: "Southern District of New York",
    },
  },
  state: {
    value: "NY",
    source: { document: "complaint.pdf", page: 1, text: "State of New York" },
  },
  year: {
    value: 2024,
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "Dated this 15th day of March, 2024",
    },
  },
  date: {
    value: "2024-03-15",
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "March 15, 2024",
    },
  },
  summary: {
    value:
      "Class action settlement regarding data breach affecting customer information",
    source: {
      document: "notice_of_class.pdf",
      page: 1,
      text: "This settlement resolves claims related to a data breach...",
    },
  },
  judgeName: {
    value: "Hon. Sarah Johnson",
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Before: Hon. Sarah Johnson, U.S.D.J.",
    },
  },
  settlementType: {
    value: "Final",
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "FINAL SETTLEMENT AGREEMENT",
    },
  },

  // Financial Fields
  settlementAmount: {
    value: 2500000,
    displayValue: "$2,500,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 12,
      text: "...the total settlement fund shall be TWO MILLION FIVE HUNDRED THOUSAND DOLLARS ($2,500,000)...",
    },
  },
  baseSettlementAmount: {
    value: 2000000,
    displayValue: "$2,000,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 12,
      text: "...base settlement amount of $2,000,000...",
    },
  },
  contingentSettlementAmount: {
    value: 500000,
    displayValue: "$500,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 13,
      text: "...contingent amount up to $500,000...",
    },
  },
  isSettlementCapped: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 13,
      text: "The total settlement shall not exceed $2,500,000",
    },
  },

  // Attorney Fees
  attorneyFeesMethod: {
    value: "Percentage",
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "Attorney fees calculated as percentage of fund",
    },
  },
  attorneyFeesPercentage: {
    value: 33.3,
    displayValue: "33.3%",
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "...fees not to exceed one-third (33.3%)...",
    },
  },
  attorneyFeesPaidFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "...fees shall be paid from the Settlement Fund...",
    },
  },
  lodestardAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
  },
  multiplier: { value: undefined, source: { document: "", page: 0, text: "" } },
  attorneyFeesReimbursement: {
    value: 50000,
    displayValue: "$50,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 19,
      text: "...reimbursement of expenses up to $50,000...",
    },
  },
  attorneyFeesReimbursementFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 19,
      text: "...expenses paid from Settlement Fund...",
    },
  },

  // Class Information
  classSize: {
    value: 15000,
    displayValue: "15,000",
    source: {
      document: "notice_of_class.pdf",
      page: 3,
      text: "...approximately 15,000 individuals...",
    },
  },
  classType: {
    value: ["Consumers", "Employees"],
    source: {
      document: "notice_of_class.pdf",
      page: 3,
      text: "...consumers and employees affected...",
    },
  },
  hasMinorSubclass: {
    value: false,
    source: {
      document: "notice_of_class.pdf",
      page: 4,
      text: "No minor subclass identified",
    },
  },
  isMultiDistrictLitigation: {
    value: false,
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Single district litigation",
    },
  },

  // Claims Data
  claimsSubmitted: {
    value: 3200,
    displayValue: "3,200",
    source: {
      document: "claims_report.pdf",
      page: 1,
      text: "Total claims received: 3,200",
    },
  },
  claimsSubmittedPercent: {
    value: 21.3,
    displayValue: "21.3%",
    source: {
      document: "claims_report.pdf",
      page: 1,
      text: "Claims rate: 21.3%",
    },
  },
  claimsAdminCosts: {
    value: 150000,
    displayValue: "$150,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 20,
      text: "Claims administration costs: $150,000",
    },
  },
  claimsAdminCostsFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 20,
      text: "...administration costs paid from fund...",
    },
  },

  // Individual Compensation
  baseCashCompensation: {
    value: 125,
    displayValue: "$125",
    source: {
      document: "notice_of_class.pdf",
      page: 5,
      text: "Base compensation of $125 per claimant",
    },
  },
  maxReimbursementOutOfPocket: {
    value: 5000,
    displayValue: "$5,000",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Up to $5,000 for out-of-pocket losses",
    },
  },
  maxReimbursementDocumentedTime: {
    value: 500,
    displayValue: "$500",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Up to $500 for documented time",
    },
  },
  maxHoursDocumented: {
    value: 10,
    displayValue: "10",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Maximum 10 hours documented time",
    },
  },
  ratePerHourDocumented: {
    value: 50,
    displayValue: "$50/hour",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "At $50 per hour for documented time",
    },
  },
  maxReimbursementUndocumented: {
    value: 250,
    displayValue: "$250",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Up to $250 for undocumented time",
    },
  },
  maxHoursUndocumented: {
    value: 5,
    displayValue: "5",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Maximum 5 hours undocumented",
    },
  },
  ratePerHourUndocumented: {
    value: 50,
    displayValue: "$50/hour",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "At $50 per hour",
    },
  },
  allowBothDocAndUndoc: {
    value: false,
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Cannot claim both documented and undocumented",
    },
  },
  hasProRataAdjustment: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 15,
      text: "Pro rata adjustment if claims exceed fund",
    },
  },
  proRataAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
  },
  supplementalReimbursement: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
  },

  // Class Representative Awards
  classRepServiceAwards: {
    value: 10000,
    displayValue: "$10,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 21,
      text: "Service awards of $10,000 to each representative",
    },
  },
  classRepAwardsFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 21,
      text: "Service awards paid from Settlement Fund",
    },
  },

  // Breach Information
  piiAffected: {
    value: ["SSN", "Name", "Address", "DOB"],
    source: {
      document: "complaint.pdf",
      page: 5,
      text: "Social Security numbers, names, addresses, dates of birth",
    },
  },
  causeOfBreach: {
    value: "Ransomware",
    source: {
      document: "complaint.pdf",
      page: 3,
      text: "...ransomware attack on systems...",
    },
  },

  // Parties
  defenseCounsel: {
    value: "Smith & Associates LLP",
    source: {
      document: "docket.pdf",
      page: 2,
      text: "Defense counsel: Smith & Associates LLP",
    },
  },
  plaintiffCounsel: {
    value: "Johnson Law Group",
    source: {
      document: "docket.pdf",
      page: 2,
      text: "Plaintiff counsel: Johnson Law Group",
    },
  },

  // Injunctive Relief
  injunctiveRelief: {
    value: ["Employee training", "Security assessments", "Vendor requirements"],
    source: {
      document: "settlement_agreement.pdf",
      page: 25,
      text: "Enhanced employee training, quarterly security assessments, vendor security requirements",
    },
  },
  injunctiveReliefAmount: {
    value: 500000,
    displayValue: "$500,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 26,
      text: "Defendant shall spend no less than $500,000 on security improvements",
    },
  },
  thirdPartyAssessments: {
    value: ["SOC 2", "ISO 27001"],
    source: {
      document: "settlement_agreement.pdf",
      page: 26,
      text: "Annual SOC 2 and ISO 27001 assessments required",
    },
  },

  // Additional Benefits
  creditMonitoring: {
    value: true,
    source: {
      document: "notice_of_class.pdf",
      page: 8,
      text: "Two years of credit monitoring provided",
    },
  },
  creditMonitoringAmount: {
    value: 300000,
    displayValue: "$300,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 22,
      text: "Credit monitoring services valued at $300,000",
    },
  },
  excessFundsDisposition: {
    value: "Cy pres",
    source: {
      document: "settlement_agreement.pdf",
      page: 30,
      text: "Excess funds distributed cy pres to privacy organizations",
    },
  },

  // Admin fields
  status: "flagged",
  flaggedBy: "user@lawfirm.com",
  flagReason: "Settlement amount seems low for class size",
};

export const mockDocuments: CaseDocument[] = [
  { name: "complaint.pdf", size: "2.3 MB" },
  { name: "settlement_agreement.pdf", size: "1.8 MB" },
  { name: "notice_of_class.pdf", size: "856 KB" },
  { name: "fairness_hearing.pdf", size: "1.2 MB" },
  { name: "docket.pdf", size: "1.1 MB" },
  { name: "claims_report.pdf", size: "742 KB" },
];
