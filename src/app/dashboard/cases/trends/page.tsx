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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Plus, X } from "lucide-react";
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
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const form = useForm<TrendFilterValues>({
    resolver: zodResolver(trendFilterSchema),
    defaultValues: {
      metric: "avgSettlement",
      timeGrouping: "month",
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
          color: "#2E7D5B", // Primary 700
        };
      case "totalSettlement":
        return {
          label: "Total Settlement Amount",
          format: formatCurrency,
          color: "#3B9671", // Primary 600
        };
      case "caseCount":
        return {
          label: "Number of Cases",
          format: formatNumber,
          color: "#4CAF82", // Primary 500
        };
      case "avgClassSize":
        return {
          label: "Average Class Size",
          format: formatNumber,
          color: "#80CFA3", // Primary 300
        };
      case "medianSettlement":
        return {
          label: "Median Settlement Amount",
          format: formatCurrency,
          color: "#2E7D5B", // Primary 700
        };
      default:
        return { label: "Value", format: formatNumber, color: "#2E7D5B" };
    }
  };

  const currentMetricInfo = getMetricInfo(form.watch("metric"));

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (trendData.length === 0) return null;

    const values = trendData.map((d) => d.value);
    const sortedValues = [...values].sort((a, b) => a - b);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const median =
      sortedValues.length % 2 === 0
        ? (sortedValues[sortedValues.length / 2 - 1] +
            sortedValues[sortedValues.length / 2]) /
          2
        : sortedValues[Math.floor(sortedValues.length / 2)];

    const totalCases = trendData.reduce((sum, d) => sum + d.count, 0);

    return {
      average,
      median,
      min: Math.min(...values),
      max: Math.max(...values),
      totalCases,
      periods: trendData.length,
    };
  }, [trendData]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: {
      label: string;
      value: string;
      field: keyof TrendFilterValues;
    }[] = [];
    const values = form.getValues();

    if (values.states && values.states.length > 0) {
      values.states.forEach((state) =>
        filters.push({ label: "State", value: state, field: "states" }),
      );
    }
    if (values.courts && values.courts.length > 0) {
      values.courts.forEach((court) =>
        filters.push({ label: "Court", value: court, field: "courts" }),
      );
    }
    if (values.isMultiDistrictLitigation) {
      filters.push({
        label: "Multi-District",
        value: "Yes",
        field: "isMultiDistrictLitigation",
      });
    }
    if (values.creditMonitoring) {
      filters.push({
        label: "Credit Monitoring",
        value: "Yes",
        field: "creditMonitoring",
      });
    }
    if (values.dateRange?.from || values.dateRange?.to) {
      const from = values.dateRange.from || "Any";
      const to = values.dateRange.to || "Any";
      filters.push({
        label: "Year Range",
        value: `${from}-${to}`,
        field: "dateRange",
      });
    }

    return filters;
  }, [form.watch()]);

  const removeFilter = (field: keyof TrendFilterValues, value?: string) => {
    const currentValues = form.getValues();

    if (
      field === "states" ||
      field === "courts" ||
      field === "piiAffected" ||
      field === "causeOfBreach" ||
      field === "classType" ||
      field === "settlementType"
    ) {
      const array = currentValues[field] as string[];
      form.setValue(
        field,
        array.filter((v) => v !== value),
      );
    } else if (
      field === "isMultiDistrictLitigation" ||
      field === "creditMonitoring" ||
      field === "hasMinorSubclass"
    ) {
      form.setValue(field, undefined);
    } else if (field === "dateRange") {
      form.setValue(field, undefined);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">
            Case Trends Analysis
          </h1>
        </div>

        {/* Filter Controls */}
        <Card className="p-4 bg-white border shadow-sm">
          <Form {...form}>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <FormField
                    control={form.control}
                    name="metric"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormLabel className="font-medium whitespace-nowrap">
                          Metric:
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select metric..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="avgSettlement">
                              Average Payout
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
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormLabel className="font-medium whitespace-nowrap">
                          Period:
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Select period..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="quarter">Quarterly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <Popover
                  open={filterPopoverOpen}
                  onOpenChange={setFilterPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Filter
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-3">
                      <h4 className="font-medium">Add Filters</h4>

                      <Select
                        value={selectedFilter}
                        onValueChange={setSelectedFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose filter type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="states">State</SelectItem>
                          <SelectItem value="courts">Federal Court</SelectItem>
                          <SelectItem value="dateRange">Year Range</SelectItem>
                          <SelectItem value="isMultiDistrictLitigation">
                            Multi-District Litigation
                          </SelectItem>
                          <SelectItem value="creditMonitoring">
                            Credit Monitoring
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {selectedFilter === "states" && (
                        <FormField
                          control={form.control}
                          name="states"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={(value) => {
                                  const current = field.value || [];
                                  if (!current.includes(value)) {
                                    field.onChange([...current, value]);
                                    setSelectedFilter("");
                                  }
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state..." />
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
                            </FormItem>
                          )}
                        />
                      )}

                      {selectedFilter === "dateRange" && (
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="dateRange.from"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">From</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="2020"
                                    min={2020}
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
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dateRange.to"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">To</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="2024"
                                    min={2020}
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
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {(selectedFilter === "isMultiDistrictLitigation" ||
                        selectedFilter === "creditMonitoring") && (
                        <FormField
                          control={form.control}
                          name={
                            selectedFilter as
                              | "isMultiDistrictLitigation"
                              | "creditMonitoring"
                          }
                          render={({ field }) => (
                            <FormItem>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    setSelectedFilter("");
                                    setFilterPopoverOpen(false);
                                  }}
                                />
                                <span className="text-sm font-normal">
                                  {selectedFilter ===
                                  "isMultiDistrictLitigation"
                                    ? "Multi-District Litigation Only"
                                    : "Credit Monitoring Offered"}
                                </span>
                              </label>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Active Filters Display */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      <span className="text-xs font-medium">
                        {filter.label}:
                      </span>
                      <span className="text-xs">{filter.value}</span>
                      <button
                        type="button"
                        onClick={() => removeFilter(filter.field, filter.value)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Form>
        </Card>

        {/* Main Chart */}
        <Card className="p-6 bg-white border shadow-sm">
          <div className="space-y-6">
            {trendData.length > 0 ? (
              <>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#D1D5DB"
                        opacity={0.4}
                      />
                      <XAxis
                        dataKey="period"
                        tick={{ fontSize: 12, fill: "#374151" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#374151" }}
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
                          "",
                        ]}
                        labelFormatter={(label) => `${label}`}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(17, 24, 39, 0.08)",
                          padding: "8px 12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={currentMetricInfo.color}
                        strokeWidth={3}
                        dot={{
                          fill: currentMetricInfo.color,
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ r: 6, fill: currentMetricInfo.color }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <TrendingUp className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-neutral-700">
                  No trend data available
                </p>
                <p className="text-neutral-500 mt-1">
                  Try adjusting your filters to see trend analysis
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Summary Statistics */}
        {summaryStats && (
          <Card className="p-6 bg-white border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Average</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {currentMetricInfo.format(summaryStats.average)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Median</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {currentMetricInfo.format(summaryStats.median)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Minimum</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {currentMetricInfo.format(summaryStats.min)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Maximum</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {currentMetricInfo.format(summaryStats.max)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Cases</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {formatNumber(summaryStats.totalCases)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Time Periods</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {summaryStats.periods}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
