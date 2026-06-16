'use client';

import telebirrLogo from '@/assets/images/png/telebirr.png';
import { ScanFooter } from '@/components/scanner/scanner-footer';
import { ScannerFrame } from '@/components/scanner/scanner-frame';
import { ScanInstruction } from '@/components/scanner/scanner-instruction';
import { CameraOverlay } from '@/components/scanner/scanner-overlay';
import { CameraPermissionDialog } from '@/components/scanner/camera-permission-dialog';
import { mockCurrentAccount } from '@/data/mock';
import { useQRScanner } from '@/hooks/useScanner';
import { useRouter } from 'next/navigation';
import { ScannerHeader } from '@/components/scanner/scanner-header';

export default function ScanPage() {
  const router = useRouter();

  const {
    state,
    torchEnabled,
    retry,
    toggleTorch,
    videoRef,
    showPermissionDialog,
    requestCameraPermission,
    setShowPermissionDialog,
  } = useQRScanner({
    onSuccess: (data) => {
      console.log('QR Scanned:', data);
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
    setShowPermissionDialog(false);
    // TODO: Implement manual entry modal
  };

  const handleAllowCamera = async () => {
    // This will trigger the browser's native permission dialog
    await requestCameraPermission();
  };

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden">
      <CameraOverlay />

      <ScannerHeader
        accountNumber={mockCurrentAccount.maskedNumber}
        accountLogo={telebirrLogo}
        onBack={handleBack}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ScannerFrame state={state} onRetry={retry} videoRef={videoRef} />
      </div>

      {state === 'scanning' && <ScanInstruction />}

      <ScanFooter
        torchEnabled={torchEnabled}
        onTorchToggle={toggleTorch}
        onManualEntry={handleManualEntry}
      />

      {/* Camera Permission Dialog - shows BEFORE browser dialog */}
      <CameraPermissionDialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
        onAllow={handleAllowCamera}
        onManualEntry={handleManualEntry}
      />
    </div>
  );
}