"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Bug, Loader2 } from "lucide-react"

interface ReportIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  caseId: string
  fieldPath?: string
  currentValue?: string
}

export function ReportIssueDialog({
  open,
  onOpenChange,
  caseId,
  fieldPath = "",
  currentValue = ""
}: ReportIssueDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    issueType: "",
    fieldPath: fieldPath,
    currentValue: currentValue,
    description: "",
    suggestedValue: "",
    email: ""
  })

  const handleSubmit = async () => {
    if (!formData.issueType || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please select an issue type and provide a description",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/bug-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseId,
          issueType: formData.issueType,
          fieldPath: formData.fieldPath || 'general',
          currentValue: formData.currentValue || 'N/A',
          suggestedValue: formData.suggestedValue,
          description: formData.description,
          email: formData.email
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Issue Reported Successfully",
          description: "Thank you for helping improve our data quality. We'll review your report shortly.",
        })
        
        onOpenChange(false)
        setFormData({
          issueType: "",
          fieldPath: "",
          currentValue: "",
          description: "",
          suggestedValue: "",
          email: ""
        })
      } else {
        throw new Error(result.message || 'Failed to submit report')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit issue report. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Report Data Issue
          </DialogTitle>
          <DialogDescription>
            Help us improve data accuracy by reporting errors or inconsistencies.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type *</Label>
            <Select
              value={formData.issueType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}
            >
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incorrect_value">Incorrect Value</SelectItem>
                <SelectItem value="missing_data">Missing Data</SelectItem>
                <SelectItem value="wrong_citation">Wrong Citation</SelectItem>
                <SelectItem value="calculation_error">Calculation Error</SelectItem>
                <SelectItem value="formatting_issue">Formatting Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {fieldPath && (
            <div className="space-y-2">
              <Label htmlFor="field">Field</Label>
              <Input
                id="field"
                value={formData.fieldPath}
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          {currentValue && (
            <div className="space-y-2">
              <Label htmlFor="current-value">Current Value</Label>
              <Input
                id="current-value"
                value={formData.currentValue}
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggested-value">Suggested Correction (Optional)</Label>
            <Input
              id="suggested-value"
              placeholder="What should the correct value be?"
              value={formData.suggestedValue}
              onChange={(e) => setFormData(prev => ({ ...prev, suggestedValue: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">
              Provide your email if you'd like updates on this issue
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}