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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/dashboard-header";
import { Save, CheckCircle } from "lucide-react";

export default function FirmDetailsPage() {
  const [firmData, setFirmData] = useState({
    firmName: "Smith & Associates Law Firm",
    firmAddress: "123 Legal Street, New York, NY 10001",
    firmPhone: "(555) 123-4567",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSave = () => {
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
      <DashboardHeader title="Firm Details" />

      <main className="flex-1 overflow-y-auto bg-muted/30">
        <div className="p-6">
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert className="bg-success/10 border-success/20 mb-6">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription>
                Firm details have been saved successfully.
              </AlertDescription>
            </Alert>
          )}

          <div className="max-w-4xl">
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
                      value={firmData.firmName}
                      onChange={(e) =>
                        setFirmData({
                          ...firmData,
                          firmName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firmAddress">Address</Label>
                    <Input
                      id="firmAddress"
                      value={firmData.firmAddress}
                      onChange={(e) =>
                        setFirmData({
                          ...firmData,
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
                      value={firmData.firmPhone}
                      onChange={(e) =>
                        setFirmData({
                          ...firmData,
                          firmPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">Data & Privacy</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Marketing Communications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new features and best practices
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
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
        </div>
      </main>
    </>
  );
}
