import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputSection from "@/components/InputSection";
import ResultCard from "@/components/ResultCard";
import HistoryList, { HistoryItem } from "@/components/HistoryList";
import { Seo } from "@/components/Seo";
import { toast } from "@/hooks/use-toast";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  return pattern.test(value.trim());
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

    //const normalizedUrl = normalizeUrl(value);
    //console.log(customAlias);
    
    if (!isValidUrl(value)) {
      toast({ 
        title: "Invalid URL", 
        description: "Please enter a valid URL with a proper domain." 
      });
      return;
    }

    setLoading(true);
    setShortUrl(null);
    setCurrentLongUrl(value);

    try {
      const requestBody: any = { url: value };
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
          { longUrl: value, shortUrl: data.shortUrl },
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

  // clearing history
    const handleClearHistory = () => {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
      //toast({ title: "History cleared", description: "Your recent links have been removed." });
    }

  return (
    <main className="min-h-screen">
      <Seo
        title="TinyURL Shortener — Fast, clean URL shortening with QR codes"
        description="Shorten long URLs into tiny links instantly. Generate QR codes, use custom aliases. Clean, modern dark theme."
        canonical={canonical}
      />
      <Nav/>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ChopURL
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Shrink links. Add flair. Share everywhere.
          </p>
        </header>

        <div className="space-y-8">
          
          <InputSection onShorten={handleShorten} loading={loading} />

          <ResultCard shortUrl={shortUrl} longUrl={currentLongUrl} onCopy={handleCopied} />

          <HistoryList items={history} onClearHistory={handleClearHistory}/>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Index;
