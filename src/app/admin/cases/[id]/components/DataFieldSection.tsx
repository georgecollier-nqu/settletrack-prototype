"use client";

import {
  DollarSign,
  Users,
  Briefcase,
  FileCheck,
  CreditCard,
  UserCheck,
  AlertCircle,
  Scale,
  Shield,
} from "lucide-react";
import { DataField } from "./DataField";
import { FIELD_TYPES } from "@/lib/constants";
import type { ExtractedField } from "../types";

interface DataFieldSectionProps {
  mockCaseData: any;
  selectedExtractions?: Record<string, number>;
  onEdit: (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string
  ) => void;
  onSelectModelExtraction?: (fieldKey: string, modelIndex: number) => void;
}

export function DataFieldSection({ 
  mockCaseData, 
  selectedExtractions = {},
  onEdit,
  onSelectModelExtraction 
}: DataFieldSectionProps) {
  
  // Helper component that includes all the common props
  const Field = ({
    label,
    fieldKey,
    fieldType,
    icon,
  }: {
    label: string;
    fieldKey: string;
    fieldType?: string;
    icon?: React.ReactNode;
  }) => (
    <DataField
      icon={icon}
      label={label}
      data={mockCaseData[fieldKey]}
      fieldKey={fieldKey}
      fieldType={fieldType}
      selectedExtractionIndex={selectedExtractions[fieldKey]}
      onEdit={onEdit}
      onSelectModelExtraction={onSelectModelExtraction}
    />
  );

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Case Name" fieldKey="name" />
          <Field label="Docket ID" fieldKey="docketId" />
          <Field label="Court" fieldKey="court" />
          <Field label="State" fieldKey="state" />
          <Field label="Year" fieldKey="year" fieldType={FIELD_TYPES.NUMBER} />
          <Field label="Settlement Date" fieldKey="date" fieldType={FIELD_TYPES.DATE} />
          <Field label="Judge Name" fieldKey="judgeName" />
          <Field label="Settlement Type" fieldKey="settlementType" fieldType={FIELD_TYPES.SELECT} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Field label="Case Summary" fieldKey="summary" />
        </div>
      </div>

      {/* Financial Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field
            icon={<DollarSign className="h-4 w-4 text-green-600" />}
            label="Total Settlement Amount"
            fieldKey="settlementAmount"
            fieldType={FIELD_TYPES.CURRENCY}
          />
          <Field label="Base Settlement Amount" fieldKey="baseSettlementAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Contingent Settlement Amount" fieldKey="contingentSettlementAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Settlement Capped" fieldKey="isSettlementCapped" fieldType={FIELD_TYPES.BOOLEAN} />
        </div>
      </div>

      {/* Attorney Fees */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Attorney Fees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Fee Calculation Method" fieldKey="attorneyFeesMethod" fieldType={FIELD_TYPES.SELECT} />
          <Field label="Attorney Fees Percentage" fieldKey="attorneyFeesPercentage" fieldType={FIELD_TYPES.PERCENTAGE} />
          <Field label="Fees Paid from Fund" fieldKey="attorneyFeesPaidFromFund" fieldType={FIELD_TYPES.BOOLEAN} />
          <Field label="Lodestar Amount" fieldKey="lodestardAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Lodestar Multiplier" fieldKey="multiplier" fieldType={FIELD_TYPES.NUMBER} />
          <Field label="Attorney Fees Reimbursement" fieldKey="attorneyFeesReimbursement" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Reimbursement from Fund" fieldKey="attorneyFeesReimbursementFromFund" fieldType={FIELD_TYPES.BOOLEAN} />
        </div>
      </div>

      {/* Class Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Class Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field
            icon={<Users className="h-4 w-4 text-blue-600" />}
            label="Class Size"
            fieldKey="classSize"
            fieldType={FIELD_TYPES.NUMBER}
          />
          <Field label="Class Type" fieldKey="classType" fieldType={FIELD_TYPES.ARRAY} />
          <Field label="Has Minor Subclass" fieldKey="hasMinorSubclass" fieldType={FIELD_TYPES.BOOLEAN} />
          <Field label="Multi-District Litigation" fieldKey="isMultiDistrictLitigation" fieldType={FIELD_TYPES.BOOLEAN} />
        </div>
      </div>

      {/* Claims Data */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Claims Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Claims Submitted" fieldKey="claimsSubmitted" fieldType={FIELD_TYPES.NUMBER} />
          <Field label="Claims Submitted %" fieldKey="claimsSubmittedPercent" fieldType={FIELD_TYPES.PERCENTAGE} />
          <Field label="Claims Admin Costs" fieldKey="claimsAdminCosts" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Admin Costs from Fund" fieldKey="claimsAdminCostsFromFund" fieldType={FIELD_TYPES.BOOLEAN} />
        </div>
      </div>

      {/* Individual Compensation */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Individual Compensation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Base Cash Compensation" fieldKey="baseCashCompensation" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Max Out-of-Pocket Reimbursement" fieldKey="maxReimbursementOutOfPocket" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Max Documented Time Reimbursement" fieldKey="maxReimbursementDocumentedTime" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Max Hours Documented" fieldKey="maxHoursDocumented" fieldType={FIELD_TYPES.NUMBER} />
          <Field label="Rate per Hour (Documented)" fieldKey="ratePerHourDocumented" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Max Undocumented Reimbursement" fieldKey="maxReimbursementUndocumented" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Max Hours Undocumented" fieldKey="maxHoursUndocumented" fieldType={FIELD_TYPES.NUMBER} />
          <Field label="Rate per Hour (Undocumented)" fieldKey="ratePerHourUndocumented" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Allow Both Doc & Undoc" fieldKey="allowBothDocAndUndoc" fieldType={FIELD_TYPES.BOOLEAN} />
          <Field label="Has Pro Rata Adjustment" fieldKey="hasProRataAdjustment" fieldType={FIELD_TYPES.BOOLEAN} />
          <Field label="Pro Rata Amount" fieldKey="proRataAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Supplemental Reimbursement" fieldKey="supplementalReimbursement" fieldType={FIELD_TYPES.CURRENCY} />
        </div>
      </div>

      {/* Class Representative Awards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Class Representative Awards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Service Awards Amount" fieldKey="classRepServiceAwards" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Awards from Fund" fieldKey="classRepAwardsFromFund" fieldType={FIELD_TYPES.BOOLEAN} />
        </div>
      </div>

      {/* Breach Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Breach Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="PII Affected" fieldKey="piiAffected" fieldType={FIELD_TYPES.ARRAY} />
          <Field label="Cause of Breach" fieldKey="causeOfBreach" />
        </div>
      </div>

      {/* Parties */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Parties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Defense Counsel" fieldKey="defenseCounsel" />
          <Field label="Plaintiff Counsel" fieldKey="plaintiffCounsel" />
        </div>
      </div>

      {/* Injunctive Relief */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Injunctive Relief
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Injunctive Relief Measures" fieldKey="injunctiveRelief" fieldType={FIELD_TYPES.ARRAY} />
          <Field label="Injunctive Relief Amount" fieldKey="injunctiveReliefAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Third Party Assessments" fieldKey="thirdPartyAssessments" fieldType={FIELD_TYPES.ARRAY} />
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Additional Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Credit Monitoring Offered" fieldKey="creditMonitoring" fieldType={FIELD_TYPES.BOOLEAN} />
          <Field label="Credit Monitoring Amount" fieldKey="creditMonitoringAmount" fieldType={FIELD_TYPES.CURRENCY} />
          <Field label="Excess Funds Disposition" fieldKey="excessFundsDisposition" fieldType={FIELD_TYPES.SELECT} />
        </div>
      </div>
    </div>
  );
}