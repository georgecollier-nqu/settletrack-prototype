import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface AdminNotesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminNotesSection({ value, onChange }: AdminNotesSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <h3 className="font-semibold text-sm uppercase text-muted-foreground">
        Admin Notes
      </h3>
      <Textarea
        placeholder="Add your review notes here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px]"
      />
    </div>
  );
}
