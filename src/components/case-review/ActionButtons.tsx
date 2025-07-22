import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onApprove: () => void;
  onRequestInfo: () => void;
  onReject: () => void;
}

export function ActionButtons({
  onApprove,
  onRequestInfo,
  onReject,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-3 justify-end">
      <Button
        variant="default"
        className="bg-green-600 hover:bg-green-700"
        onClick={onApprove}
      >
        Approve Case
      </Button>
      <Button variant="outline" onClick={onRequestInfo}>
        Request More Info
      </Button>
      <Button variant="destructive" onClick={onReject}>
        Reject Case
      </Button>
    </div>
  );
}
