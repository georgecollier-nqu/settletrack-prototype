// Mock data for case details page
import type { MockCaseData } from "@/app/admin/cases/[id]/types";
import { AI_MODELS } from "@/lib/constants";

export const mockCaseData: MockCaseData = {
  // Basic Information
  id: {
    value: "SET-123456-A",
    source: { document: "docket.pdf", page: 1, text: "Case No. SET-123456-A" },
    modelExtractions: [
      {
        value: "SET-123456-A",
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Case No. SET-123456-A",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "SET-123456",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "Case Number SET-123456",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  name: {
    value: "In re Data Breach Litigation",
    source: {
      document: "complaint.pdf",
      page: 1,
      text: "In re Data Breach Litigation",
    },
    modelExtractions: [
      {
        value: "In re Data Breach Litigation",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "In re Data Breach Litigation",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: "In re: Data Breach Class Action Litigation",
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "In re: Data Breach Class Action Litigation",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  docketId: {
    value: "1:2024cv04221",
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Docket No. 1:2024cv04221",
    },
    modelExtractions: [
      {
        value: "1:2024cv04221",
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Docket No. 1:2024cv04221",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "1:24-cv-04221",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "Case No. 1:24-cv-04221",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  court: {
    value: "S.D.N.Y.",
    source: {
      document: "complaint.pdf",
      page: 1,
      text: "Southern District of New York",
    },
    modelExtractions: [
      {
        value: "S.D.N.Y.",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "Southern District of New York",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: "SDNY",
        source: {
          document: "docket.pdf",
          page: 1,
          text: "United States District Court, SDNY",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  state: {
    value: "NY",
    source: { document: "complaint.pdf", page: 1, text: "State of New York" },
    modelExtractions: [
      {
        value: "NY",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "State of New York",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "New York",
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "State of New York",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  year: {
    value: 2024,
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "Dated this 15th day of March, 2024",
    },
    modelExtractions: [
      {
        value: 2024,
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "Dated this 15th day of March, 2024",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 2024,
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Filed on January 15, 2024",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  date: {
    value: "2024-03-15",
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "March 15, 2024",
    },
    modelExtractions: [
      {
        value: "2024-03-15",
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "March 15, 2024",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "2024-03-14",
        source: {
          document: "final_approval_order.pdf",
          page: 5,
          text: "Entered this 14th day of March, 2024",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  summary: {
    value:
      "Class action settlement regarding data breach affecting customer information",
    source: {
      document: "notice_of_class.pdf",
      page: 1,
      text: "This settlement resolves claims related to a data breach...",
    },
    modelExtractions: [
      {
        value:
          "Class action settlement regarding data breach affecting customer information",
        source: {
          document: "notice_of_class.pdf",
          page: 1,
          text: "This settlement resolves claims related to a data breach affecting customer information",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value:
          "Settlement of data breach litigation involving unauthorized access to customer data",
        source: {
          document: "settlement_agreement.pdf",
          page: 2,
          text: "This agreement settles all claims arising from the unauthorized access to customer data",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  judgeName: {
    value: "Hon. Sarah Johnson",
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Before: Hon. Sarah Johnson, U.S.D.J.",
    },
    modelExtractions: [
      {
        value: "Hon. Sarah Johnson",
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Before: Hon. Sarah Johnson, U.S.D.J.",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "Judge Sarah Johnson",
        source: {
          document: "final_approval_order.pdf",
          page: 1,
          text: "JUDGE SARAH JOHNSON, United States District Judge",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  settlementType: {
    value: "Final",
    source: {
      document: "settlement_agreement.pdf",
      page: 1,
      text: "FINAL SETTLEMENT AGREEMENT",
    },
    modelExtractions: [
      {
        value: "Final",
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "FINAL SETTLEMENT AGREEMENT",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: "Final",
        source: {
          document: "final_approval_order.pdf",
          page: 1,
          text: "ORDER GRANTING FINAL APPROVAL",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
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
    modelExtractions: [
      {
        value: 2500000,
        displayValue: "$2,500,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 12,
          text: "...the total settlement fund shall be TWO MILLION FIVE HUNDRED THOUSAND DOLLARS ($2,500,000)...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 2750000,
        displayValue: "$2,750,000",
        source: {
          document: "amended_settlement.pdf",
          page: 8,
          text: "The amended settlement increases the fund to $2,750,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  baseSettlementAmount: {
    value: 2000000,
    displayValue: "$2,000,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 12,
      text: "...base settlement amount of $2,000,000...",
    },
    modelExtractions: [
      {
        value: 2000000,
        displayValue: "$2,000,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 12,
          text: "...base settlement amount of $2,000,000...",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 1900000,
        displayValue: "$1,900,000",
        source: {
          document: "notice_of_class.pdf",
          page: 4,
          text: "The base fund is $1,900,000",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  contingentSettlementAmount: {
    value: 500000,
    displayValue: "$500,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 13,
      text: "...contingent amount up to $500,000...",
    },
    modelExtractions: [
      {
        value: 500000,
        displayValue: "$500,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 13,
          text: "...contingent amount up to $500,000...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 850000,
        displayValue: "$850,000",
        source: {
          document: "amended_settlement.pdf",
          page: 9,
          text: "Contingent portion increased to $850,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  isSettlementCapped: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 13,
      text: "The total settlement shall not exceed $2,500,000",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 13,
          text: "The total settlement shall not exceed $2,500,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "amended_settlement.pdf",
          page: 10,
          text: "No cap on total settlement amount",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },

  // Attorney Fees
  attorneyFeesMethod: {
    value: "Percentage",
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "Attorney fees calculated as percentage of fund",
    },
    modelExtractions: [
      {
        value: "Percentage",
        source: {
          document: "settlement_agreement.pdf",
          page: 18,
          text: "Attorney fees calculated as percentage of fund",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "Lodestar",
        source: {
          document: "fee_motion.pdf",
          page: 3,
          text: "Counsel requests fees based on lodestar calculation",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  attorneyFeesPercentage: {
    value: 33.3,
    displayValue: "33.3%",
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "...fees not to exceed one-third (33.3%)...",
    },
    modelExtractions: [
      {
        value: 33.3,
        displayValue: "33.3%",
        source: {
          document: "settlement_agreement.pdf",
          page: 18,
          text: "...fees not to exceed one-third (33.3%)...",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 25,
        displayValue: "25%",
        source: {
          document: "fee_motion.pdf",
          page: 5,
          text: "Counsel requests 25% of the settlement fund",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  attorneyFeesPaidFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 18,
      text: "...fees shall be paid from the Settlement Fund...",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 18,
          text: "...fees shall be paid from the Settlement Fund...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "final_approval_order.pdf",
          page: 8,
          text: "Attorney fees to be deducted from settlement fund",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  lodestardAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: 850000,
        displayValue: "$850,000",
        source: {
          document: "fee_motion.pdf",
          page: 12,
          text: "Total lodestar: $850,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 920000,
        displayValue: "$920,000",
        source: {
          document: "fee_declaration.pdf",
          page: 15,
          text: "Lodestar calculation yields $920,000",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  multiplier: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: 1.5,
        source: {
          document: "fee_motion.pdf",
          page: 18,
          text: "Requesting multiplier of 1.5",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 2.0,
        source: {
          document: "plaintiff_brief.pdf",
          page: 22,
          text: "A 2.0 multiplier is warranted",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  attorneyFeesReimbursement: {
    value: 50000,
    displayValue: "$50,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 19,
      text: "...reimbursement of expenses up to $50,000...",
    },
    modelExtractions: [
      {
        value: 50000,
        displayValue: "$50,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 19,
          text: "...reimbursement of expenses up to $50,000...",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 75000,
        displayValue: "$75,000",
        source: {
          document: "fee_motion.pdf",
          page: 20,
          text: "Actual expenses total $75,000",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  attorneyFeesReimbursementFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 19,
      text: "...expenses paid from Settlement Fund...",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 19,
          text: "...expenses paid from Settlement Fund...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "defense_opposition.pdf",
          page: 8,
          text: "Expenses should be paid separately",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
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
    modelExtractions: [
      {
        value: 15000,
        displayValue: "15,000",
        source: {
          document: "notice_of_class.pdf",
          page: 3,
          text: "...approximately 15,000 individuals...",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 18500,
        displayValue: "18,500",
        source: {
          document: "expert_report.pdf",
          page: 7,
          text: "Updated analysis shows 18,500 affected individuals",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  classType: {
    value: ["Consumers", "Employees"],
    source: {
      document: "notice_of_class.pdf",
      page: 3,
      text: "...consumers and employees affected...",
    },
    modelExtractions: [
      {
        value: ["Consumers", "Employees"],
        source: {
          document: "notice_of_class.pdf",
          page: 3,
          text: "...consumers and employees affected...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: ["Consumers"],
        source: {
          document: "class_definition.pdf",
          page: 2,
          text: "Class consists of consumers only",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  hasMinorSubclass: {
    value: false,
    source: {
      document: "notice_of_class.pdf",
      page: 4,
      text: "No minor subclass identified",
    },
    modelExtractions: [
      {
        value: false,
        source: {
          document: "notice_of_class.pdf",
          page: 4,
          text: "No minor subclass identified",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "amended_class_definition.pdf",
          page: 3,
          text: "Includes subclass of minors under 18",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  isMultiDistrictLitigation: {
    value: false,
    source: {
      document: "docket.pdf",
      page: 1,
      text: "Single district litigation",
    },
    modelExtractions: [
      {
        value: false,
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Single district litigation",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "mdl_panel_order.pdf",
          page: 1,
          text: "MDL No. 3045",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
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
    modelExtractions: [
      {
        value: 3200,
        displayValue: "3,200",
        source: {
          document: "claims_report.pdf",
          page: 1,
          text: "Total claims received: 3,200",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 3450,
        displayValue: "3,450",
        source: {
          document: "final_claims_report.pdf",
          page: 2,
          text: "Final count: 3,450 valid claims",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  claimsSubmittedPercent: {
    value: 21.3,
    displayValue: "21.3%",
    source: {
      document: "claims_report.pdf",
      page: 1,
      text: "Claims rate: 21.3%",
    },
    modelExtractions: [
      {
        value: 21.3,
        displayValue: "21.3%",
        source: {
          document: "claims_report.pdf",
          page: 1,
          text: "Claims rate: 21.3%",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 23.0,
        displayValue: "23.0%",
        source: {
          document: "final_claims_report.pdf",
          page: 2,
          text: "Final participation rate: 23%",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  claimsAdminCosts: {
    value: 150000,
    displayValue: "$150,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 20,
      text: "Claims administration costs: $150,000",
    },
    modelExtractions: [
      {
        value: 150000,
        displayValue: "$150,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 20,
          text: "Claims administration costs: $150,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 175000,
        displayValue: "$175,000",
        source: {
          document: "admin_invoice.pdf",
          page: 1,
          text: "Total administration fees: $175,000",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  claimsAdminCostsFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 20,
      text: "...administration costs paid from fund...",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 20,
          text: "...administration costs paid from fund...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "final_approval_order.pdf",
          page: 12,
          text: "Admin costs deducted from settlement fund",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
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
    modelExtractions: [
      {
        value: 125,
        displayValue: "$125",
        source: {
          document: "notice_of_class.pdf",
          page: 5,
          text: "Base compensation of $125 per claimant",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 150,
        displayValue: "$150",
        source: {
          document: "amended_notice.pdf",
          page: 4,
          text: "Increased base payment to $150",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  maxReimbursementOutOfPocket: {
    value: 5000,
    displayValue: "$5,000",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Up to $5,000 for out-of-pocket losses",
    },
    modelExtractions: [
      {
        value: 5000,
        displayValue: "$5,000",
        source: {
          document: "notice_of_class.pdf",
          page: 6,
          text: "Up to $5,000 for out-of-pocket losses",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 7500,
        displayValue: "$7,500",
        source: {
          document: "claim_form.pdf",
          page: 3,
          text: "Maximum reimbursement: $7,500",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  maxReimbursementDocumentedTime: {
    value: 500,
    displayValue: "$500",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Up to $500 for documented time",
    },
    modelExtractions: [
      {
        value: 500,
        displayValue: "$500",
        source: {
          document: "notice_of_class.pdf",
          page: 6,
          text: "Up to $500 for documented time",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 750,
        displayValue: "$750",
        source: {
          document: "settlement_agreement.pdf",
          page: 25,
          text: "Maximum $750 for time spent",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  maxHoursDocumented: {
    value: 10,
    displayValue: "10",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "Maximum 10 hours documented time",
    },
    modelExtractions: [
      {
        value: 10,
        displayValue: "10",
        source: {
          document: "notice_of_class.pdf",
          page: 6,
          text: "Maximum 10 hours documented time",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 15,
        displayValue: "15",
        source: {
          document: "claim_form.pdf",
          page: 4,
          text: "Up to 15 hours may be claimed",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  ratePerHourDocumented: {
    value: 50,
    displayValue: "$50/hour",
    source: {
      document: "notice_of_class.pdf",
      page: 6,
      text: "At $50 per hour for documented time",
    },
    modelExtractions: [
      {
        value: 50,
        displayValue: "$50/hour",
        source: {
          document: "notice_of_class.pdf",
          page: 6,
          text: "At $50 per hour for documented time",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 40,
        displayValue: "$40/hour",
        source: {
          document: "settlement_agreement.pdf",
          page: 26,
          text: "Hourly rate of $40",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  maxReimbursementUndocumented: {
    value: 250,
    displayValue: "$250",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Up to $250 for undocumented time",
    },
    modelExtractions: [
      {
        value: 250,
        displayValue: "$250",
        source: {
          document: "notice_of_class.pdf",
          page: 7,
          text: "Up to $250 for undocumented time",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 300,
        displayValue: "$300",
        source: {
          document: "claim_instructions.pdf",
          page: 5,
          text: "Maximum $300 without documentation",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  maxHoursUndocumented: {
    value: 5,
    displayValue: "5",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Maximum 5 hours undocumented",
    },
    modelExtractions: [
      {
        value: 5,
        displayValue: "5",
        source: {
          document: "notice_of_class.pdf",
          page: 7,
          text: "Maximum 5 hours undocumented",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 7.5,
        displayValue: "7.5",
        source: {
          document: "claim_form.pdf",
          page: 5,
          text: "Up to 7.5 hours without documentation",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  ratePerHourUndocumented: {
    value: 50,
    displayValue: "$50/hour",
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "At $50 per hour",
    },
    modelExtractions: [
      {
        value: 50,
        displayValue: "$50/hour",
        source: {
          document: "notice_of_class.pdf",
          page: 7,
          text: "At $50 per hour",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 40,
        displayValue: "$40/hour",
        source: {
          document: "settlement_agreement.pdf",
          page: 27,
          text: "Undocumented time at $40/hour",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  allowBothDocAndUndoc: {
    value: false,
    source: {
      document: "notice_of_class.pdf",
      page: 7,
      text: "Cannot claim both documented and undocumented",
    },
    modelExtractions: [
      {
        value: false,
        source: {
          document: "notice_of_class.pdf",
          page: 7,
          text: "Cannot claim both documented and undocumented",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "claim_instructions.pdf",
          page: 6,
          text: "May claim both types of time compensation",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  hasProRataAdjustment: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 15,
      text: "Pro rata adjustment if claims exceed fund",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 15,
          text: "Pro rata adjustment if claims exceed fund",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "plaintiff_motion.pdf",
          page: 8,
          text: "No pro rata reduction",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  proRataAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: 87.5,
        displayValue: "$87.50",
        source: {
          document: "claims_report.pdf",
          page: 8,
          text: "Pro rata payment: $87.50 per claimant",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 95,
        displayValue: "$95.00",
        source: {
          document: "distribution_plan.pdf",
          page: 3,
          text: "Adjusted payment of $95",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  supplementalReimbursement: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: 1000,
        displayValue: "$1,000",
        source: {
          document: "notice_of_class.pdf",
          page: 8,
          text: "Additional $1,000 for identity theft victims",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 1500,
        displayValue: "$1,500",
        source: {
          document: "supplemental_fund.pdf",
          page: 2,
          text: "Supplemental payment up to $1,500",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
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
    modelExtractions: [
      {
        value: 10000,
        displayValue: "$10,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 21,
          text: "Service awards of $10,000 to each representative",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 15000,
        displayValue: "$15,000",
        source: {
          document: "incentive_award_motion.pdf",
          page: 4,
          text: "Requesting $15,000 per representative",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  classRepAwardsFromFund: {
    value: true,
    source: {
      document: "settlement_agreement.pdf",
      page: 21,
      text: "Service awards paid from Settlement Fund",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 21,
          text: "Service awards paid from Settlement Fund",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "defense_objection.pdf",
          page: 6,
          text: "Awards should be paid separately by counsel",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },

  // Breach Information
  piiAffected: {
    value: ["SSN", "Name", "Address", "DOB"],
    source: {
      document: "complaint.pdf",
      page: 5,
      text: "Social Security numbers, names, addresses, dates of birth",
    },
    modelExtractions: [
      {
        value: ["SSN", "Name", "Address", "DOB"],
        source: {
          document: "complaint.pdf",
          page: 5,
          text: "Social Security numbers, names, addresses, dates of birth",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: ["SSN", "Name", "Address", "DOB", "Driver's License"],
        source: {
          document: "expert_report.pdf",
          page: 12,
          text: "PII included SSN, names, addresses, DOB, and driver's license numbers",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  causeOfBreach: {
    value: "Ransomware",
    source: {
      document: "complaint.pdf",
      page: 3,
      text: "...ransomware attack on systems...",
    },
    modelExtractions: [
      {
        value: "Ransomware",
        source: {
          document: "complaint.pdf",
          page: 3,
          text: "...ransomware attack on systems...",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "Phishing Attack",
        source: {
          document: "forensic_report.pdf",
          page: 8,
          text: "Initial compromise via phishing email",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },

  // Parties
  defenseCounsel: {
    value: "Smith & Associates LLP",
    source: {
      document: "docket.pdf",
      page: 2,
      text: "Defense counsel: Smith & Associates LLP",
    },
    modelExtractions: [
      {
        value: "Smith & Associates LLP",
        source: {
          document: "docket.pdf",
          page: 2,
          text: "Defense counsel: Smith & Associates LLP",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: "Smith, Johnson & Associates LLP",
        source: {
          document: "appearance.pdf",
          page: 1,
          text: "Smith, Johnson & Associates LLP for Defendants",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  plaintiffCounsel: {
    value: "Johnson Law Group",
    source: {
      document: "docket.pdf",
      page: 2,
      text: "Plaintiff counsel: Johnson Law Group",
    },
    modelExtractions: [
      {
        value: "Johnson Law Group",
        source: {
          document: "docket.pdf",
          page: 2,
          text: "Plaintiff counsel: Johnson Law Group",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "Johnson & Williams Law Group PC",
        source: {
          document: "complaint.pdf",
          page: 25,
          text: "Johnson & Williams Law Group PC, Attorneys for Plaintiffs",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },

  // Injunctive Relief
  injunctiveRelief: {
    value: ["Employee training", "Security assessments", "Vendor requirements"],
    source: {
      document: "settlement_agreement.pdf",
      page: 25,
      text: "Enhanced employee training, quarterly security assessments, vendor security requirements",
    },
    modelExtractions: [
      {
        value: [
          "Employee training",
          "Security assessments",
          "Vendor requirements",
        ],
        source: {
          document: "settlement_agreement.pdf",
          page: 25,
          text: "Enhanced employee training, quarterly security assessments, vendor security requirements",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: [
          "Employee training",
          "Security assessments",
          "Vendor requirements",
          "Encryption",
          "Access controls",
        ],
        source: {
          document: "injunctive_relief_order.pdf",
          page: 3,
          text: "Training, assessments, vendor requirements, encryption standards, and access controls",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  injunctiveReliefAmount: {
    value: 500000,
    displayValue: "$500,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 26,
      text: "Defendant shall spend no less than $500,000 on security improvements",
    },
    modelExtractions: [
      {
        value: 500000,
        displayValue: "$500,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 26,
          text: "Defendant shall spend no less than $500,000 on security improvements",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: 750000,
        displayValue: "$750,000",
        source: {
          document: "security_budget.pdf",
          page: 1,
          text: "Total security investment: $750,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  thirdPartyAssessments: {
    value: ["SOC 2", "ISO 27001"],
    source: {
      document: "settlement_agreement.pdf",
      page: 26,
      text: "Annual SOC 2 and ISO 27001 assessments required",
    },
    modelExtractions: [
      {
        value: ["SOC 2", "ISO 27001"],
        source: {
          document: "settlement_agreement.pdf",
          page: 26,
          text: "Annual SOC 2 and ISO 27001 assessments required",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: ["SOC 2", "ISO 27001", "PCI DSS"],
        source: {
          document: "compliance_requirements.pdf",
          page: 4,
          text: "SOC 2, ISO 27001, and PCI DSS compliance required",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },

  // Additional Benefits
  creditMonitoring: {
    value: true,
    source: {
      document: "notice_of_class.pdf",
      page: 8,
      text: "Two years of credit monitoring provided",
    },
    modelExtractions: [
      {
        value: true,
        source: {
          document: "notice_of_class.pdf",
          page: 8,
          text: "Two years of credit monitoring provided",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 30,
          text: "Credit monitoring services will be offered",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },
  creditMonitoringAmount: {
    value: 300000,
    displayValue: "$300,000",
    source: {
      document: "settlement_agreement.pdf",
      page: 22,
      text: "Credit monitoring services valued at $300,000",
    },
    modelExtractions: [
      {
        value: 300000,
        displayValue: "$300,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 22,
          text: "Credit monitoring services valued at $300,000",
        },
        model: AI_MODELS.GPT_41,
        isSelected: true,
      },
      {
        value: 400000,
        displayValue: "$400,000",
        source: {
          document: "credit_monitoring_contract.pdf",
          page: 1,
          text: "Total contract value: $400,000",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: false,
      },
    ],
  },
  excessFundsDisposition: {
    value: "Cy pres",
    source: {
      document: "settlement_agreement.pdf",
      page: 30,
      text: "Excess funds distributed cy pres to privacy organizations",
    },
    modelExtractions: [
      {
        value: "Cy pres",
        source: {
          document: "settlement_agreement.pdf",
          page: 30,
          text: "Excess funds distributed cy pres to privacy organizations",
        },
        model: AI_MODELS.GEMINI_25_PRO,
        isSelected: true,
      },
      {
        value: "Redistribution",
        source: {
          document: "distribution_plan.pdf",
          page: 12,
          text: "Excess funds redistributed to claimants",
        },
        model: AI_MODELS.GPT_41,
        isSelected: false,
      },
    ],
  },

  // Admin fields
  status: "flagged",
  flaggedBy: "user@lawfirm.com",
  flagReason: "Settlement amount seems low for class size",
};

export const mockDocuments = [
  { name: "complaint.pdf", size: "2.3 MB" },
  { name: "settlement_agreement.pdf", size: "1.8 MB" },
  { name: "notice_of_class.pdf", size: "856 KB" },
  { name: "fairness_hearing.pdf", size: "1.2 MB" },
  { name: "docket.pdf", size: "1.1 MB" },
  { name: "claims_report.pdf", size: "742 KB" },
];
