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

interface ExtractedField<T = unknown> {
  value: T;
  displayValue?: string;
  source: FieldSource;
}

// Mock data structure with all 48 fields
const mockCaseData = {
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
    setEditFieldData({
      field,
      label,
      currentValue: data.value,
      currentSource: data.source,
      fieldType,
    });
    setEditValues({
      value: data.value || "",
      document: data.source.document,
      page: data.source.page.toString(),
      text: data.source.text,
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

    const displayValue = () => {
      if (fieldType === "boolean") {
        return data.value ? "Yes" : "No";
      } else if (fieldType === "array") {
        return Array.isArray(data.value) ? data.value.join(", ") : "";
      } else if (data.displayValue) {
        return data.displayValue;
      } else {
        return data.value?.toString() || "Not specified";
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
            onClick={() => handleEdit(fieldKey, label, data, fieldType)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-lg font-semibold">{displayValue()}</div>

        {data.source.document && (
          <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span className="font-medium">{data.source.document}</span>
              {data.source.page > 0 && <span>• Page {data.source.page}</span>}
            </div>
            {data.source.text && (
              <p className="text-gray-600 italic">
                &quot;{data.source.text}&quot;
              </p>
            )}
          </div>
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
                    : editFieldData?.currentValue || "Not specified"}
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
                  value={editValues.value}
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
                  value={editValues.value}
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
                  value={editValues.value}
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
