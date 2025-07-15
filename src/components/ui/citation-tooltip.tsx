"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Citation } from "@/lib/mock-data";
import { toast } from "sonner";

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
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-0.5 cursor-help underline decoration-dotted underline-offset-4 decoration-muted-foreground/40">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-xs p-4 bg-popover text-popover-foreground border shadow-md"
          align="start"
          sideOffset={5}
        >
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {citation.documentName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Page {citation.pageNumber}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={() => {
                  // Copy citation text to clipboard
                  const citationText = `${citation.documentName}, Page ${citation.pageNumber}: "${citation.quote}"`;
                  navigator.clipboard.writeText(citationText);

                  // Show toast notification
                  toast.success("Citation copied to clipboard", {
                    description: `In a full implementation, this would open ${citation.documentName} and you can search for the copied text to find the relevant section`,
                  });
                }}
              >
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">View source</span>
              </Button>
            </div>

            <blockquote className="text-xs text-muted-foreground border-l-2 pl-2 italic">
              {citation.quote}
            </blockquote>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
