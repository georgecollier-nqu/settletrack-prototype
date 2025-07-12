"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Building,
  Users,
  CreditCard,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock organization data
const mockOrganizations = [
  {
    id: "1",
    name: "Johnson & Associates",
    logo: "https://i.pravatar.cc/150?u=org1",
    members: 12,
    subscription: {
      plan: "Professional",
      status: "active",
      nextBilling: "2024-04-15",
      amount: 299,
    },
    contact: {
      email: "admin@johnsonlaw.com",
      phone: "(555) 123-4567",
      address: "123 Legal Ave, New York, NY 10001",
    },
    created: "2023-01-15",
    totalCasesSearched: 1847,
  },
  {
    id: "2",
    name: "Legal Corp",
    logo: "",
    members: 8,
    subscription: {
      plan: "Enterprise",
      status: "active",
      nextBilling: "2024-04-01",
      amount: 599,
    },
    contact: {
      email: "info@legalcorp.com",
      phone: "(555) 234-5678",
      address: "456 Law Street, Los Angeles, CA 90001",
    },
    created: "2023-03-22",
    totalCasesSearched: 923,
  },
  {
    id: "3",
    name: "Smith Law Group",
    logo: "https://i.pravatar.cc/150?u=org3",
    members: 5,
    subscription: {
      plan: "Starter",
      status: "active",
      nextBilling: "2024-03-28",
      amount: 99,
    },
    contact: {
      email: "contact@smithlaw.com",
      phone: "(555) 345-6789",
      address: "789 Justice Blvd, Chicago, IL 60601",
    },
    created: "2023-06-10",
    totalCasesSearched: 467,
  },
  {
    id: "4",
    name: "Corporate Law Partners",
    logo: "",
    members: 15,
    subscription: {
      plan: "Professional",
      status: "cancelled",
      nextBilling: null,
      amount: 299,
    },
    contact: {
      email: "admin@corplaw.com",
      phone: "(555) 456-7890",
      address: "321 Corporate Plaza, Houston, TX 77001",
    },
    created: "2022-11-05",
    totalCasesSearched: 2134,
  },
  {
    id: "5",
    name: "Justice Law Firm",
    logo: "https://i.pravatar.cc/150?u=org5",
    members: 20,
    subscription: {
      plan: "Enterprise",
      status: "active",
      nextBilling: "2024-04-20",
      amount: 599,
    },
    contact: {
      email: "billing@justicelaw.com",
      phone: "(555) 567-8901",
      address: "555 Court St, Boston, MA 02101",
    },
    created: "2022-09-18",
    totalCasesSearched: 3892,
  },
  {
    id: "6",
    name: "Legal Aid Services",
    logo: "",
    members: 3,
    subscription: null,
    contact: {
      email: "info@legalaid.org",
      phone: "(555) 678-9012",
      address: "777 Help Ave, Seattle, WA 98101",
    },
    created: "2023-12-01",
    totalCasesSearched: 89,
  },
];

export default function AdminOrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [organizations] = useState(mockOrganizations);

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPlanColor = (plan: string | null) => {
    switch (plan) {
      case "Enterprise":
        return "default";
      case "Professional":
        return "secondary";
      case "Starter":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "active":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleSendInvoice = (org: (typeof mockOrganizations)[0]) => {
    console.log(`Sending invoice to ${org.contact.email}`);
    alert(`Invoice sent to ${org.name}`);
  };

  const handleManageSubscription = (org: (typeof mockOrganizations)[0]) => {
    console.log(`Managing subscription for ${org.name}`);
    alert(`Opening subscription management for ${org.name}`);
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Organizations</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredOrganizations.length} organizations
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search organizations by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrganizations.map((org) => (
            <Card key={org.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={org.logo} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(org.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3" />
                        {org.members} members
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSendInvoice(org)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleManageSubscription(org)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage Subscription
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Building className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subscription Info */}
                <div className="space-y-2">
                  {org.subscription ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Badge variant={getPlanColor(org.subscription.plan)}>
                          {org.subscription.plan}
                        </Badge>
                        <Badge
                          variant={getStatusColor(org.subscription.status)}
                        >
                          {org.subscription.status}
                        </Badge>
                      </div>
                      {org.subscription.status === "active" && (
                        <div className="text-sm text-muted-foreground">
                          <p className="flex items-center justify-between">
                            <span>Next billing:</span>
                            <span className="font-medium">
                              {new Date(
                                org.subscription.nextBilling!,
                              ).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span>Monthly amount:</span>
                            <span className="font-medium">
                              ${org.subscription.amount}
                            </span>
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <Badge variant="outline">No subscription</Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">
                      {org.contact.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {org.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">
                      {org.contact.address}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between border-t pt-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Since {new Date(org.created).getFullYear()}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {org.totalCasesSearched.toLocaleString()} searches
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
