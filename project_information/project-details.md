# SettleTrack Project Scope (DRAFT) {#settletrack-project-scope-(draft)}

[SettleTrack Project Scope (DRAFT)](#settletrack-project-scope-\(draft\))

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

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | B-U-01 | As a User, I want to see whether my firm’s subscription is active so that I can be confident the service will keep working. |
| User | B-U-02 | As a User, I want to view my current plan’s limits (e.g. seats, renewal date) so that I understand any usage constraints. |
| Team Leader | B-TL-01 | As a Team Leader, I want to start a firm subscription using a secure checkout so that my firm can gain access. |
| Team Leader | B-TL-02 | As a Team Leader, I want to add or update my firm’s payment card so that billing remains uninterrupted. |
| Team Leader | B-TL-03 | As a Team Leader, I want to download past invoices in PDF format so that my finance team can reconcile expenses. |
| Team Leader | B-TL-04 | As a Team Leader, I want to receive email reminders before renewal or card expiry so that I can act in time. |
| Team Leader | B-TL-05 | As a Team Leader, I want to cancel or pause the subscription from the portal so that we can control spend. |
| Admin | B-A-01 | As an Admin, I want to view a list of all firms with status, MRR and next-charge date so that I can monitor revenue health. |
| Admin | B-A-02 | As an Admin, I want to apply a manual credit, refund or free-trial extension to a firm so that customer-success issues can be resolved quickly. |
| Admin | B-A-03 | As an Admin, I want to be able to restrict certain features to certain plans, as well as specify any usage based limits for the plan (the exact metric TBD) |

---

### Case Processing {#case-processing}

At a high level, processing will be handled mostly through Trigger.dev using the Juriscraper Python client, which will allow us to access the data for each docket.

After downloading the PDFs that we require, all AI-related processing will occur in Bubble. See appendix for full docket processing workflow. 

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | D-U-01 | As a User, I want to flag a casedocket entry that looks incorrect and add contextual notes so that the Admin team can review it. |
| Admin | D-A-01 | As an Admin, I want to paste or upload a newline-separated list of casesettlement docket identifiers so that the system automatically stages data. |
| Admin | D-A-02 | As an Admin, I want to see all pending casesdockets and user-flagged entries in a single queue so that I can approve, edit or remove each item. |

---

### Marketing Pages {#marketing-pages}

| Role | ID | User Story |
| :---- | :---- | :---- |
| Visitor | M-U-01 | As a Visitor, I want to read the public FAQ page so that I understand the product’s value before signing up. |
| Visitor | M-U-02 | As a Visitor, I want to view the Pricing page with clear plan features and a “Book a Demo” CTA so that I know how to get started. |
| Admin | M-A-01 | As an Admin, I want a recorded video walkthrough showing how to safely update public pages in the Bubble editor so that I can make content edits. |

---

### User Management {#user-management}

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | UM-U-01 | As a User, I want to log in with email and password so that I can access my firm’s data. |
| User | UM-U-02 | As a User, I want to reset my password via an emailed link so that I can regain access when I forget credentials. |
| User | UM-U-03 | As a User, I want to update my profile (name, job title, avatar, password) so that my account information stays current. |
| Team Leader | UM-TL-01 | As a Team Leader, I want to bulk-invite new colleagues by email so that I can fill my firm’s seats efficiently. |
| Team Leader | UM-TL-02 | As a Team Leader, I want to deactivate or delete a user so that licences are not wasted. |
| Team Leader | UM-TL-03 | As a Team Leader, I want to promote multiple existing users to the Team Leader role so that I can share admin duties. |
| Admin | UM-A-01 | As an Admin, I want to view all firms and their users in a single table with filters so that I can support accounts at scale. |
| Admin | UM-A-02 | As an Admin, I want to create a firm and seed its first Team Leader manually so that enterprise deals can be onboarded. |
| Admin | UM-A-03 | As an Admin, I want to impersonate any user session with full access so that I can assist with support. |
| Admin | UM-A-04 | As an Admin, I want to bulk import or export user lists in CSV so that migrations are simple. |

---

### Case Searching {#case-searching}

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | CS-U-01 | As a User, I want to filter cases by multiple numeric and text fields (e.g. state, year, settlement amount range, class size) so I can narrow results. |
| User | CS-U-02 | As a User, I want filters to update results immediately so that exploration feels responsive. |
| User | CS-U-03 | As a User, I want to see summary statistics (median, mean, min, max) for my current result set so that I grasp the dataset at a glance. |
| User | CS-U-04 | As a User, I want to export the current result list to CSV so that I can perform offline analysis. |
| User | CS-U-05 | As a User, I want to save a filter set to “My Saved Searches” so that I can revisit frequently used queries. |
| User | CS-U-06 | As a User, I want to click a case row to open its Case Details page in a new tab so that my context is preserved. |

---

### Case Trends {#case-trends}

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | CT-U-01 | As a User, I want to choose a metric (e.g. average payout) and a time grouping (year, month quarter) so that I can see temporal trends. |
| User | CT-U-02 | As a User, I want to apply the same filters as Case Search to the trend chart so that the analysis is consistent. |
| User | CT-U-03 | As a User, I want charts with hover tooltips so that I can inspect individual data points. |

---

### Case Details {#case-details}

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | CD-U-01 | As a User, I want to view all key data points for a case in a tidy layout so that I absorb facts quickly. |
| User | CD-U-02 | As a User, I want to jump to the linked page number in the source PDF that shows a quoted passage so that I can verify accuracy. |
| User | CD-U-03 | As a User, I want “previous/next” navigation between cases in my result list so that I can work sequentially. |
| User | CD-U-04 | As a User, I want to copy a formatted citation to my clipboard so that I can paste it into legal briefs. |
| User | CD-U-05 | As a User, I want to open a side-by-side comparison of up to three cases so that I can evaluate differences quickly. |
| Team Leader | CD-TL-01 | As a Team Leader, I want to leave private notes on a case that are visible only to my firm so that team insights stay centralized. |
| Admin | CD-A-01 | As an Admin, I want to edit or append data fields for an individual case from within the details page so that small fixes are convenient. |

---

### Feedback {#feedback}

| Role | ID | User Story |
| :---- | :---- | :---- |
| User | F-U-01 | As a User, I want a prominent “Report Issue / Suggestion” button so that I can submit feedback with minimal friction. |
| User | F-U-02 | As a User, I want to choose a category (Data Error, Suggestion, Bug, Other) so that my feedback is routed correctly. |
| User | F-U-03 | As a User, I want confirmation that my feedback was received so that I know it will be reviewed. |
| Admin | F-A-01 | As an Admin, I want an inbox of all feedback with filters by status, category, firm and case ID so that nothing is missed. |
| Admin | F-A-02 | As an Admin, I want to assign a feedback item to a colleague and set a due date so that follow-up is owned. |
| Admin | F-A-03 | As an Admin, I want to bulk-update status or category for multiple tickets so that triage is efficient. |
| Admin | F-A-04 | As an Admin, I want to trigger a templated email to the reporter when their ticket is resolved so that communication is consistent. |

## 11\. Appendix: Example Docket Processing Workflow {#11.-appendix:-example-docket-processing-workflow}

This is not necessarily the logic that would be implemented, but illustrates the desired output/

**Data Filters:**

*The user should be able to apply the following filters*:

1. Date  
   1. *Grouped based on dates / ranges (i.e., 2015 OR 2013 \- 2018 OR 2014 \- present)*  
2. Federal Court  
   1. *Choose 1+ from list of federal courts*  
3. Multi-district litigation  
   1. *Yes / no toggle*  
4. Settlement class size  
   1. *Range based on the class sizes in sample set (i.e., \>1M OR 1M-5M OR 5M+)*  
5. Settlement Amount  
   1. *Range based on the sizes we see in sample set*   
6. Personally Identifiable Information (PII) Affected  
   1. *Choose 1+ from list of PII in the dataset (i.e., name, address, geolocation, etc.)*  
7.  Cause of Breach  
   1. *Choose 1+ from the list of causes in the dataset* *(i.e., ransomware, phishing, etc.)*  
8. Class Type  
   1. *Choose 1+ of the following: Consumers, Employees, Businesses, Patients*  
9. Minor Subclass  
   1. *Yes / no toggle*  
10. Defense Counsel  
    1. *Choose 1+ from list of firms in the dataset*  
11. Plaintiff’s Counsel  
    1. *Choose 1+ from list of firms in the dataset*  
12. Individual attorney name  
    1. *Choose 1+ from list of names in the dataset*  
13. Judge Name  
    1. *Choose 1+ from list of names in the dataset*  
14. Preliminary and/or final settlements  
    1. *Choose 1+ of the following: Preliminary, Final*

**Data Output**:

*The following cuts of data should be shown once the user applies their desired filters*

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
7. Average supplemental reimbursement for attorney’s fees/expenses \[$ dollars\]  \[X of XXX\]

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

20. Average total amount allocated for injunctive relief  \[$ dollars\]  
    1. X% frequency employee training required  
    2. X% frequency increased board and/or senior management oversight required  
    3. X% frequency vendor requirements imposed (e.g. vendor training, vendor contract changes)   
    4. X% frequency independent third-party security assessments required  
       1. *Pull out names and frequency of any named 3rd party assessments from the dataset (i.e., NIST, SOC 2, etc.)*  
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
    1. *List but de-dupe from dataset*

**Excess Funds**

23. What happens to excess funds?  
    1. X% frequency Redistribution to claimants   
    2. X% frequency Cy pres  
    3. X% frequency Reversion to defendant

**Sources:**

| Case Name | Docket ID |
| :---- | :---- |
| In re Christie's Data Breach Litigation | 1:2024cv04221 |
| In re Postmeds, Inc. Data Breach Litigation | 4:2023cv05710 |
| Etc… | Etc… |
