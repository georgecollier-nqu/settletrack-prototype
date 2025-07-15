"use client";

import * as React from "react";
import { Info, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Citation } from "@/lib/mock-data";

interface CitationTooltipProps {
  citation?: Citation;
  children: React.ReactNode;
}

export function CitationTooltip({ citation, children }: CitationTooltipProps) {
  if (!citation) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-0" align="start">
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium text-sm">Source Citation</h4>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs"
                onClick={() => {
                  // In a real app, this would open the document
                  console.log(
                    `Opening ${citation.documentName} at page ${citation.pageNumber}`,
                  );
                }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <span className="font-medium text-muted-foreground">
                  Document:
                </span>
                <p className="text-foreground">{citation.documentName}</p>
              </div>

              <div>
                <span className="font-medium text-muted-foreground">Page:</span>
                <span className="text-foreground ml-1">
                  {citation.pageNumber}
                </span>
              </div>

              <div>
                <span className="font-medium text-muted-foreground">
                  Quote:
                </span>
                <p className="text-foreground italic mt-1 text-xs leading-relaxed">
                  &ldquo;{citation.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
