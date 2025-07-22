import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CaseData } from "@/types/case";

export function useCaseReview(caseData: CaseData) {
  const router = useRouter();
  const [adminNotes, setAdminNotes] = useState("");

  const handleApprove = useCallback(() => {
    console.log("Approved case:", caseData.id.value);
    // TODO: API call to approve case
    router.push("/admin/cases");
  }, [caseData.id.value, router]);

  const handleReject = useCallback(() => {
    console.log("Rejected case:", caseData.id.value);
    // TODO: API call to reject case
    router.push("/admin/cases");
  }, [caseData.id.value, router]);

  const handleRequestInfo = useCallback(() => {
    console.log("Requested more info for case:", caseData.id.value);
    // TODO: API call to request more info
    router.push("/admin/cases");
  }, [caseData.id.value, router]);

  const navigateToPreviousCase = useCallback(() => {
    // TODO: Implement navigation to previous case
    console.log("Navigate to previous case");
  }, []);

  const navigateToNextCase = useCallback(() => {
    // TODO: Implement navigation to next case
    console.log("Navigate to next case");
  }, []);

  return {
    adminNotes,
    setAdminNotes,
    handleApprove,
    handleReject,
    handleRequestInfo,
    navigateToPreviousCase,
    navigateToNextCase,
  };
}
