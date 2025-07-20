"use client";

import { useState } from "react";
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
  Shield,
  Users,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { usePermissions } from "@/hooks/use-permissions";
import { MFASetupDialog } from "@/components/auth/mfa-setup-dialog";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, updateUser, disableMFA, logout } = useAuth();
  const permissions = usePermissions();
  
  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(' ')[0] || "John",
    lastName: user?.name.split(' ')[1] || "Doe",
    email: user?.email || "john@lawfirm.com",
    jobTitle: user?.jobTitle || "Managing Partner",
    firmName: user?.firmName || "Smith & Associates Law Firm",
    firmAddress: "123 Legal Street, New York, NY 10001",
    firmPhone: "(555) 123-4567",
    marketingOptIn: user?.marketingOptIn || false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showMFASetup, setShowMFASetup] = useState(false);
  const [disablingMFA, setDisablingMFA] = useState(false);
  const [mfaPassword, setMFAPassword] = useState("");

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: `${profileData.firstName} ${profileData.lastName}`,
        jobTitle: profileData.jobTitle,
        marketingOptIn: profileData.marketingOptIn,
      });
      setIsSaving(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1500);
  };

  const handleDisableMFA = async () => {
    try {
      setDisablingMFA(true);
      await disableMFA(mfaPassword);
      setMFAPassword("");
      toast.success("Two-factor authentication disabled");
    } catch (err) {
      toast.error("Invalid password");
    } finally {
      setDisablingMFA(false);
    }
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
                    <p className="text-sm font-medium">{user?.name || "John Doe"}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || "john@lawfirm.com"}
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
                <DropdownMenuItem className="text-destructive" onClick={logout}>
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
              onClick={() => setActiveTab("security")}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "security"
                  ? "border-[#2E7D5B] text-[#2E7D5B]"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Security & Privacy
            </button>
            {permissions.canAccessFirmDetails && (
              <>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "team"
                      ? "border-[#2E7D5B] text-[#2E7D5B]"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Team Management
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "billing"
                      ? "border-[#2E7D5B] text-[#2E7D5B]"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </div>
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
              </>
            )}
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
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user?.mfaEnabled ? (
                        <>
                          <Alert>
                            <Shield className="h-4 w-4" />
                            <AlertDescription>
                              Two-factor authentication is currently <strong>enabled</strong> for your account.
                            </AlertDescription>
                          </Alert>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="mfa-password">Enter your password to disable MFA</Label>
                              <Input
                                id="mfa-password"
                                type="password"
                                value={mfaPassword}
                                onChange={(e) => setMFAPassword(e.target.value)}
                                placeholder="Enter your password"
                              />
                            </div>
                            <Button
                              variant="destructive"
                              onClick={handleDisableMFA}
                              disabled={disablingMFA || !mfaPassword}
                            >
                              {disablingMFA ? "Disabling..." : "Disable Two-Factor Authentication"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Two-factor authentication is currently <strong>disabled</strong>. Enable it to add an extra layer of security.
                            </AlertDescription>
                          </Alert>
                          <Button onClick={() => setShowMFASetup(true)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Enable Two-Factor Authentication
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

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

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Preferences</CardTitle>
                    <CardDescription>
                      Manage your communication preferences and data privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Marketing Communications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features, best practices, and product announcements
                          </p>
                        </div>
                        <Switch
                          checked={profileData.marketingOptIn}
                          onCheckedChange={(checked) =>
                            setProfileData({ ...profileData, marketingOptIn: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Usage Analytics</Label>
                          <p className="text-sm text-muted-foreground">
                            Help us improve SettleTrack by sharing anonymous usage data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Team Management Tab - Firm Admin Only */}
            {activeTab === "team" && permissions.canAccessTeamManagement && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage your firm's team members and their access
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Team management features coming soon
                      </p>
                      <Button variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        View Team Page
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Billing Tab - Firm Admin Only */}
            {activeTab === "billing" && permissions.canAccessBilling && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Current Plan</h4>
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Professional Plan</p>
                              <p className="text-sm text-muted-foreground">$299/month</p>
                            </div>
                            <Button variant="outline" size="sm">Change Plan</Button>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/25</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Billing History</h4>
                        <Button variant="outline" className="w-full">
                          View All Invoices
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MFA Setup Dialog */}
      <MFASetupDialog
        open={showMFASetup}
        onOpenChange={setShowMFASetup}
        onComplete={() => {
          setShowMFASetup(false);
          toast.success("Two-factor authentication enabled successfully!");
        }}
      />
    </>
  );
}
