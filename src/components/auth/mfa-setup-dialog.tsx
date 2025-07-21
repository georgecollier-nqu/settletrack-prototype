"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { MFASetup } from "@/types/user";
import { Shield, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MFASetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function MFASetupDialog({
  open,
  onOpenChange,
  onComplete,
}: MFASetupDialogProps) {
  const { setupMFA, enableMFA } = useAuth();
  const [step, setStep] = useState<"intro" | "setup" | "verify" | "backup">(
    "intro",
  );
  const [mfaData, setMfaData] = useState<MFASetup | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartSetup = async () => {
    try {
      setIsLoading(true);
      const data = await setupMFA();
      setMfaData(data);
      setStep("setup");
    } catch {
      toast.error("Failed to setup MFA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setError("");
      setIsLoading(true);
      await enableMFA(verificationCode);
      setStep("backup");
    } catch {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySecret = () => {
    if (mfaData?.secret) {
      navigator.clipboard.writeText(mfaData.secret);
      toast.success("Secret key copied to clipboard");
    }
  };

  const handleCopyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Backup code copied to clipboard");
  };

  const handleComplete = () => {
    onOpenChange(false);
    onComplete?.();
    toast.success("Two-factor authentication enabled successfully!");
  };

  const handleClose = () => {
    setStep("intro");
    setMfaData(null);
    setVerificationCode("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "intro" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Enable Two-Factor Authentication
              </DialogTitle>
              <DialogDescription>
                Add an extra layer of security to your account by requiring a
                verification code in addition to your password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">How it works:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Install an authenticator app on your phone</li>
                  <li>Scan the QR code or enter the secret key</li>
                  <li>Enter the 6-digit code from your app to verify</li>
                  <li>Save your backup codes in a secure location</li>
                </ol>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You&apos;ll need an authenticator app like Google
                  Authenticator, Microsoft Authenticator, or Authy.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleStartSetup} disabled={isLoading}>
                Continue Setup
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "setup" && mfaData && (
          <>
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
              <DialogDescription>
                Scan this QR code with your authenticator app or enter the
                secret key manually.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mfaData.qrCode}
                  alt="MFA QR Code"
                  className="border rounded"
                />
              </div>
              <div className="space-y-2">
                <Label>Can&apos;t scan? Enter this key manually:</Label>
                <div className="flex gap-2">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono break-all">
                    {mfaData.secret}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopySecret}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep("verify")}>Next</Button>
            </DialogFooter>
          </>
        )}

        {step === "verify" && (
          <>
            <DialogHeader>
              <DialogTitle>Verify Setup</DialogTitle>
              <DialogDescription>
                Enter the 6-digit code from your authenticator app to complete
                setup.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-2xl font-mono"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("setup")}>
                Back
              </Button>
              <Button
                onClick={handleVerify}
                disabled={isLoading || verificationCode.length !== 6}
              >
                Verify & Enable
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "backup" && mfaData && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Two-Factor Authentication Enabled!
              </DialogTitle>
              <DialogDescription>
                Save these backup codes in a secure place. You can use them to
                access your account if you lose your authenticator device.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Each backup code can only be used once. Store them securely!
                </AlertDescription>
              </Alert>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-2">
                    {mfaData.backupCodes.map((code, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                          {code}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyBackupCode(code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button onClick={handleComplete}>Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
