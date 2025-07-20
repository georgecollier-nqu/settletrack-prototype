"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface CaseHeaderProps {
  caseId: string;
  caseName: string;
}

export function CaseHeader({ caseId, caseName }: CaseHeaderProps) {
  const router = useRouter();

  return (
    <>
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/cases")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cases
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">
              QC Review: {caseId}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{caseName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}