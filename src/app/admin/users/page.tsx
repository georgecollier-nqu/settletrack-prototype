"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  UserPlus,
  ClipboardCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

// Mock user data with updated roles
const mockUsers = [
  {
    id: "1",
    name: "Jackie Johnson",
    email: "jackie@johnsonlaw.com",
    avatar: "https://i.pravatar.cc/150?u=jackie",
    organization: "Johnson & Associates Law Firm",
    role: "SUPERVISOR",
    status: "active",
    lastActive: "Just now",
    reviewStats: { assigned: 0, completed: 0 },
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah.miller@johnsonlaw.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    organization: "Johnson & Associates Law Firm",
    role: "REVIEWER",
    status: "active",
    lastActive: "2 hours ago",
    reviewStats: { assigned: 12, completed: 8 },
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@medreview.com",
    avatar: "https://i.pravatar.cc/150?u=mike",
    organization: "Medical Review Corp",
    role: "REVIEWER",
    status: "active",
    lastActive: "5 minutes ago",
    reviewStats: { assigned: 15, completed: 14 },
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@medreview.com",
    avatar: "",
    organization: "Medical Review Corp",
    role: "REVIEWER",
    status: "active",
    lastActive: "1 day ago",
    reviewStats: { assigned: 8, completed: 5 },
  },
  {
    id: "5",
    name: "John Doe",
    email: "john.doe@johnsonlaw.com",
    avatar: "https://i.pravatar.cc/150?u=john",
    organization: "Johnson & Associates Law Firm",
    role: "USER",
    status: "active",
    lastActive: "2 weeks ago",
    reviewStats: { assigned: 0, completed: 0 },
  },
  {
    id: "6",
    name: "Lisa Martinez",
    email: "lisa.martinez@medreview.com",
    avatar: "",
    organization: "Medical Review Corp",
    role: "REVIEWER",
    status: "inactive",
    lastActive: "1 month ago",
    reviewStats: { assigned: 20, completed: 18 },
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState(mockUsers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "REVIEWER",
    organization: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPERVISOR":
        return <Shield className="h-3 w-3" />;
      case "REVIEWER":
        return <ClipboardCheck className="h-3 w-3" />;
      case "USER":
        return <Building className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPERVISOR":
        return "destructive";
      case "REVIEWER":
        return "default";
      case "USER":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "SUPERVISOR":
        return "Supervisor";
      case "REVIEWER":
        return "Reviewer";
      case "USER":
        return "User";
      default:
        return role;
    }
  };

  const handleSendPasswordReset = (email: string, name: string) => {
    toast.success(`Password reset email sent to ${name}`);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.organization) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const user = {
      id: String(users.length + 1),
      ...newUser,
      avatar: "",
      status: "active",
      lastActive: "Just now",
      reviewStats: { assigned: 0, completed: 0 },
    };
    
    setUsers([...users, user]);
    setShowAddDialog(false);
    setNewUser({ name: "", email: "", role: "REVIEWER", organization: "" });
    toast.success(`${user.name} added as ${getRoleLabel(user.role)}`);
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success("User role updated");
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
    toast.success("User status updated");
  };

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="text-2xl font-serif font-bold">Users</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="SUPERVISOR">Supervisors</SelectItem>
                <SelectItem value="REVIEWER">Reviewers</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {filteredUsers.length} users
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
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
                <TableCell>{user.organization}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoleColor(user.role)} className="gap-1">
                      {getRoleIcon(user.role)}
                      {getRoleLabel(user.role)}
                    </Badge>
                    {user.role === "REVIEWER" && (
                      <div className="text-xs text-muted-foreground">
                        {user.reviewStats.completed}/{user.reviewStats.assigned} reviews
                      </div>
                    )}
                  </div>
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
                      {user.role !== "SUPERVISOR" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditDialog(true);
                            }}
                          >
                            <UserCog className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          {user.role === "USER" && (
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(user.id, "REVIEWER")}
                            >
                              <ChevronUp className="mr-2 h-4 w-4" />
                              Promote to Reviewer
                            </DropdownMenuItem>
                          )}
                          {user.role === "REVIEWER" && (
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(user.id, "USER")}
                            >
                              <ChevronDown className="mr-2 h-4 w-4" />
                              Demote to User
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        {user.status === "active" ? "Deactivate" : "Activate"} User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. They will receive an email to set their password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={newUser.organization}
                onChange={(e) => setNewUser({ ...newUser, organization: e.target.value })}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REVIEWER">Reviewer (QC Access)</SelectItem>
                  <SelectItem value="USER">User (No QC Access)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                <p className="text-sm text-muted-foreground mt-1">Current role: {getRoleLabel(selectedUser.role)}</p>
              </div>
              <div className="space-y-2">
                <Label>New Role</Label>
                <Select 
                  defaultValue={selectedUser.role}
                  onValueChange={(value) => {
                    handleUpdateRole(selectedUser.id, value);
                    setShowEditDialog(false);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REVIEWER">Reviewer (QC Access)</SelectItem>
                    <SelectItem value="USER">User (No QC Access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
