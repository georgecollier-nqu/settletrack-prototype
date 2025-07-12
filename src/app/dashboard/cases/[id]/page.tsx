"use client";

import { useState } from "react";
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

interface CaseDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseDetailsPage({
  params,
}: CaseDetailsPageProps) {
  const { id } = await params;

  return <CaseDetailsPageContent caseId={id} />;
}

function CaseDetailsPageContent({ caseId }: { caseId: string }) {
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);

  // Find the case by ID
  const case_ = mockCases.find((c) => c.id === caseId);

  if (!case_) {
    notFound();
  }

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
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Settlement Amount
                    </p>
                    <p className="text-2xl font-bold mt-1 text-primary">
                      {formatCurrency(case_.settlementAmount)}
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Class Size</p>
                    <p className="text-2xl font-bold mt-1">
                      {formatNumber(case_.classSize)}
                    </p>
                  </div>
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Settlement Date
                    </p>
                    <p className="text-lg font-bold mt-1">
                      {formatDate(case_.date)}
                    </p>
                  </div>
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Claims Rate</p>
                    <p className="text-2xl font-bold mt-1">
                      {case_.claimsSubmittedPercent}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(case_.claimsSubmitted)} claims
                    </p>
                  </div>
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
                    <p className="text-sm text-muted-foreground">
                      {case_.summary}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Jurisdiction
                      </h4>
                      <p className="text-sm">{case_.court}</p>
                      <p className="text-sm text-muted-foreground">
                        {case_.state}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Gavel className="h-4 w-4" />
                        Presiding Judge
                      </h4>
                      <p className="text-sm">{case_.judgeName}</p>
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
                <CardContent className="p-0">
                  <Tabs defaultValue="financial" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="parties">Parties</TabsTrigger>
                      <TabsTrigger value="breach">Breach Details</TabsTrigger>
                      <TabsTrigger value="relief">Relief</TabsTrigger>
                    </TabsList>

                    <TabsContent value="financial" className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Settlement Fund</h4>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(case_.settlementAmount)}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Attorney Fees</h4>
                          <p className="text-lg font-semibold">
                            {formatCurrency(attorneyFeesAmount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {case_.attorneyFeesMethod === "Percentage"
                              ? `${case_.attorneyFeesPercentage}% of settlement`
                              : `Lodestar: ${formatCurrency(case_.lodestardAmount || 0)} × ${case_.multiplier}`}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Class Size</h4>
                          <p className="text-lg font-semibold">
                            {formatNumber(case_.classSize)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Affected individuals
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Claims Submitted</h4>
                          <p className="text-lg font-semibold">
                            {formatNumber(case_.claimsSubmitted)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {case_.claimsSubmittedPercent}% participation rate
                          </p>
                        </div>
                      </div>

                      {case_.creditMonitoring &&
                        case_.creditMonitoringAmount && (
                          <div className="pt-4 border-t">
                            <h4 className="font-medium mb-2">
                              Credit Monitoring
                            </h4>
                            <p className="text-lg font-semibold">
                              {formatCurrency(case_.creditMonitoringAmount)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Allocated for credit monitoring services
                            </p>
                          </div>
                        )}
                    </TabsContent>

                    <TabsContent value="parties" className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Plaintiff&apos;s Counsel
                          </h4>
                          <p className="text-sm">{case_.plaintiffCounsel}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Defense Counsel
                          </h4>
                          <p className="text-sm">{case_.defenseCounsel}</p>
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

                    <TabsContent value="breach" className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Cause of Breach
                          </h4>
                          <Badge variant="destructive">
                            {case_.causeOfBreach}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">PII Affected</h4>
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
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="relief" className="p-6 space-y-4">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Injunctive Relief Measures
                        </h4>
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
                      </div>

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
                    <a href={`/dashboard/cases/search?similar=${case_.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Find Similar Cases
                    </a>
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
    </>
  );
}
