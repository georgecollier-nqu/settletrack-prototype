"use client";

import * as React from "react";
import { CitationTooltip } from "@/components/ui/citation-tooltip";
import { Citation } from "@/lib/mock-data";

interface ValueWithTooltipProps {
  children: React.ReactNode;
  citation?: Citation;
  className?: string;
  documentUrl?: string;
  onViewSource?: () => void;
}

export function ValueWithTooltip({
  children,
  citation,
  className,
  documentUrl,
  onViewSource,
}: ValueWithTooltipProps) {
  return (
    <CitationTooltip 
      citation={citation}
      documentUrl={documentUrl}
      onViewSource={onViewSource}
    >
      <span className={className}>{children}</span>
    </CitationTooltip>
  );
}
