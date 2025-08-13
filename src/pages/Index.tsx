import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputSection from "@/components/InputSection";
import ResultCard from "@/components/ResultCard";
import HistoryList, { HistoryItem } from "@/components/HistoryList";
import { Seo } from "@/components/Seo";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "tinyurl-history";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TINY_URI = import.meta.env.VITE_TINY_URI;
//const MOCK_SHORT_URL = "https://short.ly/abc123";

function isValidUrl(value: string) {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  return pattern.test(value.trim());
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
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

  const handleShorten = useCallback(async (value: string) => {
    if (!value) {
      toast({ title: "Please enter a URL" });
      return;
    }

    if (!isValidUrl(value)) {
      toast({ title: "Invalid URL", description: "Please enter a valid URL." });
      return;
    }

    setLoading(true);
    setShortUrl(null);

    try {
      // CHANGED: Call backend API instead of mock delay
      const response = await fetch(`${API_BASE_URL}/${TINY_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: value }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // CHANGED: Assuming backend returns { shortUrl: "https://..." }
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
      });
    } finally {
      setLoading(false);
    }
  }, []); // CHANGED: Removed MOCK_SHORT_URL usage

  const handleCopied = useCallback((value: string) => {
    if (value) {
      toast({ title: "Copied!", description: "Short URL copied to clipboard." });
    } else {
      toast({ title: "Copy failed", description: "Please try again." });
    }
  }, []);

  const canonical = useMemo(() => window.location.origin + "/", []);

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="TinyURL Shortener — Fast, clean URL shortening"
        description="Shorten long URLs into tiny links instantly. Clean, minimal, and responsive UI."
        canonical={canonical}
      />

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TinyURL Shortener</h1>
          <p className="mt-2 text-muted-foreground">
            Paste a big nasty URL, get a tiny link.
          </p>
        </header>

        <div className="space-y-6">
          <InputSection onShorten={handleShorten} loading={loading} />

          <ResultCard shortUrl={shortUrl} onCopy={handleCopied} />

          <HistoryList items={history} />
        </div>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Built with ❤️
        </footer>
      </div>
    </main>
  );
};

export default Index;
