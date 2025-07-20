import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface DefinitionTooltipProps {
  term: string;
  definition: string;
  className?: string;
}

// Common settlement terminology definitions
export const settlementDefinitions = {
  "Base Settlement Amount": "The guaranteed minimum amount that will be distributed to class members, regardless of participation rate or other contingencies.",
  "Contingent Settlement": "Additional funds that may be added to the settlement based on specific conditions being met, such as participation thresholds or claim submission rates.",
  "Individual Payout": "The estimated or actual amount each class member will receive from the settlement fund after deductions for fees and administrative costs.",
  "Injunctive Relief": "Non-monetary remedies ordered by the court, such as requiring the defendant to change business practices, improve security measures, or cease certain activities.",
  "Attorney's Fees": "Compensation paid to the lawyers representing the class, typically calculated as a percentage of the settlement fund or using the lodestar method (hours worked × hourly rate).",
  "Other Compensation": "Additional benefits provided to class members beyond cash payments, such as credit monitoring services, identity theft insurance, or product discounts.",
  "Cy Pres": "Distribution of unclaimed settlement funds to charitable organizations whose work aligns with the interests of the class members.",
  "Excess Funds Disposition": "The court-approved method for handling settlement money that remains unclaimed after the distribution period ends.",
  "Claims Rate": "The percentage of eligible class members who submit valid claims for compensation from the settlement fund.",
  "Lodestar Method": "A method of calculating attorney's fees based on the number of hours worked multiplied by a reasonable hourly rate, sometimes adjusted by a multiplier.",
  "Percentage Method": "A method of calculating attorney's fees as a fixed percentage of the total settlement fund, typically ranging from 25-33%.",
  "Class Size": "The total number of individuals or entities who are members of the class and eligible to receive compensation from the settlement.",
  "MDL": "Multi-District Litigation - a procedure to consolidate multiple related federal civil cases from different districts before one judge for pretrial proceedings.",
  "Final Settlement": "A settlement that has received final approval from the court and is no longer subject to appeal or modification.",
  "Preliminary Settlement": "An initial agreement between parties that requires court approval and may be subject to modifications based on class member objections or court concerns.",
};

export function DefinitionTooltip({
  term,
  definition,
  className = "",
}: DefinitionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors ${className}`}
            onClick={(e) => e.preventDefault()}
          >
            <HelpCircle className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold text-sm">{term}</p>
            <p className="text-xs text-muted-foreground">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Convenience component for inline term with definition
export function TermWithDefinition({
  term,
  children,
  className = "",
}: {
  term: string;
  children: React.ReactNode;
  className?: string;
}) {
  const definition = settlementDefinitions[term as keyof typeof settlementDefinitions];
  
  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {children}
      <DefinitionTooltip term={term} definition={definition} />
    </span>
  );
}