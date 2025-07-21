"use client";

import React, { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import type { Flag as FlagType } from "@/app/api/flags/route";

interface FlagIndicatorProps {
  caseId: string;
  fieldName?: string;
}

export function FlagIndicator({ caseId, fieldName }: FlagIndicatorProps) {
  const [flags, setFlags] = useState<FlagType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch(`/api/flags?caseId=${caseId}`);
        const data = await response.json();
        setFlags(data.flags || []);
      } catch (error) {
        console.error("Failed to fetch flags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlags();
  }, [caseId]);

  if (loading || flags.length === 0) {
    return null;
  }

  // Filter flags by field if specified
  const relevantFlags = fieldName
    ? flags.filter((flag) => flag.fieldContext?.fieldName === fieldName)
    : flags;

  const pendingFlags = relevantFlags.filter((f) => f.status === "pending");
  const reviewingFlags = relevantFlags.filter((f) => f.status === "reviewing");

  if (pendingFlags.length === 0 && reviewingFlags.length === 0) {
    return null;
  }

  const totalActiveFlags = pendingFlags.length + reviewingFlags.length;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className="ml-2 gap-1 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
          >
            <Flag className="h-3 w-3" />
            {totalActiveFlags}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Flagged Issues</p>
          {pendingFlags.length > 0 && (
            <p className="text-sm">{pendingFlags.length} pending review</p>
          )}
          {reviewingFlags.length > 0 && (
            <p className="text-sm">{reviewingFlags.length} under review</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
