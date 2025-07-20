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
  onEdit: (
    field: string,
    label: string,
    data: ExtractedField,
    fieldType: string
  ) => void;
}

export function DataFieldSection({ mockCaseData, onEdit }: DataFieldSectionProps) {
  return (
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
            onEdit={onEdit}
          />
          <DataField
            label="Docket ID"
            data={mockCaseData.docketId}
            fieldKey="docketId"
            onEdit={onEdit}
          />
          <DataField
            label="Court"
            data={mockCaseData.court}
            fieldKey="court"
            onEdit={onEdit}
          />
          <DataField
            label="State"
            data={mockCaseData.state}
            fieldKey="state"
            onEdit={onEdit}
          />
          <DataField
            label="Year"
            data={mockCaseData.year}
            fieldKey="year"
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Settlement Date"
            data={mockCaseData.date}
            fieldKey="date"
            fieldType={FIELD_TYPES.DATE}
            onEdit={onEdit}
          />
          <DataField
            label="Judge Name"
            data={mockCaseData.judgeName}
            fieldKey="judgeName"
            onEdit={onEdit}
          />
          <DataField
            label="Settlement Type"
            data={mockCaseData.settlementType}
            fieldKey="settlementType"
            fieldType={FIELD_TYPES.SELECT}
            onEdit={onEdit}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <DataField
            label="Case Summary"
            data={mockCaseData.summary}
            fieldKey="summary"
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Base Settlement Amount"
            data={mockCaseData.baseSettlementAmount}
            fieldKey="baseSettlementAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Contingent Settlement Amount"
            data={mockCaseData.contingentSettlementAmount}
            fieldKey="contingentSettlementAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Settlement Capped"
            data={mockCaseData.isSettlementCapped}
            fieldKey="isSettlementCapped"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.SELECT}
            onEdit={onEdit}
          />
          <DataField
            label="Attorney Fees Percentage"
            data={mockCaseData.attorneyFeesPercentage}
            fieldKey="attorneyFeesPercentage"
            fieldType={FIELD_TYPES.PERCENTAGE}
            onEdit={onEdit}
          />
          <DataField
            label="Fees Paid from Fund"
            data={mockCaseData.attorneyFeesPaidFromFund}
            fieldKey="attorneyFeesPaidFromFund"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
          />
          <DataField
            label="Lodestar Amount"
            data={mockCaseData.lodestardAmount}
            fieldKey="lodestardAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Lodestar Multiplier"
            data={mockCaseData.multiplier}
            fieldKey="multiplier"
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Attorney Fees Reimbursement"
            data={mockCaseData.attorneyFeesReimbursement}
            fieldKey="attorneyFeesReimbursement"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Reimbursement from Fund"
            data={mockCaseData.attorneyFeesReimbursementFromFund}
            fieldKey="attorneyFeesReimbursementFromFund"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Class Type"
            data={mockCaseData.classType}
            fieldKey="classType"
            fieldType={FIELD_TYPES.ARRAY}
            onEdit={onEdit}
          />
          <DataField
            label="Has Minor Subclass"
            data={mockCaseData.hasMinorSubclass}
            fieldKey="hasMinorSubclass"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
          />
          <DataField
            label="Multi-District Litigation"
            data={mockCaseData.isMultiDistrictLitigation}
            fieldKey="isMultiDistrictLitigation"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Claims Submitted %"
            data={mockCaseData.claimsSubmittedPercent}
            fieldKey="claimsSubmittedPercent"
            fieldType={FIELD_TYPES.PERCENTAGE}
            onEdit={onEdit}
          />
          <DataField
            label="Claims Admin Costs"
            data={mockCaseData.claimsAdminCosts}
            fieldKey="claimsAdminCosts"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Admin Costs from Fund"
            data={mockCaseData.claimsAdminCostsFromFund}
            fieldKey="claimsAdminCostsFromFund"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Max Out-of-Pocket Reimbursement"
            data={mockCaseData.maxReimbursementOutOfPocket}
            fieldKey="maxReimbursementOutOfPocket"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Max Documented Time Reimbursement"
            data={mockCaseData.maxReimbursementDocumentedTime}
            fieldKey="maxReimbursementDocumentedTime"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Max Hours Documented"
            data={mockCaseData.maxHoursDocumented}
            fieldKey="maxHoursDocumented"
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Rate per Hour (Documented)"
            data={mockCaseData.ratePerHourDocumented}
            fieldKey="ratePerHourDocumented"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Max Undocumented Reimbursement"
            data={mockCaseData.maxReimbursementUndocumented}
            fieldKey="maxReimbursementUndocumented"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Max Hours Undocumented"
            data={mockCaseData.maxHoursUndocumented}
            fieldKey="maxHoursUndocumented"
            fieldType={FIELD_TYPES.NUMBER}
            onEdit={onEdit}
          />
          <DataField
            label="Rate per Hour (Undocumented)"
            data={mockCaseData.ratePerHourUndocumented}
            fieldKey="ratePerHourUndocumented"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Allow Both Doc & Undoc"
            data={mockCaseData.allowBothDocAndUndoc}
            fieldKey="allowBothDocAndUndoc"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
          />
          <DataField
            label="Has Pro Rata Adjustment"
            data={mockCaseData.hasProRataAdjustment}
            fieldKey="hasProRataAdjustment"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
          />
          <DataField
            label="Pro Rata Amount"
            data={mockCaseData.proRataAmount}
            fieldKey="proRataAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Supplemental Reimbursement"
            data={mockCaseData.supplementalReimbursement}
            fieldKey="supplementalReimbursement"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Awards from Fund"
            data={mockCaseData.classRepAwardsFromFund}
            fieldKey="classRepAwardsFromFund"
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.ARRAY}
            onEdit={onEdit}
          />
          <DataField
            label="Cause of Breach"
            data={mockCaseData.causeOfBreach}
            fieldKey="causeOfBreach"
            onEdit={onEdit}
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
            onEdit={onEdit}
          />
          <DataField
            label="Plaintiff Counsel"
            data={mockCaseData.plaintiffCounsel}
            fieldKey="plaintiffCounsel"
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.ARRAY}
            onEdit={onEdit}
          />
          <DataField
            label="Injunctive Relief Amount"
            data={mockCaseData.injunctiveReliefAmount}
            fieldKey="injunctiveReliefAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Third Party Assessments"
            data={mockCaseData.thirdPartyAssessments}
            fieldKey="thirdPartyAssessments"
            fieldType={FIELD_TYPES.ARRAY}
            onEdit={onEdit}
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
            fieldType={FIELD_TYPES.BOOLEAN}
            onEdit={onEdit}
          />
          <DataField
            label="Credit Monitoring Amount"
            data={mockCaseData.creditMonitoringAmount}
            fieldKey="creditMonitoringAmount"
            fieldType={FIELD_TYPES.CURRENCY}
            onEdit={onEdit}
          />
          <DataField
            label="Excess Funds Disposition"
            data={mockCaseData.excessFundsDisposition}
            fieldKey="excessFundsDisposition"
            fieldType={FIELD_TYPES.SELECT}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
}