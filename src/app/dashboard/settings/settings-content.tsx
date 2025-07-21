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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  LogOut,
  HelpCircle,
  Lock,
  Save,
  Camera,
  CheckCircle,
  Bell,
  Mail,
} from "lucide-react";
import { NotificationPreference } from "@/types/notifications";
import { useSearchParams } from "next/navigation";
import { useNotificationSettings } from "@/hooks/use-notifications";

export default function SettingsContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@lawfirm.com",
    jobTitle: "Managing Partner",
    firmName: "Smith & Associates Law Firm",
    firmAddress: "123 Legal Street, New York, NY 10001",
    firmPhone: "(555) 123-4567",
  });

  const {
    settings: notificationSettings,
    updateSettings,
    loading: notificationLoading,
  } = useNotificationSettings();

  const [localNotificationSettings, setLocalNotificationSettings] =
    useState(notificationSettings);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [activeTab, setActiveTab] = useState(tabFromUrl || "profile");

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  useEffect(() => {
    if (notificationSettings) {
      setLocalNotificationSettings(notificationSettings);
    }
  }, [notificationSettings]);

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1500);
  };

  const handleSaveNotifications = async () => {
    if (!localNotificationSettings) return;

    setIsSaving(true);
    try {
      await updateSettings(localNotificationSettings);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch {
      // Error is handled in the hook
    } finally {
      setIsSaving(false);
    }
  };

  const updateNotificationPreference = (
    type: NotificationPreference["type"],
    channel: "email" | "portal",
  ) => {
    if (!localNotificationSettings) return;

    setLocalNotificationSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        preferences: prev.preferences.map((pref) =>
          pref.type === type ? { ...pref, [channel]: !pref[channel] } : pref,
        ),
      };
    });
  };

  const getNotificationLabel = (type: NotificationPreference["type"]) => {
    const labels: Record<NotificationPreference["type"], string> = {
      search: "Search Alerts",
      digest: "Weekly Digests",
      team: "Team Updates",
      billing: "Billing & Payments",
      system: "System Notifications",
      case_update: "Case Updates",
    };
    return labels[type];
  };

  const getNotificationDescription = (type: NotificationPreference["type"]) => {
    const descriptions: Record<NotificationPreference["type"], string> = {
      search: "Notifications when new cases match your saved searches",
      digest: "Weekly summary of settlement trends and insights",
      team: "Updates about team member activity and invitations",
      billing: "Payment confirmations and subscription updates",
      system: "Important system updates and maintenance notices",
      case_update: "Updates to cases you're tracking or involved with",
    };
    return descriptions[type];
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
    <>
      {/* Top Navigation Bar */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Settings</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <NotificationsDropdown />

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
      <main className="flex-1 overflow-y-auto bg-muted/30">
        {/* Settings Navigation Bar - overlays background */}
        <div className="bg-white border-b border-neutral-300 px-6 py-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "profile"
                  ? "border-[#2E7D5B] text-[#2E7D5B]"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("firm")}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "firm"
                  ? "border-[#2E7D5B] text-[#2E7D5B]"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Firm Details
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "security"
                  ? "border-[#2E7D5B] text-[#2E7D5B]"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Security & Privacy
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "notifications"
                  ? "border-[#2E7D5B] text-[#2E7D5B]"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Settings Content Area - full width */}
        <div className="p-6">
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert className="bg-success/10 border-success/20 mb-6">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription>
                Your settings have been saved successfully.
              </AlertDescription>
            </Alert>
          )}

          {/* Settings Content */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
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
                    <div className="space-y-4">
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
              </div>
            )}

            {/* Firm Tab */}
            {activeTab === "firm" && (
              <div className="space-y-6">
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
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Address</CardTitle>
                    <CardDescription>
                      Update your email address for account communication
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="securityEmail">Email Address</Label>
                        <Input
                          id="securityEmail"
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
                              Update Email
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input id="currentPassword" type="password" required />
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
                        <Input id="confirmPassword" type="password" required />
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
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications for different
                      types of updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {notificationLoading ? (
                      <div className="text-center py-4 text-muted-foreground">
                        Loading notification settings...
                      </div>
                    ) : localNotificationSettings ? (
                      <>
                        {/* Global Settings */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-base">
                                Email Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive notifications via email
                              </p>
                            </div>
                            <Switch
                              checked={localNotificationSettings.globalEmail}
                              onCheckedChange={(checked) =>
                                setLocalNotificationSettings((prev) =>
                                  prev
                                    ? { ...prev, globalEmail: checked }
                                    : prev,
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-base">
                                In-App Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Show notifications in the portal
                              </p>
                            </div>
                            <Switch
                              checked={localNotificationSettings.globalPortal}
                              onCheckedChange={(checked) =>
                                setLocalNotificationSettings((prev) =>
                                  prev
                                    ? { ...prev, globalPortal: checked }
                                    : prev,
                                )
                              }
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Individual Notification Types */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">
                            Notification Types
                          </h4>
                          <div className="space-y-4">
                            {localNotificationSettings.preferences.map(
                              (pref) => (
                                <div
                                  key={pref.type}
                                  className="space-y-3 pb-4 border-b last:border-0"
                                >
                                  <div>
                                    <Label className="text-base">
                                      {getNotificationLabel(pref.type)}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      {getNotificationDescription(pref.type)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        id={`${pref.type}-email`}
                                        checked={
                                          pref.email &&
                                          localNotificationSettings.globalEmail
                                        }
                                        disabled={
                                          !localNotificationSettings.globalEmail
                                        }
                                        onCheckedChange={() =>
                                          updateNotificationPreference(
                                            pref.type,
                                            "email",
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={`${pref.type}-email`}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <Mail className="h-4 w-4" />
                                        Email
                                      </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        id={`${pref.type}-portal`}
                                        checked={
                                          pref.portal &&
                                          localNotificationSettings.globalPortal
                                        }
                                        disabled={
                                          !localNotificationSettings.globalPortal
                                        }
                                        onCheckedChange={() =>
                                          updateNotificationPreference(
                                            pref.type,
                                            "portal",
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={`${pref.type}-portal`}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <Bell className="h-4 w-4" />
                                        Portal
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        Failed to load notification settings
                      </div>
                    )}

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
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
