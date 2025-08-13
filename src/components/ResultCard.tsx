import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check, Globe } from "lucide-react";

interface ResultCardProps {
  shortUrl?: string | null;
  longUrl?: string | null;
  onCopy?: (value: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ shortUrl, longUrl, onCopy }) => {
  // --- HOOKS ---
  const [copied, setCopied] = useState(false);

  // --- EFFECTS ---
  
  // Effect to reset copied state when the URL changes.
  useEffect(() => {
    setCopied(false);
  }, [shortUrl]);


  // --- CONDITIONAL RENDER (Must be AFTER hooks) ---
  if (!shortUrl) {
    return null;
  }

  // --- HANDLERS ---

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      onCopy?.(shortUrl);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      onCopy?.("");
    }
  };

  // --- RENDER ---
  return (
    <section aria-label="Shortened result" className="w-full">
      <Card className="card-glow animate-slide-up">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-muted-foreground" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Shortened Link</h3>
              {longUrl && (
                <p className="text-sm text-muted-foreground truncate max-w-xs md:max-w-md">
                  {longUrl}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Shortened URL Display */}
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-primary font-medium flex-1 hover:underline transition-colors duration-200"
              >
                {shortUrl}
             </a>
              {/* FIX: Wrap the icon in an anchor tag to make it a clickable link */}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" aria-label="Open link in new tab">
                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex">
              <Button 
                variant="default" 
                onClick={handleCopy} 
                className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultCard;
