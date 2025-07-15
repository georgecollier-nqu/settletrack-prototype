# Changelog

## [Unreleased] - 2025-07-15

### Added

- **Average Payout Per Claimant Statistic**: Added a new statistic in the case search page that calculates and displays the average payout per claimant alongside the existing median settlement amount.

- **Case Type Filter**: Added a new "Case Type" filter with options including "Data Breach", "Healthcare", "Financial Services", "Retail", "Technology", and "Education" to allow filtering cases by industry vertical.

- **Citation Tooltips**: Implemented interactive tooltips on the case detail page that display source document information including:
  - Document name
  - Page number
  - Relevant quote
  - Quick link to view source document

  Citations are available for key data points including settlement amount, class size, attorney fees percentage, base cash compensation, and claims submitted.

- **Multi-Select Component**: Created a new reusable multi-select dropdown component for improved user experience.

### Changed

- **Settlement Type Filter**: Converted the settlement type filter from a tag-based multi-select to a native multi-select dropdown component with options for "Preliminary", "Final", and "Both".

- **Data Analysis Display**: Removed the toggle behavior between case results and data analysis. Both components now display simultaneously on the search page for better data visibility.

- **Responsive Design Improvements**: Enhanced mobile responsiveness across all views including:
  - Adjusted padding and margins for mobile screens
  - Made tab lists wrap on smaller screens
  - Improved grid layouts to stack properly on mobile devices
  - Made stat cards more compact on mobile with smaller text sizes

### Technical Details

- Added `caseType` field to the `Case` interface in mock data
- Added `Citation` and `FieldCitations` interfaces to support citation data
- Created `CitationTooltip` component in `/src/components/ui/citation-tooltip.tsx`
- Created `MultiSelect` component in `/src/components/ui/multi-select.tsx`
- Updated `useStatistics` hook to calculate average payout per claimant
- Enhanced filtering logic to handle "Both" option for settlement types
