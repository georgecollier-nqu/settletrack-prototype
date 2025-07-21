"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, ArrowLeft, Calendar, Clock, Users } from "lucide-react";

export default function ScheduleDemoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [firmSize, setFirmSize] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SettleTrack"
                width={186}
                height={42}
                className="h-8 w-auto"
              />
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-6 py-12">
        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <h1 className="text-3xl font-serif font-bold mb-4">
                Schedule a Demo
              </h1>
              <p className="text-muted-foreground mb-8">
                See how SettleTrack can transform your firm&apos;s settlement
                research process. Our sales team will walk you through a
                personalized demo.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@lawfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firmName">Law Firm Name *</Label>
                  <Input
                    id="firmName"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Firm Size *</Label>
                  <RadioGroup
                    value={firmSize}
                    onValueChange={setFirmSize}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-10" id="size1" />
                      <Label
                        htmlFor="size1"
                        className="font-normal cursor-pointer"
                      >
                        1-10 attorneys
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="11-50" id="size2" />
                      <Label
                        htmlFor="size2"
                        className="font-normal cursor-pointer"
                      >
                        11-50 attorneys
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="51-200" id="size3" />
                      <Label
                        htmlFor="size3"
                        className="font-normal cursor-pointer"
                      >
                        51-200 attorneys
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="200+" id="size4" />
                      <Label
                        htmlFor="size4"
                        className="font-normal cursor-pointer"
                      >
                        200+ attorneys
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us about your firm's needs or specific use cases..."
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Demo
                </Button>
              </form>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-8">
              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="text-xl">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">
                        30-Minute Personalized Demo
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Tailored to your firm&apos;s specific needs and practice
                        areas
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Expert Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn best practices from our legal technology
                        specialists
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Quick Response</h4>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll reach out within 24 hours to schedule your
                        demo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 border-secondary">
                <CardHeader>
                  <CardTitle className="text-lg">Enterprise Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Custom pricing for your firm size
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Dedicated implementation support
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Team training and onboarding
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        API access for integrations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Priority support with SLA</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our sales team has received your request and will contact you
              within 24 hours to schedule your personalized demo.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                In the meantime, you can explore our features and learn more
                about how SettleTrack helps law firms make data-driven
                decisions.
              </p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
