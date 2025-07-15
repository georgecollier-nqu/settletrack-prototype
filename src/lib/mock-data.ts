// Mock data for SettleTrack case database

export interface Citation {
  documentName: string;
  pageNumber: number;
  quote: string;
}

export interface FieldCitations {
  settlementAmount?: Citation;
  settlementDate?: Citation;
  classSize?: Citation;
  attorneyFeesPercentage?: Citation;
  baseCashCompensation?: Citation;
  claimsSubmitted?: Citation;
  creditMonitoringAmount?: Citation;
  lodestardAmount?: Citation;
  multiplier?: Citation;
  classRepServiceAwards?: Citation;
  claimsAdminCosts?: Citation;
  maxReimbursementOutOfPocket?: Citation;
  maxReimbursementDocumentedTime?: Citation;
  maxReimbursementUndocumented?: Citation;
  injunctiveReliefAmount?: Citation;
  proRataAmount?: Citation;
  plaintiffCounsel?: Citation;
  defenseCounsel?: Citation;
  causeOfBreach?: Citation;
  piiAffected?: Citation;
  injunctiveRelief?: Citation;
  thirdPartyAssessments?: Citation;
  summary?: Citation;
  court?: Citation;
  state?: Citation;
  judgeName?: Citation;
  // Add more fields as needed
}

export interface Case {
  id: string;
  name: string;
  docketId: string;
  court: string;
  state: string;
  year: number;
  settlementAmount: number;
  baseSettlementAmount?: number;
  contingentSettlementAmount?: number;
  isSettlementCapped: boolean;
  classSize: number;
  isMultiDistrictLitigation: boolean;
  piiAffected: string[];
  causeOfBreach: string;
  classType: string[];
  caseType: string;
  hasMinorSubclass: boolean;
  defenseCounsel: string;
  plaintiffCounsel: string;
  judgeName: string;
  settlementType: "Preliminary" | "Final";
  date: string;
  summary: string;
  attorneyFeesMethod: "Percentage" | "Lodestar";
  attorneyFeesPercentage?: number;
  attorneyFeesPaidFromFund: boolean;
  lodestardAmount?: number;
  multiplier?: number;
  attorneyFeesReimbursement?: number;
  attorneyFeesReimbursementFromFund: boolean;
  supplementalReimbursement?: number;
  classRepServiceAwards?: number;
  classRepAwardsFromFund: boolean;
  claimsAdminCosts?: number;
  claimsAdminCostsFromFund: boolean;
  baseCashCompensation?: number;
  maxReimbursementOutOfPocket?: number;
  maxReimbursementDocumentedTime?: number;
  maxHoursDocumented?: number;
  ratePerHourDocumented?: number;
  maxReimbursementUndocumented?: number;
  maxHoursUndocumented?: number;
  ratePerHourUndocumented?: number;
  allowBothDocAndUndoc: boolean;
  hasProRataAdjustment: boolean;
  proRataAmount?: number;
  claimsSubmitted: number;
  claimsSubmittedPercent: number;
  injunctiveRelief: string[];
  injunctiveReliefAmount?: number;
  thirdPartyAssessments?: string[];
  creditMonitoring: boolean;
  creditMonitoringAmount?: number;
  excessFundsDisposition?: "Redistribution" | "Cy pres" | "Reversion";
  citations?: FieldCitations;
}

export const mockCases: Case[] = [
  {
    id: "1",
    name: "In re Christie's Data Breach Litigation",
    docketId: "1:2024cv04221",
    court: "S.D.N.Y.",
    state: "New York",
    year: 2024,
    settlementAmount: 8500000,
    baseSettlementAmount: 7500000,
    contingentSettlementAmount: 1000000,
    isSettlementCapped: true,
    classSize: 500000,
    isMultiDistrictLitigation: false,
    piiAffected: ["Name", "Address", "Email", "Phone"],
    causeOfBreach: "Ransomware",
    classType: ["Consumers"],
    caseType: "Data Breach",
    hasMinorSubclass: false,
    defenseCounsel: "Williams & Connolly LLP",
    plaintiffCounsel: "Lieff Cabraser Heimann & Bernstein LLP",
    judgeName: "Judge Sarah Thompson",
    settlementType: "Final",
    date: "2024-12-15",
    summary:
      "Class action settlement for data breach affecting customer personal information",
    attorneyFeesMethod: "Percentage",
    attorneyFeesPercentage: 25,
    attorneyFeesPaidFromFund: true,
    attorneyFeesReimbursement: 150000,
    attorneyFeesReimbursementFromFund: true,
    supplementalReimbursement: 50000,
    classRepServiceAwards: 15000,
    classRepAwardsFromFund: true,
    claimsAdminCosts: 300000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 125,
    maxReimbursementOutOfPocket: 5000,
    maxReimbursementDocumentedTime: 2000,
    maxHoursDocumented: 40,
    ratePerHourDocumented: 50,
    maxReimbursementUndocumented: 500,
    maxHoursUndocumented: 10,
    ratePerHourUndocumented: 50,
    allowBothDocAndUndoc: false,
    hasProRataAdjustment: true,
    proRataAmount: 200,
    claimsSubmitted: 125000,
    claimsSubmittedPercent: 25,
    injunctiveRelief: [
      "Employee training",
      "Multi-factor authentication",
      "Penetration testing",
      "Data encryption",
      "Vulnerability scanning",
    ],
    injunctiveReliefAmount: 1500000,
    thirdPartyAssessments: ["SOC 2", "NIST"],
    creditMonitoring: true,
    creditMonitoringAmount: 2000000,
    excessFundsDisposition: "Cy pres",
    citations: {
      settlementAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 12,
        quote:
          "The total settlement fund shall be Eight Million Five Hundred Thousand Dollars ($8,500,000.00).",
      },
      classSize: {
        documentName: "Motion for Final Approval",
        pageNumber: 8,
        quote:
          "The Settlement Class consists of approximately 500,000 individuals whose personal information was compromised.",
      },
      attorneyFeesPercentage: {
        documentName: "Fee Motion",
        pageNumber: 3,
        quote:
          "Class Counsel requests attorneys' fees in the amount of 25% of the Settlement Fund.",
      },
      baseCashCompensation: {
        documentName: "Settlement Agreement",
        pageNumber: 18,
        quote:
          "Each claimant who submits a valid claim shall receive $125 in base compensation.",
      },
      claimsSubmitted: {
        documentName: "Claims Administrator Report",
        pageNumber: 2,
        quote:
          "As of the claims deadline, 125,000 valid claims have been submitted.",
      },
      plaintiffCounsel: {
        documentName: "Notice of Appearance",
        pageNumber: 1,
        quote:
          "Lieff Cabraser Heimann & Bernstein LLP appears as counsel for the plaintiff class.",
      },
      defenseCounsel: {
        documentName: "Notice of Appearance",
        pageNumber: 3,
        quote:
          "Williams & Connolly LLP represents the defendant in this matter.",
      },
      causeOfBreach: {
        documentName: "Complaint",
        pageNumber: 15,
        quote:
          "The data breach was caused by a sophisticated ransomware attack that encrypted defendant's systems.",
      },
      piiAffected: {
        documentName: "Expert Report",
        pageNumber: 22,
        quote:
          "The compromised data included names, addresses, email addresses, and phone numbers of affected individuals.",
      },
      injunctiveRelief: {
        documentName: "Settlement Agreement",
        pageNumber: 35,
        quote:
          "Defendant agrees to implement comprehensive security measures including employee training, MFA, and regular security assessments.",
      },
      injunctiveReliefAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 36,
        quote:
          "Defendant shall allocate $1,500,000 for implementation of the agreed-upon security enhancements.",
      },
    },
  },
  {
    id: "2",
    name: "Smith v. TechCorp Privacy Settlement",
    docketId: "3:2024cv02156",
    court: "N.D. Cal.",
    state: "California",
    year: 2024,
    settlementAmount: 12300000,
    baseSettlementAmount: 10000000,
    contingentSettlementAmount: 2300000,
    isSettlementCapped: false,
    classSize: 2500000,
    isMultiDistrictLitigation: true,
    piiAffected: ["Name", "SSN", "Address", "Payment Info"],
    causeOfBreach: "Phishing Attack",
    classType: ["Consumers"],
    caseType: "Data Breach",
    hasMinorSubclass: true,
    defenseCounsel: "Gibson, Dunn & Crutcher LLP",
    plaintiffCounsel: "Hagens Berman Sobol Shapiro LLP",
    judgeName: "Judge Michael Chen",
    settlementType: "Final",
    date: "2024-12-10",
    summary:
      "Major technology company privacy settlement for unauthorized data collection",
    attorneyFeesMethod: "Lodestar",
    attorneyFeesPaidFromFund: true,
    lodestardAmount: 2500000,
    multiplier: 1.5,
    attorneyFeesReimbursement: 200000,
    attorneyFeesReimbursementFromFund: false,
    supplementalReimbursement: 75000,
    classRepServiceAwards: 20000,
    classRepAwardsFromFund: false,
    claimsAdminCosts: 450000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 75,
    maxReimbursementOutOfPocket: 3500,
    maxReimbursementDocumentedTime: 1500,
    maxHoursDocumented: 30,
    ratePerHourDocumented: 50,
    maxReimbursementUndocumented: 250,
    maxHoursUndocumented: 5,
    ratePerHourUndocumented: 50,
    allowBothDocAndUndoc: true,
    hasProRataAdjustment: false,
    claimsSubmitted: 750000,
    claimsSubmittedPercent: 30,
    injunctiveRelief: [
      "Board oversight",
      "Vendor requirements",
      "Data encryption",
      "Multi-factor authentication",
      "Cloud governance",
      "Employee training",
    ],
    injunctiveReliefAmount: 2000000,
    thirdPartyAssessments: ["ISO 27001", "SOC 2"],
    creditMonitoring: true,
    creditMonitoringAmount: 3500000,
    excessFundsDisposition: "Redistribution",
    citations: {
      settlementAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 14,
        quote:
          "The Settlement Fund shall consist of Twelve Million Three Hundred Thousand Dollars ($12,300,000.00) in cash.",
      },
      classSize: {
        documentName: "Class Certification Order",
        pageNumber: 5,
        quote:
          "The Court finds that the proposed class includes approximately 2.5 million affected users.",
      },
      lodestardAmount: {
        documentName: "Fee Motion",
        pageNumber: 7,
        quote:
          "Class Counsel's lodestar calculation totals $2,500,000 based on 4,500 hours of attorney time.",
      },
      baseCashCompensation: {
        documentName: "Settlement Agreement",
        pageNumber: 22,
        quote:
          "Each Settlement Class Member who submits a valid claim form shall receive a base payment of $75.",
      },
      claimsSubmitted: {
        documentName: "Claims Administrator Final Report",
        pageNumber: 3,
        quote:
          "The Claims Administrator received and processed 750,000 valid claims by the submission deadline.",
      },
      creditMonitoringAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 28,
        quote:
          "Defendant shall provide $3,500,000 for credit monitoring services for affected class members.",
      },
    },
  },
  {
    id: "3",
    name: "Johnson Class Action Settlement",
    docketId: "2:2024cv01789",
    court: "E.D. Tex.",
    state: "Texas",
    year: 2024,
    settlementAmount: 5200000,
    baseSettlementAmount: 5200000,
    isSettlementCapped: true,
    classSize: 800000,
    isMultiDistrictLitigation: false,
    piiAffected: ["Name", "Email", "Geolocation"],
    causeOfBreach: "System Vulnerability",
    classType: ["Consumers"],
    caseType: "Data Breach",
    hasMinorSubclass: false,
    defenseCounsel: "Latham & Watkins LLP",
    plaintiffCounsel: "Robbins Geller Rudman & Dowd LLP",
    judgeName: "Judge Robert Martinez",
    settlementType: "Preliminary",
    date: "2024-12-08",
    summary: "Settlement for location tracking privacy violations",
    attorneyFeesMethod: "Percentage",
    attorneyFeesPercentage: 30,
    attorneyFeesPaidFromFund: true,
    attorneyFeesReimbursement: 100000,
    attorneyFeesReimbursementFromFund: true,
    classRepServiceAwards: 10000,
    classRepAwardsFromFund: true,
    claimsAdminCosts: 200000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 50,
    maxReimbursementOutOfPocket: 1000,
    allowBothDocAndUndoc: false,
    hasProRataAdjustment: true,
    proRataAmount: 100,
    claimsSubmitted: 200000,
    claimsSubmittedPercent: 25,
    injunctiveRelief: [
      "Data minimization",
      "User consent improvements",
      "Data deletion",
    ],
    injunctiveReliefAmount: 500000,
    creditMonitoring: false,
    excessFundsDisposition: "Reversion",
    citations: {
      settlementAmount: {
        documentName: "Preliminary Settlement Agreement",
        pageNumber: 10,
        quote:
          "The parties agree to a total settlement amount of Five Million Two Hundred Thousand Dollars ($5,200,000.00).",
      },
      classSize: {
        documentName: "Motion for Preliminary Approval",
        pageNumber: 6,
        quote:
          "The proposed settlement class consists of approximately 800,000 individuals whose location data was tracked.",
      },
      attorneyFeesPercentage: {
        documentName: "Fee Motion",
        pageNumber: 4,
        quote:
          "Plaintiff's counsel respectfully requests fees of 30% of the common fund.",
      },
      baseCashCompensation: {
        documentName: "Preliminary Settlement Agreement",
        pageNumber: 16,
        quote: "Valid claimants shall receive a flat payment of $50 per claim.",
      },
      claimsSubmitted: {
        documentName: "Preliminary Claims Report",
        pageNumber: 2,
        quote: "To date, approximately 200,000 claims have been submitted.",
      },
    },
  },
  {
    id: "4",
    name: "Davis v. HealthCare Partners",
    docketId: "1:2023cv08932",
    court: "S.D. Fla.",
    state: "Florida",
    year: 2023,
    settlementAmount: 18750000,
    baseSettlementAmount: 15000000,
    contingentSettlementAmount: 3750000,
    isSettlementCapped: true,
    classSize: 1200000,
    isMultiDistrictLitigation: false,
    piiAffected: ["Name", "SSN", "Medical Records", "Insurance Info"],
    causeOfBreach: "Insider Threat",
    classType: ["Patients"],
    caseType: "Healthcare",
    hasMinorSubclass: true,
    defenseCounsel: "King & Spalding LLP",
    plaintiffCounsel: "Keller Rohrback L.L.P.",
    judgeName: "Judge Elizabeth Davis",
    settlementType: "Final",
    date: "2023-11-22",
    summary:
      "Healthcare data breach settlement affecting patient medical records",
    attorneyFeesMethod: "Percentage",
    attorneyFeesPercentage: 22,
    attorneyFeesPaidFromFund: true,
    attorneyFeesReimbursement: 250000,
    attorneyFeesReimbursementFromFund: true,
    classRepServiceAwards: 25000,
    classRepAwardsFromFund: true,
    claimsAdminCosts: 500000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 150,
    maxReimbursementOutOfPocket: 10000,
    maxReimbursementDocumentedTime: 5000,
    maxHoursDocumented: 100,
    ratePerHourDocumented: 50,
    allowBothDocAndUndoc: true,
    hasProRataAdjustment: false,
    claimsSubmitted: 480000,
    claimsSubmittedPercent: 40,
    injunctiveRelief: [
      "Employee background checks",
      "Access controls",
      "Audit logging",
      "Employee training",
      "Board oversight",
    ],
    injunctiveReliefAmount: 3000000,
    thirdPartyAssessments: ["HIPAA", "SOC 2"],
    creditMonitoring: true,
    creditMonitoringAmount: 5000000,
    excessFundsDisposition: "Cy pres",
    citations: {
      settlementAmount: {
        documentName: "Final Settlement Agreement",
        pageNumber: 15,
        quote:
          "The Total Settlement Amount shall be Eighteen Million Seven Hundred Fifty Thousand Dollars ($18,750,000.00).",
      },
      classSize: {
        documentName: "Expert Declaration",
        pageNumber: 9,
        quote:
          "Based on defendant's records, approximately 1.2 million patients had their protected health information exposed.",
      },
      attorneyFeesPercentage: {
        documentName: "Motion for Attorney Fees",
        pageNumber: 5,
        quote:
          "Class Counsel seeks an award of 22% of the Settlement Fund for attorney's fees.",
      },
      baseCashCompensation: {
        documentName: "Final Settlement Agreement",
        pageNumber: 21,
        quote:
          "Class Members with valid claims shall receive $150 as base compensation for the breach.",
      },
      claimsSubmitted: {
        documentName: "Claims Administrator Report",
        pageNumber: 4,
        quote:
          "A total of 480,000 valid claims were received, representing a 40% claims rate.",
      },
      creditMonitoringAmount: {
        documentName: "Final Settlement Agreement",
        pageNumber: 30,
        quote:
          "Five Million Dollars ($5,000,000) shall be allocated for credit monitoring and identity theft protection services.",
      },
      injunctiveReliefAmount: {
        documentName: "Final Settlement Agreement",
        pageNumber: 38,
        quote:
          "Defendant commits to invest Three Million Dollars ($3,000,000) in security improvements over the next three years.",
      },
    },
  },
  {
    id: "5",
    name: "Wilson v. FinanceCorp Data Breach",
    docketId: "1:2023cv05647",
    court: "S.D.N.Y.",
    state: "New York",
    year: 2023,
    settlementAmount: 15200000,
    baseSettlementAmount: 15200000,
    isSettlementCapped: false,
    classSize: 3200000,
    isMultiDistrictLitigation: true,
    piiAffected: ["Name", "SSN", "Bank Account", "Credit Card"],
    causeOfBreach: "Ransomware",
    classType: ["Consumers"],
    caseType: "Financial Services",
    hasMinorSubclass: false,
    defenseCounsel: "Cravath, Swaine & Moore LLP",
    plaintiffCounsel: "Bernstein Litowitz Berger & Grossmann LLP",
    judgeName: "Judge Patricia Wilson",
    settlementType: "Final",
    date: "2023-09-15",
    summary:
      "Financial services company data breach affecting customer financial information",
    attorneyFeesMethod: "Lodestar",
    attorneyFeesPaidFromFund: true,
    lodestardAmount: 3800000,
    multiplier: 1.2,
    attorneyFeesReimbursement: 300000,
    attorneyFeesReimbursementFromFund: false,
    supplementalReimbursement: 100000,
    classRepServiceAwards: 30000,
    classRepAwardsFromFund: false,
    claimsAdminCosts: 600000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 100,
    maxReimbursementOutOfPocket: 7500,
    maxReimbursementDocumentedTime: 3000,
    maxHoursDocumented: 60,
    ratePerHourDocumented: 50,
    maxReimbursementUndocumented: 750,
    maxHoursUndocumented: 15,
    ratePerHourUndocumented: 50,
    allowBothDocAndUndoc: false,
    hasProRataAdjustment: true,
    proRataAmount: 250,
    claimsSubmitted: 960000,
    claimsSubmittedPercent: 30,
    injunctiveRelief: [
      "SOC 2 compliance",
      "Incident response plan",
      "Data encryption",
      "Penetration testing",
      "Multi-factor authentication",
    ],
    injunctiveReliefAmount: 2500000,
    thirdPartyAssessments: ["SOC 2", "PCI DSS", "NIST"],
    creditMonitoring: true,
    creditMonitoringAmount: 8000000,
    excessFundsDisposition: "Redistribution",
    citations: {
      settlementAmount: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 11,
        quote:
          "The Settlement Amount of Fifteen Million Two Hundred Thousand Dollars ($15,200,000) shall be deposited into an escrow account.",
      },
      classSize: {
        documentName: "Declaration in Support of Final Approval",
        pageNumber: 7,
        quote:
          "Records indicate that approximately 3.2 million customer accounts were compromised in the data breach.",
      },
      lodestardAmount: {
        documentName: "Motion for Attorney's Fees",
        pageNumber: 12,
        quote:
          "The lodestar amount, based on reasonable hours and rates, totals $3,800,000.",
      },
      multiplier: {
        documentName: "Motion for Attorney's Fees",
        pageNumber: 15,
        quote:
          "A modest multiplier of 1.2 is appropriate given the risks and results achieved.",
      },
      baseCashCompensation: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 19,
        quote:
          "Each Settlement Class Member shall be entitled to receive $100 in base compensation.",
      },
      claimsSubmitted: {
        documentName: "Final Claims Administration Report",
        pageNumber: 3,
        quote:
          "The Claims Administrator processed 960,000 approved claims during the claims period.",
      },
      creditMonitoringAmount: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 26,
        quote:
          "Eight Million Dollars ($8,000,000) is allocated for credit monitoring and identity restoration services.",
      },
    },
  },
  {
    id: "6",
    name: "Martinez v. RetailChain Inc.",
    docketId: "2:2023cv03421",
    court: "C.D. Cal.",
    state: "California",
    year: 2023,
    settlementAmount: 9800000,
    baseSettlementAmount: 9800000,
    isSettlementCapped: true,
    classSize: 1800000,
    isMultiDistrictLitigation: false,
    piiAffected: ["Name", "Address", "Payment Info"],
    causeOfBreach: "Payment System Hack",
    classType: ["Consumers"],
    caseType: "Retail",
    hasMinorSubclass: false,
    defenseCounsel: "O'Melveny & Myers LLP",
    plaintiffCounsel: "Milberg Coleman Bryson Phillips Grossman PLLC",
    judgeName: "Judge Carlos Rodriguez",
    settlementType: "Final",
    date: "2023-08-30",
    summary: "Retail chain payment card data breach settlement",
    attorneyFeesMethod: "Percentage",
    attorneyFeesPercentage: 28,
    attorneyFeesPaidFromFund: true,
    attorneyFeesReimbursement: 175000,
    attorneyFeesReimbursementFromFund: true,
    classRepServiceAwards: 15000,
    classRepAwardsFromFund: true,
    claimsAdminCosts: 350000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 80,
    maxReimbursementOutOfPocket: 2500,
    allowBothDocAndUndoc: false,
    hasProRataAdjustment: true,
    proRataAmount: 150,
    claimsSubmitted: 540000,
    claimsSubmittedPercent: 30,
    injunctiveRelief: [
      "PCI DSS compliance",
      "Network segmentation",
      "Vendor requirements",
    ],
    injunctiveReliefAmount: 1000000,
    thirdPartyAssessments: ["PCI DSS"],
    creditMonitoring: true,
    creditMonitoringAmount: 2500000,
    excessFundsDisposition: "Cy pres",
    citations: {
      settlementAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 13,
        quote:
          "The gross Settlement Fund shall be Nine Million Eight Hundred Thousand Dollars ($9,800,000.00).",
      },
      classSize: {
        documentName: "Class Certification Motion",
        pageNumber: 8,
        quote:
          "Defendant's records show that approximately 1.8 million customers used payment cards at affected locations.",
      },
      attorneyFeesPercentage: {
        documentName: "Fee Application",
        pageNumber: 6,
        quote:
          "Class Counsel requests attorney's fees of twenty-eight percent (28%) of the Settlement Fund.",
      },
      baseCashCompensation: {
        documentName: "Settlement Agreement",
        pageNumber: 20,
        quote:
          "Authorized Claimants shall receive eighty dollars ($80) as a base cash payment.",
      },
      claimsSubmitted: {
        documentName: "Claims Report",
        pageNumber: 2,
        quote:
          "540,000 timely and valid claims were submitted, representing a 30% participation rate.",
      },
      creditMonitoringAmount: {
        documentName: "Settlement Agreement",
        pageNumber: 24,
        quote:
          "Two Million Five Hundred Thousand Dollars ($2,500,000) shall be reserved for credit monitoring services.",
      },
    },
  },
  {
    id: "7",
    name: "Thompson v. EducationCorp",
    docketId: "1:2022cv07854",
    court: "D. Mass.",
    state: "Massachusetts",
    year: 2022,
    settlementAmount: 6500000,
    baseSettlementAmount: 6500000,
    isSettlementCapped: true,
    classSize: 450000,
    isMultiDistrictLitigation: false,
    piiAffected: ["Name", "SSN", "Student Records"],
    causeOfBreach: "Database Misconfiguration",
    classType: ["Consumers", "Students"],
    caseType: "Education",
    hasMinorSubclass: true,
    defenseCounsel: "Ropes & Gray LLP",
    plaintiffCounsel: "Labaton Sucharow LLP",
    judgeName: "Judge Amanda Foster",
    settlementType: "Final",
    date: "2022-12-05",
    summary: "Educational institution student data breach settlement",
    attorneyFeesMethod: "Percentage",
    attorneyFeesPercentage: 25,
    attorneyFeesPaidFromFund: true,
    attorneyFeesReimbursement: 125000,
    attorneyFeesReimbursementFromFund: true,
    classRepServiceAwards: 12500,
    classRepAwardsFromFund: true,
    claimsAdminCosts: 250000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 60,
    maxReimbursementOutOfPocket: 1500,
    allowBothDocAndUndoc: true,
    hasProRataAdjustment: false,
    claimsSubmitted: 135000,
    claimsSubmittedPercent: 30,
    injunctiveRelief: [
      "Security training",
      "Data governance policies",
      "Data minimization",
    ],
    injunctiveReliefAmount: 750000,
    creditMonitoring: true,
    creditMonitoringAmount: 1800000,
    excessFundsDisposition: "Reversion",
    citations: {
      settlementAmount: {
        documentName: "Stipulation of Settlement",
        pageNumber: 9,
        quote:
          "The Settlement provides for a Common Fund of Six Million Five Hundred Thousand Dollars ($6,500,000).",
      },
      classSize: {
        documentName: "Motion for Final Approval",
        pageNumber: 5,
        quote:
          "The Settlement Class includes approximately 450,000 students and applicants whose data was exposed.",
      },
      attorneyFeesPercentage: {
        documentName: "Motion for Attorneys' Fees",
        pageNumber: 4,
        quote:
          "Plaintiff's Counsel request an award of attorneys' fees equal to 25% of the Settlement Fund.",
      },
      baseCashCompensation: {
        documentName: "Stipulation of Settlement",
        pageNumber: 17,
        quote:
          "Each Class Member who submits a valid Claim Form shall receive sixty dollars ($60).",
      },
      claimsSubmitted: {
        documentName: "Claims Administrator Declaration",
        pageNumber: 3,
        quote: "135,000 Class Members submitted valid claims by the deadline.",
      },
      creditMonitoringAmount: {
        documentName: "Stipulation of Settlement",
        pageNumber: 23,
        quote:
          "One Million Eight Hundred Thousand Dollars ($1,800,000) is designated for credit monitoring services.",
      },
    },
  },
  {
    id: "8",
    name: "Brown v. InsuranceCorp Settlement",
    docketId: "3:2022cv04567",
    court: "N.D. Ill.",
    state: "Illinois",
    year: 2022,
    settlementAmount: 22500000,
    baseSettlementAmount: 20000000,
    contingentSettlementAmount: 2500000,
    isSettlementCapped: false,
    classSize: 5600000,
    isMultiDistrictLitigation: true,
    piiAffected: ["Name", "SSN", "Policy Numbers", "Medical Info"],
    causeOfBreach: "Third-party Vendor",
    classType: ["Consumers"],
    caseType: "Financial Services",
    hasMinorSubclass: false,
    defenseCounsel: "Skadden, Arps, Slate, Meagher & Flom LLP",
    plaintiffCounsel: "Hausfeld LLP",
    judgeName: "Judge David Kim",
    settlementType: "Final",
    date: "2022-10-18",
    summary: "Insurance company data breach through third-party vendor",
    attorneyFeesMethod: "Lodestar",
    attorneyFeesPaidFromFund: true,
    lodestardAmount: 5625000,
    multiplier: 1.0,
    attorneyFeesReimbursement: 400000,
    attorneyFeesReimbursementFromFund: true,
    supplementalReimbursement: 150000,
    classRepServiceAwards: 35000,
    classRepAwardsFromFund: false,
    claimsAdminCosts: 800000,
    claimsAdminCostsFromFund: true,
    baseCashCompensation: 125,
    maxReimbursementOutOfPocket: 5000,
    maxReimbursementDocumentedTime: 2500,
    maxHoursDocumented: 50,
    ratePerHourDocumented: 50,
    allowBothDocAndUndoc: true,
    hasProRataAdjustment: true,
    proRataAmount: 300,
    claimsSubmitted: 1680000,
    claimsSubmittedPercent: 30,
    injunctiveRelief: [
      "Vendor security requirements",
      "Regular audits",
      "Incident response",
      "Employee training",
      "Cloud governance",
    ],
    injunctiveReliefAmount: 5000000,
    thirdPartyAssessments: ["ISO 27001", "SOC 2", "NIST"],
    creditMonitoring: true,
    creditMonitoringAmount: 12000000,
    excessFundsDisposition: "Redistribution",
    citations: {
      settlementAmount: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 16,
        quote:
          "The total monetary value of the Settlement is Twenty-Two Million Five Hundred Thousand Dollars ($22,500,000).",
      },
      classSize: {
        documentName: "Expert Report on Class Size",
        pageNumber: 11,
        quote:
          "Analysis of defendant's databases reveals that 5.6 million unique individuals were affected by the breach.",
      },
      lodestardAmount: {
        documentName: "Declaration in Support of Fee Request",
        pageNumber: 18,
        quote:
          "Counsel's lodestar totals $5,625,000, representing 9,375 hours of attorney and professional time.",
      },
      multiplier: {
        documentName: "Declaration in Support of Fee Request",
        pageNumber: 21,
        quote:
          "Given the exceptional results achieved, a multiplier of 1.0 is requested, resulting in no enhancement.",
      },
      baseCashCompensation: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 25,
        quote:
          "Valid claimants will receive a payment of one hundred twenty-five dollars ($125).",
      },
      claimsSubmitted: {
        documentName: "Final Report of Claims Administrator",
        pageNumber: 4,
        quote:
          "The Claims Administrator received 1,680,000 valid and timely claims.",
      },
      creditMonitoringAmount: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 32,
        quote:
          "Twelve Million Dollars ($12,000,000) shall be allocated to provide credit monitoring to all Settlement Class Members.",
      },
      injunctiveReliefAmount: {
        documentName: "Settlement Agreement and Release",
        pageNumber: 41,
        quote:
          "Defendant shall spend no less than Five Million Dollars ($5,000,000) on the implementation of enhanced security measures.",
      },
    },
  },
];

export const filterOptions = {
  caseTypes: [
    "Data Breach",
    "Healthcare",
    "Financial Services",
    "Retail",
    "Technology",
    "Education",
  ],
  states: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  courts: [
    "S.D.N.Y.",
    "N.D. Cal.",
    "E.D. Tex.",
    "S.D. Fla.",
    "C.D. Cal.",
    "D. Mass.",
    "N.D. Ill.",
    "E.D. Pa.",
    "S.D. Cal.",
    "D.N.J.",
    "E.D.N.Y.",
    "W.D. Tex.",
    "D. Conn.",
    "D. Md.",
  ],
  piiTypes: [
    "Name",
    "Address",
    "Email",
    "Phone",
    "SSN",
    "Payment Info",
    "Medical Records",
    "Insurance Info",
    "Bank Account",
    "Credit Card",
    "Geolocation",
    "Student Records",
    "Policy Numbers",
    "Biometric Data",
  ],
  breachCauses: [
    "Ransomware",
    "Phishing Attack",
    "System Vulnerability",
    "Insider Threat",
    "Payment System Hack",
    "Database Misconfiguration",
    "Third-party Vendor",
    "Malware",
    "Social Engineering",
    "Physical Theft",
  ],
  classTypes: ["Consumers", "Employees", "Patients", "Students", "Businesses"],
  lawFirms: [
    "Williams & Connolly LLP",
    "Gibson, Dunn & Crutcher LLP",
    "Latham & Watkins LLP",
    "King & Spalding LLP",
    "Cravath, Swaine & Moore LLP",
    "O'Melveny & Myers LLP",
    "Ropes & Gray LLP",
    "Skadden, Arps, Slate, Meagher & Flom LLP",
    "Lieff Cabraser Heimann & Bernstein LLP",
    "Hagens Berman Sobol Shapiro LLP",
    "Robbins Geller Rudman & Dowd LLP",
    "Keller Rohrback L.L.P.",
    "Bernstein Litowitz Berger & Grossmann LLP",
    "Milberg Coleman Bryson Phillips Grossman PLLC",
    "Labaton Sucharow LLP",
    "Hausfeld LLP",
  ],
};

export interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  filters: {
    states?: string[];
    courts?: string[];
    yearRange?: [number, number];
    settlementAmountRange?: [number, number];
    classSizeRange?: [number, number];
    piiAffected?: string[];
    causeOfBreach?: string[];
    classType?: string[];
    isMultiDistrictLitigation?: boolean;
    hasMinorSubclass?: boolean;
    settlementType?: string[];
    creditMonitoring?: boolean;
  };
  createdAt: string;
  lastUsed?: string;
  alertEnabled: boolean;
  isShared: boolean;
  createdBy: string;
  matchingCasesCount: number;
}

export const mockSavedSearches: SavedSearch[] = [
  {
    id: "1",
    name: "Data Breach > $10M",
    description: "High-value data breach settlements for precedent analysis",
    filters: {
      settlementAmountRange: [10000000, 100000000],
      causeOfBreach: ["Ransomware", "Phishing Attack", "Third-party Vendor"],
    },
    createdAt: "2024-11-01",
    lastUsed: "2024-12-15",
    alertEnabled: true,
    isShared: false,
    createdBy: "John Doe",
    matchingCasesCount: 4,
  },
  {
    id: "2",
    name: "California Class Actions",
    description: "All class action settlements in California courts",
    filters: {
      states: ["California"],
      classType: ["Consumers"],
    },
    createdAt: "2024-10-15",
    lastUsed: "2024-12-12",
    alertEnabled: false,
    isShared: true,
    createdBy: "Sarah Johnson",
    matchingCasesCount: 3,
  },
  {
    id: "3",
    name: "2024 Settlements",
    description: "Recent settlements from current year",
    filters: {
      yearRange: [2024, 2024],
    },
    createdAt: "2024-01-01",
    lastUsed: "2024-12-10",
    alertEnabled: true,
    isShared: false,
    createdBy: "John Doe",
    matchingCasesCount: 3,
  },
  {
    id: "4",
    name: "Healthcare Data Breaches",
    description: "Medical and healthcare-related privacy settlements",
    filters: {
      classType: ["Patients"],
      piiAffected: ["Medical Records", "Insurance Info"],
    },
    createdAt: "2024-09-20",
    alertEnabled: false,
    isShared: false,
    createdBy: "Michael Chen",
    matchingCasesCount: 1,
  },
];
