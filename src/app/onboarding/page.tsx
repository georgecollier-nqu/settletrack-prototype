"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Scale,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Building2,
  Search,
  FileText,
  TrendingUp,
  CheckCircle,
  Users,
  Shield,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form data
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("user");
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and go to dashboard
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const togglePracticeArea = (area: string) => {
    setPracticeAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image - Replace src with your image path */}
      <div className="absolute inset-0 z-0">
        <img
          src="/onboarding-background.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10 grayscale"
        />
      </div>
      {/* Header */}
      <div className="border-b bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-serif font-bold text-primary">
                SettleTrack
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-12 relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl w-full">
          {/* Step 1: Profile Setup */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Tell us about yourself
                  </CardTitle>
                </div>
                <CardDescription>
                  Help us personalize your SettleTrack experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Associate, Partner"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Your Role</Label>
                  <RadioGroup value={role} onValueChange={setRole}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user" className="cursor-pointer flex-1">
                          <div className="font-medium">Team Member</div>
                          <p className="text-sm text-muted-foreground">
                            I&apos;ll be using SettleTrack with my firm
                          </p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50">
                        <RadioGroupItem value="team_leader" id="team_leader" />
                        <Label
                          htmlFor="team_leader"
                          className="cursor-pointer flex-1"
                        >
                          <div className="font-medium">Solo Practitioner</div>
                          <p className="text-sm text-muted-foreground">
                            I&apos;ll be using SettleTrack on my own
                          </p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Practice Areas */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Practice Areas
                  </CardTitle>
                </div>
                <CardDescription>
                  Select the areas your firm focuses on to get relevant insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Data Breach & Privacy",
                    "Class Action",
                    "Personal Injury",
                    "Employment Law",
                    "Consumer Protection",
                    "Securities Litigation",
                    "Product Liability",
                    "Healthcare",
                    "Financial Services",
                    "Other",
                  ].map((area) => (
                    <Button
                      key={area}
                      variant={
                        practiceAreas.includes(area) ? "default" : "outline"
                      }
                      className="justify-start"
                      onClick={() => togglePracticeArea(area)}
                    >
                      {practiceAreas.includes(area) && (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      {area}
                    </Button>
                  ))}
                </div>

                {role === "team_leader" && (
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Firm Size</Label>
                    <RadioGroup value={teamSize} onValueChange={setTeamSize}>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="small" id="small" />
                          <Label htmlFor="small" className="cursor-pointer">
                            1-10 attorneys
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium" className="cursor-pointer">
                            11-50 attorneys
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="large" id="large" />
                          <Label htmlFor="large" className="cursor-pointer">
                            51-200 attorneys
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="enterprise" id="enterprise" />
                          <Label
                            htmlFor="enterprise"
                            className="cursor-pointer"
                          >
                            200+ attorneys
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Key Features Tour */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Key Features
                  </CardTitle>
                </div>
                <CardDescription>
                  Here&apos;s what you can do with SettleTrack
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <Search className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Advanced Search</h4>
                      <p className="text-sm text-muted-foreground">
                        Filter by court, settlement amount, class size, and
                        dozens of other criteria
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <FileText className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Case Details</h4>
                      <p className="text-sm text-muted-foreground">
                        View comprehensive case information with links to source
                        documents
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Trend Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Visualize settlement trends over time to inform your
                        strategy
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <Users className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Team Collaboration</h4>
                      <p className="text-sm text-muted-foreground">
                        Share searches and add private notes visible only to
                        your firm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Ready to Go */}
          {currentStep === 4 && (
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-success/10 rounded-full">
                    <CheckCircle className="h-12 w-12 text-success" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-serif">
                  You&apos;re all set!
                </CardTitle>
                <CardDescription>
                  Welcome to SettleTrack. Let&apos;s start exploring settlement
                  data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Card className="bg-secondary/30 border-0">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            Your data is secure
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Bank-level encryption and GDPR compliance protect
                            your research
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {role === "team_leader" && (
                    <Card className="bg-secondary/30 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Users className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-1">
                              Invite your team
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can add team members from the dashboard
                              settings
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="flex justify-center pt-4">
                  <Button size="lg" onClick={handleNext}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
