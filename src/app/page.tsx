"use client";

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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  FileText,
  Users,
  Shield,
  BarChart,
  CheckCircle,
  ArrowRight,
  Scale,
  Database,
  Clock,
  DollarSign,
} from "lucide-react";

export default function LandingPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={scrollToTop}
                className="focus:outline-none cursor-pointer"
              >
                <Image
                  src="/logo.png"
                  alt="SettleTrack"
                  width={186}
                  height={42}
                  className="h-8 w-auto"
                />
              </button>
              <div className="hidden md:flex space-x-6">
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/schedule-demo">Schedule a Sales Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              <Scale className="w-3 h-3 mr-1" />
              Legal Settlement Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">
              Predict Settlement Amounts
              <br />
              with Judicial Precedent
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access a comprehensive database of legal settlements. Make
              informed decisions with data-driven insights from thousands of
              processed dockets.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 rounded-full" asChild>
                <Link href="/schedule-demo">
                  Schedule a Sales Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 rounded-full"
                asChild
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">10,000+</p>
              <p className="text-muted-foreground mt-1">Processed Cases</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">$2.5B</p>
              <p className="text-muted-foreground mt-1">
                Settlement Value Tracked
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground mt-1">Law Firms Trust Us</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground mt-1">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to analyze settlement data effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">
                  Advanced Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Filter by court, settlement amount, class size, PII affected,
                  and more. Find exactly the precedents you need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Visualize settlement trends over time. Understand how payouts
                  have evolved across different case types.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Detailed Case Views</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access complete case details with source PDF links. Verify
                  data accuracy with original documents.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Export & Analyze</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Export filtered data to CSV for offline analysis. Generate
                  reports for your team or clients.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Share saved searches, leave case notes, and collaborate with
                  your firm on settlement research.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Secure & Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Bank-level security with UK & EU GDPR compliance. Your data
                  and research remain confidential.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              How SettleTrack Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Search & Filter</h3>
              <p className="text-muted-foreground">
                Use our advanced filters to find relevant cases by jurisdiction,
                settlement size, case type, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze Precedents</h3>
              <p className="text-muted-foreground">
                Review detailed case information, compare settlements, and
                identify patterns in judicial decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Make Informed Decisions
              </h3>
              <p className="text-muted-foreground">
                Use data-driven insights to predict settlement ranges and advise
                clients with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">
                Why Leading Law Firms Choose SettleTrack
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Save Hours of Research
                    </h4>
                    <p className="text-muted-foreground">
                      Access structured data instead of manually reviewing
                      hundreds of PDFs
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Increase Settlement Accuracy
                    </h4>
                    <p className="text-muted-foreground">
                      Base predictions on actual judicial precedent, not
                      guesswork
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Win More Cases</h4>
                    <p className="text-muted-foreground">
                      Negotiate from a position of strength with comprehensive
                      data
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Stay Competitive</h4>
                    <p className="text-muted-foreground">
                      Keep pace with firms already leveraging data-driven
                      insights
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                  <Clock className="h-10 w-10 text-primary mb-3" />
                  <p className="text-2xl font-bold">75%</p>
                  <p className="text-sm text-muted-foreground">
                    Time Saved on Research
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                  <Database className="h-10 w-10 text-primary mb-3" />
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-muted-foreground">
                    Searchable Cases
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                  <DollarSign className="h-10 w-10 text-primary mb-3" />
                  <p className="text-2xl font-bold">23%</p>
                  <p className="text-sm text-muted-foreground">
                    Higher Settlements
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                  <Scale className="h-10 w-10 text-primary mb-3" />
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">Data Accuracy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your firm&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  Perfect for solo practitioners and small firms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Up to 3 team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">100 case searches per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Basic filtering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Export to CSV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <div className="pt-6">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/schedule-demo">Schedule a Sales Call</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">
                  Professional
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  For growing firms that need advanced features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Up to 10 team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Unlimited case searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">
                      Advanced filtering and analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Export to CSV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Priority email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">99.9% uptime SLA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Team collaboration tools</span>
                  </li>
                </ul>
                <div className="pt-6">
                  <Button className="w-full" asChild>
                    <Link href="/schedule-demo">Schedule a Sales Call</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">
                  Enterprise
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription className="mt-2">
                  For large firms with custom requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Unlimited team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">24/7 priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Custom training</span>
                  </li>
                </ul>
                <div className="pt-6">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/schedule-demo">Schedule a Sales Call</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-serif font-bold mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold mb-2">
                  Can I switch plans anytime?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect at your next billing cycle.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  All plans come with a 14-day free trial. No credit card
                  required to get started.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards and can arrange invoicing for
                  Enterprise customers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is my data secure?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we use bank-level encryption and are fully compliant with
                  UK & EU GDPR regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Transform Your Settlement Research?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading law firms using data-driven insights to win more cases
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 rounded-full"
              asChild
            >
              <Link href="/schedule-demo">
                Schedule Your Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 rounded-full bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted/50 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={scrollToTop}
                className="focus:outline-none cursor-pointer mb-4"
              >
                <Image
                  src="/logo.png"
                  alt="SettleTrack"
                  width={149}
                  height={34}
                  className="h-6 w-auto"
                />
              </button>
              <p className="text-sm text-muted-foreground">
                Legal settlement intelligence for modern law firms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Data Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SettleTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
