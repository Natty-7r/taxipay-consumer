'use client';

import { Zap } from 'lucide-react';

export function ScanInstruction() {
  return (
    <div className="absolute left-0 right-0 text-center z-10 px-8"
      style={{ top: 'calc(50% + 160px - 7.5vh)' }}
    >
      <p className="text-foreground/80 text-sm font-medium mb-2">
        Position the QR code inside the frame
      </p>
      <div className="flex items-center justify-center gap-1.5">
        <Zap className="w-3 h-3 text-primary" />
        <span className="text-muted-foreground text-xs">Auto-focus enabled</span>
      </div>
    </div>
  );
}
