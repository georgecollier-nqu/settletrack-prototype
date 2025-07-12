"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useForm } from "react-hook-form";
import { TrendingUp, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterOptions, mockCases } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard-header";

type FormValues = {
  metric: string;
  timeGrouping: string;
  dateRange: {
    from: number | null;
    to: number | null;
  };
  states: string[];
  courts: string[];
  isMultiDistrictLitigation: boolean;
  creditMonitoring: boolean;
};

export default function CaseTrendsPage() {
  const form = useForm<FormValues>({
    defaultValues: {
      metric: "avgSettlement",
      timeGrouping: "year",
      dateRange: { from: null, to: null },
      states: [],
      courts: [],
      isMultiDistrictLitigation: false,
      creditMonitoring: false,
    },
  });

  // Get filtered cases based on form values
  const getFilteredCases = () => {
    const values = form.getValues();
    return mockCases.filter((case_) => {
      // Date range filter
      if (values.dateRange.from || values.dateRange.to) {
        const caseYear = case_.year;
        if (values.dateRange.from && caseYear < values.dateRange.from)
          return false;
        if (values.dateRange.to && caseYear > values.dateRange.to) return false;
      }

      // States filter
      if (values.states.length > 0 && !values.states.includes(case_.state)) {
        return false;
      }

      // Courts filter
      if (values.courts.length > 0 && !values.courts.includes(case_.court)) {
        return false;
      }

      // MDL filter
      if (
        values.isMultiDistrictLitigation &&
        !case_.isMultiDistrictLitigation
      ) {
        return false;
      }

      // Credit monitoring filter
      if (values.creditMonitoring && !case_.creditMonitoring) {
        return false;
      }

      return true;
    });
  };

  // First calculate trend data
  const trendData = useMemo(() => {
    const filteredCases = getFilteredCases();
    const values = form.getValues();

    if (filteredCases.length === 0) return [];

    // Group cases by time period
    const groupedData: Record<string, typeof filteredCases> = {};

    filteredCases.forEach((case_) => {
      let period: string;
      const caseDate = new Date(case_.date);

      if (values.timeGrouping === "year") {
        period = case_.year.toString();
      } else if (values.timeGrouping === "quarter") {
        const quarter = Math.floor((caseDate.getMonth() + 3) / 3);
        period = `${case_.year} Q${quarter}`;
      } else {
        // month
        period = caseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
      }

      if (!groupedData[period]) {
        groupedData[period] = [];
      }
      groupedData[period].push(case_);
    });

    // Calculate metric for each period
    const result = Object.entries(groupedData).map(([period, cases]) => {
      let value: number;
      const count = cases.length;

      switch (values.metric) {
        case "avgSettlement":
          value =
            cases.reduce((sum, case_) => sum + case_.settlementAmount, 0) /
            cases.length;
          break;
        case "totalSettlement":
          value = cases.reduce((sum, case_) => sum + case_.settlementAmount, 0);
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
    });

    // Sort by date
    return result.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
  }, [form.watch()]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const filteredCases = getFilteredCases();

    if (filteredCases.length === 0 || trendData.length === 0) return null;

    const dataPoints = trendData.map((d) => d.value);

    let sum = 0;
    let min = Infinity;
    let max = -Infinity;

    for (const value of dataPoints) {
      sum += value;
      if (value < min) min = value;
      if (value > max) max = value;
    }

    const average = sum / dataPoints.length;
    const sortedValues = [...dataPoints].sort((a, b) => a - b);
    const median =
      sortedValues.length % 2 === 0
        ? (sortedValues[sortedValues.length / 2 - 1] +
            sortedValues[sortedValues.length / 2]) /
          2
        : sortedValues[Math.floor(sortedValues.length / 2)];

    return {
      average,
      median,
      min,
      max,
      totalCases: filteredCases.length,
      periods: trendData.length,
    };
  }, [trendData]);

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

  return (
    <>
      <DashboardHeader title="Case Trends" />

      <main className="flex-1 overflow-y-auto bg-muted/30">
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <Form {...form}>
            {/* Filters Section */}
            <Card className="p-4 bg-white border shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => form.reset()}
                    className="h-8 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Metric, Period, and Year Range */}
                <div className="flex flex-wrap items-end gap-4">
                  <FormField
                    control={form.control}
                    name="metric"
                    render={({ field }) => (
                      <FormItem className="min-w-[180px]">
                        <FormLabel>Metric</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                      <FormItem className="min-w-[120px]">
                        <FormLabel>Time Period</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Year Range</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name="dateRange.from"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="From"
                                min={2020}
                                max={2030}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  )
                                }
                                className="w-[100px]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <span className="text-muted-foreground text-sm">to</span>
                      <FormField
                        control={form.control}
                        name="dateRange.to"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="To"
                                min={2020}
                                max={2030}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  )
                                }
                                className="w-[100px]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Location Filters */}
                <div className="flex flex-wrap gap-4">
                  {/* States */}
                  <FormField
                    control={form.control}
                    name="states"
                    render={({ field }) => (
                      <FormItem className="min-w-[200px]">
                        <FormLabel>States</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between font-normal text-left"
                              >
                                <span className="truncate">
                                  {field.value?.length
                                    ? field.value.length === 1
                                      ? field.value[0]
                                      : `${field.value.length} states`
                                    : "Select states..."}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search states..." />
                              <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                  {filterOptions.states.map((state) => (
                                    <CommandItem
                                      key={state}
                                      value={state}
                                      onSelect={() => {
                                        const current = field.value || [];
                                        field.onChange(
                                          current.includes(state)
                                            ? current.filter((s) => s !== state)
                                            : [...current, state],
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(state)
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {state}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  {/* Federal Courts */}
                  <FormField
                    control={form.control}
                    name="courts"
                    render={({ field }) => (
                      <FormItem className="min-w-[200px]">
                        <FormLabel>Federal Courts</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between font-normal text-left"
                              >
                                <span className="truncate">
                                  {field.value?.length
                                    ? field.value.length === 1
                                      ? field.value[0]
                                      : `${field.value.length} courts`
                                    : "Select courts..."}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search courts..." />
                              <CommandList>
                                <CommandEmpty>No court found.</CommandEmpty>
                                <CommandGroup>
                                  {filterOptions.courts.map((court) => (
                                    <CommandItem
                                      key={court}
                                      value={court}
                                      onSelect={() => {
                                        const current = field.value || [];
                                        field.onChange(
                                          current.includes(court)
                                            ? current.filter((c) => c !== court)
                                            : [...current, court],
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(court)
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {court}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Case Type Filters */}
                <div className="flex flex-wrap gap-6">
                  <FormField
                    control={form.control}
                    name="isMultiDistrictLitigation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          Multi-District Litigation
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="creditMonitoring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          Credit Monitoring
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>

            {/* Summary Statistics */}
            {summaryStats && (
              <Card className="p-6 bg-white border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Summary Statistics
                </h3>
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

            {/* Trend Chart */}
            <Card className="p-6 bg-white border shadow-sm">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  {currentMetricInfo.label} Over Time
                </h3>

                {trendData.length > 0 ? (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={trendData}
                        margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#E5E7EB"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="period"
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          tickFormatter={(value) =>
                            currentMetricInfo.format(value)
                          }
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
          </Form>
        </div>
      </main>
    </>
  );
}
