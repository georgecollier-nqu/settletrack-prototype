"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreVertical,
  Mail,
  UserCog,
  Ban,
  Shield,
  Building,
} from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@lawfirm.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    organization: "Johnson & Associates",
    role: "Team Leader",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@legalcorp.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    organization: "Legal Corp",
    role: "User",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@smithlaw.com",
    avatar: "",
    organization: "Smith Law Group",
    role: "Team Leader",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "rwilson@corporate.law",
    avatar: "https://i.pravatar.cc/150?u=robert",
    organization: "Corporate Law Partners",
    role: "User",
    status: "inactive",
    lastActive: "2 weeks ago",
  },
  {
    id: "5",
    name: "Lisa Martinez",
    email: "lisa.m@justice.com",
    avatar: "",
    organization: "Justice Law Firm",
    role: "Admin",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "6",
    name: "David Thompson",
    email: "d.thompson@legalaid.org",
    avatar: "https://i.pravatar.cc/150?u=david",
    organization: "Legal Aid Services",
    role: "User",
    status: "active",
    lastActive: "3 hours ago",
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-3 w-3" />;
      case "Team Leader":
        return <Building className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "Team Leader":
        return "default";
      default:
        return "secondary";
    }
  };

  const handleSendPasswordReset = (email: string, name: string) => {
    // In a real app, this would send a password reset email
    console.log(`Sending password reset email to ${email}`);
    // Show a toast notification
    alert(`Password reset email sent to ${name}`);
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Users</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} users
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.organization}</TableCell>
                <TableCell>
                  <Badge variant={getRoleColor(user.role)} className="gap-1">
                    {getRoleIcon(user.role)}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "success" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleSendPasswordReset(user.email, user.name)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Password Reset
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Deactivate User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
