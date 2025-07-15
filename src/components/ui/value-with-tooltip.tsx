"use client";

import * as React from "react";
import { CitationTooltip } from "@/components/ui/citation-tooltip";
import { Citation } from "@/lib/mock-data";

interface ValueWithTooltipProps {
  children: React.ReactNode;
  citation?: Citation;
  className?: string;
}

export function ValueWithTooltip({
  children,
  citation,
  className,
}: ValueWithTooltipProps) {
  return (
    <CitationTooltip citation={citation}>
      <span className={className}>{children}</span>
    </CitationTooltip>
  );
}
