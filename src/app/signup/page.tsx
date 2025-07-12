"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Scale, ArrowRight, Loader2, Building2, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [accountType, setAccountType] = useState("new_firm");
  const [firmName, setFirmName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (accountType === "existing_firm") {
      setError(
        "You need to be invited by your team admin. Please check your email for an invitation link.",
      );
      return;
    }

    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      router.push("/onboarding");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2"
          >
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-primary">
              SettleTrack
            </h1>
          </Link>
          <p className="mt-2 text-muted-foreground">
            Legal Settlement Intelligence
          </p>
        </div>

        {/* Signup Card */}
        <Card className="border-border shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif">
              Create your account
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Choose how you want to get started"
                : "Complete your account setup"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 1 ? (
              <form onSubmit={handleStepOne} className="space-y-6">
                <RadioGroup value={accountType} onValueChange={setAccountType}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                      <RadioGroupItem
                        value="new_firm"
                        id="new_firm"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="new_firm"
                        className="cursor-pointer flex-1"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <span className="font-semibold">
                              Start a new firm account
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Create a new SettleTrack account for your law firm
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                      <RadioGroupItem
                        value="existing_firm"
                        id="existing_firm"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="existing_firm"
                        className="cursor-pointer flex-1"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="font-semibold">
                              Join an existing firm
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your firm already uses SettleTrack
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {accountType === "new_firm" && (
                  <div className="space-y-2">
                    <Label htmlFor="firmName">Firm Name</Label>
                    <Input
                      id="firmName"
                      placeholder="Enter your law firm's name"
                      value={firmName}
                      onChange={(e) => setFirmName(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                )}

                <Button type="submit" className="w-full h-10">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@lawfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-none cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline"
                  >
                    Sign in instead
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/contact" className="hover:text-primary">
            Need help?
          </Link>
          {" · "}
          <Link href="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
