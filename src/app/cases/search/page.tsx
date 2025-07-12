"use client";

import { useState, useMemo, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Download,
  Save,
  RotateCcw,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Filter,
  Eye,
} from "lucide-react";
import { mockCases, filterOptions, type Case } from "@/lib/mock-data";

// Form schema for filters
const filterSchema = z.object({
  searchTerm: z.string().optional(),
  states: z.array(z.string()).optional(),
  courts: z.array(z.string()).optional(),
  yearRange: z
    .object({
      from: z.number().min(2000).max(2030).optional(),
      to: z.number().min(2000).max(2030).optional(),
    })
    .optional(),
  settlementAmountRange: z
    .object({
      from: z.number().min(0).optional(),
      to: z.number().min(0).optional(),
    })
    .optional(),
  classSizeRange: z
    .object({
      from: z.number().min(0).optional(),
      to: z.number().min(0).optional(),
    })
    .optional(),
  piiAffected: z.array(z.string()).optional(),
  causeOfBreach: z.array(z.string()).optional(),
  classType: z.array(z.string()).optional(),
  isMultiDistrictLitigation: z.boolean().optional(),
  hasMinorSubclass: z.boolean().optional(),
  settlementType: z.array(z.string()).optional(),
  creditMonitoring: z.boolean().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

const saveSearchSchema = z.object({
  name: z.string().min(1, "Search name is required"),
  description: z.string().optional(),
  alertEnabled: z.boolean().default(false),
});

type SaveSearchValues = z.infer<typeof saveSearchSchema>;

export default function CaseSearchPage() {
  const [filteredCases, setFilteredCases] = useState<Case[]>(mockCases);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: "",
      states: [],
      courts: [],
      piiAffected: [],
      causeOfBreach: [],
      classType: [],
      settlementType: [],
    },
  });

  const saveForm = useForm<SaveSearchValues>({
    resolver: zodResolver(saveSearchSchema),
    defaultValues: {
      name: "",
      description: "",
      alertEnabled: false,
    },
  });

  // Filter cases based on form values
  const applyFilters = useCallback((values: FilterValues) => {
    let filtered = mockCases;

    // Search term filter
    if (values.searchTerm && values.searchTerm.trim()) {
      const term = values.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (case_) =>
          case_.name.toLowerCase().includes(term) ||
          case_.docketId.toLowerCase().includes(term) ||
          case_.court.toLowerCase().includes(term) ||
          case_.summary.toLowerCase().includes(term),
      );
    }

    // State filter
    if (values.states && values.states.length > 0) {
      filtered = filtered.filter((case_) =>
        values.states!.includes(case_.state),
      );
    }

    // Court filter
    if (values.courts && values.courts.length > 0) {
      filtered = filtered.filter((case_) =>
        values.courts!.includes(case_.court),
      );
    }

    // Year range filter
    if (values.yearRange?.from || values.yearRange?.to) {
      filtered = filtered.filter((case_) => {
        const year = case_.year;
        const fromYear = values.yearRange?.from || 2000;
        const toYear = values.yearRange?.to || 2030;
        return year >= fromYear && year <= toYear;
      });
    }

    // Settlement amount range filter
    if (
      values.settlementAmountRange?.from ||
      values.settlementAmountRange?.to
    ) {
      filtered = filtered.filter((case_) => {
        const amount = case_.settlementAmount;
        const fromAmount = values.settlementAmountRange?.from || 0;
        const toAmount = values.settlementAmountRange?.to || Infinity;
        return amount >= fromAmount && amount <= toAmount;
      });
    }

    // Class size range filter
    if (values.classSizeRange?.from || values.classSizeRange?.to) {
      filtered = filtered.filter((case_) => {
        const size = case_.classSize;
        const fromSize = values.classSizeRange?.from || 0;
        const toSize = values.classSizeRange?.to || Infinity;
        return size >= fromSize && size <= toSize;
      });
    }

    // PII affected filter
    if (values.piiAffected && values.piiAffected.length > 0) {
      filtered = filtered.filter((case_) =>
        values.piiAffected!.some((pii) => case_.piiAffected.includes(pii)),
      );
    }

    // Cause of breach filter
    if (values.causeOfBreach && values.causeOfBreach.length > 0) {
      filtered = filtered.filter((case_) =>
        values.causeOfBreach!.includes(case_.causeOfBreach),
      );
    }

    // Class type filter
    if (values.classType && values.classType.length > 0) {
      filtered = filtered.filter((case_) =>
        values.classType!.some((type) => case_.classType.includes(type)),
      );
    }

    // Settlement type filter
    if (values.settlementType && values.settlementType.length > 0) {
      filtered = filtered.filter((case_) =>
        values.settlementType!.includes(case_.settlementType),
      );
    }

    // Boolean filters
    if (values.isMultiDistrictLitigation !== undefined) {
      filtered = filtered.filter(
        (case_) =>
          case_.isMultiDistrictLitigation === values.isMultiDistrictLitigation,
      );
    }

    if (values.hasMinorSubclass !== undefined) {
      filtered = filtered.filter(
        (case_) => case_.hasMinorSubclass === values.hasMinorSubclass,
      );
    }

    if (values.creditMonitoring !== undefined) {
      filtered = filtered.filter(
        (case_) => case_.creditMonitoring === values.creditMonitoring,
      );
    }

    setFilteredCases(filtered);
  }, []);

  // Calculate summary statistics
  const statistics = useMemo(() => {
    if (filteredCases.length === 0) {
      return { count: 0, mean: 0, median: 0, min: 0, max: 0, total: 0 };
    }

    const amounts = filteredCases
      .map((case_) => case_.settlementAmount)
      .sort((a, b) => a - b);
    const sum = amounts.reduce((acc, amount) => acc + amount, 0);
    const mean = sum / amounts.length;
    const median =
      amounts.length % 2 === 0
        ? (amounts[amounts.length / 2 - 1] + amounts[amounts.length / 2]) / 2
        : amounts[Math.floor(amounts.length / 2)];

    return {
      count: filteredCases.length,
      mean,
      median,
      min: amounts[0],
      max: amounts[amounts.length - 1],
      total: sum,
    };
  }, [filteredCases]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Case Name",
      "Docket ID",
      "Court",
      "State",
      "Year",
      "Settlement Amount",
      "Class Size",
      "MDL",
      "PII Affected",
      "Cause of Breach",
      "Class Type",
      "Minor Subclass",
      "Defense Counsel",
      "Plaintiff Counsel",
      "Judge",
      "Settlement Type",
      "Date",
      "Summary",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredCases.map((case_) =>
        [
          `"${case_.name}"`,
          case_.docketId,
          case_.court,
          case_.state,
          case_.year,
          case_.settlementAmount,
          case_.classSize,
          case_.isMultiDistrictLitigation ? "Yes" : "No",
          `"${case_.piiAffected.join("; ")}"`,
          case_.causeOfBreach,
          `"${case_.classType.join("; ")}"`,
          case_.hasMinorSubclass ? "Yes" : "No",
          `"${case_.defenseCounsel}"`,
          `"${case_.plaintiffCounsel}"`,
          `"${case_.judgeName}"`,
          case_.settlementType,
          case_.date,
          `"${case_.summary}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settlement-cases-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Reset filters
  const resetFilters = () => {
    form.reset();
    setFilteredCases(mockCases);
  };

  // Save search functionality
  const handleSaveSearch = (values: SaveSearchValues) => {
    const currentFilters = form.getValues();
    console.log("Saving search:", values, "with filters:", currentFilters);
    // In real app, would save to backend
    setShowSaveDialog(false);
    saveForm.reset();
  };

  // Watch form changes and apply filters
  const watchedValues = form.watch();
  useMemo(() => {
    applyFilters(watchedValues);
  }, [watchedValues, applyFilters]);

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Case Search</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={exportToCSV}
              disabled={filteredCases.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => setShowSaveDialog(true)}
              disabled={filteredCases.length === 0}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Search
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter Cases
              </CardTitle>
              <CardDescription>
                Use the filters below to narrow your search and find relevant
                settlement cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {/* Search Term */}
                  <FormField
                    control={form.control}
                    name="searchTerm"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 lg:col-span-3">
                        <FormLabel>Search Term</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search case names, docket IDs, courts, or summaries..."
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Year Range */}
                  <FormField
                    control={form.control}
                    name="yearRange.from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year From</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2020"
                            min={2000}
                            max={2030}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearRange.to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year To</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2024"
                            min={2000}
                            max={2030}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Settlement Amount Range */}
                  <FormField
                    control={form.control}
                    name="settlementAmountRange.from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Settlement ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1000000"
                            min={0}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="settlementAmountRange.to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Settlement ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50000000"
                            min={0}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Size Range */}
                  <FormField
                    control={form.control}
                    name="classSizeRange.from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Class Size</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100000"
                            min={0}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="classSizeRange.to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Class Size</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5000000"
                            min={0}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* State Selection */}
                  <FormField
                    control={form.control}
                    name="states"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>States</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const current = field.value || [];
                            if (!current.includes(value)) {
                              field.onChange([...current, value]);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select states..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterOptions.states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {field.value?.map((state) => (
                            <Badge
                              key={state}
                              variant="secondary"
                              className="text-xs"
                            >
                              {state}
                              <button
                                onClick={() =>
                                  field.onChange(
                                    field.value?.filter((s) => s !== state),
                                  )
                                }
                                className="ml-1 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PII Affected */}
                  <FormField
                    control={form.control}
                    name="piiAffected"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PII Affected</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const current = field.value || [];
                            if (!current.includes(value)) {
                              field.onChange([...current, value]);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select PII types..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterOptions.piiTypes.map((pii) => (
                              <SelectItem key={pii} value={pii}>
                                {pii}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {field.value?.map((pii) => (
                            <Badge
                              key={pii}
                              variant="secondary"
                              className="text-xs"
                            >
                              {pii}
                              <button
                                onClick={() =>
                                  field.onChange(
                                    field.value?.filter((p) => p !== pii),
                                  )
                                }
                                className="ml-1 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cause of Breach */}
                  <FormField
                    control={form.control}
                    name="causeOfBreach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cause of Breach</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const current = field.value || [];
                            if (!current.includes(value)) {
                              field.onChange([...current, value]);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select causes..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterOptions.breachCauses.map((cause) => (
                              <SelectItem key={cause} value={cause}>
                                {cause}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {field.value?.map((cause) => (
                            <Badge
                              key={cause}
                              variant="secondary"
                              className="text-xs"
                            >
                              {cause}
                              <button
                                onClick={() =>
                                  field.onChange(
                                    field.value?.filter((c) => c !== cause),
                                  )
                                }
                                className="ml-1 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Boolean Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <FormField
                    control={form.control}
                    name="isMultiDistrictLitigation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Multi-District Litigation</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasMinorSubclass"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Has Minor Subclass</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="creditMonitoring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Credit Monitoring Offered</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cases</p>
                    <p className="text-2xl font-bold mt-1">
                      {formatNumber(statistics.count)}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Settlement
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {formatCurrency(statistics.mean)}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Median Settlement
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {formatCurrency(statistics.median)}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold mt-1">
                      {formatCurrency(statistics.total)}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Search Results ({formatNumber(filteredCases.length)} cases)
              </CardTitle>
              <CardDescription>
                Click on any case to view detailed information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCases.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Case Name</TableHead>
                        <TableHead>Court</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Settlement</TableHead>
                        <TableHead className="text-right">Class Size</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCases.map((case_) => (
                        <TableRow key={case_.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <p className="font-medium">{case_.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {case_.docketId}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{case_.court}</p>
                              <p className="text-sm text-muted-foreground">
                                {case_.state}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{case_.year}</TableCell>
                          <TableCell className="text-right font-medium text-primary">
                            {formatCurrency(case_.settlementAmount)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatNumber(case_.classSize)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                case_.settlementType === "Final"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {case_.settlementType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={`/cases/${case_.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No cases found</p>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria to find matching cases
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Save Search Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
            <DialogDescription>
              Save your current search filters for quick access in the future
            </DialogDescription>
          </DialogHeader>
          <Form {...saveForm}>
            <form
              onSubmit={saveForm.handleSubmit(handleSaveSearch)}
              className="space-y-4"
            >
              <FormField
                control={saveForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Data Breach > $10M"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={saveForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of this search"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={saveForm.control}
                name="alertEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Enable alerts for new matching cases
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Search</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
