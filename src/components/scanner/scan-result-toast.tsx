'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, X, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScanResultToastProps {
  data: string | null;
  visible: boolean;
  onDismiss: () => void;
}

export function ScanResultToast({ data, visible, onDismiss }: ScanResultToastProps) {
  const [copied, setCopied] = useState(false);

  // Parse the scanned data for a nicer display
  let displayData = data ?? '';
  let parsedLabel = '';
  try {
    const parsed = JSON.parse(data ?? '');
    if (parsed.taxiId) parsedLabel = `Taxi: ${parsed.taxiId}`;
    else parsedLabel = JSON.stringify(parsed);
    displayData = JSON.stringify(parsed, null, 0);
  } catch {
    displayData = data ?? '';
  }

  const handleCopy = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(data).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!visible) setCopied(false);
  }, [visible]);

  return (
    <div
      className={cn(
        'absolute bottom-48 left-4 right-4 z-50 transition-all duration-500 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      )}
    >
      <div className="bg-secondary border border-border/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Green accent top bar */}
        <div className="h-1 bg-success w-full" />

        <div className="px-4 py-3 flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-foreground text-xs font-semibold mb-0.5">QR Code Scanned</p>
            <p className="text-muted-foreground text-xs truncate">
              {parsedLabel || displayData}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopy}
              className="w-7 h-7 rounded-lg bg-muted/30 flex items-center justify-center transition-colors hover:bg-muted/50"
              aria-label="Copy result"
            >
              {copied
                ? <Check className="w-3.5 h-3.5 text-success" />
                : <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              }
            </button>
            <button
              onClick={onDismiss}
              className="w-7 h-7 rounded-lg bg-muted/30 flex items-center justify-center transition-colors hover:bg-muted/50"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
