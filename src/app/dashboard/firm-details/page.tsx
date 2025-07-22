"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import { Shield, Users, Save } from "lucide-react";

export default function FirmDetailsPage() {
  const { user, isAdmin } = useUser();
  const [mfaRequired, setMfaRequired] = useState(false);
  const [firmName, setFirmName] = useState(user?.firmName || "");
  const [firmSize, setFirmSize] = useState("11-50");
  const [industry, setIndustry] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don&apos;t have permission to view this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Firm details updated successfully");
    }, 1000);
  };

  return (
    <>
      <DashboardHeader title="Firm Details" />

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Firm Information */}
          <Card>
            <CardHeader>
              <CardTitle>Firm Information</CardTitle>
              <CardDescription>
                Basic information about your law firm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firmName">Firm Name</Label>
                  <Input
                    id="firmName"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firmSize">Firm Size</Label>
                  <Select value={firmSize} onValueChange={setFirmSize}>
                    <SelectTrigger id="firmSize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 attorneys</SelectItem>
                      <SelectItem value="11-50">11-50 attorneys</SelectItem>
                      <SelectItem value="51-200">51-200 attorneys</SelectItem>
                      <SelectItem value="200+">200+ attorneys</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Practice Area Focus</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Practice</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="litigation">Litigation</SelectItem>
                      <SelectItem value="ip">Intellectual Property</SelectItem>
                      <SelectItem value="employment">Employment Law</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firmId">Firm ID</Label>
                  <Input
                    id="firmId"
                    value={user?.firmId || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security requirements for your firm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mfa" className="text-base font-medium">
                    Require MFA for all users
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce multi-factor authentication for all firm members
                  </p>
                </div>
                <Switch
                  id="mfa"
                  checked={mfaRequired}
                  onCheckedChange={setMfaRequired}
                />
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  When enabled, all users will be required to set up
                  multi-factor authentication on their next login. This helps
                  protect your firm&apos;s data and meets compliance
                  requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Team Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Overview
              </CardTitle>
              <CardDescription>
                Quick stats about your firm&apos;s team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-semibold">10</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Pending Invitations
                  </p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" asChild>
                  <a href="/dashboard/team">Manage Team Members</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
