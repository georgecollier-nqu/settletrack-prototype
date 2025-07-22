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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  MoreVertical,
  Mail,
  UserCog,
  Ban,
  Shield,
  UserPlus,
  Eye,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminUser, AdminRole } from "@/types/admin";

// Mock user data with new admin roles
const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Jackie Admin",
    email: "jackie@settletrack.com",
    avatar: "https://i.pravatar.cc/150?u=jackie",
    organization: "SettleTrack",
    role: "human_supervisor",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@settletrack.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    organization: "SettleTrack",
    role: "human_reviewer",
    status: "active",
    lastActive: "2 hours ago",
    addedBy: "jackie@settletrack.com",
    addedAt: "2024-03-10",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@settletrack.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    organization: "SettleTrack",
    role: "human_reviewer",
    status: "active",
    lastActive: "5 minutes ago",
    addedBy: "jackie@settletrack.com",
    addedAt: "2024-03-08",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@settletrack.com",
    avatar: "",
    organization: "SettleTrack",
    role: "human_reviewer",
    status: "active",
    lastActive: "1 day ago",
    addedBy: "jackie@settletrack.com",
    addedAt: "2024-03-05",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "rwilson@settletrack.com",
    avatar: "https://i.pravatar.cc/150?u=robert",
    organization: "SettleTrack",
    role: "human_reviewer",
    status: "inactive",
    lastActive: "2 weeks ago",
    addedBy: "jackie@settletrack.com",
    addedAt: "2024-02-15",
  },
];

export default function AdminUsersPage() {
  const { isHumanSupervisor, currentUser } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    organization: "SettleTrack",
  });

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

  const getRoleIcon = (role: AdminRole) => {
    switch (role) {
      case "human_supervisor":
        return <Shield className="h-3 w-3" />;
      case "human_reviewer":
        return <Eye className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: AdminRole) => {
    switch (role) {
      case "human_supervisor":
        return "destructive";
      case "human_reviewer":
        return "default";
      default:
        return "secondary";
    }
  };

  const getRoleLabel = (role: AdminRole) => {
    switch (role) {
      case "human_supervisor":
        return "Human Supervisor";
      case "human_reviewer":
        return "Human Reviewer";
      default:
        return role;
    }
  };

  const handleSendPasswordReset = (email: string, name: string) => {
    console.log(`Sending password reset email to ${email}`);
    alert(`Password reset email sent to ${name}`);
  };

  const handleAddReviewer = () => {
    const newReviewer: AdminUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      organization: newUser.organization,
      role: "human_reviewer",
      status: "active",
      lastActive: "Just now",
      addedBy: currentUser?.email,
      addedAt: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newReviewer]);
    setShowAddDialog(false);
    setNewUser({ name: "", email: "", organization: "SettleTrack" });
    console.log("Added new reviewer:", newReviewer);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const handleRemoveReviewer = (userId: string) => {
    if (confirm("Are you sure you want to remove this reviewer?")) {
      setUsers(users.filter((user) => user.id !== userId));
      console.log("Removed reviewer:", userId);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Admin Users</h1>
          </div>
          {isHumanSupervisor && (
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Reviewer
            </Button>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search admin users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} admin users (
            {filteredUsers.filter((u) => u.role === "human_reviewer").length}{" "}
            reviewers,{" "}
            {filteredUsers.filter((u) => u.role === "human_supervisor").length}{" "}
            supervisors)
          </div>
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
                <TableCell>
                  <div>
                    {user.organization}
                    {user.addedBy && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Added by {user.addedBy} on {user.addedAt}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleColor(user.role)} className="gap-1">
                    {getRoleIcon(user.role)}
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
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
                      {isHumanSupervisor && user.role === "human_reviewer" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            {user.status === "active"
                              ? "Deactivate"
                              : "Activate"}{" "}
                            User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveReviewer(user.id)}
                            className="text-destructive"
                          >
                            <UserCog className="mr-2 h-4 w-4" />
                            Remove Reviewer
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Reviewer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Human Reviewer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                placeholder="Enter reviewer's full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="reviewer@settletrack.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input
                value={newUser.organization}
                onChange={(e) =>
                  setNewUser({ ...newUser, organization: e.target.value })
                }
                placeholder="SettleTrack"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>The new reviewer will:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Have access to the QC Workflow section only</li>
                <li>Be able to review and edit case data</li>
                <li>Submit cases for your approval</li>
                <li>Receive login credentials via email</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddReviewer}
              disabled={!newUser.name || !newUser.email}
            >
              Add Reviewer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
