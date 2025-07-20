"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Bookmark,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Bell,
  BellOff,
  Play,
  Plus,
  Mail,
  Monitor,
} from "lucide-react";
import { mockSavedSearches, type SavedSearch } from "@/lib/mock-data";

const editSearchSchema = z.object({
  name: z.string().min(1, "Search name is required"),
  description: z.string().optional(),
  alertEnabled: z.boolean(),
  emailNotifications: z.boolean(),
  portalNotifications: z.boolean(),
});

type EditSearchValues = z.infer<typeof editSearchSchema>;

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>(mockSavedSearches);
  const [editingSearch, setEditingSearch] = useState<SavedSearch | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const editForm = useForm<EditSearchValues>({
    resolver: zodResolver(editSearchSchema),
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Run a saved search
  const runSearch = (search: SavedSearch) => {
    // Update last used date
    const updatedSearches = searches.map((s) =>
      s.id === search.id
        ? { ...s, lastUsed: new Date().toISOString().split("T")[0] }
        : s,
    );
    setSearches(updatedSearches);

    // In real app, would navigate to search page with filters applied
    console.log(
      "Running search:",
      search.name,
      "with filters:",
      search.filters,
    );
    window.open(`/dashboard/cases/search?saved=${search.id}`, "_blank");
  };

  // Toggle alert for a search
  const toggleAlert = (searchId: string) => {
    const updatedSearches = searches.map((search) =>
      search.id === searchId
        ? { 
            ...search, 
            alertEnabled: !search.alertEnabled,
            // If turning off alerts, also turn off notifications
            emailNotifications: !search.alertEnabled ? search.emailNotifications : false,
            portalNotifications: !search.alertEnabled ? search.portalNotifications : false,
          }
        : search,
    );
    setSearches(updatedSearches);
  };

  // Clear all alerts
  const clearAllAlerts = () => {
    const updatedSearches = searches.map((search) => ({
      ...search,
      alertEnabled: false,
      emailNotifications: false,
      portalNotifications: false,
    }));
    setSearches(updatedSearches);
  };

  // Delete a search
  const deleteSearch = (searchId: string) => {
    setSearches(searches.filter((search) => search.id !== searchId));
  };

  // Edit a search
  const openEditDialog = (search: SavedSearch) => {
    setEditingSearch(search);
    editForm.reset({
      name: search.name,
      description: search.description || "",
      alertEnabled: search.alertEnabled,
      emailNotifications: search.emailNotifications,
      portalNotifications: search.portalNotifications,
    });
    setShowEditDialog(true);
  };

  const handleEditSearch = (values: EditSearchValues) => {
    if (!editingSearch) return;

    const updatedSearches = searches.map((search) =>
      search.id === editingSearch.id
        ? {
            ...search,
            name: values.name,
            description: values.description,
            alertEnabled: values.alertEnabled,
            emailNotifications: values.emailNotifications,
            portalNotifications: values.portalNotifications,
          }
        : search,
    );
    setSearches(updatedSearches);
    setShowEditDialog(false);
    setEditingSearch(null);
  };

  // Statistics
  const totalSearches = searches.length;
  const alertsEnabled = searches.filter((s) => s.alertEnabled).length;

  return (
    <>
      <DashboardHeader title="Saved Searches" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Searches
                  </p>
                  <p className="text-2xl font-bold mt-1">{totalSearches}</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alerts Active</p>
                  <p className="text-2xl font-bold mt-1">{alertsEnabled}</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Searches Table */}
          <Card className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Your Saved Searches</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your saved search queries and access them quickly
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard/cases/search">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Search
                </Link>
              </Button>
            </div>
            {searches.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="rounded-md border inline-block min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[250px]">
                          Search Name
                        </TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Notifications</TableHead>
                        <TableHead>Run</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searches.map((search) => (
                        <TableRow key={search.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{search.name}</p>
                                {search.alertEnabled && (
                                  <Badge
                                    variant="secondary"
                                    className="h-5 px-1.5 text-xs"
                                  >
                                    <Bell className="h-3 w-3 mr-1" />
                                    Alert
                                  </Badge>
                                )}
                              </div>
                              {search.description && (
                                <p className="text-sm text-muted-foreground">
                                  {search.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(search.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {search.emailNotifications && (
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3.5 w-3.5 text-primary" />
                                  <span className="text-xs text-muted-foreground">Email</span>
                                </div>
                              )}
                              {search.portalNotifications && (
                                <div className="flex items-center gap-1">
                                  <Monitor className="h-3.5 w-3.5 text-primary" />
                                  <span className="text-xs text-muted-foreground">Portal</span>
                                </div>
                              )}
                              {!search.emailNotifications && !search.portalNotifications && (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => runSearch(search)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              <Play className="mr-1.5 h-3 w-3" />
                              Run
                            </Button>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => runSearch(search)}
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Run Search
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEditDialog(search)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Search
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete &quot;
                                        {search.name}&quot;? This action cannot
                                        be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteSearch(search.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No saved searches yet</p>
                <p className="text-muted-foreground mb-4">
                  Create your first saved search to quickly access your favorite
                  queries
                </p>
                <Button asChild>
                  <Link href="/dashboard/cases/search">
                    <Search className="mr-2 h-4 w-4" />
                    Create Your First Search
                  </Link>
                </Button>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Most Used Searches</h3>
                <p className="text-sm text-muted-foreground">
                  Your frequently accessed searches
                </p>
              </div>
              <div>
                <div className="space-y-3">
                  {searches
                    .filter((s) => s.lastUsed)
                    .sort(
                      (a, b) =>
                        new Date(b.lastUsed!).getTime() -
                        new Date(a.lastUsed!).getTime(),
                    )
                    .slice(0, 3)
                    .map((search) => (
                      <div
                        key={search.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => runSearch(search)}
                      >
                        <div>
                          <p className="font-medium text-sm">{search.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {search.matchingCasesCount} matches • Last used{" "}
                            {formatDate(search.lastUsed!)}
                          </p>
                        </div>
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  {searches.filter((s) => s.lastUsed).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No searches used yet
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Alert Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your search alerts
                  </p>
                </div>
                {alertsEnabled > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearAllAlerts()}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <div>
                <div className="space-y-3">
                  {searches
                    .filter((s) => s.alertEnabled)
                    .map((search) => (
                      <div
                        key={search.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{search.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Currently {search.matchingCasesCount} matches
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAlert(search.id)}
                        >
                          <BellOff className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  {alertsEnabled === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No active alerts
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Edit Search Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Search</DialogTitle>
            <DialogDescription>
              Update the details and settings for your saved search
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditSearch)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Data Breach > $10M"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of this search"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormField
                  control={editForm.control}
                  name="alertEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enable alerts for new matching cases
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {editForm.watch("alertEnabled") && (
                  <>
                    <FormField
                      control={editForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Email notifications
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Receive alerts via email when new cases match
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="portalNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Portal notifications
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Show alerts in the notification center
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
