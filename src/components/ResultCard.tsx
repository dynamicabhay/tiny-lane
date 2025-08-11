import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";

interface ResultCardProps {
  shortUrl?: string | null;
  onCopy?: (value: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ shortUrl, onCopy }) => {
  if (!shortUrl) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      onCopy?.(shortUrl);
    } catch (e) {
      onCopy?.("");
    }
  };

  return (
    <section aria-label="Shortened result" className="w-full">
      <Card className="animate-in fade-in duration-300">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium inline-flex items-center gap-2 hover:underline"
              >
                {shortUrl}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div>
              <Button variant="secondary" onClick={handleCopy} className="w-full md:w-auto">
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultCard;
