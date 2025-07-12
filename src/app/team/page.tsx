"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
import { Textarea } from "@/components/ui/textarea";
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
  Search,
  TrendingUp,
  FileText,
  Bookmark,
  Settings,
  CreditCard,
  Users,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  Bell,
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  UserX,
  Download,
  Upload,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "team_leader" | "user";
  status: "active" | "invited" | "deactivated";
  jobTitle: string;
  joinedDate: string;
  lastActive: string;
  avatar?: string;
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [bulkAction, setBulkAction] = useState<"invite" | "import" | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@lawfirm.com",
      role: "team_leader",
      status: "active",
      jobTitle: "Managing Partner",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@lawfirm.com",
      role: "user",
      status: "active",
      jobTitle: "Senior Associate",
      joinedDate: "2024-02-20",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael@lawfirm.com",
      role: "user",
      status: "active",
      jobTitle: "Associate",
      joinedDate: "2024-03-10",
      lastActive: "Yesterday",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@lawfirm.com",
      role: "user",
      status: "invited",
      jobTitle: "Junior Associate",
      joinedDate: "2024-12-10",
      lastActive: "Never",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert@lawfirm.com",
      role: "user",
      status: "deactivated",
      jobTitle: "Paralegal",
      joinedDate: "2024-01-20",
      lastActive: "30 days ago",
    },
  ]);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeCount = teamMembers.filter((m) => m.status === "active").length;
  const invitedCount = teamMembers.filter((m) => m.status === "invited").length;
  const deactivatedCount = teamMembers.filter(
    (m) => m.status === "deactivated",
  ).length;

  const handleInviteMembers = () => {
    // In a real app, this would send invites
    const emails = inviteEmails
      .split(/[\n,]/)
      .map((e) => e.trim())
      .filter((e) => e);
    console.log("Inviting:", emails);
    setInviteDialogOpen(false);
    setInviteEmails("");
  };

  const handleRoleChange = (memberId: string, newRole: "team_leader" | "user") => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
  };

  const handleStatusChange = (
    memberId: string,
    newStatus: "active" | "deactivated",
  ) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, status: newStatus } : member,
      ),
    );
  };

  const handleResendInvite = (memberId: string) => {
    console.log("Resending invite to:", memberId);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b px-6 py-4">
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="SettleTrack"
                width={186}
                height={42}
                className="h-8 w-auto"
              />
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/cases/search"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <Search className="h-5 w-5" />
                    Case Search
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/cases/trends"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <TrendingUp className="h-5 w-5" />
                    Case Trends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/saved-searches"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <Bookmark className="h-5 w-5" />
                    Saved Searches
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Separator */}
              <div className="my-4 border-t" />

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/team"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary text-primary font-medium"
                  >
                    <Users className="h-5 w-5" />
                    Team Management
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/billing"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <CreditCard className="h-5 w-5" />
                    Billing
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help at bottom */}
              <div className="mt-auto pt-4 border-t">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
                    >
                      <HelpCircle className="h-5 w-5" />
                      Help & Support
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-2xl font-serif font-bold">Team Management</h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                </Button>

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
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">
                          john@lawfirm.com
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
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Team Management Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="!py-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Seats</p>
                        <p className="text-2xl font-bold mt-1">10</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          In your plan
                        </p>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="!py-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-2xl font-bold mt-1">{activeCount}</p>
                        <p className="text-xs text-success mt-1">
                          {10 - activeCount} seats available
                        </p>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="!py-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Pending Invites
                        </p>
                        <p className="text-2xl font-bold mt-1">{invitedCount}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Awaiting response
                        </p>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="!py-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Deactivated</p>
                        <p className="text-2xl font-bold mt-1">{deactivatedCount}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Not using seats
                        </p>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg">
                        <UserX className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Members Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>
                        Manage your firm's users and their access levels
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <MoreVertical className="mr-2 h-4 w-4" />
                            Bulk Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => setBulkAction("import")}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Import CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Members
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Invite Team Members</DialogTitle>
                            <DialogDescription>
                              Enter email addresses to send invitations. Separate multiple
                              emails with commas or new lines.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="emails">Email Addresses</Label>
                              <Textarea
                                id="emails"
                                placeholder="john@example.com, jane@example.com"
                                className="min-h-[120px]"
                                value={inviteEmails}
                                onChange={(e) => setInviteEmails(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                {10 - activeCount} seats remaining in your plan
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setInviteDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleInviteMembers}>
                              Send Invitations
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, email, or job title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Team Members Table */}
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                      {getInitials(member.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {member.email}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {member.jobTitle}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {member.role === "team_leader" ? (
                                  <Badge variant="default">Team Leader</Badge>
                                ) : (
                                  <Badge variant="secondary">Member</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {member.status === "active" && (
                                  <Badge className="bg-success/10 text-success border-0">
                                    Active
                                  </Badge>
                                )}
                                {member.status === "invited" && (
                                  <Badge className="bg-warning/10 text-warning border-0">
                                    Invited
                                  </Badge>
                                )}
                                {member.status === "deactivated" && (
                                  <Badge
                                    variant="secondary"
                                    className="text-muted-foreground"
                                  >
                                    Deactivated
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {new Date(member.joinedDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {member.lastActive}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {member.status === "active" && (
                                      <>
                                        {member.role === "user" && (
                                          <DropdownMenuItem
                                            onClick={() =>
                                              handleRoleChange(member.id, "team_leader")
                                            }
                                          >
                                            <Shield className="mr-2 h-4 w-4" />
                                            Promote to Team Leader
                                          </DropdownMenuItem>
                                        )}
                                        {member.role === "team_leader" &&
                                          member.id !== "1" && (
                                            <DropdownMenuItem
                                              onClick={() =>
                                                handleRoleChange(member.id, "user")
                                              }
                                            >
                                              <Users className="mr-2 h-4 w-4" />
                                              Change to Member
                                            </DropdownMenuItem>
                                          )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-destructive"
                                          onClick={() =>
                                            handleStatusChange(member.id, "deactivated")
                                          }
                                        >
                                          <UserX className="mr-2 h-4 w-4" />
                                          Deactivate User
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    {member.status === "invited" && (
                                      <DropdownMenuItem
                                        onClick={() => handleResendInvite(member.id)}
                                      >
                                        <Mail className="mr-2 h-4 w-4" />
                                        Resend Invitation
                                      </DropdownMenuItem>
                                    )}
                                    {member.status === "deactivated" && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleStatusChange(member.id, "active")
                                        }
                                      >
                                        <Shield className="mr-2 h-4 w-4" />
                                        Reactivate User
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}