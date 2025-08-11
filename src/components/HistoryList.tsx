import React from "react";

export interface HistoryItem {
  longUrl: string;
  shortUrl: string;
}

interface HistoryListProps {
  items: HistoryItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ items }) => {
  if (!items?.length) return null;

  return (
    <section aria-label="History list" className="w-full">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent URLs</h2>
        <ul className="divide-y divide-border rounded-md border">
          {items.map((item, idx) => (
            <li key={idx} className="p-3 md:p-4 hover:bg-accent/60 transition-colors">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                >
                  {item.shortUrl}
                </a>
                <a
                  href={item.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground truncate hover:underline"
                  title={item.longUrl}
                >
                  {item.longUrl}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HistoryList;
