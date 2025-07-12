"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Mock data for cases
const mockCases = [
  {
    id: "SET-123456-A",
    title: "In re Data Breach Litigation",
    court: "Southern District of NY",
    dateAdded: "2024-03-15",
    status: "flagged",
    flaggedBy: "user@lawfirm.com",
    flagReason: "Settlement amount seems low",
    settlementAmount: 2500000,
    classSize: 15000,
  },
  {
    id: "SET-789012-B",
    title: "Johnson v. Tech Corp",
    court: "Northern District of CA",
    dateAdded: "2024-03-14",
    status: "pending",
    flaggedBy: null,
    flagReason: null,
    settlementAmount: 5000000,
    classSize: 25000,
  },
  {
    id: "SET-345678-C",
    title: "Smith v. Healthcare Inc",
    court: "Eastern District of TX",
    dateAdded: "2024-03-13",
    status: "approved",
    flaggedBy: null,
    flagReason: null,
    settlementAmount: 3200000,
    classSize: 18000,
  },
];

type SortField = "dateAdded" | "caseNumber" | "title";
type FilterStatus = "all" | "pending" | "flagged" | "approved";

export default function AdminCasesPage() {
  const router = useRouter();
  const [cases] = useState(mockCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("dateAdded");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Filter and sort cases
  const filteredCases = cases
    .filter((caseItem) => {
      // Search filter
      if (
        searchQuery &&
        !caseItem.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Status filter
      if (filterStatus !== "all" && caseItem.status !== filterStatus) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortField) {
        case "dateAdded":
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        case "caseNumber":
          return a.id.localeCompare(b.id);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "flagged":
        return <AlertCircle className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged":
        return "destructive";
      case "approved":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-2xl font-serif font-bold">Case Management</h1>
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
                  {filterStatus === "all"
                    ? "All"
                    : filterStatus.charAt(0).toUpperCase() +
                      filterStatus.slice(1)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Cases
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                  Pending Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("flagged")}>
                  Flagged
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                  Approved
                </DropdownMenuItem>
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
                      : "Title"}
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
                <DropdownMenuItem onClick={() => setSortField("title")}>
                  Title
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Cases List */}
        <div className="flex-1 overflow-auto">
          <div className="divide-y">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/admin/cases/${caseItem.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{caseItem.id}</h3>
                      <Badge
                        variant={getStatusColor(caseItem.status)}
                        className="gap-1"
                      >
                        {getStatusIcon(caseItem.status)}
                        {caseItem.status.charAt(0).toUpperCase() +
                          caseItem.status.slice(1)}
                      </Badge>
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
                    </div>
                    {caseItem.flagReason && (
                      <p className="text-sm text-orange-600 mt-2">
                        Flagged: &quot;{caseItem.flagReason}&quot; -{" "}
                        {caseItem.flaggedBy}
                      </p>
                    )}
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
      </div>
    </>
  );
}
