'use client';

import { Flashlight } from 'lucide-react';

interface ScanFooterProps {
  torchEnabled: boolean;
  onTorchToggle: () => void;
  onManualEntry: () => void;
}

export function ScanFooter({ torchEnabled, onTorchToggle, onManualEntry }: ScanFooterProps) {
  return (
    <div className="absolute bottom-28 left-0 right-0 flex flex-col items-center gap-4 z-10">
      <button
        onClick={onTorchToggle}
        className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all ${
          torchEnabled ? 'bg-primary/20 border border-primary' : ''
        }`}
        aria-label="Toggle torch"
      >
        <Flashlight
          className={`w-5 h-5 ${torchEnabled ? 'text-primary' : 'text-foreground'}`}
        />
      </button>

      <button
        onClick={onManualEntry}
        className="text-muted-foreground text-sm font-medium underline underline-offset-4"
      >
        Enter code manually
      </button>
    </div>
  );
}