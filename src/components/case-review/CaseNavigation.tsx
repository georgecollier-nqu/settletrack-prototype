import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function CaseNavigation({ onPrevious, onNext }: CaseNavigationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onPrevious}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={onNext}>
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
