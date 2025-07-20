"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatWithTooltip } from "@/components/ui/stat-with-tooltip";
import { ValueWithTooltip } from "@/components/ui/value-with-tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  FileText,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Scale,
  Shield,
  AlertCircle,
  CheckCircle,
  Building,
  Gavel,
} from "lucide-react";
import { mockCases } from "@/lib/mock-data";
import { ReportIssueButton } from "@/components/bug-bounty/report-issue-button";
import { PDFViewer } from "@/components/pdf-viewer/pdf-viewer";
import { usePDFViewer } from "@/hooks/use-pdf-viewer";

interface CaseDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CaseDetailsPage({ params }: CaseDetailsPageProps) {
  const [caseId, setCaseId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(({ id }) => setCaseId(id));
  }, [params]);

  if (!caseId) {
    return <div>Loading...</div>;
  }

  return <CaseDetailsPageContent caseId={caseId} />;
}

function CaseDetailsPageContent({ caseId }: { caseId: string }) {
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);

  // Find the case by ID
  const case_ = mockCases.find((c) => c.id === caseId);

  if (!case_) {
    notFound();
  }

  // PDF Viewer hook
  const { pdfViewerState, openPDFViewer, closePDFViewer, getDocumentUrlForCitation } = usePDFViewer({ caseId: case_.id });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Copy citation to clipboard
  const copyCitation = () => {
    const citation = `${case_.name}, ${case_.docketId} (${case_.court} ${case_.date})`;
    navigator.clipboard.writeText(citation);
    // In real app, would show toast notification
    console.log("Citation copied:", citation);
  };

  // Calculate attorney fees
  const getAttorneyFeesAmount = () => {
    if (
      case_.attorneyFeesMethod === "Percentage" &&
      case_.attorneyFeesPercentage
    ) {
      return (case_.settlementAmount * case_.attorneyFeesPercentage) / 100;
    } else if (
      case_.attorneyFeesMethod === "Lodestar" &&
      case_.lodestardAmount &&
      case_.multiplier
    ) {
      return case_.lodestardAmount * case_.multiplier;
    }
    return 0;
  };

  const attorneyFeesAmount = getAttorneyFeesAmount();

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-serif font-bold">{case_.name}</h1>
              <p className="text-sm text-muted-foreground">{case_.docketId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={copyCitation}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Citation
            </Button>
            <ReportIssueButton 
              caseId={case_.id}
              variant="outline"
              showLabel={true}
            />
            <Dialog
              open={showComparisonDialog}
              onOpenChange={setShowComparisonDialog}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Scale className="mr-2 h-4 w-4" />
                  Compare Cases
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Case Comparison</DialogTitle>
                  <DialogDescription>
                    Compare this case with up to 2 other cases side-by-side
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Case comparison feature coming soon. This will allow you to
                    compare settlement amounts, class sizes, and other key
                    metrics across multiple cases.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <StatWithTooltip
                    label="Settlement Amount"
                    value={formatCurrency(case_.settlementAmount)}
                    citation={case_.citations?.settlementAmount}
                    valueClassName="text-2xl text-primary"
                    documentUrl={getDocumentUrlForCitation(case_.citations?.settlementAmount)}
                    onViewSource={() => case_.citations?.settlementAmount && openPDFViewer(case_.citations.settlementAmount)}
                  />
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <StatWithTooltip
                    label="Class Size"
                    value={formatNumber(case_.classSize)}
                    description="Affected individuals"
                    citation={case_.citations?.classSize}
                    valueClassName="text-2xl"
                    documentUrl={getDocumentUrlForCitation(case_.citations?.classSize)}
                    onViewSource={() => case_.citations?.classSize && openPDFViewer(case_.citations.classSize)}
                  />
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <StatWithTooltip
                    label="Settlement Date"
                    value={formatDate(case_.date)}
                    citation={case_.citations?.settlementDate}
                    valueClassName="text-lg"
                  />
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <StatWithTooltip
                    label="Claims Rate"
                    value={`${case_.claimsSubmittedPercent}%`}
                    description={`${formatNumber(case_.claimsSubmitted)} claims`}
                    citation={case_.citations?.claimsSubmitted}
                    valueClassName="text-2xl"
                  />
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Summary</h3>
                    <ValueWithTooltip
                      citation={case_.citations?.summary}
                      className="text-sm text-muted-foreground"
                    >
                      {case_.summary}
                    </ValueWithTooltip>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Jurisdiction
                      </h4>
                      <ValueWithTooltip
                        citation={case_.citations?.court}
                        className="text-sm"
                      >
                        {case_.court}
                      </ValueWithTooltip>
                      <ValueWithTooltip
                        citation={case_.citations?.state}
                        className="text-sm text-muted-foreground"
                      >
                        {case_.state}
                      </ValueWithTooltip>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Gavel className="h-4 w-4" />
                        Presiding Judge
                      </h4>
                      <ValueWithTooltip
                        citation={case_.citations?.judgeName}
                        className="text-sm"
                      >
                        {case_.judgeName}
                      </ValueWithTooltip>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={
                        case_.settlementType === "Final"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {case_.settlementType} Settlement
                    </Badge>
                    {case_.isMultiDistrictLitigation && (
                      <Badge variant="outline">Multi-District Litigation</Badge>
                    )}
                    {case_.hasMinorSubclass && (
                      <Badge variant="outline">Minor Subclass</Badge>
                    )}
                    {case_.creditMonitoring && (
                      <Badge variant="outline">Credit Monitoring</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tabbed Details */}
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="financial" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="parties">Parties</TabsTrigger>
                      <TabsTrigger value="breach">Breach Details</TabsTrigger>
                      <TabsTrigger value="relief">Relief</TabsTrigger>
                      <TabsTrigger value="reimbursements">
                        Reimbursements
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="financial" className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <StatWithTooltip
                            label="Settlement Fund"
                            value={formatCurrency(case_.settlementAmount)}
                            citation={case_.citations?.settlementAmount}
                            valueClassName="text-2xl text-primary"
                          />
                          {case_.baseSettlementAmount && (
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Base:{" "}
                                {formatCurrency(case_.baseSettlementAmount)}
                              </p>
                              {case_.contingentSettlementAmount && (
                                <p className="text-sm text-muted-foreground">
                                  Contingent:{" "}
                                  {formatCurrency(
                                    case_.contingentSettlementAmount,
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                          <Badge variant="outline" className="mt-2">
                            {case_.isSettlementCapped ? "Capped" : "Uncapped"}
                          </Badge>
                        </div>

                        <div>
                          <StatWithTooltip
                            label="Attorney Fees"
                            value={formatCurrency(attorneyFeesAmount)}
                            description={
                              case_.attorneyFeesMethod === "Percentage"
                                ? `${case_.attorneyFeesPercentage}% of settlement`
                                : `Lodestar: ${formatCurrency(case_.lodestardAmount || 0)} × ${case_.multiplier}`
                            }
                            citation={
                              case_.attorneyFeesMethod === "Percentage"
                                ? case_.citations?.attorneyFeesPercentage
                                : case_.citations?.lodestardAmount
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {case_.attorneyFeesPaidFromFund
                              ? "Paid from fund"
                              : "Paid separately"}
                          </p>
                        </div>

                        <StatWithTooltip
                          label="Class Size"
                          value={formatNumber(case_.classSize)}
                          description="Affected individuals"
                          citation={case_.citations?.classSize}
                        />

                        <StatWithTooltip
                          label="Claims Submitted"
                          value={formatNumber(case_.claimsSubmitted)}
                          description={`${case_.claimsSubmittedPercent}% participation rate`}
                          citation={case_.citations?.claimsSubmitted}
                        />

                        {case_.classRepServiceAwards && (
                          <StatWithTooltip
                            label="Class Rep Awards"
                            value={formatCurrency(case_.classRepServiceAwards)}
                            description="Per named plaintiff"
                            citation={case_.citations?.classRepServiceAwards}
                          />
                        )}

                        {case_.claimsAdminCosts && (
                          <StatWithTooltip
                            label="Admin Costs"
                            value={formatCurrency(case_.claimsAdminCosts)}
                            description="Claims administration"
                            citation={case_.citations?.claimsAdminCosts}
                          />
                        )}
                      </div>

                      {case_.creditMonitoring &&
                        case_.creditMonitoringAmount && (
                          <div className="pt-4 border-t">
                            <StatWithTooltip
                              label="Credit Monitoring"
                              value={formatCurrency(
                                case_.creditMonitoringAmount,
                              )}
                              description="Allocated for credit monitoring services"
                              citation={case_.citations?.creditMonitoringAmount}
                            />
                          </div>
                        )}

                      {case_.excessFundsDisposition && (
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">
                            Excess Funds Disposition
                          </h4>
                          <Badge variant="secondary">
                            {case_.excessFundsDisposition}
                          </Badge>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="parties" className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Plaintiff&apos;s Counsel
                          </h4>
                          <ValueWithTooltip
                            citation={case_.citations?.plaintiffCounsel}
                            className="text-sm"
                          >
                            {case_.plaintiffCounsel}
                          </ValueWithTooltip>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Defense Counsel
                          </h4>
                          <ValueWithTooltip
                            citation={case_.citations?.defenseCounsel}
                            className="text-sm"
                          >
                            {case_.defenseCounsel}
                          </ValueWithTooltip>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Class Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {case_.classType.map((type) => (
                            <Badge key={type} variant="secondary">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="breach" className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Cause of Breach
                          </h4>
                          <ValueWithTooltip
                            citation={case_.citations?.causeOfBreach}
                          >
                            <Badge variant="destructive">
                              {case_.causeOfBreach}
                            </Badge>
                          </ValueWithTooltip>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">PII Affected</h4>
                          <ValueWithTooltip
                            citation={case_.citations?.piiAffected}
                          >
                            <div className="flex flex-wrap gap-1">
                              {case_.piiAffected.map((pii) => (
                                <Badge
                                  key={pii}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {pii}
                                </Badge>
                              ))}
                            </div>
                          </ValueWithTooltip>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="relief" className="mt-6 space-y-4">
                      {case_.injunctiveReliefAmount && (
                        <div className="mb-4">
                          <StatWithTooltip
                            label="Total Injunctive Relief Amount"
                            value={formatCurrency(case_.injunctiveReliefAmount)}
                            citation={case_.citations?.injunctiveReliefAmount}
                            valueClassName="text-2xl text-primary"
                          />
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Injunctive Relief Measures
                        </h4>
                        <ValueWithTooltip
                          citation={case_.citations?.injunctiveRelief}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {case_.injunctiveRelief.map((relief) => (
                              <div
                                key={relief}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {relief}
                              </div>
                            ))}
                          </div>
                        </ValueWithTooltip>
                      </div>

                      {case_.thirdPartyAssessments &&
                        case_.thirdPartyAssessments.length > 0 && (
                          <div className="pt-4 border-t">
                            <h4 className="font-medium mb-3">
                              Third-Party Security Assessments
                            </h4>
                            <ValueWithTooltip
                              citation={case_.citations?.thirdPartyAssessments}
                            >
                              <div className="flex flex-wrap gap-2">
                                {case_.thirdPartyAssessments.map(
                                  (assessment) => (
                                    <Badge key={assessment} variant="outline">
                                      {assessment}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </ValueWithTooltip>
                          </div>
                        )}

                      {case_.creditMonitoring && (
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">
                            Additional Benefits
                          </h4>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Credit monitoring services provided
                            {case_.creditMonitoringAmount && (
                              <span className="text-muted-foreground">
                                ({formatCurrency(case_.creditMonitoringAmount)})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent
                      value="reimbursements"
                      className="mt-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {case_.baseCashCompensation !== undefined && (
                          <StatWithTooltip
                            label="Base Cash Compensation"
                            value={formatCurrency(case_.baseCashCompensation)}
                            description="Per claimant who submits a claim"
                            citation={case_.citations?.baseCashCompensation}
                            valueClassName="text-xl"
                          />
                        )}

                        {case_.maxReimbursementOutOfPocket !== undefined && (
                          <StatWithTooltip
                            label="Out of Pocket Costs"
                            value={formatCurrency(
                              case_.maxReimbursementOutOfPocket,
                            )}
                            description="Maximum reimbursement per individual"
                            citation={
                              case_.citations?.maxReimbursementOutOfPocket
                            }
                            valueClassName="text-xl"
                          />
                        )}

                        {case_.maxReimbursementDocumentedTime !== undefined && (
                          <div>
                            <StatWithTooltip
                              label="Documented Time"
                              value={formatCurrency(
                                case_.maxReimbursementDocumentedTime,
                              )}
                              description="Max reimbursement"
                              citation={
                                case_.citations?.maxReimbursementDocumentedTime
                              }
                              valueClassName="text-xl"
                            />
                            <div className="mt-2 space-y-1">
                              {case_.maxHoursDocumented && (
                                <p className="text-sm text-muted-foreground">
                                  Max hours: {case_.maxHoursDocumented}
                                </p>
                              )}
                              {case_.ratePerHourDocumented && (
                                <p className="text-sm text-muted-foreground">
                                  Rate:{" "}
                                  {formatCurrency(case_.ratePerHourDocumented)}
                                  /hour
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {case_.maxReimbursementUndocumented !== undefined && (
                          <div>
                            <StatWithTooltip
                              label="Undocumented Time"
                              value={formatCurrency(
                                case_.maxReimbursementUndocumented,
                              )}
                              description="Max reimbursement"
                              citation={
                                case_.citations?.maxReimbursementUndocumented
                              }
                              valueClassName="text-xl"
                            />
                            <div className="mt-2 space-y-1">
                              {case_.maxHoursUndocumented && (
                                <p className="text-sm text-muted-foreground">
                                  Max hours: {case_.maxHoursUndocumented}
                                </p>
                              )}
                              {case_.ratePerHourUndocumented && (
                                <p className="text-sm text-muted-foreground">
                                  Rate:{" "}
                                  {formatCurrency(
                                    case_.ratePerHourUndocumented,
                                  )}
                                  /hour
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Allow reimbursement for both documented and
                            undocumented costs?
                          </span>
                          <Badge
                            variant={
                              case_.allowBothDocAndUndoc
                                ? "default"
                                : "secondary"
                            }
                          >
                            {case_.allowBothDocAndUndoc ? "Yes" : "No"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Pro rata adjustment provided?
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                case_.hasProRataAdjustment
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {case_.hasProRataAdjustment ? "Yes" : "No"}
                            </Badge>
                            {case_.hasProRataAdjustment &&
                              case_.proRataAmount && (
                                <ValueWithTooltip
                                  citation={case_.citations?.proRataAmount}
                                  className="text-sm text-muted-foreground"
                                >
                                  ({formatCurrency(case_.proRataAmount)})
                                </ValueWithTooltip>
                              )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={copyCitation}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Citation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Source Document
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Case Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Docket ID:</span>
                    <span className="font-mono">{case_.docketId}</span>

                    <span className="text-muted-foreground">Year:</span>
                    <span>{case_.year}</span>

                    <span className="text-muted-foreground">Court:</span>
                    <span>{case_.court}</span>

                    <span className="text-muted-foreground">State:</span>
                    <span>{case_.state}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Related Cases */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Cases</CardTitle>
                  <CardDescription>
                    Similar settlements you might find relevant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCases
                      .filter(
                        (c) =>
                          c.id !== case_.id &&
                          (c.causeOfBreach === case_.causeOfBreach ||
                            c.classType.some((type) =>
                              case_.classType.includes(type),
                            )),
                      )
                      .slice(0, 3)
                      .map((relatedCase) => (
                        <div
                          key={relatedCase.id}
                          className="border rounded-lg p-3 hover:bg-secondary/50 transition-colors"
                        >
                          <a
                            href={`/dashboard/cases/${relatedCase.id}`}
                            className="block"
                          >
                            <p className="font-medium text-sm mb-1">
                              {relatedCase.name}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                {relatedCase.court}
                              </span>
                              <span className="text-xs font-medium text-primary">
                                {formatCurrency(relatedCase.settlementAmount)}
                              </span>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* PDF Viewer */}
      <PDFViewer
        open={pdfViewerState.open}
        onOpenChange={closePDFViewer}
        documentUrl={pdfViewerState.documentUrl}
        documentName={pdfViewerState.documentName}
        initialPage={pdfViewerState.initialPage}
        highlightText={pdfViewerState.highlightText}
      />
    </>
  );
}
