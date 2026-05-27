'use client';

import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { CameraOverlay } from '@/components/scanner/scanner-overlay';
import { ScannerFrame } from '@/components/scanner/scanner-frame';
import { ScannerHeader } from '@/components/scanner/scanner.header';
import { ScanInstruction } from '@/components/scanner/scanner-instruction';
import { ScanFooter } from '@/components/scanner/scanner-footer'
import { useQRScanner } from '@/hooks/useScanner';
import { mockCurrentAccount } from '@/data/mock';
import telebirrLogo from '@/assets/images/png/telebirr.png';

export default function ScanPage() {
  const router = useRouter();

  const { state, torchEnabled, retry, toggleTorch } = useQRScanner({
    onSuccess: () => {
      router.push('/routes');
    },
    scanDelay: 3000,
    processDelay: 1500,
  });

  const handleBack = () => {
    router.back();
  };

  const handleManualEntry = () => {
    console.log('Manual entry clicked');
    // TODO: Implement manual entry modal
  };

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden">
      {/* Camera Overlay with Grid */}
      <CameraOverlay />

      {/* Header with Back Button and Account */}
      <ScannerHeader
        accountNumber={mockCurrentAccount.maskedNumber}
        accountLogo={telebirrLogo}
        onBack={handleBack}
      />

      {/* Scanner Frame with States */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ScannerFrame state={state} onRetry={retry} />
      </div>

      {/* Instruction Text (only when scanning) */}
      {state === 'scanning' && <ScanInstruction />}

      {/* Footer Actions (Torch & Manual Entry) */}
      <ScanFooter
        torchEnabled={torchEnabled}
        onTorchToggle={toggleTorch}
        onManualEntry={handleManualEntry}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}