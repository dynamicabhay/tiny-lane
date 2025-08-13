import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";

interface InputSectionProps {
  onShorten: (url: string, customAlias?: string) => void;
  loading?: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onShorten, loading }) => {
  const [value, setValue] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCustomAlias, setShowCustomAlias] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    onShorten(value.trim(), customAlias.trim() || undefined);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section aria-label="URL shortener input" className="w-full">
      <Card className="card-glow animate-slide-up">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="long-url" className="text-sm font-medium text-foreground">
                Long URL
              </label>
              <div className="glow-effect">
                <Input
                  id="long-url"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Paste your long, unwieldy URL here..."
                  className="h-12 text-base transition-all duration-300"
                  inputMode="url"
                  aria-label="Long URL input"
                />
              </div>
            </div>

            {/* Custom Alias Section */}
            <div className="space-y-2">
              {!showCustomAlias ? (
                <button
                  type="button"
                  onClick={() => setShowCustomAlias(true)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Use custom alias
                </button>
              ) : (
                <div className="space-y-2 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <label htmlFor="custom-alias" className="text-sm font-medium text-foreground">
                      Custom Alias (optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomAlias(false);
                        setCustomAlias("");
                      }}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      aria-label="Remove custom alias"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="glow-effect">
                    <Input
                      id="custom-alias"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      placeholder="my-custom-alias"
                      className="h-12 text-base transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!!loading}
              className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Shorten Link"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default InputSection;
