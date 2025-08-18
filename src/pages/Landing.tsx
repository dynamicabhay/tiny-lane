import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import {
  Zap,
  BarChart3,
  Shield,
  Settings,
  Link,
  QrCode,
  TrendingUp,
  Code,
  Star,
  CheckCircle,
  ArrowRight,
  Github,
  FileText,
  Info,
  Eye
} from "lucide-react";

const Landing = () => {
  const [url, setUrl] = useState("");

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instantly shorten URLs with our optimized API. No delays, no waiting."
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track clicks, locations, devices, and referrers with detailed insights."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-grade security with 99.9% uptime. Your links are always accessible."
    },
    {
      icon: Settings,
      title: "Fully Customizable",
      description: "Custom aliases, branded domains, and personalized short links."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Paste Your URL",
      description: "Copy any long URL and paste it into our shortener",
      icon: Link
    },
    {
      number: "02", 
      title: "Get Short Link",
      description: "Receive an instant, clean short link ready to share",
      icon: Zap
    },
    {
      number: "03",
      title: "Share & Track",
      description: "Share anywhere and monitor performance with analytics",
      icon: TrendingUp
    }
  ];

  const featureHighlights = [
    {
      title: "Analytics Dashboard",
      description: "Comprehensive insights into your link performance with real-time data, geographic breakdowns, and device analytics.",
      icon: BarChart3,
      features: ["Real-time click tracking", "Geographic insights", "Device & browser data", "Referrer analysis"]
    },
    {
      title: "Custom Aliases",
      description: "Create memorable, branded short links that reflect your brand and improve click-through rates.",
      icon: Settings,
      features: ["Branded short links", "Custom domains", "Bulk link creation", "Team collaboration"]
    },
    {
      title: "QR Code Generation",
      description: "Instantly generate QR codes for your short links. Perfect for print materials and offline marketing.",
      icon: QrCode,
      features: ["High-quality QR codes", "Multiple formats", "Bulk generation", "Custom styling"]
    },
    {
      title: "Developer API",
      description: "Integrate our URL shortening service into your applications with our comprehensive REST API.",
      icon: Code,
      features: ["RESTful API", "Rate limiting", "Webhook support", "SDKs available"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechCorp",
      content: "ChopURL has transformed how we share links. The analytics are incredible and help us understand our audience better.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Developer",
      company: "StartupXYZ",
      content: "The API is rock solid and the documentation is excellent. We've processed over 100k links without any issues.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Social Media Manager",
      company: "BrandCo",
      content: "Custom aliases and QR codes have made our campaigns so much more professional. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <main className="min-h-screen">
      <Seo
        title="ChopURL - Professional URL Shortener | Analytics & Custom Domains"
        description="Shorten, track, and optimize your links with ChopURL. Get powerful analytics, custom domains, QR codes, and enterprise-grade reliability."
        canonical={window.location.origin + "/"}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto max-w-6xl px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Shorten. Share. Track.
              <br />
              <span className="text-foreground">Smarter Links for the Web.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Transform long, unwieldy URLs into clean, trackable links. Get powerful analytics, 
              custom domains, and enterprise-grade reliability.
            </p>

            <div className="max-w-2xl mx-auto space-y-4 animate-scale-in">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="Paste your long, unwieldy URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-14 text-lg glow-effect"
                />
                <Button size="lg" className="h-14 px-8 text-lg animate-glow">
                  Shorten Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">Sign up free</span> → Unlock analytics & custom domains
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">ChopURL</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional URL shortening with enterprise features and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-glow hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-card/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in seconds with our simple 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4 space-y-24">
          {featureHighlights.map((feature, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-xl text-muted-foreground">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((feat, featIndex) => (
                    <li key={featIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Card className="card-glow p-8 h-80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <feature.icon className="h-24 w-24 text-primary mx-auto" />
                    <p className="text-muted-foreground">Visual placeholder for {feature.title}</p>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-card/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-primary">10,000+</span> Users
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about ChopURL
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glow hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Card className="card-glow p-8 lg:p-12">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to shorten your first link?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who trust ChopURL for their link management needs
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="url"
                    placeholder="Enter your URL to get started..."
                    className="flex-1 h-14 text-lg glow-effect"
                  />
                  <Button size="lg" className="h-14 px-8 text-lg animate-glow">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ChopURL
              </h3>
              <p className="text-muted-foreground">
                Built for the web. Built for you.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/analytics" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="/api" className="hover:text-primary transition-colors">API Docs</a></li>
                <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="https://github.com" className="hover:text-primary transition-colors flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:text-primary transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>&copy; 2024 ChopURL. All rights reserved. Built with ❤️ for the web.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;