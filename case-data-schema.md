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
