"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-2xl px-6 py-24">
          <Card className="border-success/20 bg-success/5">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-success" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold">Thank You!</h2>
                <p className="text-muted-foreground">
                  Your sales inquiry has been received. Our team will contact
                  you within 24 hours to schedule a call.
                </p>
              </div>
              <Button asChild>
                <Link href="/">
                  Return to Homepage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-serif font-bold">
                  SettleTrack
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <div className="mb-8">
              <Badge className="mb-4" variant="secondary">
                <Building2 className="w-3 h-3 mr-1" />
                Enterprise Sales
              </Badge>
              <h1 className="text-4xl font-serif font-bold mb-4">
                Schedule a Sales Call
              </h1>
              <p className="text-muted-foreground">
                Discover how SettleTrack can transform your firm&apos;s
                settlement intelligence capabilities.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john.doe@lawfirm.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firmName">Law Firm Name *</Label>
                      <Input
                        id="firmName"
                        required
                        placeholder="Smith & Associates"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firmSize">Firm Size *</Label>
                      <Select required>
                        <SelectTrigger id="firmSize">
                          <SelectValue placeholder="Select firm size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 attorneys</SelectItem>
                          <SelectItem value="11-50">11-50 attorneys</SelectItem>
                          <SelectItem value="51-100">
                            51-100 attorneys
                          </SelectItem>
                          <SelectItem value="101-500">
                            101-500 attorneys
                          </SelectItem>
                          <SelectItem value="500+">500+ attorneys</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="practiceAreas">
                        Primary Practice Areas
                      </Label>
                      <Textarea
                        id="practiceAreas"
                        placeholder="e.g., Personal Injury, Medical Malpractice, Product Liability"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help? *</Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="Tell us about your firm's needs and how SettleTrack might help..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Schedule Sales Call"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  Why Choose SettleTrack?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Comprehensive Settlement Database
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access thousands of settlement records with advanced
                      filtering and analysis tools.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Enterprise-Grade Security
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Bank-level encryption and compliance with legal industry
                      standards.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Dedicated Support</h3>
                    <p className="text-sm text-muted-foreground">
                      24/7 priority support with dedicated account management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      Our sales team will contact you within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Demo</h3>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll schedule a demo tailored to your firm&apos;s
                      specific needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Custom Onboarding</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise accounts receive white-glove setup and
                      training.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Direct Contact</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Prefer to reach out directly?
                    </p>
                    <p className="text-sm">
                      <a
                        href="mailto:sales@settletrack.com"
                        className="text-primary hover:underline"
                      >
                        sales@settletrack.com
                      </a>
                    </p>
                    <p className="text-sm">
                      <a
                        href="tel:+18005551234"
                        className="text-primary hover:underline"
                      >
                        +1 (800) 555-1234
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
