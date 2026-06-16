'use client';

import { Camera, AlertCircle } from 'lucide-react';

interface CameraPermissionProps {
    onRetry: () => void;
}

export function CameraPermission({ onRetry }: CameraPermissionProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-30">
            <div className="text-center p-8 max-w-xs">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Enable Camera</h3>
                <p className="text-sm text-muted-foreground mb-2">
                    TaxiPay needs camera access to scan QR codes.
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                    You can also enter the code manually below.
                </p>
                <button
                    onClick={onRetry}
                    className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium w-full"
                >
                    Allow Camera Access
                </button>
                <button
                    onClick={onRetry}
                    className="mt-3 text-sm text-muted-foreground underline underline-offset-4"
                >
                    Enter code manually
                </button>
            </div>
        </div>
    );
}