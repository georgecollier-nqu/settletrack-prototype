"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, Edit, Plus, Search, Trash2, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Firm {
  id: string;
  name: string;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
  address: string;
  planType: string;
  maxUsers: number;
  currentUsers: number;
  status: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string | null;
  notes: string;
  createdAt: string;
}

export default function AdminFirmsPage() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState<Firm | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    address: "",
    planType: "professional",
    maxUsers: 10,
    notes: "",
  });

  useEffect(() => {
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await fetch("/api/admin/firms");
      const data = await response.json();
      setFirms(data.firms || []);
    } catch (error) {
      console.error("Error fetching firms:", error);
      toast.error("Failed to load firms");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFirm = async () => {
    try {
      const response = await fetch("/api/admin/firms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create firm");
      }

      await response.json();
      toast.success("Firm created successfully");
      setIsCreateDialogOpen(false);
      resetForm();
      fetchFirms();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create firm",
      );
    }
  };

  const handleUpdateFirm = async () => {
    if (!editingFirm) return;

    try {
      const response = await fetch(`/api/admin/firms/${editingFirm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update firm");
      }

      toast.success("Firm updated successfully");
      setEditingFirm(null);
      resetForm();
      fetchFirms();
    } catch {
      toast.error("Failed to update firm");
    }
  };

  const handleDeleteFirm = async (firmId: string) => {
    if (!confirm("Are you sure you want to delete this firm?")) return;

    try {
      const response = await fetch(`/api/admin/firms/${firmId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete firm");
      }

      toast.success("Firm deleted successfully");
      fetchFirms();
    } catch {
      toast.error("Failed to delete firm");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contactEmail: "",
      contactName: "",
      contactPhone: "",
      address: "",
      planType: "professional",
      maxUsers: 10,
      notes: "",
    });
  };

  const openEditDialog = (firm: Firm) => {
    setEditingFirm(firm);
    setFormData({
      name: firm.name,
      contactEmail: firm.contactEmail,
      contactName: firm.contactName,
      contactPhone: firm.contactPhone,
      address: firm.address,
      planType: firm.planType,
      maxUsers: firm.maxUsers,
      notes: firm.notes,
    });
  };

  const filteredFirms = firms.filter(
    (firm) =>
      firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case "starter":
        return "secondary";
      case "professional":
        return "default";
      case "enterprise":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      case "trial":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Law Firm Management</h1>
          <p className="text-muted-foreground">
            Create and manage law firm accounts
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Law Firm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Law Firm</DialogTitle>
              <DialogDescription>
                Set up a new law firm account with enterprise access
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Firm Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Smith & Associates"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, contactEmail: e.target.value })
                    }
                    placeholder="admin@lawfirm.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="123 Legal Street, Suite 100..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planType">Plan Type *</Label>
                  <Select
                    value={formData.planType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, planType: value })
                    }
                  >
                    <SelectTrigger id="planType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsers">Max Users</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={formData.maxUsers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxUsers: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special requirements or notes..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateFirm}>Create Firm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Law Firms</CardTitle>
              <CardDescription>
                Manage law firm accounts and subscriptions
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search firms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading firms...
            </div>
          ) : filteredFirms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No firms found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firm Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFirms.map((firm) => (
                  <TableRow key={firm.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {firm.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{firm.contactName || firm.contactEmail}</div>
                        <div className="text-muted-foreground">
                          {firm.contactEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPlanBadgeVariant(firm.planType)}>
                        {firm.planType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {firm.currentUsers}/{firm.maxUsers}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(firm.status)}>
                        {firm.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(firm.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(firm)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFirm(firm.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingFirm} onOpenChange={() => setEditingFirm(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Law Firm</DialogTitle>
            <DialogDescription>
              Update law firm account details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Firm Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactEmail">Contact Email *</Label>
                <Input
                  id="edit-contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-contactName">Contact Person</Label>
                <Input
                  id="edit-contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactPhone">Contact Phone</Label>
                <Input
                  id="edit-contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-planType">Plan Type *</Label>
                <Select
                  value={formData.planType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, planType: value })
                  }
                >
                  <SelectTrigger id="edit-planType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxUsers">Max Users</Label>
                <Input
                  id="edit-maxUsers"
                  type="number"
                  value={formData.maxUsers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxUsers: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Internal Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFirm(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateFirm}>Update Firm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
