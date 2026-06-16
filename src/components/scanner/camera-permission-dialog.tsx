'use client';

import { Camera, AlertCircle } from 'lucide-react';
import { DialogWrapper } from '../common/dialog-wrapper';

interface CameraPermissionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAllow: () => void;
    onManualEntry: () => void;
}

export function CameraPermissionDialog({
    open,
    onOpenChange,
    onAllow,
    onManualEntry,
}: CameraPermissionDialogProps) {
    return (
        <DialogWrapper
            open={open}
            onOpenChange={onOpenChange}
            title="Enable Camera"
            description="TaxiPay needs camera access to scan QR codes."
            className="max-w-sm"
        >
            <div className="flex flex-col items-center text-center py-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                    You can also enter the code manually.
                </p>

                <button
                    onClick={onAllow}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium"
                >
                    Allow Camera Access
                </button>

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