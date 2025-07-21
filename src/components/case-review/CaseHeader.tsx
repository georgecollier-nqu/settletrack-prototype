import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function CaseHeader() {
  const router = useRouter();

  return (
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
  );
}
