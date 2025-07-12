"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Users,
  Search,
  FileText,
  Download,
  TrendingUp,
  Star,
  Zap,
  Building,
} from "lucide-react";

// Mock plans data
const mockPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small firms getting started",
    price: 99,
    billing: "month",
    isActive: true,
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: [
      { name: "Up to 5 team members", included: true },
      { name: "100 searches per month", included: true },
      { name: "Basic case analytics", included: true },
      { name: "Email support", included: true },
      { name: "CSV export", included: true },
      { name: "Advanced filters", included: false },
      { name: "API access", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
    ],
    limits: {
      users: 5,
      searchesPerMonth: 100,
      apiCalls: 0,
    },
    subscriberCount: 42,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing legal teams",
    price: 299,
    billing: "month",
    isActive: true,
    icon: Zap,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: [
      { name: "Up to 20 team members", included: true },
      { name: "500 searches per month", included: true },
      { name: "Advanced case analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "CSV & PDF export", included: true },
      { name: "Advanced filters", included: true },
      { name: "API access (1000 calls/month)", included: true },
      { name: "Custom branding", included: false },
      { name: "Dedicated account manager", included: false },
    ],
    limits: {
      users: 20,
      searchesPerMonth: 500,
      apiCalls: 1000,
    },
    subscriberCount: 28,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: 599,
    billing: "month",
    isActive: true,
    icon: Building,
    color: "text-green-600",
    bgColor: "bg-green-50",
    features: [
      { name: "Unlimited team members", included: true },
      { name: "Unlimited searches", included: true },
      { name: "Advanced case analytics", included: true },
      { name: "24/7 phone & email support", included: true },
      { name: "All export formats", included: true },
      { name: "Advanced filters", included: true },
      { name: "Unlimited API access", included: true },
      { name: "Custom branding", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    limits: {
      users: -1, // Unlimited
      searchesPerMonth: -1,
      apiCalls: -1,
    },
    subscriberCount: 12,
  },
  {
    id: "legacy",
    name: "Legacy Pro",
    description: "Discontinued plan for existing customers",
    price: 199,
    billing: "month",
    isActive: false,
    icon: FileText,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    features: [
      { name: "Up to 10 team members", included: true },
      { name: "250 searches per month", included: true },
      { name: "Basic case analytics", included: true },
      { name: "Email support", included: true },
      { name: "CSV export", included: true },
      { name: "Advanced filters", included: true },
      { name: "API access (500 calls/month)", included: true },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
    ],
    limits: {
      users: 10,
      searchesPerMonth: 250,
      apiCalls: 500,
    },
    subscriberCount: 7,
  },
];

export default function AdminPlansPage() {
  const [plans, setPlans] = useState(mockPlans);

  const handleTogglePlan = (planId: string) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan,
      ),
    );
  };

  const formatLimit = (limit: number) => {
    return limit === -1 ? "Unlimited" : limit.toLocaleString();
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">
              Subscription Plans
            </h1>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Plan Data
          </Button>
        </div>
      </header>

      {/* Plans Grid */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden ${
                    !plan.isActive ? "opacity-75" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${plan.bgColor}`}>
                          <Icon className={`h-6 w-6 ${plan.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {plan.name}
                            {!plan.isActive && (
                              <Badge variant="secondary" className="text-xs">
                                Inactive
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 relative z-20">
                        <span className="text-sm text-muted-foreground">
                          Active
                        </span>
                        <Switch
                          checked={plan.isActive}
                          onCheckedChange={() => handleTogglePlan(plan.id)}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.billing}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Subscriber Count */}
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">
                        Active Subscribers
                      </span>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">
                          {plan.subscriberCount}
                        </span>
                      </div>
                    </div>

                    {/* Limits */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Usage Limits</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
                          <Users className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="font-medium">
                            {formatLimit(plan.limits.users)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Users
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
                          <Search className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="font-medium">
                            {formatLimit(plan.limits.searchesPerMonth)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Searches/mo
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
                          <TrendingUp className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="font-medium">
                            {formatLimit(plan.limits.apiCalls)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            API/mo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Features</h4>
                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            {feature.included ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span
                              className={
                                feature.included
                                  ? ""
                                  : "text-muted-foreground line-through"
                              }
                            >
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
