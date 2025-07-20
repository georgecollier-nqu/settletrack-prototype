"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Settings,
  CreditCard,
  LogOut,
  HelpCircle,
  Download,
  AlertCircle,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { usePermissions } from "@/hooks/use-permissions";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
}

export default function BillingPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const permissions = usePermissions();
  const [updateCardDialogOpen, setUpdateCardDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check permissions
  useEffect(() => {
    if (!permissions.canAccessBilling) {
      router.push("/dashboard");
      toast.error("You don't have permission to access this page");
    }
  }, [permissions, router]);

  // Mock subscription data
  const subscription = {
    status: "active",
    plan: "Professional",
    seats: 10,
    usedSeats: 6,
    price: 299,
    nextBillingDate: "2025-01-15",
    cardLast4: "4242",
    cardExpiry: "12/25",
    cardBrand: "Visa",
  };

  // Mock invoice data
  const invoices: Invoice[] = [
    {
      id: "INV-2024-012",
      date: "2024-12-15",
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2024-011",
      date: "2024-11-15",
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2024-010",
      date: "2024-10-15",
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2024-009",
      date: "2024-09-15",
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2024-008",
      date: "2024-08-15",
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
  ];

  const planFeatures = {
    Professional: [
      "Up to 10 team members",
      "Unlimited case searches",
      "Advanced filtering and analytics",
      "Export to CSV",
      "Email support",
      "99.9% uptime SLA",
    ],
    Enterprise: [
      "Unlimited team members",
      "Everything in Professional",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Priority support",
      "Custom training",
    ],
  };

  const handleUpdateCard = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setUpdateCardDialogOpen(false);
    }, 2000);
  };

  const handleManageSubscription = () => {
    toast.info(
      "In production, this will open the Stripe subscription management portal where you can update your plan, payment method, or cancel your subscription.",
    );
  };

  const seatUsagePercentage =
    (subscription.usedSeats / subscription.seats) * 100;

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Billing</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <NotificationsDropdown />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || "John Doe"}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || "john@lawfirm.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Billing Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Subscription Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Plan */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing details
                    </CardDescription>
                  </div>
                  <Badge className="bg-success/10 text-success border-0">
                    {subscription.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <h3 className="text-xl font-serif font-bold">
                      {subscription.plan} Plan
                    </h3>
                    <p className="text-muted-foreground">
                      ${subscription.price}/month
                    </p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Seat Usage</span>
                      <span className="text-sm text-muted-foreground">
                        {subscription.usedSeats} of {subscription.seats} seats
                        used
                      </span>
                    </div>
                    <Progress value={seatUsagePercentage} className="h-2" />
                    {seatUsagePercentage > 80 && (
                      <p className="text-xs text-warning mt-1">
                        You&apos;re approaching your seat limit
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Next billing date
                      </p>
                      <p className="font-medium flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          subscription.nextBillingDate,
                        ).toLocaleDateString("en-US")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Renewal amount
                      </p>
                      <p className="font-medium mt-1">
                        ${subscription.price}.00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium">Plan Features</h4>
                  <ul className="space-y-2">
                    {planFeatures.Professional.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {subscription.cardBrand} •••• {subscription.cardLast4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {subscription.cardExpiry}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Default
                    </Badge>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Your card expires soon. Update it to avoid service
                    interruption.
                  </AlertDescription>
                </Alert>

                <Dialog
                  open={updateCardDialogOpen}
                  onOpenChange={setUpdateCardDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Update Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new card to keep your subscription active.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setUpdateCardDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpdateCard}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Update Card"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleManageSubscription}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>
                    Download past invoices for your records
                  </CardDescription>
                </div>
                <Button variant="outline" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.id}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.date).toLocaleDateString("en-US")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {invoice.description}
                        </TableCell>
                        <TableCell>${invoice.amount}.00</TableCell>
                        <TableCell>
                          {invoice.status === "paid" && (
                            <Badge className="bg-success/10 text-success border-0">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Paid
                            </Badge>
                          )}
                          {invoice.status === "pending" && (
                            <Badge className="bg-warning/10 text-warning border-0">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {invoice.status === "failed" && (
                            <Badge className="bg-error/10 text-error border-0">
                              <XCircle className="mr-1 h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
