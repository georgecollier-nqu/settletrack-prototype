import React from "react";
import { CaseData } from "@/types/case";
import { CaseNavigation } from "./CaseNavigation";

interface CaseTitleSectionProps {
  caseData: CaseData;
  onPrevious: () => void;
  onNext: () => void;
}

export function CaseTitleSection({
  caseData,
  onPrevious,
  onNext,
}: CaseTitleSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif font-bold">
          QC Review: {caseData.id.value}
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          {caseData.name.value}
        </p>
      </div>
      <CaseNavigation onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
}
