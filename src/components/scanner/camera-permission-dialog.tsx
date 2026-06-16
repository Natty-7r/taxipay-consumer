'use client';

import { Camera, Settings } from 'lucide-react';
import { DialogWrapper } from '../common/dialog-wrapper';

interface CameraPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllow: () => void;
  onManualEntry: () => void;
  isDenied?: boolean;
}

export function CameraPermissionDialog({
  open,
  onOpenChange,
  onAllow,
  onManualEntry,
  isDenied = false,
}: CameraPermissionDialogProps) {
  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={isDenied ? 'Camera Access Blocked' : 'Enable Camera'}
      description={
        isDenied
          ? 'Camera permission was denied. Please allow it in your browser or device settings.'
          : 'TaxiPay needs camera access to scan QR codes.'
      }
      className="max-w-sm"
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDenied ? 'bg-destructive/10' : 'bg-primary/10'}`}>
          {isDenied
            ? <Settings className="w-8 h-8 text-destructive" />
            : <Camera className="w-8 h-8 text-primary" />
          }
        </div>

        {isDenied ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              Open your browser settings → Site permissions → Camera and set it to <strong>Allow</strong>.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Then come back and try again.
            </p>
            <button
              onClick={onAllow}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              You can also enter the code manually.
            </p>
            <button
              onClick={onAllow}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Allow Camera Access
            </button>
          </>
        )}

        <button
          onClick={onManualEntry}
          className="mt-3 text-sm text-muted-foreground underline underline-offset-4"
        >
          Enter code manually
        </button>
      </div>
    </DialogWrapper>
  );
}
