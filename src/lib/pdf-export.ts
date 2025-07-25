import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

interface AutoTableOptions {
  head: string[][];
  body: string[][];
  startY: number;
  margin: { left: number; right: number };
  styles: {
    fontSize: number;
    cellPadding: number;
  };
  headStyles: {
    fillColor: number[];
    textColor: number;
    fontStyle: string;
  };
  alternateRowStyles?: {
    fillColor: number[];
  };
  didDrawPage?: (data: { pageNumber: number }) => void;
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface CaseExportData {
  caseName: string;
  docketId: string;
  court: string;
  year: number;
  status: string;
  primaryIssue: string;
  plaintiffType: string;
  defendantName: string;
  defendantType: string;
  settlementAmount: number;
  baseSettlementAmount?: number;
  contingentSettlementAmount?: number;
  individualPayout?: number;
  injunctiveRelief?: string;
  attorneysFees?: number;
  otherCompensation?: number;
  breachScope?: string;
  numberOfIndividuals?: number;
  dataTypes?: string[];
  filingDate?: Date;
  settlementDate?: Date;
}

interface ExportOptions {
  title?: string;
  subtitle?: string;
  filterSummary?: string;
  generatedBy?: string;
}

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateCaseSearchPDF(
  cases: CaseExportData[],
  options: ExportOptions = {},
): void {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(options.title || "Case Search Results Report", pageWidth / 2, 20, {
    align: "center",
  });

  if (options.subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(options.subtitle, pageWidth / 2, 28, { align: "center" });
  }

  // Report metadata
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let yPosition = 40;

  doc.text(
    `Generated: ${format(new Date(), "MMMM d, yyyy h:mm a")}`,
    margin,
    yPosition,
  );
  if (options.generatedBy) {
    doc.text(`Generated by: ${options.generatedBy}`, margin, yPosition + 5);
    yPosition += 5;
  }
  doc.text(`Total Cases: ${cases.length}`, margin, yPosition + 5);

  if (options.filterSummary) {
    doc.text(
      `Filters Applied: ${options.filterSummary}`,
      margin,
      yPosition + 10,
    );
    yPosition += 5;
  }

  yPosition += 15;

  // Summary Statistics
  const totalSettlement = cases.reduce(
    (sum, c) => sum + (c.settlementAmount || 0),
    0,
  );
  const avgSettlement = totalSettlement / cases.length;
  const totalIndividuals = cases.reduce(
    (sum, c) => sum + (c.numberOfIndividuals || 0),
    0,
  );

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Summary Statistics", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  yPosition += 7;

  const statsData = [
    ["Total Settlement Amount", formatCurrency(totalSettlement)],
    ["Average Settlement", formatCurrency(avgSettlement)],
    ["Total Affected Individuals", totalIndividuals.toLocaleString()],
    ["Number of Cases", cases.length.toString()],
  ];

  statsData.forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, margin, yPosition);
    yPosition += 5;
  });

  yPosition += 10;

  // Settlement Breakdown by Category
  if (cases.length > 0) {
    const totalBase = cases.reduce(
      (sum, c) => sum + (c.baseSettlementAmount || 0),
      0,
    );
    const totalContingent = cases.reduce(
      (sum, c) => sum + (c.contingentSettlementAmount || 0),
      0,
    );
    const totalIndividualPayout = cases.reduce(
      (sum, c) => sum + (c.individualPayout || 0),
      0,
    );
    const totalAttorneysFees = cases.reduce(
      (sum, c) => sum + (c.attorneysFees || 0),
      0,
    );
    const totalOther = cases.reduce(
      (sum, c) => sum + (c.otherCompensation || 0),
      0,
    );
    const casesWithInjunctive = cases.filter((c) => c.injunctiveRelief).length;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Settlement Components", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    yPosition += 7;

    const settlementData = [
      ["Total Settlement", formatCurrency(totalSettlement)],
      ["Base Settlement Amount", formatCurrency(totalBase)],
      ["Contingent Settlement", formatCurrency(totalContingent)],
      ["Individual Payouts", formatCurrency(totalIndividualPayout)],
      ["Attorney's Fees", formatCurrency(totalAttorneysFees)],
      ["Other Compensation", formatCurrency(totalOther)],
      [
        "Cases with Injunctive Relief",
        `${casesWithInjunctive} (${((casesWithInjunctive / cases.length) * 100).toFixed(1)}%)`,
      ],
    ];

    settlementData.forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, margin, yPosition);
      yPosition += 5;
    });
  }

  // Start new page for detailed table
  doc.addPage();

  // Case Details Table
  const tableHeaders = [
    "Case Name",
    "Docket ID",
    "Court",
    "Year",
    "Total Settlement",
    "Individual Payout",
    "Status",
    "Primary Issue",
    "Breach Scope",
    "Affected Individuals",
  ];

  const tableData = cases.map((c) => [
    c.caseName,
    c.docketId,
    c.court,
    c.year.toString(),
    formatCurrency(c.settlementAmount),
    formatCurrency(c.individualPayout),
    c.status,
    c.primaryIssue,
    c.breachScope || "N/A",
    c.numberOfIndividuals ? c.numberOfIndividuals.toLocaleString() : "N/A",
  ]);

  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
    startY: 20,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [59, 130, 246], // Blue color
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    didDrawPage: (data: { pageNumber: number }) => {
      // Add page numbers
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
    },
  });

  // Additional pages for settlement details if needed
  if (
    cases.length > 0 &&
    cases.some(
      (c) =>
        c.baseSettlementAmount ||
        c.contingentSettlementAmount ||
        c.attorneysFees,
    )
  ) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Settlement Details Breakdown", pageWidth / 2, 20, {
      align: "center",
    });

    const settlementHeaders = [
      "Case Name",
      "Total Settlement",
      "Base Amount",
      "Contingent",
      "Individual Payout",
      "Attorney's Fees",
      "Other",
    ];

    const settlementTableData = cases.map((c) => [
      c.caseName,
      formatCurrency(c.settlementAmount),
      formatCurrency(c.baseSettlementAmount),
      formatCurrency(c.contingentSettlementAmount),
      formatCurrency(c.individualPayout),
      formatCurrency(c.attorneysFees),
      formatCurrency(c.otherCompensation),
    ]);

    doc.autoTable({
      head: [settlementHeaders],
      body: settlementTableData,
      startY: 30,
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });
  }

  // Save the PDF
  const filename = `case-search-results-${format(new Date(), "yyyy-MM-dd-HHmmss")}.pdf`;
  doc.save(filename);
}

// Helper function to prepare case data for export
interface CaseInputData {
  name: string;
  docketId: string;
  court: string;
  year: number;
  settlementAmount: number;
  baseSettlementAmount?: number;
  contingentSettlementAmount?: number;
  baseCashCompensation?: number;
  injunctiveRelief: string[];
  attorneyFeesAmount?: number;
  otherBenefits?: number;
  causeOfBreach?: string;
  classSize?: number;
  piiAffected?: string[];
  date?: string;
  settlementDate?: string;
  defendantName?: string;
  plaintiffType?: string;
  caseType?: string;
  classType?: string[];
}

export function prepareCaseDataForExport(
  caseData: CaseInputData,
): CaseExportData {
  return {
    caseName: caseData.name,
    docketId: caseData.docketId,
    court: caseData.court,
    year: caseData.year,
    status: "Active",
    primaryIssue: caseData.causeOfBreach || "Data Breach",
    plaintiffType: caseData.plaintiffType || "Individual",
    defendantName: caseData.defendantName || "Unknown",
    defendantType: "Corporate",
    settlementAmount: caseData.settlementAmount,
    baseSettlementAmount: caseData.baseSettlementAmount,
    contingentSettlementAmount: caseData.contingentSettlementAmount,
    individualPayout: caseData.baseCashCompensation,
    injunctiveRelief: caseData.injunctiveRelief?.join(", "),
    attorneysFees: caseData.attorneyFeesAmount,
    otherCompensation: caseData.otherBenefits,
    breachScope: caseData.causeOfBreach,
    numberOfIndividuals: caseData.classSize,
    dataTypes: caseData.piiAffected,
    filingDate: caseData.date ? new Date(caseData.date) : undefined,
    settlementDate: caseData.settlementDate
      ? new Date(caseData.settlementDate)
      : undefined,
  };
}
