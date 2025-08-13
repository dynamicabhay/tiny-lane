import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputSection from "@/components/InputSection";
import ResultCard from "@/components/ResultCard";
import HistoryList, { HistoryItem } from "@/components/HistoryList";
import { Seo } from "@/components/Seo";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "tinyurl-history";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TINY_URI = import.meta.env.VITE_TINY_URI;

function normalizeUrl(value: string): string {
  let url = value.trim();
  
  // Add https:// if no protocol
  if (!url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }
  
  return url;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrl(value));
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    
    // Block localhost and local IPs (best effort)
    const hostname = url.hostname.toLowerCase();
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' || 
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
      return false;
    }
    
    // Enforce max length
    if (url.href.length > 2048) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [currentLongUrl, setCurrentLongUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as HistoryItem[];
        setHistory(parsed.slice(0, 5));
      } catch {
        // ignore
      }
    }
  }, []);

  // Persist history
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 5)));
  }, [history]);

  const handleShorten = useCallback(async (value: string, customAlias?: string) => {
    if (!value) {
      toast({ title: "Please enter a URL" });
      return;
    }

    const normalizedUrl = normalizeUrl(value);
    
    if (!isValidUrl(normalizedUrl)) {
      toast({ 
        title: "Invalid URL", 
        description: "Please enter a valid URL with a proper domain." 
      });
      return;
    }

    setLoading(true);
    setShortUrl(null);
    setCurrentLongUrl(normalizedUrl);

    try {
      const requestBody: any = { url: normalizedUrl };
      if (customAlias) {
        requestBody.customAlias = customAlias;
      }

      const response = await fetch(`${API_BASE_URL}/${TINY_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.shortUrl) {
        throw new Error("Invalid response from server");
      }

      setShortUrl(data.shortUrl);
      setHistory((prev) => {
        const next: HistoryItem[] = [
          { longUrl: normalizedUrl, shortUrl: data.shortUrl },
          ...prev,
        ];
        return next.slice(0, 5);
      });
    } catch (error: any) {
      console.error("Error shortening URL:", error);
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopied = useCallback((value: string) => {
    if (value) {
      toast({ title: "Copied!", description: "Short URL copied to clipboard." });
    } else {
      toast({ title: "Copy failed", description: "Please try again." });
    }
  }, []);

  const canonical = useMemo(() => window.location.origin + "/", []);

  return (
    <main className="min-h-screen">
      <Seo
        title="TinyURL Shortener — Fast, clean URL shortening with QR codes"
        description="Shorten long URLs into tiny links instantly. Generate QR codes, use custom aliases. Clean, modern dark theme."
        canonical={canonical}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TinyURL Shortener
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your long, unwieldy URLs into elegant, shareable links. 
            Create custom aliases and generate QR codes with our modern shortening platform.
          </p>
        </header>

        <div className="space-y-8">
          <InputSection onShorten={handleShorten} loading={loading} />

          <ResultCard shortUrl={shortUrl} longUrl={currentLongUrl} onCopy={handleCopied} />

          <HistoryList items={history} />
        </div>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Built with ❤️ • Fast • Secure • Modern
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
