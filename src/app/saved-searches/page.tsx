"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Bookmark,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Share,
  Bell,
  BellOff,
  Users,
  Play,
  Plus,
  Eye,
} from "lucide-react";
import { mockSavedSearches, type SavedSearch } from "@/lib/mock-data";

const editSearchSchema = z.object({
  name: z.string().min(1, "Search name is required"),
  description: z.string().optional(),
  alertEnabled: z.boolean(),
  isShared: z.boolean(),
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
    window.open(`/cases/search?saved=${search.id}`, "_blank");
  };

  // Toggle alert for a search
  const toggleAlert = (searchId: string) => {
    const updatedSearches = searches.map((search) =>
      search.id === searchId
        ? { ...search, alertEnabled: !search.alertEnabled }
        : search,
    );
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
      isShared: search.isShared,
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
            isShared: values.isShared,
          }
        : search,
    );
    setSearches(updatedSearches);
    setShowEditDialog(false);
    setEditingSearch(null);
  };

  // Share/unshare a search
  const toggleShare = (searchId: string) => {
    const updatedSearches = searches.map((search) =>
      search.id === searchId
        ? { ...search, isShared: !search.isShared }
        : search,
    );
    setSearches(updatedSearches);
  };

  // Get filter summary for display
  const getFilterSummary = (search: SavedSearch) => {
    const filters = [];

    if (search.filters.states && search.filters.states.length > 0) {
      filters.push(`States: ${search.filters.states.join(", ")}`);
    }

    if (search.filters.yearRange) {
      const { from, to } = search.filters.yearRange;
      if (from && to) {
        filters.push(`Years: ${from}-${to}`);
      } else if (from) {
        filters.push(`From: ${from}`);
      } else if (to) {
        filters.push(`Until: ${to}`);
      }
    }

    if (search.filters.settlementAmountRange) {
      const { from, to } = search.filters.settlementAmountRange;
      if (from && to) {
        filters.push(
          `Settlement: $${(from / 1000000).toFixed(1)}M - $${(to / 1000000).toFixed(1)}M`,
        );
      } else if (from) {
        filters.push(`Settlement: > $${(from / 1000000).toFixed(1)}M`);
      } else if (to) {
        filters.push(`Settlement: < $${(to / 1000000).toFixed(1)}M`);
      }
    }

    if (
      search.filters.causeOfBreach &&
      search.filters.causeOfBreach.length > 0
    ) {
      filters.push(`Cause: ${search.filters.causeOfBreach.join(", ")}`);
    }

    if (search.filters.classType && search.filters.classType.length > 0) {
      filters.push(`Class: ${search.filters.classType.join(", ")}`);
    }

    if (search.filters.isMultiDistrictLitigation !== undefined) {
      filters.push(
        `MDL: ${search.filters.isMultiDistrictLitigation ? "Yes" : "No"}`,
      );
    }

    if (search.filters.creditMonitoring !== undefined) {
      filters.push(
        `Credit Mon.: ${search.filters.creditMonitoring ? "Yes" : "No"}`,
      );
    }

    return filters.length > 0 ? filters.join(" • ") : "No specific filters";
  };

  // Statistics
  const totalSearches = searches.length;
  const sharedSearches = searches.filter((s) => s.isShared).length;
  const alertsEnabled = searches.filter((s) => s.alertEnabled).length;
  const totalMatches = searches.reduce(
    (sum, s) => sum + s.matchingCasesCount,
    0,
  );

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Saved Searches</h1>
          </div>
          <Button asChild>
            <Link href="/cases/search">
              <Plus className="mr-2 h-4 w-4" />
              Create New Search
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
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
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Shared</p>
                    <p className="text-2xl font-bold mt-1">{sharedSearches}</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Alerts Active
                    </p>
                    <p className="text-2xl font-bold mt-1">{alertsEnabled}</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Matches
                    </p>
                    <p className="text-2xl font-bold mt-1">{totalMatches}</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Searches Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Searches</CardTitle>
              <CardDescription>
                Manage your saved search queries and access them quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searches.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Search Name</TableHead>
                        <TableHead>Filters Applied</TableHead>
                        <TableHead className="text-center">Matches</TableHead>
                        <TableHead className="text-center">Created</TableHead>
                        <TableHead className="text-center">Last Used</TableHead>
                        <TableHead className="text-center">Status</TableHead>
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
                                <div className="flex items-center gap-1">
                                  {search.isShared && (
                                    <Badge
                                      variant="outline"
                                      className="h-5 px-1.5 text-xs"
                                    >
                                      <Users className="h-3 w-3 mr-1" />
                                      Shared
                                    </Badge>
                                  )}
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
                              </div>
                              {search.description && (
                                <p className="text-sm text-muted-foreground">
                                  {search.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground max-w-md truncate">
                              {getFilterSummary(search)}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-medium text-primary">
                              {search.matchingCasesCount}
                            </span>
                          </TableCell>
                          <TableCell className="text-center text-sm text-muted-foreground">
                            {formatDate(search.createdAt)}
                          </TableCell>
                          <TableCell className="text-center text-sm text-muted-foreground">
                            {search.lastUsed
                              ? formatDate(search.lastUsed)
                              : "Never"}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAlert(search.id)}
                                className="h-6 w-6 p-0"
                              >
                                {search.alertEnabled ? (
                                  <Bell className="h-3 w-3 text-primary" />
                                ) : (
                                  <BellOff className="h-3 w-3 text-muted-foreground" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleShare(search.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Users
                                  className={`h-3 w-3 ${search.isShared ? "text-primary" : "text-muted-foreground"}`}
                                />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => runSearch(search)}
                                className="h-6 w-6 p-0"
                              >
                                <Play className="h-3 w-3" />
                              </Button>

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
                                  <DropdownMenuItem
                                    onClick={() => toggleShare(search.id)}
                                  >
                                    <Share className="mr-2 h-4 w-4" />
                                    {search.isShared ? "Unshare" : "Share"}
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
                                          {search.name}&quot;? This action
                                          cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            deleteSearch(search.id)
                                          }
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No saved searches yet</p>
                  <p className="text-muted-foreground mb-4">
                    Create your first saved search to quickly access your
                    favorite queries
                  </p>
                  <Button asChild>
                    <Link href="/cases/search">
                      <Search className="mr-2 h-4 w-4" />
                      Create Your First Search
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Used Searches</CardTitle>
                <CardDescription>
                  Your frequently accessed searches
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
                <CardDescription>Manage your search alerts</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
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

                <FormField
                  control={editForm.control}
                  name="isShared"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Share with team members</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
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
