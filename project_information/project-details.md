# SettleTrack Project Scope (DRAFT) {#settletrack-project-scope-(draft)}

[SettleTrack Project Scope (DRAFT)](<#settletrack-project-scope-(draft)>)

[1\. Introduction](#1.-introduction)

[2\. Features and Functionality](#2.-features-and-functionality)

[Billing](#billing)

[Case Processing](#case-processing)

[Marketing Pages](#marketing-pages)

[User Management](#user-management)

[Case Searching](#case-searching)

[Case Trends](#case-trends)

[Case Details](#case-details)

[Feedback](#feedback)

[3\. Deliverables](#3.-deliverables)

[Bubble Application](#bubble-application)

[Project Delivery Pack](#project-delivery-pack)

[4\. App financials](#4.-app-financials)

[5\. Post-Delivery Support](#5.-post-delivery-support)

[30-Day Bug-Fix Warranty](#30-day-bug-fix-warranty)

[Service Levels and Ongoing Support](#service-levels-and-ongoing-support)

[6\. Payment Schedule](#6.-payment-schedule)

[7\. Project Logistics](#7.-project-logistics)

[7.1 Communication](#7.1-communication)

[7.2 Client Portal](#7.2-client-portal)

[7.3 Client Accounts](#7.3-client-accounts)

[7.4 Change Control](#7.4-change-control)

[7.5 Mutual Expectations](#7.5-mutual-expectations)

[8\. Next Steps](#8.-next-steps)

[9\. Legal](#9.-legal)

[9.1 Governing Law and Jurisdiction](#9.1-governing-law-and-jurisdiction)

[9.2 Intellectual Property Rights](#9.2-intellectual-property-rights)

[9.2.1 Ownership of Deliverables by Client](#9.2.1-ownership-of-deliverables-by-client)

[9.2.2 Bubble.io Platform](#9.2.2-bubble.io-platform)

[9.2.3 Client Data](#9.2.3-client-data)

[9.2.4 Not Quite Unicorns's Pre-existing IP and General Know-How](#9.2.4-not-quite-unicorns's-pre-existing-ip-and-general-know-how)

[9.3 Confidentiality](#9.3-confidentiality)

[9.3.1 Confidential Information](#9.3.1-confidential-information)

[9.3.2 Survival of Confidentiality](#9.3.2-survival-of-confidentiality)

[9.3.3 Exceptions to Confidentiality](#9.3.3-exceptions-to-confidentiality)

[9.4 Limitation of Liability](#9.4-limitation-of-liability)

[9.4.1 Exclusions from Limitation](#9.4.1-exclusions-from-limitation)

[9.4.2 Liability Cap](#9.4.2-liability-cap)

[9.4.3 Excluded Damages](#9.4.3-excluded-damages)

[9.4.4 Third-Party Services](#9.4.4-third-party-services)

[9.4.5 Insurance Cover](#9.4.5-insurance-cover)

[9.4.6 Mutual Indemnity for Intellectual Property Infringement](#9.4.6-mutual-indemnity-for-intellectual-property-infringement)

[9.5 Dispute Resolution](#9.5-dispute-resolution)

[9.5.1 Negotiation](#9.5.1-negotiation)

[9.5.2 Arbitration Agreement](#9.5.2-arbitration-agreement)

[9.5.3 Arbitration Details](#9.5.3-arbitration-details)

[9.5.4 Appointment of Arbitrator](#9.5.4-appointment-of-arbitrator)

[9.5.5 Binding Decision](#9.5.5-binding-decision)

[9.6 Termination](#9.6-termination)

[9.6.1 Grounds for Termination](#9.6.1-grounds-for-termination)

[9.6.2 Effects of Termination](#9.6.2-effects-of-termination)

[9.7 Force Majeure](#9.7-force-majeure)

[9.8 Entire Agreement](#9.8-entire-agreement)

[9.9 Variation](#9.9-variation)

[9.10 Severance](#9.10-severance)

[9.11 No Partnership or Agency](#9.11-no-partnership-or-agency)

[9.12 Third Party Rights](#9.12-third-party-rights)

[9.13 Notices](#9.13-notices)

[9.14 Agreement and Acceptance](#9.14-agreement-and-acceptance)

[9.14.1 Effective Date](#9.14.1-effective-date)

[9.14.2 Acknowledgment](#9.14.2-acknowledgment)

[10\. Data Protection & Security](#10.-data-protection-&-security)

[10.1 Compliance with UK and EU GDPR](#10.1-compliance-with-uk-and-eu-gdpr)

[10.2 Security Measures](#10.2-security-measures)

[11\. Appendix: Docket Processing Workflow](#11.-appendix:-example-docket-processing-workflow)

# 1\. Introduction {#1.-introduction}

SettleTrack is a platform with a database of legal dockets that have been processed into structured data. This allows law firms to explore, query, filter, and benefit from the ability to more accurately predict estimated settlement amounts based on judicial precedent.

The website will be built using Bubble, to allow for a rapid go-to-market launch and reliable and scaleable ongoing development. Best practices and industry-standard development and design guidelines will be followed by Not Quite Unicorns to ensure an easily maintainable app that can act as a foundation to build upon in future without significant rebuilds being required.

# 2\. Features and Functionality {#2.-features-and-functionality}

We define the project in terms of user stories rather than specific designs or flows. This is aligned with our philosophy on focusing on solving the business problem rather than the technical implementation.

It is the technical implementation that we can handle and want to ensure that it is executed correctly during development. Project success, therefore, is defined by how well we can execute the user story intuitively, quickly, and efficiently.

### Billing {#billing}

| Role        | ID      | User Story                                                                                                                                                  |
| :---------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User        | B-U-01  | As a User, I want to see whether my firm’s subscription is active so that I can be confident the service will keep working.                                 |
| User        | B-U-02  | As a User, I want to view my current plan’s limits (e.g. seats, renewal date) so that I understand any usage constraints.                                   |
| Team Leader | B-TL-01 | As a Team Leader, I want to start a firm subscription using a secure checkout so that my firm can gain access.                                              |
| Team Leader | B-TL-02 | As a Team Leader, I want to add or update my firm’s payment card so that billing remains uninterrupted.                                                     |
| Team Leader | B-TL-03 | As a Team Leader, I want to download past invoices in PDF format so that my finance team can reconcile expenses.                                            |
| Team Leader | B-TL-04 | As a Team Leader, I want to receive email reminders before renewal or card expiry so that I can act in time.                                                |
| Team Leader | B-TL-05 | As a Team Leader, I want to cancel or pause the subscription from the portal so that we can control spend.                                                  |
| Admin       | B-A-01  | As an Admin, I want to view a list of all firms with status, MRR and next-charge date so that I can monitor revenue health.                                 |
| Admin       | B-A-02  | As an Admin, I want to apply a manual credit, refund or free-trial extension to a firm so that customer-success issues can be resolved quickly.             |
| Admin       | B-A-03  | As an Admin, I want to be able to restrict certain features to certain plans, as well as specify any usage based limits for the plan (the exact metric TBD) |

---

### Case Processing {#case-processing}

At a high level, processing will be handled mostly through Trigger.dev using the Juriscraper Python client, which will allow us to access the data for each docket.

After downloading the PDFs that we require, all AI-related processing will occur in Bubble. See appendix for full docket processing workflow.

| Role  | ID     | User Story                                                                                                                                         |
| :---- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| User  | D-U-01 | As a User, I want to flag a casedocket entry that looks incorrect and add contextual notes so that the Admin team can review it.                   |
| Admin | D-A-01 | As an Admin, I want to paste or upload a newline-separated list of casesettlement docket identifiers so that the system automatically stages data. |
| Admin | D-A-02 | As an Admin, I want to see all pending casesdockets and user-flagged entries in a single queue so that I can approve, edit or remove each item.    |

---

### Marketing Pages {#marketing-pages}

| Role    | ID     | User Story                                                                                                                                        |
| :------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Visitor | M-U-01 | As a Visitor, I want to read the public FAQ page so that I understand the product’s value before signing up.                                      |
| Visitor | M-U-02 | As a Visitor, I want to view the Pricing page with clear plan features and a “Book a Demo” CTA so that I know how to get started.                 |
| Admin   | M-A-01 | As an Admin, I want a recorded video walkthrough showing how to safely update public pages in the Bubble editor so that I can make content edits. |

---

### User Management {#user-management}

| Role        | ID       | User Story                                                                                                                    |
| :---------- | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| User        | UM-U-01  | As a User, I want to log in with email and password so that I can access my firm’s data.                                      |
| User        | UM-U-02  | As a User, I want to reset my password via an emailed link so that I can regain access when I forget credentials.             |
| User        | UM-U-03  | As a User, I want to update my profile (name, job title, avatar, password) so that my account information stays current.      |
| Team Leader | UM-TL-01 | As a Team Leader, I want to bulk-invite new colleagues by email so that I can fill my firm’s seats efficiently.               |
| Team Leader | UM-TL-02 | As a Team Leader, I want to deactivate or delete a user so that licences are not wasted.                                      |
| Team Leader | UM-TL-03 | As a Team Leader, I want to promote multiple existing users to the Team Leader role so that I can share admin duties.         |
| Admin       | UM-A-01  | As an Admin, I want to view all firms and their users in a single table with filters so that I can support accounts at scale. |
| Admin       | UM-A-02  | As an Admin, I want to create a firm and seed its first Team Leader manually so that enterprise deals can be onboarded.       |
| Admin       | UM-A-03  | As an Admin, I want to impersonate any user session with full access so that I can assist with support.                       |
| Admin       | UM-A-04  | As an Admin, I want to bulk import or export user lists in CSV so that migrations are simple.                                 |

---

### Case Searching {#case-searching}

| Role | ID      | User Story                                                                                                                                             |
| :--- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| User | CS-U-01 | As a User, I want to filter cases by multiple numeric and text fields (e.g. state, year, settlement amount range, class size) so I can narrow results. |
| User | CS-U-02 | As a User, I want filters to update results immediately so that exploration feels responsive.                                                          |
| User | CS-U-03 | As a User, I want to see summary statistics (median, mean, min, max) for my current result set so that I grasp the dataset at a glance.                |
| User | CS-U-04 | As a User, I want to export the current result list to CSV so that I can perform offline analysis.                                                     |
| User | CS-U-05 | As a User, I want to save a filter set to “My Saved Searches” so that I can revisit frequently used queries.                                           |
| User | CS-U-06 | As a User, I want to click a case row to open its Case Details page in a new tab so that my context is preserved.                                      |

---

### Case Trends {#case-trends}

| Role | ID      | User Story                                                                                                                              |
| :--- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| User | CT-U-01 | As a User, I want to choose a metric (e.g. average payout) and a time grouping (year, month quarter) so that I can see temporal trends. |
| User | CT-U-02 | As a User, I want to apply the same filters as Case Search to the trend chart so that the analysis is consistent.                       |
| User | CT-U-03 | As a User, I want charts with hover tooltips so that I can inspect individual data points.                                              |

---

### Case Details {#case-details}

| Role        | ID       | User Story                                                                                                                                |
| :---------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| User        | CD-U-01  | As a User, I want to view all key data points for a case in a tidy layout so that I absorb facts quickly.                                 |
| User        | CD-U-02  | As a User, I want to jump to the linked page number in the source PDF that shows a quoted passage so that I can verify accuracy.          |
| User        | CD-U-03  | As a User, I want “previous/next” navigation between cases in my result list so that I can work sequentially.                             |
| User        | CD-U-04  | As a User, I want to copy a formatted citation to my clipboard so that I can paste it into legal briefs.                                  |
| User        | CD-U-05  | As a User, I want to open a side-by-side comparison of up to three cases so that I can evaluate differences quickly.                      |
| Team Leader | CD-TL-01 | As a Team Leader, I want to leave private notes on a case that are visible only to my firm so that team insights stay centralized.        |
| Admin       | CD-A-01  | As an Admin, I want to edit or append data fields for an individual case from within the details page so that small fixes are convenient. |

---

### Feedback {#feedback}

| Role  | ID     | User Story                                                                                                                          |
| :---- | :----- | :---------------------------------------------------------------------------------------------------------------------------------- |
| User  | F-U-01 | As a User, I want a prominent “Report Issue / Suggestion” button so that I can submit feedback with minimal friction.               |
| User  | F-U-02 | As a User, I want to choose a category (Data Error, Suggestion, Bug, Other) so that my feedback is routed correctly.                |
| User  | F-U-03 | As a User, I want confirmation that my feedback was received so that I know it will be reviewed.                                    |
| Admin | F-A-01 | As an Admin, I want an inbox of all feedback with filters by status, category, firm and case ID so that nothing is missed.          |
| Admin | F-A-02 | As an Admin, I want to assign a feedback item to a colleague and set a due date so that follow-up is owned.                         |
| Admin | F-A-03 | As an Admin, I want to bulk-update status or category for multiple tickets so that triage is efficient.                             |
| Admin | F-A-04 | As an Admin, I want to trigger a templated email to the reporter when their ticket is resolved so that communication is consistent. |

## 11\. Appendix: Example Docket Processing Workflow {#11.-appendix:-example-docket-processing-workflow}

This is not necessarily the logic that would be implemented, but illustrates the desired output/

**Data Filters:**

_The user should be able to apply the following filters_:

1. Date
   1. _Grouped based on dates / ranges (i.e., 2015 OR 2013 \- 2018 OR 2014 \- present)_
2. Federal Court
   1. _Choose 1+ from list of federal courts_
3. Multi-district litigation
   1. _Yes / no toggle_
4. Settlement class size
   1. _Range based on the class sizes in sample set (i.e., \>1M OR 1M-5M OR 5M+)_
5. Settlement Amount
   1. _Range based on the sizes we see in sample set_
6. Personally Identifiable Information (PII) Affected
   1. _Choose 1+ from list of PII in the dataset (i.e., name, address, geolocation, etc.)_
7. Cause of Breach
8. _Choose 1+ from the list of causes in the dataset_ _(i.e., ransomware, phishing, etc.)_
9. Class Type
   1. _Choose 1+ of the following: Consumers, Employees, Businesses, Patients_
10. Minor Subclass
    1. _Yes / no toggle_
11. Defense Counsel
    1. _Choose 1+ from list of firms in the dataset_
12. Plaintiff’s Counsel
    1. _Choose 1+ from list of firms in the dataset_
13. Individual attorney name
    1. _Choose 1+ from list of names in the dataset_
14. Judge Name
    1. _Choose 1+ from list of names in the dataset_
15. Preliminary and/or final settlements
    1. _Choose 1+ of the following: Preliminary, Final_

**Data Output**:

_The following cuts of data should be shown once the user applies their desired filters_

The statistics below were drawn from a set of \[XX\] applicable cases.

**Settlement Fund**

1. Average gross settlement fund amount \[$ dollars\]
   1. Average base settlement fund amount \[$ dollars\]
   2. Average additional contingent settlement fund amount \[$ dollars\]
2. Is the gross settlement fund amount unspecified and/or uncapped?
   1. X% frequency Yes
   2. X% frequency No

**Attorney’s Fees**

3. Are the attorney’s fees paid out of the total settlement fund?
   1. X% frequency Yes
   2. X% frequency No
4. Primary method for calculating attorney’s fees
   1. X% frequency Percentage of the Fund
      1. Average percentage \[%\]
   2. X% frequency Lodestar with Multiplier
      1. Average lodestar \[$ dollars\]
      2. Average multiplier \[\#\]
5. Average reimbursement for attorney’s fees/expenses \[$ dollars\]
6. Is the reimbursement for attorney’s fees/expenses paid out of the total settlement fund?
   1. X% frequency Yes
   2. X% frequency No
7. Average supplemental reimbursement for attorney’s fees/expenses \[$ dollars\] \[X of XXX\]

**Class Representatives**

8. Average Class representative service awards per named plaintiff \[$ dollars\]
9. Are the class representative service awards paid out of the total settlement fund?
   1. X% frequency Yes
   2. X% frequency No

**Claims Administration Costs**

10. Average claims administration costs \[$ dollars\]
11. Are the claims administration costs paid out of the total settlement fund?
    1. X% frequency Yes
    2. X% frequency No

**Individual Reimbursements**

12. Average base cash compensation for submitting a claim \[$ dollars\] \[X of XXX\]
13. Average max reimbursement per individual for out of pocket costs \[$ dollars\]
14. Average max reimbursement per individual for documented time spent \[$ dollars\]
    1. Average max hours reimbursed per individual for documented time spent \[\# hours\]
    2. Average rate per hour reimbursed per individual for documented time spent \[$ dollars\]
15. Average max reimbursement per individual specifically for undocumented, attested or self-certified costs \[$ dollars\]
    1. Average max hours reimbursed per individual for undocumented time spent \[\# hours\]
    2. Average rate per hour reimbursed per individual for undocumented time spent \[$ dollars\]

16. Can the same claimant be reimbursed for both documented and undocumented costs? (yes/no)
    1. X% frequency Yes
    2. X% frequency No

17. Does the settlement provide for a pro rata adjustment of the settlement amount?
    1. X% frequency Yes
    2. X% frequency No
    3. Average pro rata adjustment \[$ dollars\]

**Class Members**

18. Average number of class members that submitted claims in this settlement? \[\#\]
19. Average number of class members that submitted claims in this settlement? \[%\]

**Injunctive Relief**

20. Average total amount allocated for injunctive relief \[$ dollars\]
    1. X% frequency employee training required
    2. X% frequency increased board and/or senior management oversight required
    3. X% frequency vendor requirements imposed (e.g. vendor training, vendor contract changes)
    4. X% frequency independent third-party security assessments required
       1. _Pull out names and frequency of any named 3rd party assessments from the dataset (i.e., NIST, SOC 2, etc.)_
    5. X% frequency multi-factor authentication required
    6. X% frequency cloud governance changes required
    7. X% frequency vulnerability scanning & penetration testing required
    8. X% frequency data encryption required
    9. X% frequency data deletion and minimization required

21. Is credit monitoring / identity theft protection offered?
    1. X% frequency Yes
    2. X% frequency No
    3. Average amount spent on credit monitoring \[$ dollars\]

22. Other injunctive relief mentioned
    1. _List but de-dupe from dataset_

**Excess Funds**

23. What happens to excess funds?
    1. X% frequency Redistribution to claimants
    2. X% frequency Cy pres
    3. X% frequency Reversion to defendant

**Sources:**

| Case Name                                   | Docket ID     |
| :------------------------------------------ | :------------ |
| In re Christie's Data Breach Litigation     | 1:2024cv04221 |
| In re Postmeds, Inc. Data Breach Litigation | 4:2023cv05710 |
| Etc…                                        | Etc…          |

# SettleTrack Case Data Schema and Calculations

## Case Data Fields

### Basic Information

| Field          | Type                     | Description                      |
| -------------- | ------------------------ | -------------------------------- |
| id             | string                   | Unique identifier for the case   |
| name           | string                   | Case name/title                  |
| docketId       | string                   | Court docket number              |
| court          | string                   | Federal court (e.g., "S.D.N.Y.") |
| state          | string                   | State where case was filed       |
| year           | number                   | Year of settlement               |
| date           | string                   | Settlement date (ISO format)     |
| summary        | string                   | Brief case description           |
| judgeName      | string                   | Presiding judge name             |
| settlementType | "Preliminary" \| "Final" | Type of settlement               |

### Financial Fields

| Field                      | Type                | Description                     |
| -------------------------- | ------------------- | ------------------------------- |
| settlementAmount           | number              | Total gross settlement amount   |
| baseSettlementAmount       | number \| undefined | Base settlement component       |
| contingentSettlementAmount | number \| undefined | Contingent settlement component |
| isSettlementCapped         | boolean             | Whether settlement has a cap    |

### Attorney Fees

| Field                             | Type                       | Description                       |
| --------------------------------- | -------------------------- | --------------------------------- |
| attorneyFeesMethod                | "Percentage" \| "Lodestar" | Fee calculation method            |
| attorneyFeesPercentage            | number \| undefined        | Percentage for percentage method  |
| attorneyFeesPaidFromFund          | boolean                    | If fees paid from settlement fund |
| lodestardAmount                   | number \| undefined        | Base lodestar amount              |
| multiplier                        | number \| undefined        | Lodestar multiplier               |
| attorneyFeesReimbursement         | number \| undefined        | Additional fee reimbursement      |
| attorneyFeesReimbursementFromFund | boolean                    | If reimbursement from fund        |

### Class Information

| Field                     | Type     | Description                |
| ------------------------- | -------- | -------------------------- |
| classSize                 | number   | Total affected individuals |
| classType                 | string[] | Types of class members     |
| hasMinorSubclass          | boolean  | If includes minor subclass |
| isMultiDistrictLitigation | boolean  | MDL status                 |

### Claims Data

| Field                    | Type                | Description                       |
| ------------------------ | ------------------- | --------------------------------- |
| claimsSubmitted          | number              | Number of claims filed            |
| claimsSubmittedPercent   | number              | Percentage of class filing claims |
| claimsAdminCosts         | number \| undefined | Claims administration costs       |
| claimsAdminCostsFromFund | boolean             | If admin costs from fund          |

### Individual Compensation

| Field                          | Type                | Description                      |
| ------------------------------ | ------------------- | -------------------------------- |
| baseCashCompensation           | number \| undefined | Base cash per claimant           |
| maxReimbursementOutOfPocket    | number \| undefined | Max out-of-pocket reimbursement  |
| maxReimbursementDocumentedTime | number \| undefined | Max for documented time          |
| maxHoursDocumented             | number \| undefined | Max documented hours             |
| ratePerHourDocumented          | number \| undefined | Rate per documented hour         |
| maxReimbursementUndocumented   | number \| undefined | Max for undocumented time        |
| maxHoursUndocumented           | number \| undefined | Max undocumented hours           |
| ratePerHourUndocumented        | number \| undefined | Rate per undocumented hour       |
| allowBothDocAndUndoc           | boolean             | If both types allowed            |
| hasProRataAdjustment           | boolean             | If pro rata adjustment available |
| proRataAmount                  | number \| undefined | Pro rata amount                  |
| supplementalReimbursement      | number \| undefined | Additional reimbursement         |

### Class Representative Awards

| Field                  | Type                | Description           |
| ---------------------- | ------------------- | --------------------- |
| classRepServiceAwards  | number \| undefined | Service awards amount |
| classRepAwardsFromFund | boolean             | If awards from fund   |

### Breach Information

| Field         | Type     | Description              |
| ------------- | -------- | ------------------------ |
| piiAffected   | string[] | Types of PII compromised |
| causeOfBreach | string   | Primary breach cause     |

### Parties

| Field            | Type   | Description        |
| ---------------- | ------ | ------------------ |
| defenseCounsel   | string | Defense law firm   |
| plaintiffCounsel | string | Plaintiff law firm |

### Injunctive Relief

| Field                  | Type                  | Description                   |
| ---------------------- | --------------------- | ----------------------------- |
| injunctiveRelief       | string[]              | List of relief measures       |
| injunctiveReliefAmount | number \| undefined   | Total injunctive relief value |
| thirdPartyAssessments  | string[] \| undefined | Required assessments          |

### Additional Benefits

| Field                  | Type                                                      | Description                  |
| ---------------------- | --------------------------------------------------------- | ---------------------------- |
| creditMonitoring       | boolean                                                   | If credit monitoring offered |
| creditMonitoringAmount | number \| undefined                                       | Credit monitoring allocation |
| excessFundsDisposition | "Redistribution" \| "Cy pres" \| "Reversion" \| undefined | Excess funds handling        |

## Calculations Performed

### Settlement Fund Statistics

1. **Average Gross Settlement**: Mean of all settlementAmount values
2. **% of Settlements Uncapped**: Percentage where isSettlementCapped = false
3. **Average Base Settlement**: Mean of baseSettlementAmount (excluding undefined)
4. **Average Contingent Settlement**: Mean of contingentSettlementAmount (excluding undefined)

### Attorney Fees Analysis

1. **% Using Percentage Method**: Percentage where attorneyFeesMethod = "Percentage"
2. **% Using Lodestar Method**: Percentage where attorneyFeesMethod = "Lodestar"
3. **Average Percentage Fee**: Mean of attorneyFeesPercentage for percentage method cases
4. **Average Lodestar Amount**: Mean of lodestardAmount for lodestar cases
5. **Average Multiplier**: Mean of multiplier for lodestar cases
6. **% Paid from Fund**: Percentage where attorneyFeesPaidFromFund = true
7. **Average Reimbursement**: Mean of attorneyFeesReimbursement (excluding undefined)
8. **% Reimbursement from Fund**: Percentage where attorneyFeesReimbursementFromFund = true

### Class and Claims Metrics

1. **Total Affected Individuals**: Sum of all classSize values
2. **Average Class Size**: Mean of classSize values
3. **Average Claims Submitted**: Mean of claimsSubmitted values
4. **Average Claims Rate**: Mean of claimsSubmittedPercent values
5. **% MDL Cases**: Percentage where isMultiDistrictLitigation = true
6. **% with Minor Subclass**: Percentage where hasMinorSubclass = true
7. **Average Admin Costs**: Mean of claimsAdminCosts (excluding undefined)
8. **% Admin from Fund**: Percentage where claimsAdminCostsFromFund = true

### Individual Reimbursements

1. **Average Base Cash**: Mean of baseCashCompensation (excluding undefined)
2. **% with Base Cash**: Percentage of cases with defined baseCashCompensation
3. **Average Out-of-Pocket Max**: Mean of maxReimbursementOutOfPocket (excluding undefined)
4. **Average Documented Time Max**: Mean of maxReimbursementDocumentedTime (excluding undefined)
5. **Average Undocumented Max**: Mean of maxReimbursementUndocumented (excluding undefined)
6. **% Allow Both Doc/Undoc**: Percentage where allowBothDocAndUndoc = true
7. **% with Pro Rata**: Percentage where hasProRataAdjustment = true
8. **Average Pro Rata Amount**: Mean of proRataAmount (excluding undefined)
9. **Average Supplemental**: Mean of supplementalReimbursement (excluding undefined)
10. **% with Supplemental**: Percentage of cases with defined supplementalReimbursement

### Injunctive Relief Analysis

1. **Employee Training Frequency**: Count of cases with "employee training" in injunctiveRelief
2. **Board Oversight Frequency**: Count of cases with "board" or "management" in injunctiveRelief
3. **Vendor Requirements Frequency**: Count of cases with "vendor" in injunctiveRelief
4. **Security Assessments Frequency**: Count of cases with "assessment" or "audit" in injunctiveRelief
5. **Average Relief Amount**: Mean of injunctiveReliefAmount (excluding undefined)
6. **Third-Party Assessment Frequencies**: Count by assessment type (SOC 2, NIST, ISO 27001, etc.)

### Excess Funds Analysis

1. **Redistribution Frequency**: Percentage where excessFundsDisposition = "Redistribution"
2. **Cy Pres Frequency**: Percentage where excessFundsDisposition = "Cy pres"
3. **Reversion Frequency**: Percentage where excessFundsDisposition = "Reversion"

### Class Representative Awards

1. **Average Service Awards**: Mean of classRepServiceAwards (excluding undefined)
2. **% Awards from Fund**: Percentage where classRepAwardsFromFund = true

### Additional Benefits

1. **% with Credit Monitoring**: Percentage where creditMonitoring = true
2. **Average Credit Monitoring Amount**: Mean of creditMonitoringAmount (excluding undefined)

### Source Document Analysis

1. **Preliminary Settlement Count**: Count where settlementType = "Preliminary"
2. **Final Settlement Count**: Count where settlementType = "Final"
3. **Cases by Federal Court**: Count grouped by court value
4. **Cases by State**: Count grouped by state value
5. **Cases by Year**: Count grouped by year value
6. **Cases by Breach Cause**: Count grouped by causeOfBreach value
7. **Cases by Class Type**: Count for each unique value in classType arrays

## Data Type Summary

### Numeric Fields (20 fields)

- settlementAmount, baseSettlementAmount, contingentSettlementAmount
- attorneyFeesPercentage, lodestardAmount, multiplier, attorneyFeesReimbursement
- classSize, claimsSubmitted, claimsSubmittedPercent, claimsAdminCosts
- baseCashCompensation, all reimbursement amounts and rates
- classRepServiceAwards, injunctiveReliefAmount, creditMonitoringAmount
- proRataAmount, supplementalReimbursement, year

### Boolean Fields (12 fields)

- isSettlementCapped, attorneyFeesPaidFromFund, attorneyFeesReimbursementFromFund
- isMultiDistrictLitigation, hasMinorSubclass, classRepAwardsFromFund
- claimsAdminCostsFromFund, allowBothDocAndUndoc, hasProRataAdjustment
- creditMonitoring

### String Fields (9 fields)

- id, name, docketId, court, state, date, summary
- causeOfBreach, defenseCounsel, plaintiffCounsel, judgeName

### Enum Fields (3 fields)

- settlementType: "Preliminary" | "Final"
- attorneyFeesMethod: "Percentage" | "Lodestar"
- excessFundsDisposition: "Redistribution" | "Cy pres" | "Reversion" | undefined

### Array Fields (4 fields)

- piiAffected: string[]
- classType: string[]
- injunctiveRelief: string[]
- thirdPartyAssessments: string[] | undefined

## Total: 48 fields per case record
