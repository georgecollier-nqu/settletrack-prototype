"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bug } from "lucide-react"
import { ReportIssueDialog } from "./report-issue-dialog"
import { cn } from "@/lib/utils"

interface ReportIssueButtonProps {
  caseId: string
  fieldPath?: string
  currentValue?: string
  className?: string
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function ReportIssueButton({
  caseId,
  fieldPath,
  currentValue,
  className,
  variant = "ghost",
  size = "sm",
  showLabel = true
}: ReportIssueButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn("gap-2", className)}
        onClick={() => setDialogOpen(true)}
        title="Report an issue with this data"
      >
        <Bug className="h-4 w-4" />
        {showLabel && <span>Report Issue</span>}
      </Button>

      <ReportIssueDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        caseId={caseId}
        fieldPath={fieldPath}
        currentValue={currentValue}
      />
    </>
  )
}