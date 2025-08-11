import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface InputSectionProps {
  onShorten: (url: string) => void;
  loading?: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onShorten, loading }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    onShorten(value.trim());
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section aria-label="URL shortener input" className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label htmlFor="long-url" className="sr-only">
          Long URL
        </label>
        <Input
          id="long-url"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter your long URL here…"
          className="flex-1"
          inputMode="url"
          aria-label="Long URL input"
        />
        <Button
          onClick={handleSubmit}
          disabled={!!loading}
          className="md:w-auto"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing…
            </span>
          ) : (
            "Shorten"
          )}
        </Button>
      </div>
    </section>
  );
};

export default InputSection;
