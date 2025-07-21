"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  ChevronDown,
  FileText,
  Calendar,
  AlertCircle,
  Eye,
  Edit3,
  CheckSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

// Mock data for QC workflow cases
const mockQCCases = [
  {
    id: "SET-123456-A",
    title: "In re Data Breach Litigation",
    court: "Southern District of NY",
    dateAdded: "2024-03-15",
    reviewStatus: "pending_review",
    settlementAmount: 2500000,
    classSize: 15000,
    modelDiscrepancies: 12,
    fieldsReviewed: 0,
    totalFields: 48,
  },
  {
    id: "SET-789012-B",
    title: "Johnson v. Tech Corp",
    court: "Northern District of CA",
    dateAdded: "2024-03-14",
    reviewStatus: "under_review",
    reviewerId: "reviewer1@settletrack.com",
    reviewerName: "Sarah Johnson",
    settlementAmount: 5000000,
    classSize: 25000,
    modelDiscrepancies: 8,
    fieldsReviewed: 24,
    totalFields: 48,
  },
  {
    id: "SET-345678-C",
    title: "Smith v. Healthcare Inc",
    court: "Eastern District of TX",
    dateAdded: "2024-03-13",
    reviewStatus: "pending_approval",
    reviewerId: "reviewer2@settletrack.com",
    reviewerName: "Michael Chen",
    settlementAmount: 3200000,
    classSize: 18000,
    modelDiscrepancies: 5,
    fieldsReviewed: 48,
    totalFields: 48,
  },
  {
    id: "SET-901234-D",
    title: "Wilson v. Financial Services",
    court: "Central District of CA",
    dateAdded: "2024-03-12",
    reviewStatus: "approved",
    reviewerId: "reviewer1@settletrack.com",
    reviewerName: "Sarah Johnson",
    supervisorName: "Jackie Admin",
    approvalDate: "2024-03-15",
    settlementAmount: 4500000,
    classSize: 22000,
    modelDiscrepancies: 3,
    fieldsReviewed: 48,
    totalFields: 48,
  },
];

type FilterStatus =
  | "all"
  | "pending_review"
  | "under_review"
  | "pending_approval"
  | "approved"
  | "rejected";
type SortField = "dateAdded" | "caseNumber" | "discrepancies";

export default function QCWorkflowPage() {
  const router = useRouter();
  const { isHumanSupervisor, currentUser } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortField, setSortField] = useState<SortField>("dateAdded");

  // Filter cases based on user role
  const getFilteredCases = () => {
    let cases = [...mockQCCases];

    // Human reviewers can only see cases assigned to them or pending review
    if (!isHumanSupervisor) {
      cases = cases.filter(
        (c) =>
          c.reviewStatus === "pending_review" ||
          c.reviewerId === currentUser?.email,
      );
    }

    // Apply search filter
    if (searchQuery) {
      cases = cases.filter((c) =>
        c.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      cases = cases.filter((c) => c.reviewStatus === filterStatus);
    }

    // Sort cases
    cases.sort((a, b) => {
      switch (sortField) {
        case "dateAdded":
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        case "caseNumber":
          return a.id.localeCompare(b.id);
        case "discrepancies":
          return b.modelDiscrepancies - a.modelDiscrepancies;
        default:
          return 0;
      }
    });

    return cases;
  };

  const filteredCases = getFilteredCases();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Clock className="h-4 w-4" />;
      case "under_review":
        return <Edit3 className="h-4 w-4" />;
      case "pending_approval":
        return <AlertCircle className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "secondary";
      case "under_review":
        return "default";
      case "pending_approval":
        return "outline";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_review":
        return "Pending Review";
      case "under_review":
        return "Under Review";
      case "pending_approval":
        return "Pending Approval";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleCaseClick = (caseItem: (typeof mockQCCases)[0]) => {
    router.push(`/admin/qc-workflow/${caseItem.id}`);
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">QC Workflow</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentUser?.role === "human_reviewer" ? "Reviewer" : "Supervisor"}{" "}
            Mode
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by case number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status:{" "}
                {filterStatus === "all" ? "All" : getStatusLabel(filterStatus)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Cases
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterStatus("pending_review")}
              >
                Pending Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("under_review")}>
                Under Review
              </DropdownMenuItem>
              {isHumanSupervisor && (
                <>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("pending_approval")}
                  >
                    Pending Approval
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                    Rejected
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Sort:{" "}
                {sortField === "dateAdded"
                  ? "Date Added"
                  : sortField === "caseNumber"
                    ? "Case Number"
                    : "Discrepancies"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortField("dateAdded")}>
                Date Added
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField("caseNumber")}>
                Case Number
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField("discrepancies")}>
                Model Discrepancies
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          {filteredCases.length} cases found
        </div>
      </div>

      {/* Cases List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleCaseClick(caseItem)}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{caseItem.id}</h3>
                    <Badge
                      variant={getStatusColor(caseItem.reviewStatus)}
                      className="gap-1"
                    >
                      {getStatusIcon(caseItem.reviewStatus)}
                      {getStatusLabel(caseItem.reviewStatus)}
                    </Badge>
                    {caseItem.modelDiscrepancies > 0 && (
                      <Badge variant="outline" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {caseItem.modelDiscrepancies} Discrepancies
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {caseItem.court}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(caseItem.dateAdded).toLocaleDateString()}
                    </span>
                    {caseItem.reviewerName && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Reviewer: {caseItem.reviewerName}
                      </span>
                    )}
                    {caseItem.supervisorName && (
                      <span className="flex items-center gap-1">
                        <CheckSquare className="h-3 w-3" />
                        Approved by: {caseItem.supervisorName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">
                        {caseItem.fieldsReviewed}/{caseItem.totalFields} fields
                      </span>
                    </div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${(caseItem.fieldsReviewed / caseItem.totalFields) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${caseItem.settlementAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.classSize.toLocaleString()} members
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
