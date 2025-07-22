"use client";

import {
  AlertCircle,
  DollarSign,
  Users,
  Briefcase,
  Shield,
  Scale,
  CreditCard,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { mockCaseData, mockDocuments } from "@/data/mock-case-data";
import { useCaseReview } from "@/hooks/useCaseReview";
import { useEditField } from "@/hooks/useEditField";
import {
  ActionButtons,
  AdminNotesSection,
  CaseHeader,
  CaseStatusBanner,
  CaseTitleSection,
  DataField,
  DataSection,
  DocumentsSection,
  EditFieldDialog,
} from "@/components/case-review";

export default function CaseDetailsPage() {
  const {
    adminNotes,
    setAdminNotes,
    handleApprove,
    handleReject,
    handleRequestInfo,
    navigateToPreviousCase,
    navigateToNextCase,
  } = useCaseReview(mockCaseData);

  const {
    showEditDialog,
    editFieldData,
    editValues,
    setEditValues,
    handleEdit,
    handleSaveEdit,
    closeDialog,
  } = useEditField();

  return (
    <>
      <CaseHeader />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          <CaseTitleSection
            caseData={mockCaseData}
            onPrevious={navigateToPreviousCase}
            onNext={navigateToNextCase}
          />

          <CaseStatusBanner caseData={mockCaseData} />

          <DocumentsSection documents={mockDocuments} />

          {/* Data Sections */}
          <div className="space-y-6">
            <DataSection
              title="Basic Information"
              icon={<FileCheck className="h-5 w-5" />}
            >
              <DataField
                label="Case Name"
                data={mockCaseData.name}
                fieldKey="name"
                onEdit={handleEdit}
              />
              <DataField
                label="Docket ID"
                data={mockCaseData.docketId}
                fieldKey="docketId"
                onEdit={handleEdit}
              />
              <DataField
                label="Court"
                data={mockCaseData.court}
                fieldKey="court"
                onEdit={handleEdit}
              />
              <DataField
                label="State"
                data={mockCaseData.state}
                fieldKey="state"
                onEdit={handleEdit}
              />
              <DataField
                label="Year"
                data={mockCaseData.year}
                fieldKey="year"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Settlement Date"
                data={mockCaseData.date}
                fieldKey="date"
                fieldType="date"
                onEdit={handleEdit}
              />
              <DataField
                label="Judge Name"
                data={mockCaseData.judgeName}
                fieldKey="judgeName"
                onEdit={handleEdit}
              />
              <DataField
                label="Settlement Type"
                data={mockCaseData.settlementType}
                fieldKey="settlementType"
                fieldType="select"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection title="" columns={1}>
              <DataField
                label="Case Summary"
                data={mockCaseData.summary}
                fieldKey="summary"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Financial Information"
              icon={<DollarSign className="h-5 w-5" />}
            >
              <DataField
                icon={<DollarSign className="h-4 w-4 text-green-600" />}
                label="Total Settlement Amount"
                data={mockCaseData.settlementAmount}
                fieldKey="settlementAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Base Settlement Amount"
                data={mockCaseData.baseSettlementAmount}
                fieldKey="baseSettlementAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Contingent Settlement Amount"
                data={mockCaseData.contingentSettlementAmount}
                fieldKey="contingentSettlementAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Settlement Capped"
                data={mockCaseData.isSettlementCapped}
                fieldKey="isSettlementCapped"
                fieldType="boolean"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Attorney Fees"
              icon={<Briefcase className="h-5 w-5" />}
            >
              <DataField
                label="Fee Calculation Method"
                data={mockCaseData.attorneyFeesMethod}
                fieldKey="attorneyFeesMethod"
                fieldType="select"
                onEdit={handleEdit}
              />
              <DataField
                label="Attorney Fees Percentage"
                data={mockCaseData.attorneyFeesPercentage}
                fieldKey="attorneyFeesPercentage"
                fieldType="percentage"
                onEdit={handleEdit}
              />
              <DataField
                label="Fees Paid from Fund"
                data={mockCaseData.attorneyFeesPaidFromFund}
                fieldKey="attorneyFeesPaidFromFund"
                fieldType="boolean"
                onEdit={handleEdit}
              />
              <DataField
                label="Lodestar Amount"
                data={mockCaseData.lodestardAmount}
                fieldKey="lodestardAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Lodestar Multiplier"
                data={mockCaseData.multiplier}
                fieldKey="multiplier"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Attorney Fees Reimbursement"
                data={mockCaseData.attorneyFeesReimbursement}
                fieldKey="attorneyFeesReimbursement"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Reimbursement from Fund"
                data={mockCaseData.attorneyFeesReimbursementFromFund}
                fieldKey="attorneyFeesReimbursementFromFund"
                fieldType="boolean"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Class Information"
              icon={<Users className="h-5 w-5" />}
            >
              <DataField
                icon={<Users className="h-4 w-4 text-blue-600" />}
                label="Class Size"
                data={mockCaseData.classSize}
                fieldKey="classSize"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Class Type"
                data={mockCaseData.classType}
                fieldKey="classType"
                fieldType="array"
                onEdit={handleEdit}
              />
              <DataField
                label="Has Minor Subclass"
                data={mockCaseData.hasMinorSubclass}
                fieldKey="hasMinorSubclass"
                fieldType="boolean"
                onEdit={handleEdit}
              />
              <DataField
                label="Multi-District Litigation"
                data={mockCaseData.isMultiDistrictLitigation}
                fieldKey="isMultiDistrictLitigation"
                fieldType="boolean"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Claims Data"
              icon={<FileCheck className="h-5 w-5" />}
            >
              <DataField
                label="Claims Submitted"
                data={mockCaseData.claimsSubmitted}
                fieldKey="claimsSubmitted"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Claims Submitted %"
                data={mockCaseData.claimsSubmittedPercent}
                fieldKey="claimsSubmittedPercent"
                fieldType="percentage"
                onEdit={handleEdit}
              />
              <DataField
                label="Claims Admin Costs"
                data={mockCaseData.claimsAdminCosts}
                fieldKey="claimsAdminCosts"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Admin Costs from Fund"
                data={mockCaseData.claimsAdminCostsFromFund}
                fieldKey="claimsAdminCostsFromFund"
                fieldType="boolean"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Individual Compensation"
              icon={<CreditCard className="h-5 w-5" />}
            >
              <DataField
                label="Base Cash Compensation"
                data={mockCaseData.baseCashCompensation}
                fieldKey="baseCashCompensation"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Max Out-of-Pocket Reimbursement"
                data={mockCaseData.maxReimbursementOutOfPocket}
                fieldKey="maxReimbursementOutOfPocket"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Max Documented Time Reimbursement"
                data={mockCaseData.maxReimbursementDocumentedTime}
                fieldKey="maxReimbursementDocumentedTime"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Max Hours Documented"
                data={mockCaseData.maxHoursDocumented}
                fieldKey="maxHoursDocumented"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Rate per Hour (Documented)"
                data={mockCaseData.ratePerHourDocumented}
                fieldKey="ratePerHourDocumented"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Max Undocumented Reimbursement"
                data={mockCaseData.maxReimbursementUndocumented}
                fieldKey="maxReimbursementUndocumented"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Max Hours Undocumented"
                data={mockCaseData.maxHoursUndocumented}
                fieldKey="maxHoursUndocumented"
                fieldType="number"
                onEdit={handleEdit}
              />
              <DataField
                label="Rate per Hour (Undocumented)"
                data={mockCaseData.ratePerHourUndocumented}
                fieldKey="ratePerHourUndocumented"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Allow Both Doc & Undoc"
                data={mockCaseData.allowBothDocAndUndoc}
                fieldKey="allowBothDocAndUndoc"
                fieldType="boolean"
                onEdit={handleEdit}
              />
              <DataField
                label="Has Pro Rata Adjustment"
                data={mockCaseData.hasProRataAdjustment}
                fieldKey="hasProRataAdjustment"
                fieldType="boolean"
                onEdit={handleEdit}
              />
              <DataField
                label="Pro Rata Amount"
                data={mockCaseData.proRataAmount}
                fieldKey="proRataAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Supplemental Reimbursement"
                data={mockCaseData.supplementalReimbursement}
                fieldKey="supplementalReimbursement"
                fieldType="currency"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Class Representative Awards"
              icon={<UserCheck className="h-5 w-5" />}
            >
              <DataField
                label="Service Awards Amount"
                data={mockCaseData.classRepServiceAwards}
                fieldKey="classRepServiceAwards"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Awards from Fund"
                data={mockCaseData.classRepAwardsFromFund}
                fieldKey="classRepAwardsFromFund"
                fieldType="boolean"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Breach Information"
              icon={<AlertCircle className="h-5 w-5" />}
              columns={2}
            >
              <DataField
                label="PII Affected"
                data={mockCaseData.piiAffected}
                fieldKey="piiAffected"
                fieldType="array"
                onEdit={handleEdit}
              />
              <DataField
                label="Cause of Breach"
                data={mockCaseData.causeOfBreach}
                fieldKey="causeOfBreach"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Parties"
              icon={<Scale className="h-5 w-5" />}
              columns={2}
            >
              <DataField
                label="Defense Counsel"
                data={mockCaseData.defenseCounsel}
                fieldKey="defenseCounsel"
                onEdit={handleEdit}
              />
              <DataField
                label="Plaintiff Counsel"
                data={mockCaseData.plaintiffCounsel}
                fieldKey="plaintiffCounsel"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Injunctive Relief"
              icon={<Shield className="h-5 w-5" />}
              columns={2}
            >
              <DataField
                label="Injunctive Relief Measures"
                data={mockCaseData.injunctiveRelief}
                fieldKey="injunctiveRelief"
                fieldType="array"
                onEdit={handleEdit}
              />
              <DataField
                label="Injunctive Relief Amount"
                data={mockCaseData.injunctiveReliefAmount}
                fieldKey="injunctiveReliefAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Third Party Assessments"
                data={mockCaseData.thirdPartyAssessments}
                fieldKey="thirdPartyAssessments"
                fieldType="array"
                onEdit={handleEdit}
              />
            </DataSection>

            <DataSection
              title="Additional Benefits"
              icon={<CreditCard className="h-5 w-5" />}
            >
              <DataField
                label="Credit Monitoring Offered"
                data={mockCaseData.creditMonitoring}
                fieldKey="creditMonitoring"
                fieldType="boolean"
                onEdit={handleEdit}
              />
              <DataField
                label="Credit Monitoring Amount"
                data={mockCaseData.creditMonitoringAmount}
                fieldKey="creditMonitoringAmount"
                fieldType="currency"
                onEdit={handleEdit}
              />
              <DataField
                label="Excess Funds Disposition"
                data={mockCaseData.excessFundsDisposition}
                fieldKey="excessFundsDisposition"
                fieldType="select"
                onEdit={handleEdit}
              />
            </DataSection>
          </div>

          <AdminNotesSection value={adminNotes} onChange={setAdminNotes} />

          <ActionButtons
            onApprove={handleApprove}
            onRequestInfo={handleRequestInfo}
            onReject={handleReject}
          />
        </div>
      </main>

      <EditFieldDialog
        open={showEditDialog}
        onOpenChange={closeDialog}
        editFieldData={editFieldData}
        editValues={editValues}
        onEditValuesChange={setEditValues}
        onSave={handleSaveEdit}
        documents={mockDocuments}
      />
    </>
  );
}
