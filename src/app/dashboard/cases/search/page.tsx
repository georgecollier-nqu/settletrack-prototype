"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MultiSelect } from "@/components/ui/multi-select";

import {
  Search,
  Save,
  RotateCcw,
  ChevronDown,
  Calendar,
  CircleDollarSign,
  Shield,
  MapPin,
  FileText,
  Building,
  ArrowRight,
} from "lucide-react";

import { mockCases, filterOptions, type Case } from "@/lib/mock-data";
import { CaseDataOutput } from "@/components/case-data-output";

// —————————————————————————————————————————————————————————————————————————————
// SCHEMAS
// —————————————————————————————————————————————————————————————————————————————

const filterSchema = z.object({
  searchTerm: z.string().optional(),
  yearFrom: z.number().min(2000).max(2030).optional(),
  yearTo: z.number().min(2000).max(2030).optional(),
  minSettlement: z.number().min(0).optional(),
  maxSettlement: z.number().min(0).optional(),
  minClassSize: z.number().min(0).optional(),
  maxClassSize: z.number().min(0).optional(),
  states: z.array(z.string()).optional(),
  courts: z.array(z.string()).optional(),
  piiAffected: z.array(z.string()).optional(),
  causeOfBreach: z.array(z.string()).optional(),
  classType: z.array(z.string()).optional(),
  caseType: z.array(z.string()).optional(),
  isMDL: z.boolean().optional(),
  hasMinor: z.boolean().optional(),
  creditMon: z.boolean().optional(),
  defenseCounsel: z.array(z.string()).optional(),
  plaintiffCounsel: z.array(z.string()).optional(),
  judgeName: z.array(z.string()).optional(),
  settlementType: z.array(z.string()).optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

const saveSearchSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  alertEnabled: z.boolean(),
});
type SaveSearchValues = z.infer<typeof saveSearchSchema>;

// —————————————————————————————————————————————————————————————————————————————
// CONFIG-DRIVEN FILTERS
// —————————————————————————————————————————————————————————————————————————————

interface FilterConfig {
  name: keyof FilterValues;
  label: string;
  type: "text" | "number" | "select" | "checkbox";
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  filters: FilterConfig[];
  defaultOpen?: boolean;
}

const filterGroups: FilterGroup[] = [
  {
    id: "search",
    label: "Search",
    icon: Search,
    defaultOpen: true,
    filters: [
      {
        name: "searchTerm",
        label: "Search Term",
        type: "text",
        placeholder: "Case name, docket, court…",
      },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: Calendar,
    defaultOpen: true,
    filters: [
      {
        name: "yearFrom",
        label: "Year From",
        type: "number",
        min: 2000,
        max: 2030,
      },
      {
        name: "yearTo",
        label: "Year To",
        type: "number",
        min: 2000,
        max: 2030,
      },
    ],
  },
  {
    id: "financial",
    label: "Financial Details",
    icon: CircleDollarSign,
    defaultOpen: false,
    filters: [
      { name: "minSettlement", label: "Min Settlement ($)", type: "number" },
      { name: "maxSettlement", label: "Max Settlement ($)", type: "number" },
      { name: "minClassSize", label: "Min Class Size", type: "number" },
      { name: "maxClassSize", label: "Max Class Size", type: "number" },
    ],
  },
  {
    id: "breach",
    label: "Breach Information",
    icon: Shield,
    defaultOpen: false,
    filters: [
      {
        name: "piiAffected",
        label: "PII Affected",
        type: "select",
        options: filterOptions.piiTypes,
      },
      {
        name: "causeOfBreach",
        label: "Cause of Breach",
        type: "select",
        options: filterOptions.breachCauses,
      },
    ],
  },
  {
    id: "location",
    label: "Location & Court",
    icon: MapPin,
    defaultOpen: false,
    filters: [
      {
        name: "states",
        label: "States",
        type: "select",
        options: filterOptions.states,
      },
      {
        name: "courts",
        label: "Federal Courts",
        type: "select",
        options: filterOptions.courts,
      },
    ],
  },
  {
    id: "case-details",
    label: "Case Details",
    icon: FileText,
    defaultOpen: false,
    filters: [
      { name: "isMDL", label: "Multi-District Litigation", type: "checkbox" },
      { name: "hasMinor", label: "Has Minor Subclass", type: "checkbox" },
      { name: "creditMon", label: "Credit Monitoring", type: "checkbox" },
      {
        name: "settlementType",
        label: "Settlement Type",
        type: "select",
        options: ["Preliminary", "Final", "Both"],
      },
      {
        name: "caseType",
        label: "Case Type",
        type: "select",
        options: filterOptions.caseTypes,
      },
      {
        name: "classType",
        label: "Class Type",
        type: "select",
        options: filterOptions.classTypes,
      },
    ],
  },
  {
    id: "parties",
    label: "Parties",
    icon: Building,
    defaultOpen: false,
    filters: [
      {
        name: "defenseCounsel",
        label: "Defense Counsel",
        type: "select",
        options: filterOptions.lawFirms,
      },
      {
        name: "plaintiffCounsel",
        label: "Plaintiff's Counsel",
        type: "select",
        options: filterOptions.lawFirms,
      },
      {
        name: "judgeName",
        label: "Judge Name",
        type: "select",
        options: Array.from(new Set(mockCases.map((c) => c.judgeName))).sort(),
      },
    ],
  },
];

// —————————————————————————————————————————————————————————————————————————————
// UTILITIES
// —————————————————————————————————————————————————————————————————————————————

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num);
}

// —————————————————————————————————————————————————————————————————————————————
// CUSTOM HOOKS
// —————————————————————————————————————————————————————————————————————————————

function useFilteredCases(cases: Case[]) {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {},
  });
  const values = form.watch();

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const {
        searchTerm,
        yearFrom,
        yearTo,
        minSettlement,
        maxSettlement,
        minClassSize,
        maxClassSize,
        states,
        courts,
        piiAffected,
        causeOfBreach,
        classType,
        caseType,
        isMDL,
        hasMinor,
        creditMon,
        defenseCounsel,
        plaintiffCounsel,
        judgeName,
        settlementType,
      } = values;

      if (
        searchTerm &&
        ![c.name, c.docketId, c.court, c.summary].some((f) =>
          f.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      ) {
        return false;
      }
      if (yearFrom && c.year < yearFrom) return false;
      if (yearTo && c.year > yearTo) return false;
      if (minSettlement && c.settlementAmount < minSettlement) return false;
      if (maxSettlement && c.settlementAmount > maxSettlement) return false;
      if (minClassSize && c.classSize < minClassSize) return false;
      if (maxClassSize && c.classSize > maxClassSize) return false;
      if (states?.length && !states.includes(c.state)) return false;
      if (courts?.length && !courts.includes(c.court)) return false;
      if (
        piiAffected?.length &&
        !piiAffected.some((pt) => c.piiAffected.includes(pt))
      )
        return false;
      if (causeOfBreach?.length && !causeOfBreach.includes(c.causeOfBreach))
        return false;
      if (
        classType?.length &&
        !classType.some((ct) => c.classType.includes(ct))
      )
        return false;
      if (caseType?.length && !caseType.includes(c.caseType)) return false;
      if (isMDL !== undefined && c.isMultiDistrictLitigation !== isMDL)
        return false;
      if (hasMinor !== undefined && c.hasMinorSubclass !== hasMinor)
        return false;
      if (creditMon !== undefined && c.creditMonitoring !== creditMon)
        return false;
      if (defenseCounsel?.length && !defenseCounsel.includes(c.defenseCounsel))
        return false;
      if (
        plaintiffCounsel?.length &&
        !plaintiffCounsel.includes(c.plaintiffCounsel)
      )
        return false;
      if (judgeName?.length && !judgeName.includes(c.judgeName)) return false;
      if (settlementType?.length) {
        const includesBoth = settlementType.includes("Both");
        const matchesType = settlementType.includes(c.settlementType);
        if (!includesBoth && !matchesType) return false;
      }
      return true;
    });
  }, [cases, values]);

  return { form, filtered };
}

function useStatistics(cases: Case[]) {
  return useMemo(() => {
    if (!cases.length)
      return { count: 0, mean: 0, median: 0, total: 0, avgPerClaimant: 0 };
    const amounts = cases.map((c) => c.settlementAmount).sort((a, b) => a - b);
    const total = amounts.reduce((a, b) => a + b, 0);
    const mean = total / amounts.length;
    const median =
      amounts.length % 2 === 0
        ? (amounts[amounts.length / 2 - 1] + amounts[amounts.length / 2]) / 2
        : amounts[Math.floor(amounts.length / 2)];

    // Calculate average payout per claimant
    const totalClaimsSubmitted = cases.reduce(
      (sum, c) => sum + (c.claimsSubmitted || 0),
      0,
    );
    const avgPerClaimant =
      totalClaimsSubmitted > 0 ? total / totalClaimsSubmitted : 0;

    return { count: cases.length, mean, median, total, avgPerClaimant };
  }, [cases]);
}

// —————————————————————————————————————————————————————————————————————————————
// REUSABLE COMPONENTS
// —————————————————————————————————————————————————————————————————————————————

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-3 md:p-4">
      <div>
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        <p className="text-lg md:text-2xl font-bold mt-1">{value}</p>
      </div>
    </Card>
  );
}

// —————————————————————————————————————————————————————————————————————————————
// MAIN PAGE
// —————————————————————————————————————————————————————————————————————————————

export default function CaseSearchPage() {
  const router = useRouter();
  const { form, filtered } = useFilteredCases(mockCases);
  const stats = useStatistics(filtered);
  const [showSave, setShowSave] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () =>
      filterGroups.reduce(
        (acc, group) => ({ ...acc, [group.id]: group.defaultOpen ?? false }),
        {},
      ),
  );
  const saveForm = useForm<SaveSearchValues>({
    resolver: zodResolver(saveSearchSchema),
    defaultValues: { name: "", description: "", alertEnabled: false },
  });

  const onSave = (vals: SaveSearchValues) => {
    console.log("Save search:", vals, form.getValues());
    setShowSave(false);
    saveForm.reset();
  };

  return (
    <>
      <DashboardHeader title="Case Search" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Top Section: Filters and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Filters */}
            <div className="lg:col-span-1 h-fit bg-white rounded-lg border shadow-sm">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <Form {...form}>
                  <div className="space-y-4">
                    {filterGroups.map((group, index) => (
                      <div key={group.id}>
                        {index > 0 && <div className="h-px bg-border mb-4" />}
                        <Collapsible
                          open={openGroups[group.id]}
                          onOpenChange={(open) =>
                            setOpenGroups((prev) => ({
                              ...prev,
                              [group.id]: open,
                            }))
                          }
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary transition-colors group cursor-pointer">
                            <div className="flex items-center gap-2">
                              <group.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                              <span className="text-sm font-medium">
                                {group.label}
                              </span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform text-muted-foreground group-hover:text-primary ${openGroups[group.id] ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="space-y-3 mt-3">
                              {group.filters.map((cfg) => (
                                <FormField
                                  key={cfg.name}
                                  control={form.control}
                                  name={cfg.name}
                                  render={({ field }) =>
                                    cfg.type === "checkbox" ? (
                                      <label className="flex items-center space-x-3 cursor-pointer">
                                        <Checkbox
                                          checked={!!field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                        <span className="text-sm font-normal">
                                          {cfg.label}
                                        </span>
                                      </label>
                                    ) : (
                                      <FormItem>
                                        <FormLabel className="text-sm">
                                          {cfg.label}
                                        </FormLabel>
                                        {cfg.type === "text" && (
                                          <FormControl>
                                            {cfg.name === "searchTerm" ? (
                                              <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                  placeholder={cfg.placeholder}
                                                  className="pl-10 h-9"
                                                  {...field}
                                                  value={
                                                    (field.value as string) ||
                                                    ""
                                                  }
                                                />
                                              </div>
                                            ) : (
                                              <Input
                                                placeholder={cfg.placeholder}
                                                className="h-9"
                                                {...field}
                                                value={
                                                  (field.value as string) || ""
                                                }
                                              />
                                            )}
                                          </FormControl>
                                        )}
                                        {cfg.type === "number" && (
                                          <FormControl>
                                            <Input
                                              type="number"
                                              min={cfg.min}
                                              max={cfg.max}
                                              className="h-9"
                                              {...field}
                                              value={
                                                (field.value as number) || ""
                                              }
                                              onChange={(e) =>
                                                field.onChange(
                                                  e.target.value
                                                    ? Number(e.target.value)
                                                    : undefined,
                                                )
                                              }
                                            />
                                          </FormControl>
                                        )}
                                        {cfg.type === "select" && (
                                          <Controller
                                            control={form.control}
                                            name={cfg.name}
                                            render={({ field: ctl }) => {
                                              const currentValues =
                                                (ctl.value as
                                                  | string[]
                                                  | undefined) || [];

                                              // Use MultiSelect for settlement type
                                              if (
                                                cfg.name === "settlementType"
                                              ) {
                                                return (
                                                  <MultiSelect
                                                    options={cfg.options!}
                                                    value={currentValues}
                                                    onChange={ctl.onChange}
                                                    placeholder={`Select ${cfg.label.toLowerCase()}…`}
                                                  />
                                                );
                                              }

                                              return (
                                                <>
                                                  <Select
                                                    value=""
                                                    onValueChange={(val) => {
                                                      if (
                                                        !currentValues.includes(
                                                          val,
                                                        )
                                                      ) {
                                                        ctl.onChange([
                                                          ...currentValues,
                                                          val,
                                                        ]);
                                                      }
                                                    }}
                                                  >
                                                    <SelectTrigger className="h-9">
                                                      <SelectValue
                                                        placeholder={`Select ${cfg.label.toLowerCase()}…`}
                                                      />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {cfg.options!.map(
                                                        (opt) => (
                                                          <SelectItem
                                                            key={opt}
                                                            value={opt}
                                                          >
                                                            {opt}
                                                          </SelectItem>
                                                        ),
                                                      )}
                                                    </SelectContent>
                                                  </Select>
                                                  {currentValues.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                      {currentValues.map(
                                                        (v: string) => (
                                                          <Badge
                                                            key={v}
                                                            variant="secondary"
                                                            className="text-xs py-0.5"
                                                          >
                                                            {v}
                                                            <button
                                                              type="button"
                                                              onClick={(e) => {
                                                                e.preventDefault();
                                                                ctl.onChange(
                                                                  currentValues.filter(
                                                                    (
                                                                      x: string,
                                                                    ) =>
                                                                      x !== v,
                                                                  ),
                                                                );
                                                              }}
                                                              className="ml-1 hover:text-destructive"
                                                            >
                                                              ×
                                                            </button>
                                                          </Badge>
                                                        ),
                                                      )}
                                                    </div>
                                                  )}
                                                </>
                                              );
                                            }}
                                          />
                                        )}
                                        <FormMessage />
                                      </FormItem>
                                    )
                                  }
                                />
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </Form>
              </div>
            </div>

            {/* Stats and Data Analysis */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard
                  label="Total Cases"
                  value={formatNumber(stats.count)}
                />
                <StatCard
                  label="Avg Settlement"
                  value={formatCurrency(stats.mean)}
                />
                <StatCard
                  label="Median Settlement"
                  value={formatCurrency(stats.median)}
                />
                <StatCard
                  label="Avg Per Claimant"
                  value={formatCurrency(stats.avgPerClaimant)}
                />
                <StatCard
                  label="Total Value"
                  value={formatCurrency(stats.total)}
                />
              </div>

              {/* Data Analysis */}
              {filtered.length > 0 && <CaseDataOutput cases={filtered} />}
            </div>
          </div>

          {/* Bottom Section: Search Results - Full Width */}
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <p className="font-medium">
                Search Results ({formatNumber(filtered.length)} cases)
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!filtered.length}
                  onClick={() => setShowSave(true)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Search
                </Button>
              </div>
            </div>
            {filtered.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case Name</TableHead>
                      <TableHead>Court</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Settlement</TableHead>
                      <TableHead className="text-right">Class Size</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((c) => (
                      <TableRow
                        key={c.id}
                        className="hover:bg-primary/5 transition-colors cursor-pointer"
                        onClick={() => router.push(`/dashboard/cases/${c.id}`)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {c.docketId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{c.court}</p>
                            <p className="text-sm text-muted-foreground">
                              {c.state}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{c.year}</TableCell>
                        <TableCell className="text-right font-medium text-primary">
                          {formatCurrency(c.settlementAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(c.classSize)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              c.settlementType === "Final"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {c.settlementType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/dashboard/cases/${c.id}`);
                            }}
                          >
                            View
                            <ArrowRight className="ml-1 h-4 w-4" />
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
                  Try adjusting your filters.
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Save Search Dialog */}
      <Dialog open={showSave} onOpenChange={setShowSave}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
            <DialogDescription>
              Save your current filters for future use
            </DialogDescription>
          </DialogHeader>
          <Form {...saveForm}>
            <form
              onSubmit={saveForm.handleSubmit(onSave)}
              className="space-y-4"
            >
              <FormField
                control={saveForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Data Breach > $10M" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={saveForm.control}
                name="alertEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Enable alerts for new matches</FormLabel>
                  </FormItem>
                )}
              />
              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSave(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
