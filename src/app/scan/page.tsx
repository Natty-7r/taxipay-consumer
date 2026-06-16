'use client';

import { useState, useEffect } from 'react';
import telebirrLogo from '@/assets/images/png/telebirr.png';
import { ScanFooter } from '@/components/scanner/scanner-footer';
import { ScannerFrame } from '@/components/scanner/scanner-frame';
import { ScanInstruction } from '@/components/scanner/scanner-instruction';
import { CameraOverlay } from '@/components/scanner/scanner-overlay';
import { CameraPermissionDialog } from '@/components/scanner/camera-permission-dialog';
import { ScanResultToast } from '@/components/scanner/scan-result-toast';
import { mockCurrentAccount } from '@/data/mock';
import { useQRScanner } from '@/hooks/useScanner';
import { useRouter } from 'next/navigation';
import { ScannerHeader } from '@/components/scanner/scanner-header';

export default function ScanPage() {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const {
    state,
    torchEnabled,
    scannedData,
    permissionState,
    retry,
    toggleTorch,
    videoRef,
    showPermissionDialog,
    requestCameraPermission,
    setShowPermissionDialog,
  } = useQRScanner({
    onSuccess: (data) => {
      console.log('QR Scanned:', data);
      // Show toast with scanned result
      setToastVisible(true);
      // Navigate after a brief delay so user can see the result
      setTimeout(() => {
        router.push('/routes');
      }, 2000);
    },
    scanDelay: 3000,
    processDelay: 1500,
  });

  // Show toast when scannedData arrives (loading state onwards)
  useEffect(() => {
    if (scannedData && (state === 'loading' || state === 'success')) {
      setToastVisible(true);
    }
  }, [scannedData, state]);

  const handleBack = () => router.back();

  const handleManualEntry = () => {
    setShowPermissionDialog(false);
    // TODO: open manual entry modal
    console.log('Manual entry clicked');
  };

  const handleAllowCamera = async () => {
    await requestCameraPermission();
  };

  // When denied and user hits retry, re-open the dialog (with denied UI)
  const handleRetry = () => {
    retry(); // resets state and opens dialog
  };

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden">
      {/* Background */}
      <CameraOverlay />

      {/* Header */}
      <ScannerHeader
        accountNumber={mockCurrentAccount.maskedNumber}
        accountLogo={telebirrLogo}
        onBack={handleBack}
      />

      {/* Scanner frame — centred vertically with a slight upward bias */}
      <div className="absolute inset-0 flex items-center justify-center z-10" style={{ paddingBottom: '15vh' }}>
        <ScannerFrame state={state} onRetry={handleRetry} videoRef={videoRef} />
      </div>

      {/* Instruction text below the frame */}
      {state === 'scanning' && <ScanInstruction />}

      {/* Torch + manual entry */}
      <ScanFooter
        torchEnabled={torchEnabled}
        onTorchToggle={toggleTorch}
        onManualEntry={handleManualEntry}
      />

      {/* Scan result toast */}
      <ScanResultToast
        data={scannedData}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      {/* Camera permission dialog */}
      <CameraPermissionDialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
        onAllow={handleAllowCamera}
        onManualEntry={handleManualEntry}
        isDenied={permissionState === 'denied'}
      />
    </div>
  );
}
