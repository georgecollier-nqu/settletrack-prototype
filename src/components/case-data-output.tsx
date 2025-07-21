"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Case } from "@/lib/mock-data";

interface CaseDataOutputProps {
  cases: Case[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num);
}

function calculateAverage(values: (number | undefined)[]): number {
  const filtered = values.filter((v): v is number => v !== undefined);
  if (filtered.length === 0) return 0;
  return filtered.reduce((a, b) => a + b, 0) / filtered.length;
}

function calculateFrequency(
  cases: Case[],
  predicate: (c: Case) => boolean,
): number {
  if (cases.length === 0) return 0;
  return (cases.filter(predicate).length / cases.length) * 100;
}

export function CaseDataOutput({ cases }: CaseDataOutputProps) {
  const stats = useMemo(() => {
    if (cases.length === 0) return null;

    // Settlement Fund Statistics
    const grossSettlements = cases.map((c) => c.settlementAmount);
    const baseSettlements = cases.map((c) => c.baseSettlementAmount);
    const contingentSettlements = cases.map(
      (c) => c.contingentSettlementAmount,
    );

    // Attorney Fees Statistics
    const percentageFees = cases.filter(
      (c) => c.attorneyFeesMethod === "Percentage",
    );
    const lodestarFees = cases.filter(
      (c) => c.attorneyFeesMethod === "Lodestar",
    );

    // Individual Reimbursements
    const casesWithBaseCash = cases.filter((c) => c.baseCashCompensation);
    const casesWithSupplemental = cases.filter(
      (c) => c.supplementalReimbursement,
    );

    // Injunctive Relief Analysis
    const injunctiveReliefCounts: Record<string, number> = {};
    const thirdPartyAssessmentCounts: Record<string, number> = {};

    cases.forEach((c) => {
      c.injunctiveRelief.forEach((relief) => {
        const key = relief.toLowerCase();
        if (key.includes("employee training"))
          injunctiveReliefCounts["employee_training"] =
            (injunctiveReliefCounts["employee_training"] || 0) + 1;
        if (key.includes("board") || key.includes("management"))
          injunctiveReliefCounts["board_oversight"] =
            (injunctiveReliefCounts["board_oversight"] || 0) + 1;
        if (key.includes("vendor"))
          injunctiveReliefCounts["vendor_requirements"] =
            (injunctiveReliefCounts["vendor_requirements"] || 0) + 1;
        if (key.includes("assessment") || key.includes("audit"))
          injunctiveReliefCounts["security_assessments"] =
            (injunctiveReliefCounts["security_assessments"] || 0) + 1;
        if (key.includes("multi-factor") || key.includes("mfa"))
          injunctiveReliefCounts["mfa"] =
            (injunctiveReliefCounts["mfa"] || 0) + 1;
        if (key.includes("cloud"))
          injunctiveReliefCounts["cloud_governance"] =
            (injunctiveReliefCounts["cloud_governance"] || 0) + 1;
        if (key.includes("vulnerability") || key.includes("penetration"))
          injunctiveReliefCounts["vulnerability_testing"] =
            (injunctiveReliefCounts["vulnerability_testing"] || 0) + 1;
        if (key.includes("encrypt"))
          injunctiveReliefCounts["data_encryption"] =
            (injunctiveReliefCounts["data_encryption"] || 0) + 1;
        if (key.includes("deletion") || key.includes("minimization"))
          injunctiveReliefCounts["data_deletion"] =
            (injunctiveReliefCounts["data_deletion"] || 0) + 1;
      });

      c.thirdPartyAssessments?.forEach((assessment) => {
        thirdPartyAssessmentCounts[assessment] =
          (thirdPartyAssessmentCounts[assessment] || 0) + 1;
      });
    });

    // Other Injunctive Relief (deduplicated)
    const allInjunctiveRelief = new Set<string>();
    cases.forEach((c) => {
      c.injunctiveRelief.forEach((relief) => {
        allInjunctiveRelief.add(relief);
      });
    });

    // Excess Funds Disposition
    const excessFundsStats = {
      redistribution: calculateFrequency(
        cases,
        (c) => c.excessFundsDisposition === "Redistribution",
      ),
      cyPres: calculateFrequency(
        cases,
        (c) => c.excessFundsDisposition === "Cy pres",
      ),
      reversion: calculateFrequency(
        cases,
        (c) => c.excessFundsDisposition === "Reversion",
      ),
    };

    return {
      // Settlement Fund
      avgGrossSettlement: calculateAverage(grossSettlements),
      avgBaseSettlement: calculateAverage(baseSettlements),
      avgContingentSettlement: calculateAverage(contingentSettlements),
      uncappedFrequency: calculateFrequency(
        cases,
        (c) => !c.isSettlementCapped,
      ),

      // Attorney Fees
      feesPaidFromFund: calculateFrequency(
        cases,
        (c) => c.attorneyFeesPaidFromFund,
      ),
      percentageMethodFreq: (percentageFees.length / cases.length) * 100,
      lodestarMethodFreq: (lodestarFees.length / cases.length) * 100,
      avgPercentage: calculateAverage(
        percentageFees.map((c) => c.attorneyFeesPercentage),
      ),
      avgLodestar: calculateAverage(lodestarFees.map((c) => c.lodestardAmount)),
      avgMultiplier: calculateAverage(lodestarFees.map((c) => c.multiplier)),
      avgReimbursement: calculateAverage(
        cases.map((c) => c.attorneyFeesReimbursement),
      ),
      reimbursementFromFund: calculateFrequency(
        cases,
        (c) => c.attorneyFeesReimbursementFromFund,
      ),
      avgSupplementalReimbursement: calculateAverage(
        cases.map((c) => c.supplementalReimbursement),
      ),
      supplementalCount: casesWithSupplemental.length,

      // Class Representatives
      avgServiceAwards: calculateAverage(
        cases.map((c) => c.classRepServiceAwards),
      ),
      serviceAwardsFromFund: calculateFrequency(
        cases,
        (c) => c.classRepAwardsFromFund,
      ),

      // Claims Administration
      avgAdminCosts: calculateAverage(cases.map((c) => c.claimsAdminCosts)),
      adminCostsFromFund: calculateFrequency(
        cases,
        (c) => c.claimsAdminCostsFromFund,
      ),

      // Individual Reimbursements
      avgBaseCash: calculateAverage(cases.map((c) => c.baseCashCompensation)),
      baseCashCount: casesWithBaseCash.length,
      avgMaxOutOfPocket: calculateAverage(
        cases.map((c) => c.maxReimbursementOutOfPocket),
      ),
      avgMaxDocumentedTime: calculateAverage(
        cases.map((c) => c.maxReimbursementDocumentedTime),
      ),
      avgMaxHoursDocumented: calculateAverage(
        cases.map((c) => c.maxHoursDocumented),
      ),
      avgRateDocumented: calculateAverage(
        cases.map((c) => c.ratePerHourDocumented),
      ),
      avgMaxUndocumented: calculateAverage(
        cases.map((c) => c.maxReimbursementUndocumented),
      ),
      avgMaxHoursUndocumented: calculateAverage(
        cases.map((c) => c.maxHoursUndocumented),
      ),
      avgRateUndocumented: calculateAverage(
        cases.map((c) => c.ratePerHourUndocumented),
      ),
      allowBothDocUndoc: calculateFrequency(
        cases,
        (c) => c.allowBothDocAndUndoc,
      ),
      hasProRata: calculateFrequency(cases, (c) => c.hasProRataAdjustment),
      avgProRataAmount: calculateAverage(cases.map((c) => c.proRataAmount)),

      // Class Members
      avgClaimsSubmitted: calculateAverage(cases.map((c) => c.claimsSubmitted)),
      avgClaimsPercent: calculateAverage(
        cases.map((c) => c.claimsSubmittedPercent),
      ),

      // Injunctive Relief
      avgInjunctiveAmount: calculateAverage(
        cases.map((c) => c.injunctiveReliefAmount),
      ),
      injunctiveReliefFreq: {
        employeeTraining:
          ((injunctiveReliefCounts.employee_training || 0) / cases.length) *
          100,
        boardOversight:
          ((injunctiveReliefCounts.board_oversight || 0) / cases.length) * 100,
        vendorRequirements:
          ((injunctiveReliefCounts.vendor_requirements || 0) / cases.length) *
          100,
        securityAssessments:
          ((injunctiveReliefCounts.security_assessments || 0) / cases.length) *
          100,
        mfa: ((injunctiveReliefCounts.mfa || 0) / cases.length) * 100,
        cloudGovernance:
          ((injunctiveReliefCounts.cloud_governance || 0) / cases.length) * 100,
        vulnerabilityTesting:
          ((injunctiveReliefCounts.vulnerability_testing || 0) / cases.length) *
          100,
        dataEncryption:
          ((injunctiveReliefCounts.data_encryption || 0) / cases.length) * 100,
        dataDeletion:
          ((injunctiveReliefCounts.data_deletion || 0) / cases.length) * 100,
      },
      thirdPartyAssessments: thirdPartyAssessmentCounts,
      creditMonitoring: calculateFrequency(cases, (c) => c.creditMonitoring),
      avgCreditMonitoringAmount: calculateAverage(
        cases
          .filter((c) => c.creditMonitoring)
          .map((c) => c.creditMonitoringAmount),
      ),
      otherInjunctiveRelief: Array.from(allInjunctiveRelief),

      // Excess Funds
      excessFundsStats,

      // Case count
      totalCases: cases.length,
    };
  }, [cases]);

  if (!stats || cases.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Apply filters to see aggregated data analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settlement" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1 md:grid md:grid-cols-5">
          <TabsTrigger value="settlement">Total Settlement</TabsTrigger>
          <TabsTrigger value="reimbursement">Individual Payout</TabsTrigger>
          <TabsTrigger value="injunctive">Injunctive Relief</TabsTrigger>
          <TabsTrigger value="attorney">Attorney&apos;s Fees</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {/* Total Settlement Tab */}
        <TabsContent value="settlement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Settlement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Gross Settlement
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(stats.avgGrossSettlement)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Base Settlement
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(stats.avgBaseSettlement)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Contingent Settlement
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(stats.avgContingentSettlement)}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">
                  Is the gross settlement amount unspecified and/or uncapped?
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Yes</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={stats.uncappedFrequency}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {stats.uncappedFrequency.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">No</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={100 - stats.uncappedFrequency}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {(100 - stats.uncappedFrequency).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attorney Fees Tab */}
        <TabsContent value="attorney" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attorney&apos;s Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">
                  Are the attorney&apos;s fees paid out of the total settlement
                  fund?
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Yes</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={stats.feesPaidFromFund}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {stats.feesPaidFromFund.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">No</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={100 - stats.feesPaidFromFund}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {(100 - stats.feesPaidFromFund).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">
                  Primary method for calculating attorney&apos;s fees
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Percentage of the Fund
                      </span>
                      <span className="text-sm">
                        {stats.percentageMethodFreq.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={stats.percentageMethodFreq} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Average percentage: {stats.avgPercentage.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Lodestar with Multiplier
                      </span>
                      <span className="text-sm">
                        {stats.lodestarMethodFreq.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={stats.lodestarMethodFreq} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <p className="text-sm text-muted-foreground">
                        Average lodestar: {formatCurrency(stats.avgLodestar)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Average multiplier: {stats.avgMultiplier.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average reimbursement for attorney&apos;s fees/expenses
                  </p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(stats.avgReimbursement)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Is the reimbursement paid out of the total settlement fund?
                  </h4>
                  <div className="flex gap-4">
                    <Badge variant="outline">
                      Yes: {stats.reimbursementFromFund.toFixed(0)}%
                    </Badge>
                    <Badge variant="outline">
                      No: {(100 - stats.reimbursementFromFund).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                {stats.supplementalCount > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average supplemental reimbursement (
                      {stats.supplementalCount} of {stats.totalCases})
                    </p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(stats.avgSupplementalReimbursement)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Payout Tab */}
        <TabsContent value="reimbursement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Payout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Base Compensation</h4>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average base cash compensation ({stats.baseCashCount} of{" "}
                      {stats.totalCases})
                    </p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(stats.avgBaseCash)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Out of Pocket Costs</h4>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average max reimbursement per individual
                    </p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(stats.avgMaxOutOfPocket)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Documented Time</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Max reimbursement
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(stats.avgMaxDocumentedTime)}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Max hours
                        </p>
                        <p className="font-semibold">
                          {stats.avgMaxHoursDocumented.toFixed(0)} hours
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Rate per hour
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(stats.avgRateDocumented)}/hr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    Undocumented/Attested Time
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Max reimbursement
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(stats.avgMaxUndocumented)}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Max hours
                        </p>
                        <p className="font-semibold">
                          {stats.avgMaxHoursUndocumented.toFixed(0)} hours
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Rate per hour
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(stats.avgRateUndocumented)}/hr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Can the same claimant be reimbursed for both documented and
                    undocumented costs?
                  </h4>
                  <div className="flex gap-4">
                    <Badge variant="outline">
                      Yes: {stats.allowBothDocUndoc.toFixed(0)}%
                    </Badge>
                    <Badge variant="outline">
                      No: {(100 - stats.allowBothDocUndoc).toFixed(0)}%
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Does the settlement provide for a pro rata adjustment?
                  </h4>
                  <div className="flex gap-4">
                    <Badge variant="outline">
                      Yes: {stats.hasProRata.toFixed(0)}%
                    </Badge>
                    <Badge variant="outline">
                      No: {(100 - stats.hasProRata).toFixed(0)}%
                    </Badge>
                  </div>
                  {stats.avgProRataAmount > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Average pro rata adjustment:{" "}
                      {formatCurrency(stats.avgProRataAmount)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Injunctive Relief Tab */}
        <TabsContent value="injunctive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Injunctive Relief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Average total amount allocated for injunctive relief
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(stats.avgInjunctiveAmount)}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Required Measures</h4>
                <div className="space-y-2">
                  {[
                    {
                      key: "employeeTraining",
                      label: "Employee training required",
                    },
                    {
                      key: "boardOversight",
                      label: "Increased board/senior management oversight",
                    },
                    {
                      key: "vendorRequirements",
                      label: "Vendor requirements imposed",
                    },
                    {
                      key: "securityAssessments",
                      label: "Independent third-party security assessments",
                    },
                    {
                      key: "mfa",
                      label: "Multi-factor authentication required",
                    },
                    {
                      key: "cloudGovernance",
                      label: "Cloud governance changes required",
                    },
                    {
                      key: "vulnerabilityTesting",
                      label: "Vulnerability scanning & penetration testing",
                    },
                    {
                      key: "dataEncryption",
                      label: "Data encryption required",
                    },
                    {
                      key: "dataDeletion",
                      label: "Data deletion and minimization required",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={
                            stats.injunctiveReliefFreq[
                              item.key as keyof typeof stats.injunctiveReliefFreq
                            ]
                          }
                          className="w-[150px]"
                        />
                        <span className="text-sm font-medium w-12 text-right">
                          {stats.injunctiveReliefFreq[
                            item.key as keyof typeof stats.injunctiveReliefFreq
                          ].toFixed(0)}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {Object.keys(stats.thirdPartyAssessments).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">
                      Third-Party Assessments
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(stats.thirdPartyAssessments).map(
                        ([assessment, count]) => (
                          <div
                            key={assessment}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <span className="text-sm font-medium">
                              {assessment}
                            </span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Credit Monitoring</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Is credit monitoring / identity theft protection offered?
                    </p>
                    <div className="flex gap-4">
                      <Badge variant="outline">
                        Yes: {stats.creditMonitoring.toFixed(0)}%
                      </Badge>
                      <Badge variant="outline">
                        No: {(100 - stats.creditMonitoring).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  {stats.avgCreditMonitoringAmount > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Average amount spent on credit monitoring
                      </p>
                      <p className="text-xl font-semibold">
                        {formatCurrency(stats.avgCreditMonitoringAmount)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {stats.otherInjunctiveRelief.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">
                      Other Injunctive Relief Mentioned
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(stats.otherInjunctiveRelief)).map(
                        (relief) => (
                          <Badge key={relief} variant="secondary">
                            {relief}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Tab - Contains Class/Claims and Excess Funds */}
        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Other</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Class Representatives Section */}
              <div>
                <h4 className="font-medium mb-3">Class Representatives</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average service awards per named plaintiff
                    </p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(stats.avgServiceAwards)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Are the service awards paid out of the total settlement
                      fund?
                    </p>
                    <div className="flex gap-4">
                      <Badge variant="outline">
                        Yes: {stats.serviceAwardsFromFund.toFixed(0)}%
                      </Badge>
                      <Badge variant="outline">
                        No: {(100 - stats.serviceAwardsFromFund).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Claims Administration Section */}
              <div>
                <h4 className="font-medium mb-3">
                  Claims Administration Costs
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average claims administration costs
                    </p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(stats.avgAdminCosts)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Are the costs paid out of the total settlement fund?
                    </p>
                    <div className="flex gap-4">
                      <Badge variant="outline">
                        Yes: {stats.adminCostsFromFund.toFixed(0)}%
                      </Badge>
                      <Badge variant="outline">
                        No: {(100 - stats.adminCostsFromFund).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Class Members Section */}
              <div>
                <h4 className="font-medium mb-3">Class Members</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average number of claims submitted
                    </p>
                    <p className="text-xl font-semibold">
                      {formatNumber(Math.round(stats.avgClaimsSubmitted))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average claims submission rate
                    </p>
                    <p className="text-xl font-semibold">
                      {stats.avgClaimsPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Excess Funds Section */}
              <div>
                <h4 className="font-medium mb-4">
                  What happens to excess funds?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Redistribution to claimants</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={stats.excessFundsStats.redistribution}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {stats.excessFundsStats.redistribution.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cy pres</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={stats.excessFundsStats.cyPres}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {stats.excessFundsStats.cyPres.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reversion to defendant</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={stats.excessFundsStats.reversion}
                        className="w-[200px]"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {stats.excessFundsStats.reversion.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
