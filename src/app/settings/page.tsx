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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  TrendingUp,
  Bookmark,
  Settings,
  CreditCard,
  Users,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  Bell,
  Shield,
  Lock,
  Save,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@lawfirm.com",
    jobTitle: "Managing Partner",
    firmName: "Smith & Associates Law Firm",
    firmAddress: "123 Legal Street, New York, NY 10001",
    firmPhone: "(555) 123-4567",
  });

  const [emailNotifications, setEmailNotifications] = useState({
    caseAlerts: true,
    weeklyDigest: true,
    teamUpdates: true,
    productNews: false,
    invoices: true,
    securityAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1500);
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1500);
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
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50"
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
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary text-primary font-medium"
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
                <h1 className="text-2xl font-serif font-bold">Settings</h1>
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

          {/* Settings Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Success Alert */}
              {showSuccessAlert && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription>
                    Your settings have been saved successfully.
                  </AlertDescription>
                </Alert>
              )}

              {/* Settings Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="firm">Firm</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and profile photo
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/avatar.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Profile Form */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={profileData.jobTitle}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                jobTitle: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Firm Tab */}
                <TabsContent value="firm" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Firm Information</CardTitle>
                      <CardDescription>
                        Manage your firm&apos;s details and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="firmName">Firm Name</Label>
                          <Input
                            id="firmName"
                            value={profileData.firmName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                firmName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="firmAddress">Address</Label>
                          <Input
                            id="firmAddress"
                            value={profileData.firmAddress}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                firmAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="firmPhone">Phone Number</Label>
                          <Input
                            id="firmPhone"
                            type="tel"
                            value={profileData.firmPhone}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                firmPhone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Time Zone</Label>
                          <Select defaultValue="est">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="est">
                                Eastern Time (ET)
                              </SelectItem>
                              <SelectItem value="cst">
                                Central Time (CT)
                              </SelectItem>
                              <SelectItem value="mst">
                                Mountain Time (MT)
                              </SelectItem>
                              <SelectItem value="pst">
                                Pacific Time (PT)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-4">
                          Data & Privacy
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-base">
                                Share Usage Analytics
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Help us improve by sharing anonymous usage data
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-base">
                                Marketing Communications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive updates about new features and best
                                practices
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Notifications</CardTitle>
                      <CardDescription>
                        Choose which emails you&apos;d like to receive
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Case Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              New cases matching your saved searches
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.caseAlerts}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                caseAlerts: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Weekly Digest</Label>
                            <p className="text-sm text-muted-foreground">
                              Summary of settlement trends and insights
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.weeklyDigest}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                weeklyDigest: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Team Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              When team members join or leave
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.teamUpdates}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                teamUpdates: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Product News</Label>
                            <p className="text-sm text-muted-foreground">
                              New features and platform updates
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.productNews}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                productNews: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">
                              Billing & Invoices
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Payment confirmations and invoice receipts
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.invoices}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                invoices: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Security Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Important security notifications
                            </p>
                          </div>
                          <Switch
                            checked={emailNotifications.securityAlerts}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                securityAlerts: checked,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveNotifications}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Preferences
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" required />
                          <p className="text-xs text-muted-foreground">
                            Must be at least 8 characters with a mix of letters
                            and numbers
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? (
                              <>
                                <Lock className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Update Password
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          Two-factor authentication is not enabled. Enable it to
                          secure your account.
                        </AlertDescription>
                      </Alert>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Enable Two-Factor Authentication
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Sessions</CardTitle>
                      <CardDescription>
                        Manage your active login sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary rounded">
                              <Settings className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Chrome on MacOS</p>
                              <p className="text-sm text-muted-foreground">
                                New York, NY • Current session
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs text-success"
                          >
                            Active
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
