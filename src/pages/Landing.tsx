import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";

import {
  Zap,
  BarChart3,
  Shield,
  Settings,
  ArrowRight,
  Check,
  Code,
  Sparkles,
  Users,
  Clock,
  Globe
} from "lucide-react";
import { Footer } from "@/components/Footer";

const Landing = () => {
  const [url, setUrl] = useState("");

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Seo
        title="ChopURL - Shorten. Share. Track. All with One Tool"
        description="Transform long, messy links into clean, trackable URLs in seconds. Free forever with advanced analytics available."
        canonical={window.location.origin + "/"}
      />

      {/* Navbar */}
      <Nav />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto max-w-6xl px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Shorten. Share. Track.
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                All with ChopURL.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Transform long, messy links into clean, trackable URLs in seconds.
            </p>

            <div className="max-w-lg mx-auto">
              <Button 
                size="lg" 
                onClick={scrollToPricing}
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-effect"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="card-glow relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Perfect for personal use</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Unlimited short links</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Basic click analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Random short links</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>1 custom alias/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Community support</span>
                  </li>
                </ul>
                <Link to="/signup" className="block pt-4">
                  <Button className="w-full" variant="outline">
                    Sign Up for Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="card-glow relative border-primary/50">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">For professionals and teams</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Unlimited custom aliases</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Branded domains</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Higher API limits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Ad-free experience</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link to="/signup" className="block pt-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-card/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features that grow with your business
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-semibold">Paste Your URL</h4>
                <p className="text-muted-foreground">Copy any long URL and paste it into our shortener</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-semibold">Get Short Link</h4>
                <p className="text-muted-foreground">Receive an instant, clean short link ready to share</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-semibold">Track & Analyze</h4>
                <p className="text-muted-foreground">Monitor clicks and performance with detailed analytics</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-glow text-center p-6">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Advanced Analytics</h4>
              <p className="text-muted-foreground text-sm">Deep insights into your link performance</p>
            </Card>
            <Card className="card-glow text-center p-6">
              <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Custom Aliases</h4>
              <p className="text-muted-foreground text-sm">Create memorable branded short links</p>
            </Card>
            <Card className="card-glow text-center p-6">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Developer API</h4>
              <p className="text-muted-foreground text-sm">Integrate with your apps and workflows</p>
            </Card>
            <Card className="card-glow text-center p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Enterprise Security</h4>
              <p className="text-muted-foreground text-sm">Bank-grade security and reliability</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </main>
  );
};

export default Landing;