"use client";

import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  size: string;
}

interface DocumentsListProps {
  documents: Document[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-4">
        Attached Documents
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.size}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}