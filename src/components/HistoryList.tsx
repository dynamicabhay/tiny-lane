import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Globe, Check, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";


const STORAGE_KEY = "tinyurl-history";
export interface HistoryItem {
  longUrl: string;
  shortUrl: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  onClearHistory?: () => void;
}


const HistoryList: React.FC<HistoryListProps> = ({ items, onClearHistory }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);


  if (!localItems?.length) return null;

  const handleClearHistory = () => {
    onClearHistory();
    toast({ title: "History cleared", description: "Your recent links have been removed." });
  };



  const handleCopy = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      toast({ title: "Copied!", description: "Short URL copied to clipboard." });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please try again." });
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=16`;
    } catch {
      return null;
    }
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <section aria-label="History list" className="w-full">
      <Card className="card-glow animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Your Recent Links</CardTitle>
          <Button
            onClick={handleClearHistory}
            className="h-9 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            variant="destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, idx) => {
              const faviconUrl = getFaviconUrl(item.longUrl);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-all duration-300 group"
                >
                  {/* Favicon */}
                  <div className="flex-shrink-0">
                    {faviconUrl ? (
                      <img
                        src={faviconUrl}
                        alt="Website favicon"
                        className="w-4 h-4 rounded-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* URLs */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-primary font-medium hover:underline transition-colors duration-200 flex items-center gap-1"
                      >
                        {item.shortUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <a
                      href={item.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      // FIX: Added the 'truncate' class to prevent overflow on narrow screens.
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block truncate"
                      title={item.longUrl}
                    >
                      {/* FIX: Removed the JS truncate function to allow CSS to handle truncation responsively. */}
                      {item.longUrl}
                    </a>
                  </div>

                  {/* Copy Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(item.shortUrl, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    {copiedIndex === idx ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HistoryList;
