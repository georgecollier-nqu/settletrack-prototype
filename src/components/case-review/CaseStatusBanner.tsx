import React from "react";
import { AlertCircle } from "lucide-react";
import { CaseData } from "@/types/case";

interface CaseStatusBannerProps {
  caseData: CaseData;
}

export function CaseStatusBanner({ caseData }: CaseStatusBannerProps) {
  if (caseData.status !== "flagged") return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
        <div>
          <p className="font-medium text-orange-900">Case Flagged for Review</p>
          <p className="text-sm text-orange-700 mt-1">
            Flagged by {caseData.flaggedBy}: &quot;{caseData.flagReason}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
