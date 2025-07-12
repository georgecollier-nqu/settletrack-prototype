"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  XCircle,
  Home,
  FileText,
  Users,
  TrendingUp,
  Search,
  Settings,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DesignPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorPalette = {
    primary: [
      {
        name: "Primary 700",
        variable: "--primary",
        hex: "#2E7D5B",
        usage: "Brand anchors, primary buttons",
      },
      {
        name: "Primary 600",
        hex: "#3B9671",
        usage: "Button hover, active navigation",
      },
      {
        name: "Primary 500",
        variable: "--ring",
        hex: "#4CAF82",
        usage: "Charts, subtle highlights",
      },
      {
        name: "Primary 300",
        hex: "#80CFA3",
        usage: "Disabled states, secondary accents",
      },
      {
        name: "Primary 50",
        variable: "--secondary",
        hex: "#E8F5EE",
        usage: "Chip backgrounds, table-row hover",
      },
    ],
    neutral: [
      {
        name: "Neutral 900",
        variable: "--foreground",
        hex: "#111827",
        usage: "Body text",
      },
      {
        name: "Neutral 700",
        variable: "--muted-foreground",
        hex: "#374151",
        usage: "Sub-text, table headers",
      },
      {
        name: "Neutral 300",
        variable: "--border",
        hex: "#D1D5DB",
        usage: "Borders, dividers",
      },
      {
        name: "Neutral 50",
        variable: "--background",
        hex: "#F8FAFC",
        usage: "App background",
      },
      {
        name: "White",
        variable: "--card",
        hex: "#FFFFFF",
        usage: "Card surfaces",
      },
    ],
    status: [
      {
        name: "Success 600",
        variable: "--success",
        hex: "#2E7D32",
        usage: "Positive badges, success toasts",
      },
      {
        name: "Warning 600",
        variable: "--warning",
        hex: "#B45309",
        usage: "Warning banners, cautions",
      },
      {
        name: "Error 600",
        variable: "--destructive",
        hex: "#991B1B",
        usage: "Destructive actions, errors",
      },
      {
        name: "Info 600",
        variable: "--info",
        hex: "#2E7D5B",
        usage: "Neutral information, outlines",
      },
    ],
    chart: [
      {
        name: "Chart 1",
        variable: "--chart-1",
        hex: "#4CAF82",
        usage: "Primary series",
      },
      {
        name: "Chart 2",
        variable: "--chart-2",
        hex: "#5AA5DA",
        usage: "Secondary series",
      },
      {
        name: "Chart 3",
        variable: "--chart-3",
        hex: "#F4AF3D",
        usage: "Tertiary series",
      },
      {
        name: "Chart 4",
        variable: "--chart-4",
        hex: "#B45309",
        usage: "Warning series",
      },
      {
        name: "Chart 5",
        variable: "--chart-5",
        hex: "#2E86DE",
        usage: "Azure series",
      },
      {
        name: "Chart 6",
        variable: "--chart-6",
        hex: "#FF6B6B",
        usage: "Error series",
      },
      {
        name: "Chart 7",
        variable: "--chart-7",
        hex: "#8E44AD",
        usage: "Purple series",
      },
      {
        name: "Chart 8",
        variable: "--chart-8",
        hex: "#2E7D5B",
        usage: "Deep green series",
      },
    ],
  };

  const typography = {
    headings: [
      {
        name: "H1",
        className:
          "text-[32px] leading-[40px] font-bold font-serif tracking-[-0.5px]",
        sample: "Primary Page Heading",
        specs: "32px / 40px · 700 · -0.5",
      },
      {
        name: "H2",
        className:
          "text-[24px] leading-[32px] font-bold font-serif tracking-[-0.25px]",
        sample: "Section Heading",
        specs: "24px / 32px · 700 · -0.25",
      },
      {
        name: "H3",
        className: "text-[20px] leading-[28px] font-bold font-serif",
        sample: "Sub-section Heading",
        specs: "20px / 28px · 700 · 0",
      },
    ],
    body: [
      {
        name: "Body Large",
        className: "text-[16px] leading-[24px]",
        sample: "This is the primary body text style for main content areas.",
        specs: "16px / 24px · 400 · 0",
      },
      {
        name: "Body Small",
        className: "text-[14px] leading-[20px]",
        sample:
          "Secondary body text is used for supporting content and descriptions.",
        specs: "14px / 20px · 400 · 0",
      },
      {
        name: "Caption",
        className:
          "text-[12px] leading-[16px] font-medium tracking-[0.5px] uppercase",
        sample: "CAPTIONS ARE USED FOR LABELS",
        specs: "12px / 16px · 500 · +0.5",
      },
      {
        name: "Mono",
        className: "font-mono text-[13px] leading-[20px]",
        sample: "SET-123456-A",
        specs: "13px / 20px · 400 · 0",
      },
    ],
  };

  const spacing = [
    { token: "2", value: "2px", className: "w-0.5 h-8" },
    { token: "4", value: "4px", className: "w-1 h-8" },
    { token: "8", value: "8px", className: "w-2 h-8" },
    { token: "12", value: "12px", className: "w-3 h-8" },
    { token: "16", value: "16px", className: "w-4 h-8" },
    { token: "24", value: "24px", className: "w-6 h-8" },
    { token: "32", value: "32px", className: "w-8 h-8" },
    { token: "48", value: "48px", className: "w-12 h-8" },
    { token: "64", value: "64px", className: "w-16 h-8" },
  ];

  const icons = [
    { icon: Home, name: "Home", usage: "Dashboard" },
    { icon: FileText, name: "FileText", usage: "Cases" },
    { icon: Users, name: "Users", usage: "Team" },
    { icon: TrendingUp, name: "TrendingUp", usage: "Trends" },
    { icon: Search, name: "Search", usage: "Search" },
    { icon: Settings, name: "Settings", usage: "Settings" },
    { icon: HelpCircle, name: "HelpCircle", usage: "Help" },
    { icon: CreditCard, name: "CreditCard", usage: "Billing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-[32px] leading-[40px] font-bold font-serif tracking-[-0.5px]">
            SettleTrack Design System
          </h1>
          <p className="text-muted-foreground mt-2">
            A comprehensive guide to our design language, components, and
            patterns
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 py-8">
        <Tabs defaultValue="colors" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  Our color system is built on HSL values for flexibility and
                  includes full dark mode support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Primary Colors */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-4">
                    Primary Brand Colors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colorPalette.primary.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedColor(color.hex)}
                      >
                        <div
                          className="w-16 h-16 rounded-md shadow-sm border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{color.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {color.hex}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Neutral Colors */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-4">
                    Neutral Colors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colorPalette.neutral.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedColor(color.hex)}
                      >
                        <div
                          className="w-16 h-16 rounded-md shadow-sm border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{color.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {color.hex}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Status Colors */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-4">
                    Status Colors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {colorPalette.status.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedColor(color.hex)}
                      >
                        <div
                          className="w-16 h-16 rounded-md shadow-sm border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{color.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {color.hex}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Chart Colors */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-4">
                    Data Visualization Palette
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {colorPalette.chart.map((color) => (
                      <div
                        key={color.name}
                        className="text-center cursor-pointer"
                        onClick={() => setSelectedColor(color.hex)}
                      >
                        <div
                          className="w-full aspect-square rounded-md shadow-sm border mb-2"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs font-medium">{color.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {color.hex}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedColor && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Color Copied!</AlertTitle>
                    <AlertDescription>
                      {selectedColor} has been copied to your clipboard.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>
                  Our typographic system pairs Merriweather serif for headings
                  with Inter sans-serif for body copy and IBM Plex Mono for
                  code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Headings */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-6">
                    Headings
                  </h3>
                  <div className="space-y-6">
                    {typography.headings.map((type) => (
                      <div key={type.name} className="flex flex-col space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className={type.className}>{type.sample}</span>
                          <span className="text-sm text-muted-foreground">
                            {type.specs}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {type.name} · Merriweather
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Text */}
                <div>
                  <h3 className="text-[20px] leading-[28px] font-bold font-serif mb-6">
                    Body Text
                  </h3>
                  <div className="space-y-6">
                    {typography.body.map((type) => (
                      <div key={type.name} className="flex flex-col space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className={type.className}>{type.sample}</span>
                          <span className="text-sm text-muted-foreground">
                            {type.specs}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {type.name} ·{" "}
                          {type.name.includes("Mono")
                            ? "IBM Plex Mono"
                            : "Inter"}
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Button variants with consistent padding (12px × 20px) and 8px
                  border radius.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="secondary" disabled>
                    Disabled
                  </Button>
                  <Button variant="outline" disabled>
                    Disabled
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>
                  Consistent height (40px) with 4px border radius and focus
                  states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="input">Input</Label>
                    <Input id="input" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="select">Select</Label>
                    <Select>
                      <SelectTrigger id="select">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <Textarea
                      id="textarea"
                      placeholder="Enter longer text..."
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox" />
                      <Label htmlFor="checkbox">Checkbox</Label>
                    </div>
                    <RadioGroup defaultValue="radio1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radio1" id="radio1" />
                        <Label htmlFor="radio1">Radio 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radio2" id="radio2" />
                        <Label htmlFor="radio2">Radio 2</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch" />
                      <Label htmlFor="switch">Switch</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="error">Input with Error</Label>
                  <Input
                    id="error"
                    placeholder="Error state"
                    className="border-destructive"
                  />
                  <p className="text-sm text-destructive">
                    This field is required
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                  Status badges with semantic colors and consistent styling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-success text-success-foreground">
                    Success
                  </Badge>
                  <Badge className="bg-warning text-warning-foreground">
                    Warning
                  </Badge>
                  <Badge className="bg-info text-info-foreground">Info</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>
                  Inline alert messages with status colors and icons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>
                    This is an informational message with neutral styling.
                  </AlertDescription>
                </Alert>
                <Alert className="border-success/50 bg-success/5 text-success [&>svg]:text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>
                <Alert className="border-warning/50 bg-warning/5 text-warning [&>svg]:text-warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Please review your input before proceeding.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was an error processing your request.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-8">
            {/* Spacing */}
            <Card>
              <CardHeader>
                <CardTitle>Spacing System</CardTitle>
                <CardDescription>
                  8pt grid system for consistent spacing throughout the
                  application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spacing.map((space) => (
                    <div
                      key={space.token}
                      className="flex items-center space-x-4"
                    >
                      <span className="text-sm font-mono w-12">
                        {space.token}
                      </span>
                      <div className={cn("bg-primary", space.className)} />
                      <span className="text-sm text-muted-foreground">
                        {space.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Iconography</CardTitle>
                <CardDescription>
                  Lucide icons with standardized sizing (16px inline, 20px
                  navigation).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {icons.map(({ icon: Icon, name, usage }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className="p-4 rounded-lg bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground">
                        {usage}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Elevation */}
            <Card>
              <CardHeader>
                <CardTitle>Elevation & Shadows</CardTitle>
                <CardDescription>
                  Subtle shadows for depth and visual hierarchy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="p-6 bg-card rounded-lg">
                      <p className="font-medium mb-2">Base (e0)</p>
                      <p className="text-sm text-muted-foreground">No shadow</p>
                    </div>
                  </div>
                  <div>
                    <div className="p-6 bg-card rounded-lg shadow-sm">
                      <p className="font-medium mb-2">Elevated (e1)</p>
                      <p className="text-sm text-muted-foreground">
                        Cards, containers
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="p-6 bg-card rounded-lg shadow-md">
                      <p className="font-medium mb-2">Overlay (e2)</p>
                      <p className="text-sm text-muted-foreground">
                        Dropdowns, popovers
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-8">
            {/* Table Example */}
            <Card>
              <CardHeader>
                <CardTitle>Data Table</CardTitle>
                <CardDescription>
                  Tables with zebra striping and hover states.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Settlement Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">SET-123456-A</TableCell>
                      <TableCell>$2,500,000</TableCell>
                      <TableCell>
                        <Badge className="bg-success text-success-foreground">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2024-01-15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">SET-123457-B</TableCell>
                      <TableCell>$1,800,000</TableCell>
                      <TableCell>
                        <Badge className="bg-warning text-warning-foreground">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2024-01-16</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">SET-123458-C</TableCell>
                      <TableCell>$3,200,000</TableCell>
                      <TableCell>
                        <Badge className="bg-info text-info-foreground">
                          In Review
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2024-01-17</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Card Grid Example */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Cases</CardTitle>
                  <CardDescription>All time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[24px] leading-[32px] font-bold font-serif tracking-[-0.25px]">
                    1,234
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Settlement</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[24px] leading-[32px] font-bold font-serif tracking-[-0.25px]">
                    $2.4M
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ↑ $300K from average
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                  <CardDescription>Year to date</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[24px] leading-[32px] font-bold font-serif tracking-[-0.25px]">
                    87%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Above industry average
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
