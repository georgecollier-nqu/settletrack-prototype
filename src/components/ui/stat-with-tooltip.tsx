"use client";

import * as React from "react";
import { CitationTooltip } from "@/components/ui/citation-tooltip";
import { Citation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface StatWithTooltipProps {
  label: string;
  value: string | number;
  description?: string;
  citation?: Citation;
  className?: string;
  valueClassName?: string;
  documentUrl?: string;
  onViewSource?: () => void;
}

export function StatWithTooltip({
  label,
  value,
  description,
  citation,
  className,
  valueClassName,
  documentUrl,
  onViewSource,
}: StatWithTooltipProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h4 className="font-medium text-sm">{label}</h4>
      <CitationTooltip 
        citation={citation}
        documentUrl={documentUrl}
        onViewSource={onViewSource}
      >
        <p className={cn("text-xl font-semibold", valueClassName)}>{value}</p>
      </CitationTooltip>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
