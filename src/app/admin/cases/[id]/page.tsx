"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  Edit2,
  AlertCircle,
  DollarSign,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Shield,
  Scale,
  CreditCard,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Types for our data structure
interface FieldSource {
  document: string;
  page: number;
  text: string;
}

interface ModelExtraction<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
  model: "Gemini 2.5 Pro" | "GPT 4.1";
  isSelected?: boolean;
}

interface ExtractedField<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
  // Support multiple model extractions
  modelExtractions?: ModelExtraction<T>[];
}

// Mock data structure with all 48 fields
const mockCaseData = {
  // Basic Information
  id: {
    value: "SET-123456-A",
    source: { document: "docket.pdf", page: 1, text: "Case No. SET-123456-A" },
    modelExtractions: [
      {
        value: "SET-123456-A",
        source: { document: "docket.pdf", page: 1, text: "Case No. SET-123456-A" },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: "SET-123456",
        source: { document: "complaint.pdf", page: 1, text: "Case Number SET-123456" },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: "In re: Data Breach Class Action Litigation",
        source: {
          document: "settlement_agreement.pdf",
          page: 1,
          text: "In re: Data Breach Class Action Litigation",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: "1:24-cv-04221",
        source: {
          document: "complaint.pdf",
          page: 1,
          text: "Case No. 1:24-cv-04221",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: "SDNY",
        source: {
          document: "docket.pdf",
          page: 1,
          text: "United States District Court, SDNY",
        },
        model: "Gemini 2.5 Pro" as const,
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
        source: { document: "complaint.pdf", page: 1, text: "State of New York" },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: "New York",
        source: { document: "settlement_agreement.pdf", page: 1, text: "State of New York" },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: 2024,
        source: {
          document: "docket.pdf",
          page: 1,
          text: "Filed in 2024",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: "03/15/2024",
        source: {
          document: "fairness_hearing.pdf",
          page: 2,
          text: "Final approval granted on 03/15/2024",
        },
        model: "GPT 4.1" as const,
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
          text: "This settlement resolves claims related to a data breach...",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value:
          "Settlement of consumer class action arising from 2023 data security incident involving personally identifiable information",
        source: {
          document: "settlement_agreement.pdf",
          page: 2,
          text: "This Agreement resolves consumer class action claims stemming from the 2023 data security incident...",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: "Judge Sarah L. Johnson",
        source: {
          document: "fairness_hearing.pdf",
          page: 1,
          text: "The Honorable Sarah L. Johnson presiding",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: "Final Settlement",
        source: {
          document: "fairness_hearing.pdf",
          page: 15,
          text: "The Court grants final settlement approval",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 2750000,
        displayValue: "$2,750,000",
        source: {
          document: "settlement_agreement.pdf",
          page: 14,
          text: "...including all contingent amounts, the maximum settlement exposure is $2,750,000...",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 2000000,
        displayValue: "$2,000,000.00",
        source: {
          document: "fairness_hearing.pdf",
          page: 8,
          text: "The base settlement fund is established at $2,000,000.00",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 500000,
        displayValue: "$500,000",
        source: {
          document: "notice_of_class.pdf",
          page: 4,
          text: "Additional contingent payments may total up to five hundred thousand dollars ($500,000)",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 10,
          text: "Settlement payments are capped at a maximum of two million five hundred thousand dollars",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: "Percentage of Fund",
        source: {
          document: "motion_for_fees.pdf",
          page: 2,
          text: "Counsel seeks fees based on percentage of fund method",
        },
        model: "GPT 4.1" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 30,
        displayValue: "30%",
        source: {
          document: "motion_for_fees.pdf",
          page: 5,
          text: "Class counsel requests 30% of the settlement fund",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 12,
          text: "Attorney fees to be deducted from the gross settlement fund",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
    ],
  },
  lodestardAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: undefined,
        source: { document: "", page: 0, text: "" },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 750000,
        displayValue: "$750,000",
        source: { document: "motion_for_fees.pdf", page: 8, text: "Lodestar calculation totals $750,000" },
        model: "GPT 4.1" as const,
        isSelected: false,
      },
    ],
  },
  multiplier: { 
    value: undefined, 
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: undefined,
        source: { document: "", page: 0, text: "" },
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 1.1,
        displayValue: "1.1x",
        source: { document: "motion_for_fees.pdf", page: 8, text: "Applying a modest multiplier of 1.1" },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 47500,
        displayValue: "$47,500",
        source: {
          document: "motion_for_fees.pdf",
          page: 10,
          text: "Actual litigation expenses totaling $47,500",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 12,
          text: "Litigation costs and expenses shall be reimbursed from the fund",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 15234,
        displayValue: "15,234",
        source: {
          document: "claims_report.pdf",
          page: 2,
          text: "Total class members identified: 15,234",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: ["Consumer", "Employee", "Former Employee"],
        source: {
          document: "settlement_agreement.pdf",
          page: 5,
          text: "Class members include consumers, current employees, and former employees",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "settlement_agreement.pdf",
          page: 8,
          text: "The settlement does not include a separate subclass for minors",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: false,
        source: {
          document: "complaint.pdf",
          page: 2,
          text: "This action is not an MDL proceeding",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 3187,
        displayValue: "3,187",
        source: {
          document: "claims_report.pdf",
          page: 5,
          text: "Valid claims submitted: 3,187",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 21,
        displayValue: "21%",
        source: {
          document: "fairness_hearing.pdf",
          page: 14,
          text: "Approximately 21% of class members submitted claims",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 145000,
        displayValue: "$145,000",
        source: {
          document: "claims_report.pdf",
          page: 8,
          text: "Total administration costs: One hundred forty-five thousand dollars ($145,000)",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 11,
          text: "Claims administration expenses shall be deducted from the settlement fund",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: 150,
        displayValue: "$150",
        source: {
          document: "settlement_agreement.pdf",
          page: 22,
          text: "Each valid claimant shall receive $150 base payment",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 5000,
        displayValue: "$5,000.00",
        source: {
          document: "settlement_agreement.pdf",
          page: 23,
          text: "Maximum reimbursement for documented losses: $5,000.00",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 500,
        displayValue: "$500",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Time spent remedying breach: maximum $500",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 10,
        displayValue: "10 hours",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Up to ten (10) hours of documented time",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 50,
        displayValue: "$50.00/hr",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Compensated at fifty dollars ($50.00) per hour",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: 250,
        displayValue: "$250",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Undocumented time compensation: maximum two hundred fifty dollars ($250)",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: 5,
        displayValue: "5 hours",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Up to five (5) hours without documentation",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 50,
        displayValue: "$50 per hour",
        source: {
          document: "settlement_agreement.pdf",
          page: 24,
          text: "Same rate of $50 per hour applies",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: false,
        source: {
          document: "settlement_agreement.pdf",
          page: 25,
          text: "Claimants must choose either documented OR undocumented time compensation",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 13,
          text: "Claims will be reduced pro rata if total exceeds available funds",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
    ],
  },
  proRataAmount: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: undefined,
        source: { document: "", page: 0, text: "" },
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 0.85,
        displayValue: "85%",
        source: { document: "claims_report.pdf", page: 10, text: "Pro rata factor applied: 0.85" },
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
    ],
  },
  supplementalReimbursement: {
    value: undefined,
    source: { document: "", page: 0, text: "" },
    modelExtractions: [
      {
        value: undefined,
        source: { document: "", page: 0, text: "" },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 100,
        displayValue: "$100",
        source: { document: "notice_of_class.pdf", page: 8, text: "Additional $100 for identity theft victims" },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: 10000,
        displayValue: "$10,000.00",
        source: {
          document: "fairness_hearing.pdf",
          page: 16,
          text: "Court approves incentive award of ten thousand dollars ($10,000.00) per named plaintiff",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: true,
        source: {
          document: "fairness_hearing.pdf",
          page: 16,
          text: "Incentive awards shall be paid from the common fund",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: ["Social Security Number", "Full Name", "Home Address", "Date of Birth", "Driver's License"],
        source: {
          document: "notice_of_class.pdf",
          page: 2,
          text: "Exposed data included: Social Security Numbers, full names, home addresses, dates of birth, and driver's license numbers",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: "Ransomware Attack",
        source: {
          document: "settlement_agreement.pdf",
          page: 3,
          text: "The data breach resulted from a ransomware attack by unauthorized third parties",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: "Smith & Associates, LLP",
        source: {
          document: "settlement_agreement.pdf",
          page: 30,
          text: "Attorneys for Defendant: Smith & Associates, LLP",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: "Johnson Law Group PC",
        source: {
          document: "settlement_agreement.pdf",
          page: 30,
          text: "Class Counsel: Johnson Law Group PC",
        },
        model: "Gemini 2.5 Pro" as const,
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
        value: ["Employee training", "Security assessments", "Vendor requirements"],
        source: {
          document: "settlement_agreement.pdf",
          page: 25,
          text: "Enhanced employee training, quarterly security assessments, vendor security requirements",
        },
        model: "GPT 4.1" as const,
        isSelected: false,
      },
      {
        value: ["Mandatory cybersecurity training", "Quarterly penetration testing", "Third-party vendor audits", "Data encryption"],
        source: {
          document: "fairness_hearing.pdf",
          page: 17,
          text: "Injunctive relief includes: mandatory cybersecurity training for all employees, quarterly penetration testing, third-party vendor security audits, and implementation of data encryption standards",
        },
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: 550000,
        displayValue: "$550,000",
        source: {
          document: "fairness_hearing.pdf",
          page: 18,
          text: "Total security improvement commitment: five hundred fifty thousand dollars ($550,000)",
        },
        model: "GPT 4.1" as const,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: ["SOC 2 Type II", "ISO 27001", "PCI DSS"],
        source: {
          document: "settlement_agreement.pdf",
          page: 27,
          text: "Required assessments: SOC 2 Type II audit, ISO 27001 certification, and PCI DSS compliance where applicable",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: false,
      },
      {
        value: true,
        source: {
          document: "settlement_agreement.pdf",
          page: 22,
          text: "Credit monitoring services will be provided for 24 months",
        },
        model: "GPT 4.1" as const,
        isSelected: true,
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
        model: "GPT 4.1" as const,
        isSelected: true,
      },
      {
        value: 320000,
        displayValue: "$320,000",
        source: {
          document: "fairness_hearing.pdf",
          page: 15,
          text: "Estimated value of credit monitoring services: three hundred twenty thousand dollars ($320,000)",
        },
        model: "Gemini 2.5 Pro" as const,
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
        model: "Gemini 2.5 Pro" as const,
        isSelected: true,
      },
      {
        value: "Cy Pres Distribution",
        source: {
          document: "fairness_hearing.pdf",
          page: 19,
          text: "Any unclaimed funds shall be distributed cy pres to Electronic Frontier Foundation and Privacy Rights Clearinghouse",
        },
        model: "GPT 4.1" as const,
        isSelected: false,
      },
    ],
  },

  // Admin fields
  status: "flagged",
  flaggedBy: "user@lawfirm.com",
  flagReason: "Settlement amount seems low for class size",
};

const mockDocuments = [
  { name: "complaint.pdf", size: "2.3 MB" },
  { name: "settlement_agreement.pdf", size: "1.8 MB" },
  { name: "notice_of_class.pdf", size: "856 KB" },
  { name: "fairness_hearing.pdf", size: "1.2 MB" },
  { name: "docket.pdf", size: "1.1 MB" },
  { name: "claims_report.pdf", size: "742 KB" },
];

export default function CaseDetailsPage() {
  const router = useRouter();
  const [adminNotes, setAdminNotes] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFieldData, setEditFieldData] = useState<{
    field: string;
    label: string;
    currentValue: unknown;
    currentSource: FieldSource;
    fieldType: string;
  } | null>(null);
  const [editValues, setEditValues] = useState<{
    value: unknown;
    document: string;
    page: string;
    text: string;
  }>({ value: "", document: "", page: "", text: "" });

  const handleEdit = (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string = "text",
  ) => {
    // If we have model extractions, use the selected one
    const selectedExtraction = data.modelExtractions?.find((e) => e.isSelected);
    const valueToEdit = selectedExtraction
      ? selectedExtraction.value
      : data.value;
    const sourceToEdit = selectedExtraction
      ? selectedExtraction.source
      : data.source;

    setEditFieldData({
      field,
      label,
      currentValue: valueToEdit,
      currentSource: sourceToEdit,
      fieldType,
    });
    setEditValues({
      value: valueToEdit || "",
      document: sourceToEdit.document,
      page: sourceToEdit.page.toString(),
      text: sourceToEdit.text,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving edit:", editFieldData?.field, editValues);
    setShowEditDialog(false);
    setEditFieldData(null);
  };

  const handleApprove = () => {
    console.log("Approved case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  const handleReject = () => {
    console.log("Rejected case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  const handleRequestInfo = () => {
    console.log("Requested more info for case:", mockCaseData.id.value);
    router.push("/admin/cases");
  };

  // Handle selecting a model extraction
  const handleSelectModelExtraction = (
    fieldKey: string,
    modelIndex: number,
  ) => {
    console.log(
      `Selected ${fieldKey} extraction from model index ${modelIndex}`,
    );
    // In a real implementation, this would update the backend
  };

  // Component for displaying a data field with source
  const DataField = ({
    icon,
    label,
    data,
    fieldKey,
    fieldType = "text",
  }: {
    icon?: React.ReactNode;
    label: string;
    data: ExtractedField;
    fieldKey: string;
    fieldType?: string;
  }) => {
    // Don't render if no value and no source
    if (!data.value && !data.source.document) return null;

    const displayValue = (value: unknown, displayValueOverride?: string) => {
      if (fieldType === "boolean") {
        return value ? "Yes" : "No";
      } else if (fieldType === "array") {
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
            onClick={() => handleEdit(fieldKey, label, data, fieldType)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        {hasMultipleExtractions ? (
          // Show multiple model extractions
          <div className="space-y-3">
            {data.modelExtractions!.map((extraction, index) => (
              <div
                key={`${fieldKey}-${extraction.model}`}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  extraction.isSelected
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
                        checked={extraction.isSelected || false}
                        onChange={() =>
                          handleSelectModelExtraction(fieldKey, index)
                        }
                        className="text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-lg font-semibold">
                        {displayValue(
                          extraction.value,
                          extraction.displayValue,
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
            ))}
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
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/cases")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cases
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Case Title and Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold">
                QC Review: {mockCaseData.id.value}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {mockCaseData.name.value}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Status Banner */}
          {mockCaseData.status === "flagged" && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">
                    Case Flagged for Review
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Flagged by {mockCaseData.flaggedBy}: &quot;
                    {mockCaseData.flagReason}&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-4">
              Attached Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockDocuments.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sections */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Case Name"
                  data={mockCaseData.name}
                  fieldKey="name"
                />
                <DataField
                  label="Docket ID"
                  data={mockCaseData.docketId}
                  fieldKey="docketId"
                />
                <DataField
                  label="Court"
                  data={mockCaseData.court}
                  fieldKey="court"
                />
                <DataField
                  label="State"
                  data={mockCaseData.state}
                  fieldKey="state"
                />
                <DataField
                  label="Year"
                  data={mockCaseData.year}
                  fieldKey="year"
                  fieldType="number"
                />
                <DataField
                  label="Settlement Date"
                  data={mockCaseData.date}
                  fieldKey="date"
                  fieldType="date"
                />
                <DataField
                  label="Judge Name"
                  data={mockCaseData.judgeName}
                  fieldKey="judgeName"
                />
                <DataField
                  label="Settlement Type"
                  data={mockCaseData.settlementType}
                  fieldKey="settlementType"
                  fieldType="select"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <DataField
                  label="Case Summary"
                  data={mockCaseData.summary}
                  fieldKey="summary"
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  icon={<DollarSign className="h-4 w-4 text-green-600" />}
                  label="Total Settlement Amount"
                  data={mockCaseData.settlementAmount}
                  fieldKey="settlementAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Base Settlement Amount"
                  data={mockCaseData.baseSettlementAmount}
                  fieldKey="baseSettlementAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Contingent Settlement Amount"
                  data={mockCaseData.contingentSettlementAmount}
                  fieldKey="contingentSettlementAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Settlement Capped"
                  data={mockCaseData.isSettlementCapped}
                  fieldKey="isSettlementCapped"
                  fieldType="boolean"
                />
              </div>
            </div>

            {/* Attorney Fees */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Attorney Fees
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Fee Calculation Method"
                  data={mockCaseData.attorneyFeesMethod}
                  fieldKey="attorneyFeesMethod"
                  fieldType="select"
                />
                <DataField
                  label="Attorney Fees Percentage"
                  data={mockCaseData.attorneyFeesPercentage}
                  fieldKey="attorneyFeesPercentage"
                  fieldType="percentage"
                />
                <DataField
                  label="Fees Paid from Fund"
                  data={mockCaseData.attorneyFeesPaidFromFund}
                  fieldKey="attorneyFeesPaidFromFund"
                  fieldType="boolean"
                />
                <DataField
                  label="Lodestar Amount"
                  data={mockCaseData.lodestardAmount}
                  fieldKey="lodestardAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Lodestar Multiplier"
                  data={mockCaseData.multiplier}
                  fieldKey="multiplier"
                  fieldType="number"
                />
                <DataField
                  label="Attorney Fees Reimbursement"
                  data={mockCaseData.attorneyFeesReimbursement}
                  fieldKey="attorneyFeesReimbursement"
                  fieldType="currency"
                />
                <DataField
                  label="Reimbursement from Fund"
                  data={mockCaseData.attorneyFeesReimbursementFromFund}
                  fieldKey="attorneyFeesReimbursementFromFund"
                  fieldType="boolean"
                />
              </div>
            </div>

            {/* Class Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Class Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  icon={<Users className="h-4 w-4 text-blue-600" />}
                  label="Class Size"
                  data={mockCaseData.classSize}
                  fieldKey="classSize"
                  fieldType="number"
                />
                <DataField
                  label="Class Type"
                  data={mockCaseData.classType}
                  fieldKey="classType"
                  fieldType="array"
                />
                <DataField
                  label="Has Minor Subclass"
                  data={mockCaseData.hasMinorSubclass}
                  fieldKey="hasMinorSubclass"
                  fieldType="boolean"
                />
                <DataField
                  label="Multi-District Litigation"
                  data={mockCaseData.isMultiDistrictLitigation}
                  fieldKey="isMultiDistrictLitigation"
                  fieldType="boolean"
                />
              </div>
            </div>

            {/* Claims Data */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Claims Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Claims Submitted"
                  data={mockCaseData.claimsSubmitted}
                  fieldKey="claimsSubmitted"
                  fieldType="number"
                />
                <DataField
                  label="Claims Submitted %"
                  data={mockCaseData.claimsSubmittedPercent}
                  fieldKey="claimsSubmittedPercent"
                  fieldType="percentage"
                />
                <DataField
                  label="Claims Admin Costs"
                  data={mockCaseData.claimsAdminCosts}
                  fieldKey="claimsAdminCosts"
                  fieldType="currency"
                />
                <DataField
                  label="Admin Costs from Fund"
                  data={mockCaseData.claimsAdminCostsFromFund}
                  fieldKey="claimsAdminCostsFromFund"
                  fieldType="boolean"
                />
              </div>
            </div>

            {/* Individual Compensation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Individual Compensation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Base Cash Compensation"
                  data={mockCaseData.baseCashCompensation}
                  fieldKey="baseCashCompensation"
                  fieldType="currency"
                />
                <DataField
                  label="Max Out-of-Pocket Reimbursement"
                  data={mockCaseData.maxReimbursementOutOfPocket}
                  fieldKey="maxReimbursementOutOfPocket"
                  fieldType="currency"
                />
                <DataField
                  label="Max Documented Time Reimbursement"
                  data={mockCaseData.maxReimbursementDocumentedTime}
                  fieldKey="maxReimbursementDocumentedTime"
                  fieldType="currency"
                />
                <DataField
                  label="Max Hours Documented"
                  data={mockCaseData.maxHoursDocumented}
                  fieldKey="maxHoursDocumented"
                  fieldType="number"
                />
                <DataField
                  label="Rate per Hour (Documented)"
                  data={mockCaseData.ratePerHourDocumented}
                  fieldKey="ratePerHourDocumented"
                  fieldType="currency"
                />
                <DataField
                  label="Max Undocumented Reimbursement"
                  data={mockCaseData.maxReimbursementUndocumented}
                  fieldKey="maxReimbursementUndocumented"
                  fieldType="currency"
                />
                <DataField
                  label="Max Hours Undocumented"
                  data={mockCaseData.maxHoursUndocumented}
                  fieldKey="maxHoursUndocumented"
                  fieldType="number"
                />
                <DataField
                  label="Rate per Hour (Undocumented)"
                  data={mockCaseData.ratePerHourUndocumented}
                  fieldKey="ratePerHourUndocumented"
                  fieldType="currency"
                />
                <DataField
                  label="Allow Both Doc & Undoc"
                  data={mockCaseData.allowBothDocAndUndoc}
                  fieldKey="allowBothDocAndUndoc"
                  fieldType="boolean"
                />
                <DataField
                  label="Has Pro Rata Adjustment"
                  data={mockCaseData.hasProRataAdjustment}
                  fieldKey="hasProRataAdjustment"
                  fieldType="boolean"
                />
                <DataField
                  label="Pro Rata Amount"
                  data={mockCaseData.proRataAmount}
                  fieldKey="proRataAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Supplemental Reimbursement"
                  data={mockCaseData.supplementalReimbursement}
                  fieldKey="supplementalReimbursement"
                  fieldType="currency"
                />
              </div>
            </div>

            {/* Class Representative Awards */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Class Representative Awards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Service Awards Amount"
                  data={mockCaseData.classRepServiceAwards}
                  fieldKey="classRepServiceAwards"
                  fieldType="currency"
                />
                <DataField
                  label="Awards from Fund"
                  data={mockCaseData.classRepAwardsFromFund}
                  fieldKey="classRepAwardsFromFund"
                  fieldType="boolean"
                />
              </div>
            </div>

            {/* Breach Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Breach Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataField
                  label="PII Affected"
                  data={mockCaseData.piiAffected}
                  fieldKey="piiAffected"
                  fieldType="array"
                />
                <DataField
                  label="Cause of Breach"
                  data={mockCaseData.causeOfBreach}
                  fieldKey="causeOfBreach"
                />
              </div>
            </div>

            {/* Parties */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Parties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataField
                  label="Defense Counsel"
                  data={mockCaseData.defenseCounsel}
                  fieldKey="defenseCounsel"
                />
                <DataField
                  label="Plaintiff Counsel"
                  data={mockCaseData.plaintiffCounsel}
                  fieldKey="plaintiffCounsel"
                />
              </div>
            </div>

            {/* Injunctive Relief */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Injunctive Relief
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataField
                  label="Injunctive Relief Measures"
                  data={mockCaseData.injunctiveRelief}
                  fieldKey="injunctiveRelief"
                  fieldType="array"
                />
                <DataField
                  label="Injunctive Relief Amount"
                  data={mockCaseData.injunctiveReliefAmount}
                  fieldKey="injunctiveReliefAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Third Party Assessments"
                  data={mockCaseData.thirdPartyAssessments}
                  fieldKey="thirdPartyAssessments"
                  fieldType="array"
                />
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Additional Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataField
                  label="Credit Monitoring Offered"
                  data={mockCaseData.creditMonitoring}
                  fieldKey="creditMonitoring"
                  fieldType="boolean"
                />
                <DataField
                  label="Credit Monitoring Amount"
                  data={mockCaseData.creditMonitoringAmount}
                  fieldKey="creditMonitoringAmount"
                  fieldType="currency"
                />
                <DataField
                  label="Excess Funds Disposition"
                  data={mockCaseData.excessFundsDisposition}
                  fieldKey="excessFundsDisposition"
                  fieldType="select"
                />
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground">
              Admin Notes
            </h3>
            <Textarea
              placeholder="Add your review notes here..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              Approve Case
            </Button>
            <Button variant="outline" onClick={handleRequestInfo}>
              Request More Info
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Case
            </Button>
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {editFieldData?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Current Value Display */}
            <div className="space-y-2">
              <Label>Current Value</Label>
              <div className="p-3 bg-gray-50 rounded text-sm">
                {editFieldData?.fieldType === "boolean"
                  ? editFieldData.currentValue
                    ? "Yes"
                    : "No"
                  : editFieldData?.fieldType === "array"
                    ? Array.isArray(editFieldData.currentValue)
                      ? editFieldData.currentValue.join(", ")
                      : ""
                    : editFieldData?.currentValue?.toString() ||
                      "Not specified"}
              </div>
            </div>

            {/* New Value Input */}
            <div className="space-y-2">
              <Label>New Value</Label>
              {editFieldData?.fieldType === "boolean" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={editValues.value === true}
                    onCheckedChange={(checked) =>
                      setEditValues({
                        ...editValues,
                        value: checked,
                      })
                    }
                  />
                  <Label className="font-normal">Yes</Label>
                </div>
              ) : editFieldData?.fieldType === "select" ? (
                <Select
                  value={editValues.value as string}
                  onValueChange={(value) =>
                    setEditValues({
                      ...editValues,
                      value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {editFieldData.fieldType === "select" &&
                      [
                        "Preliminary",
                        "Final",
                        "Percentage",
                        "Lodestar",
                        "Redistribution",
                        "Cy pres",
                        "Reversion",
                      ].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              ) : editFieldData?.fieldType === "array" ? (
                <Textarea
                  value={editValues.value as string}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      value: e.target.value,
                    })
                  }
                  placeholder="Enter comma-separated values"
                  className="min-h-[80px]"
                />
              ) : (
                <Input
                  type={
                    editFieldData?.fieldType === "number" ||
                    editFieldData?.fieldType === "currency"
                      ? "number"
                      : "text"
                  }
                  value={editValues.value as string}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      value: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {/* Citation Fields */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Update Citation</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source Document</Label>
                  <Select
                    value={editValues.document}
                    onValueChange={(value) =>
                      setEditValues({
                        ...editValues,
                        document: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a document" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDocuments.map((doc) => (
                        <SelectItem key={doc.name} value={doc.name}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Page Number</Label>
                  <Input
                    type="number"
                    value={editValues.page}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        page: e.target.value,
                      })
                    }
                    placeholder="e.g., 12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quote from Document</Label>
                <Textarea
                  value={editValues.text}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      text: e.target.value,
                    })
                  }
                  placeholder="Enter the exact quote from the document that supports this value..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Reason for Change */}
            <div className="space-y-2">
              <Label>Reason for Change</Label>
              <Textarea
                placeholder="Explain why this value is being changed..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
