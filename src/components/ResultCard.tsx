import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, QrCode, Check, Globe } from "lucide-react";
import QRCode from 'qrcode';

interface ResultCardProps {
  shortUrl?: string | null;
  longUrl?: string | null;
  onCopy?: (value: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ shortUrl, longUrl, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [faviconUrl, setFaviconUrl] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");

  if (!shortUrl) return null;

  useEffect(() => {
    // Simulate favicon and page title fetching
    if (longUrl) {
      try {
        const url = new URL(longUrl.startsWith('http') ? longUrl : `https://${longUrl}`);
        setFaviconUrl(`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`);
        setPageTitle(url.hostname.replace('www.', ''));
      } catch {
        setFaviconUrl("");
        setPageTitle("Website");
      }
    }
  }, [longUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      onCopy?.(shortUrl);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      onCopy?.("");
    }
  };

  const generateQRCode = async () => {
    try {
      const qrUrl = await QRCode.toDataURL(shortUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#6366f1',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(qrUrl);
      setShowQR(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <section aria-label="Shortened result" className="w-full">
      <Card className="card-glow animate-slide-up">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            {faviconUrl ? (
              <img 
                src={faviconUrl} 
                alt="Website favicon" 
                className="w-8 h-8 rounded-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Globe className="w-8 h-8 text-muted-foreground" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{pageTitle || "Shortened Link"}</h3>
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
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="default" 
                onClick={handleCopy} 
                className="flex-1 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
              
              <Button 
                variant="secondary" 
                onClick={generateQRCode}
                className="flex-1 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </div>

            {/* QR Code Display */}
            {showQR && qrCodeUrl && (
              <div className="flex justify-center p-4 bg-white rounded-lg animate-scale-in">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for shortened URL" 
                  className="w-48 h-48"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultCard;
