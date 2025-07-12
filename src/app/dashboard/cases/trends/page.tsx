"use client";

import { useState, useMemo, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Filter,
  ChevronDown,
} from "lucide-react";
import { mockCases, filterOptions, type Case } from "@/lib/mock-data";

// Form schema for trend filters
const trendFilterSchema = z.object({
  metric: z.enum([
    "avgSettlement",
    "totalSettlement",
    "caseCount",
    "avgClassSize",
    "medianSettlement",
  ]),
  timeGrouping: z.enum(["year", "quarter", "month"]),
  dateRange: z
    .object({
      from: z.number().min(2020).max(2030).optional(),
      to: z.number().min(2020).max(2030).optional(),
    })
    .optional(),
  // Same filters as search page for consistency
  states: z.array(z.string()).optional(),
  courts: z.array(z.string()).optional(),
  piiAffected: z.array(z.string()).optional(),
  causeOfBreach: z.array(z.string()).optional(),
  classType: z.array(z.string()).optional(),
  isMultiDistrictLitigation: z.boolean().optional(),
  hasMinorSubclass: z.boolean().optional(),
  settlementType: z.array(z.string()).optional(),
  creditMonitoring: z.boolean().optional(),
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
});

type TrendFilterValues = z.infer<typeof trendFilterSchema>;

interface TrendDataPoint {
  period: string;
  value: number;
  count: number;
  rawDate: Date;
}

export default function CaseTrendsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    timeConfig: true,
    filters: false,
  });

  const form = useForm<TrendFilterValues>({
    resolver: zodResolver(trendFilterSchema),
    defaultValues: {
      metric: "avgSettlement",
      timeGrouping: "year",
      states: [],
      courts: [],
      piiAffected: [],
      causeOfBreach: [],
      classType: [],
      settlementType: [],
    },
  });

  // Filter cases based on form values (similar to search page)
  const getFilteredCases = useCallback((values: TrendFilterValues): Case[] => {
    let filtered = mockCases;

    // Apply same filters as search page
    if (values.states && values.states.length > 0) {
      filtered = filtered.filter((case_) =>
        values.states!.includes(case_.state),
      );
    }

    if (values.courts && values.courts.length > 0) {
      filtered = filtered.filter((case_) =>
        values.courts!.includes(case_.court),
      );
    }

    if (values.dateRange?.from || values.dateRange?.to) {
      filtered = filtered.filter((case_) => {
        const year = case_.year;
        const fromYear = values.dateRange?.from || 2020;
        const toYear = values.dateRange?.to || 2030;
        return year >= fromYear && year <= toYear;
      });
    }

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

    if (values.classSizeRange?.from || values.classSizeRange?.to) {
      filtered = filtered.filter((case_) => {
        const size = case_.classSize;
        const fromSize = values.classSizeRange?.from || 0;
        const toSize = values.classSizeRange?.to || Infinity;
        return size >= fromSize && size <= toSize;
      });
    }

    if (values.piiAffected && values.piiAffected.length > 0) {
      filtered = filtered.filter((case_) =>
        values.piiAffected!.some((pii) => case_.piiAffected.includes(pii)),
      );
    }

    if (values.causeOfBreach && values.causeOfBreach.length > 0) {
      filtered = filtered.filter((case_) =>
        values.causeOfBreach!.includes(case_.causeOfBreach),
      );
    }

    if (values.classType && values.classType.length > 0) {
      filtered = filtered.filter((case_) =>
        values.classType!.some((type) => case_.classType.includes(type)),
      );
    }

    if (values.settlementType && values.settlementType.length > 0) {
      filtered = filtered.filter((case_) =>
        values.settlementType!.includes(case_.settlementType),
      );
    }

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

    return filtered;
  }, []);

  // Generate trend data based on filtered cases and selected metric/grouping
  const trendData = useMemo(() => {
    const values = form.getValues();
    const filteredCases = getFilteredCases(values);

    if (filteredCases.length === 0) return [];

    // Group cases by time period
    const groupedData = new Map<string, Case[]>();

    filteredCases.forEach((case_) => {
      const date = new Date(case_.date);
      let periodKey: string;

      switch (values.timeGrouping) {
        case "year":
          periodKey = date.getFullYear().toString();
          break;
        case "quarter":
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          periodKey = `${date.getFullYear()} Q${quarter}`;
          break;
        case "month":
          periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          break;
        default:
          periodKey = date.getFullYear().toString();
      }

      if (!groupedData.has(periodKey)) {
        groupedData.set(periodKey, []);
      }
      groupedData.get(periodKey)!.push(case_);
    });

    // Calculate metric for each period
    const result: TrendDataPoint[] = Array.from(groupedData.entries()).map(
      ([period, cases]) => {
        let value: number;
        const count = cases.length;

        switch (values.metric) {
          case "avgSettlement":
            value =
              cases.reduce((sum, case_) => sum + case_.settlementAmount, 0) /
              cases.length;
            break;
          case "totalSettlement":
            value = cases.reduce(
              (sum, case_) => sum + case_.settlementAmount,
              0,
            );
            break;
          case "caseCount":
            value = cases.length;
            break;
          case "avgClassSize":
            value =
              cases.reduce((sum, case_) => sum + case_.classSize, 0) /
              cases.length;
            break;
          case "medianSettlement":
            const amounts = cases
              .map((case_) => case_.settlementAmount)
              .sort((a, b) => a - b);
            value =
              amounts.length % 2 === 0
                ? (amounts[amounts.length / 2 - 1] +
                    amounts[amounts.length / 2]) /
                  2
                : amounts[Math.floor(amounts.length / 2)];
            break;
          default:
            value = 0;
        }

        // Create a representative date for sorting
        let rawDate: Date;
        if (values.timeGrouping === "year") {
          rawDate = new Date(parseInt(period), 0, 1);
        } else if (values.timeGrouping === "quarter") {
          const [year, quarter] = period.split(" Q");
          const month = (parseInt(quarter) - 1) * 3;
          rawDate = new Date(parseInt(year), month, 1);
        } else {
          rawDate = new Date(period + "-01");
        }

        return { period, value, count, rawDate };
      },
    );

    // Sort by date
    return result.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
  }, [form.watch(), getFilteredCases]);

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
    return new Intl.NumberFormat("en-US").format(Math.round(num));
  };

  // Get metric display info
  const getMetricInfo = (metric: string) => {
    switch (metric) {
      case "avgSettlement":
        return {
          label: "Average Settlement Amount",
          format: formatCurrency,
          color: "#4CAF82",
        };
      case "totalSettlement":
        return {
          label: "Total Settlement Amount",
          format: formatCurrency,
          color: "#5AA5DA",
        };
      case "caseCount":
        return {
          label: "Number of Cases",
          format: formatNumber,
          color: "#F4AF3D",
        };
      case "avgClassSize":
        return {
          label: "Average Class Size",
          format: formatNumber,
          color: "#B45309",
        };
      case "medianSettlement":
        return {
          label: "Median Settlement Amount",
          format: formatCurrency,
          color: "#2E86DE",
        };
      default:
        return { label: "Value", format: formatNumber, color: "#4CAF82" };
    }
  };

  const currentMetricInfo = getMetricInfo(form.watch("metric"));

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Case Trends</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Configuration Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-lg border shadow-sm h-fit">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-6">Configuration</h2>
                <Form {...form}>
                  <div className="space-y-4">
                    {/* Time Configuration Section */}
                    <Collapsible
                      open={openSections.timeConfig}
                      onOpenChange={(open) =>
                        setOpenSections((prev) => ({
                          ...prev,
                          timeConfig: open,
                        }))
                      }
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          <span className="text-sm font-medium">
                            Time & Metric
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform text-muted-foreground group-hover:text-primary ${
                            openSections.timeConfig ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-3 mt-3">
                          <FormField
                            control={form.control}
                            name="metric"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">
                                  Metric to Analyze
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-9">
                                      <SelectValue placeholder="Select metric..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="avgSettlement">
                                      Average Settlement
                                    </SelectItem>
                                    <SelectItem value="totalSettlement">
                                      Total Settlement
                                    </SelectItem>
                                    <SelectItem value="caseCount">
                                      Case Count
                                    </SelectItem>
                                    <SelectItem value="avgClassSize">
                                      Average Class Size
                                    </SelectItem>
                                    <SelectItem value="medianSettlement">
                                      Median Settlement
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="timeGrouping"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">
                                  Time Grouping
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-9">
                                      <SelectValue placeholder="Select grouping..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="year">
                                      By Year
                                    </SelectItem>
                                    <SelectItem value="quarter">
                                      By Quarter
                                    </SelectItem>
                                    <SelectItem value="month">
                                      By Month
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <FormField
                              control={form.control}
                              name="dateRange.from"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm">
                                    From Year
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="2020"
                                      min={2020}
                                      max={2030}
                                      className="h-9"
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
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dateRange.to"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm">
                                    To Year
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="2024"
                                      min={2020}
                                      max={2030}
                                      className="h-9"
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
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="h-px bg-border" />

                    {/* Filters Section */}
                    <Collapsible
                      open={openSections.filters}
                      onOpenChange={(open) =>
                        setOpenSections((prev) => ({ ...prev, filters: open }))
                      }
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          <span className="text-sm font-medium">Filters</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform text-muted-foreground group-hover:text-primary ${
                            openSections.filters ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-3 mt-3">
                          {/* States Filter */}
                          <FormField
                            control={form.control}
                            name="states"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">
                                  States
                                </FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    const current = field.value || [];
                                    if (!current.includes(value)) {
                                      field.onChange([...current, value]);
                                    }
                                  }}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-9">
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
                                {field.value && field.value.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {field.value.map((state) => (
                                      <Badge
                                        key={state}
                                        variant="secondary"
                                        className="text-xs py-0.5"
                                      >
                                        {state}
                                        <button
                                          type="button"
                                          onClick={() =>
                                            field.onChange(
                                              field.value?.filter(
                                                (s) => s !== state,
                                              ),
                                            )
                                          }
                                          className="ml-1 hover:text-destructive"
                                        >
                                          ×
                                        </button>
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </FormItem>
                            )}
                          />

                          {/* Settlement Range */}
                          <div className="grid grid-cols-2 gap-2">
                            <FormField
                              control={form.control}
                              name="settlementAmountRange.from"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm">
                                    Min Settlement
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      min={0}
                                      className="h-9"
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
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="settlementAmountRange.to"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm">
                                    Max Settlement
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="∞"
                                      min={0}
                                      className="h-9"
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
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Checkboxes */}
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name="isMultiDistrictLitigation"
                              render={({ field }) => (
                                <label className="flex items-center space-x-3 cursor-pointer">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span className="text-sm font-normal">
                                    Multi-District Litigation
                                  </span>
                                </label>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="hasMinorSubclass"
                              render={({ field }) => (
                                <label className="flex items-center space-x-3 cursor-pointer">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span className="text-sm font-normal">
                                    Has Minor Subclass
                                  </span>
                                </label>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="creditMonitoring"
                              render={({ field }) => (
                                <label className="flex items-center space-x-3 cursor-pointer">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span className="text-sm font-normal">
                                    Credit Monitoring
                                  </span>
                                </label>
                              )}
                            />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </Form>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Statistics */}
              {trendData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Time Periods
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          {trendData.length}
                        </p>
                      </div>
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Cases
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          {formatNumber(
                            trendData.reduce(
                              (sum, point) => sum + point.count,
                              0,
                            ),
                          )}
                        </p>
                      </div>
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Highest Value
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          {currentMetricInfo.format(
                            Math.max(...trendData.map((d) => d.value)),
                          )}
                        </p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Average Value
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          {currentMetricInfo.format(
                            trendData.reduce(
                              (sum, point) => sum + point.value,
                              0,
                            ) / trendData.length,
                          )}
                        </p>
                      </div>
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </Card>
                </div>
              )}

              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">
                    {currentMetricInfo.label} Trends
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {trendData.length > 0
                      ? `Showing trends across ${trendData.length} time periods`
                      : "No data available for the selected filters"}
                  </p>
                </div>
                {trendData.length > 0 ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                        <XAxis
                          dataKey="period"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => {
                            if (currentMetricInfo.label.includes("Amount")) {
                              return formatCurrency(value);
                            }
                            return formatNumber(value);
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            currentMetricInfo.format(value),
                            currentMetricInfo.label,
                          ]}
                          labelFormatter={(label) => `Period: ${label}`}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(17, 24, 39, 0.08)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={currentMetricInfo.color}
                          strokeWidth={3}
                          dot={{
                            fill: currentMetricInfo.color,
                            strokeWidth: 2,
                            r: 6,
                          }}
                          activeDot={{ r: 8, fill: currentMetricInfo.color }}
                          name={currentMetricInfo.label}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">
                      No trend data available
                    </p>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or date range to see trend
                      analysis
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
