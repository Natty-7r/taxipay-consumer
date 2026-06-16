'use client';

import { RefObject, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ScannerFrameProps {
  state: 'scanning' | 'loading' | 'success' | 'error';
  onRetry?: () => void;
  videoRef?: RefObject<HTMLVideoElement | null>;
}

export function ScannerFrame({ state, onRetry, videoRef }: ScannerFrameProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Sync the refs
  useEffect(() => {
    if (videoRef && localVideoRef.current) {
      // @ts-ignore - setting ref manually
      videoRef.current = localVideoRef.current;
    }
  }, [videoRef]);

  return (
    <div className="relative w-72 h-72">
      {/* Video element for camera feed - always rendered */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black">
        <video
          ref={localVideoRef}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted
        />
      </div>

      {/* Corner accents - always on top */}
      <span className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-primary rounded-tl-sm z-20" />
      <span className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-primary rounded-tr-sm z-20" />
      <span className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-primary rounded-bl-sm z-20" />
      <span className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-primary rounded-br-sm z-20" />

      {/* Scanning state — scan line */}
      {state === 'scanning' && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl z-20 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary shadow-lg shadow-primary/50 scan-line" />
        </div>
      )}

      {/* Loading state */}
      {state === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 rounded-2xl backdrop-blur-sm z-30">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-[3px] border-t-primary border-muted animate-spin mx-auto mb-3" />
            <p className="text-foreground text-sm font-semibold">Processing…</p>
          </div>
        </div>
      )}

      {/* Success state */}
      {state === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-success/20 z-30">
          <div className="text-center">
            <CheckCircle className="w-14 h-14 mx-auto mb-3 animate-pulse text-success" />
            <p className="text-foreground text-sm font-semibold">QR Scanned!</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {state === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-error/20 z-30">
          <div className="text-center">
            <XCircle className="w-14 h-14 mx-auto mb-3 text-error" />
            <p className="text-foreground text-sm font-semibold mb-3">Invalid QR Code</p>
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-semibold mx-auto"
            >
              <RotateCcw className="w-3 h-3" />
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}