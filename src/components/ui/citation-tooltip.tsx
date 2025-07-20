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
import { PDFViewer } from "@/components/pdf-viewer/pdf-viewer";

interface CitationTooltipProps {
  citation?: Citation;
  children: React.ReactNode;
  documentUrl?: string;
  onViewSource?: () => void;
}

export function CitationTooltip({ citation, children, documentUrl, onViewSource }: CitationTooltipProps) {
  const [pdfViewerOpen, setPdfViewerOpen] = React.useState(false);
  
  if (!citation) {
    return <>{children}</>;
  }

  const handleViewSource = () => {
    if (onViewSource) {
      onViewSource();
    } else if (documentUrl) {
      setPdfViewerOpen(true);
    } else {
      // Fallback: Copy citation and show notification
      const citationText = `${citation.documentName}, Page ${citation.pageNumber}: "${citation.quote}"`;
      navigator.clipboard.writeText(citationText);
      toast.success("Citation copied to clipboard", {
        description: "PDF viewer will be available soon",
      });
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <span 
              className="inline-flex items-center gap-0.5 cursor-pointer underline decoration-dotted underline-offset-4 decoration-muted-foreground/40 hover:decoration-primary transition-colors"
              onClick={handleViewSource}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewSource();
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="sr-only">View source</span>
                </Button>
              </div>

              <blockquote className="text-xs text-muted-foreground border-l-2 pl-2 italic">
                {citation.quote}
              </blockquote>
              
              <p className="text-xs text-muted-foreground">
                Click to view source document
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {documentUrl && (
        <PDFViewer
          open={pdfViewerOpen}
          onOpenChange={setPdfViewerOpen}
          documentUrl={documentUrl}
          documentName={citation.documentName}
          initialPage={citation.pageNumber}
          highlightText={citation.quote}
        />
      )}
    </>
  );
}
