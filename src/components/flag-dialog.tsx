"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Flag } from "lucide-react";
import { flagsStore } from "@/lib/flags-store";

interface FlagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  caseName: string;
  fieldContext?: {
    fieldName?: string;
    fieldValue?: string;
  };
}

const flagTypes = [
  { value: "incorrect-data", label: "Incorrect Data" },
  { value: "missing-information", label: "Missing Information" },
  { value: "outdated-information", label: "Outdated Information" },
  { value: "citation-issue", label: "Citation Issue" },
  { value: "calculation-error", label: "Calculation Error" },
  { value: "other", label: "Other" },
];

export function FlagDialog({
  open,
  onOpenChange,
  caseId,
  caseName,
  fieldContext,
}: FlagDialogProps) {
  const [flagType, setFlagType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!flagType || !description.trim()) {
      toast.error("Please select an issue type and provide a description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to localStorage
      flagsStore.add({
        caseId,
        caseName,
        flagType,
        description,
        fieldContext,
      });

      toast.success("Issue flagged successfully", {
        description: "Thank you for helping us improve our data quality.",
      });

      // Reset form and close dialog
      setFlagType("");
      setDescription("");
      onOpenChange(false);

      // Trigger a storage event to update other components
      window.dispatchEvent(new Event("storage"));
    } catch {
      toast.error("Failed to save flag");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-orange-500" />
              Flag an Issue
            </DialogTitle>
            <DialogDescription>
              Help us improve data quality by reporting issues you find
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Case</Label>
              <p className="text-sm text-muted-foreground">
                {caseName} ({caseId})
              </p>
            </div>

            {fieldContext?.fieldName && (
              <div className="space-y-2">
                <Label>Field</Label>
                <p className="text-sm text-muted-foreground">
                  {fieldContext.fieldName}
                  {fieldContext.fieldValue && `: ${fieldContext.fieldValue}`}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="flag-type">Issue Type</Label>
              <Select value={flagType} onValueChange={setFlagType} required>
                <SelectTrigger id="flag-type">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {flagTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
                required
              />
              <p className="text-xs text-muted-foreground">
                Be as specific as possible to help us address the issue
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Flag"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
