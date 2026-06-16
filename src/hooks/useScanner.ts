import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Result } from '@zxing/library';

type ScanState = 'scanning' | 'loading' | 'success' | 'error';

interface UseQRScannerProps {
  onSuccess?: (data: string) => void;
  onError?: (error: Error) => void;
  scanDelay?: number;
  processDelay?: number;
}

export function useQRScanner({
  onSuccess,
  onError,
  scanDelay = 3000,
  processDelay = 1500
}: UseQRScannerProps = {}) {
  const [state, setState] = useState<ScanState>('scanning');
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  // 'denied' = browser said no; 'granted' = ok; 'prompt' = not yet asked
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const isScanningRef = useRef<boolean>(false);
  const mockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const handleScanSuccess = useCallback((data: string) => {
    if (!isMountedRef.current) return;
    setScannedData(data);
    setState('loading');

    setTimeout(() => {
      if (!isMountedRef.current) return;
      setState('success');
      if (onSuccess) onSuccess(data);
    }, processDelay);
  }, [onSuccess, processDelay]);

  const stopScanner = useCallback(() => {
    isScanningRef.current = false;

    if (controlsRef.current) {
      try { controlsRef.current.stop(); } catch (_) {}
      controlsRef.current = null;
    }

    if (streamRef.current) {
      try { streamRef.current.getTracks().forEach(t => t.stop()); } catch (_) {}
      streamRef.current = null;
    }

    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.load();
      } catch (_) {}
    }

    if (mockTimerRef.current) {
      clearTimeout(mockTimerRef.current);
      mockTimerRef.current = null;
    }
  }, []);

  const startMockScanning = useCallback(() => {
    if (!isMountedRef.current) return;

    mockTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      const mockQRData = JSON.stringify({
        taxiId: 'TAXI-12345',
        routeId: 'r1',
        timestamp: new Date().toISOString(),
      });

      handleScanSuccess(mockQRData);
    }, scanDelay);
  }, [scanDelay, handleScanSuccess]);

  const checkCameraPermission = useCallback(async (): Promise<PermissionState> => {
    try {
      const status = await navigator.permissions.query({ name: 'camera' as PermissionName });
      return status.state;
    } catch {
      return 'prompt';
    }
  }, []);

  const startCameraStream = useCallback(async () => {
    if (!videoRef.current || !isMountedRef.current) return false;

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current.srcObject) videoRef.current.srcObject = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      setPermissionState('granted');

      if (videoRef.current && isMountedRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      const reader = new BrowserQRCodeReader();
      isScanningRef.current = true;

      controlsRef.current = await reader.decodeFromStream(
        stream,
        videoRef.current || undefined,
        (result: Result | undefined, error: Error | undefined) => {
          if (error || !isMountedRef.current) return;
          if (result && isScanningRef.current) {
            isScanningRef.current = false;
            handleScanSuccess(result.getText());
          }
        }
      );

      return true;
    } catch (err) {
      const error = err as Error;
      if (error.name === 'NotAllowedError') {
        setPermissionState('denied');
        setState('error');
        setShowPermissionDialog(false);
      } else if (isMountedRef.current) {
        // Camera hardware error or unavailable — fall back to mock
        startMockScanning();
      }
      return false;
    }
  }, [handleScanSuccess, startMockScanning]);

  /**
   * requestCameraPermission — called from the dialog's "Allow" button.
   * Hides dialog, triggers browser prompt, then starts camera or falls back.
   */
  const requestCameraPermission = useCallback(async () => {
    setShowPermissionDialog(false);
    setState('scanning');
    setScannedData(null);

    const ok = await startCameraStream();
    if (!ok && isMountedRef.current && permissionState !== 'denied') {
      startMockScanning();
    }
  }, [startCameraStream, startMockScanning, permissionState]);

  /**
   * retry — called from the error state or "Try Again" button.
   * Always re-shows the permission dialog so the user can try again.
   */
  const retry = useCallback(() => {
    if (!isMountedRef.current) return;
    stopScanner();
    // Reset denied state so user has a chance to go to settings / try again
    setPermissionState('prompt');
    setState('scanning');
    setScannedData(null);
    setShowPermissionDialog(true);
  }, [stopScanner]);

  const toggleTorch = useCallback(() => setTorchEnabled(prev => !prev), []);

  // On mount: check existing permission and act accordingly
  useEffect(() => {
    isMountedRef.current = true;

    const init = async () => {
      const perm = await checkCameraPermission();
      setPermissionState(perm);

      if (perm === 'granted') {
        // Start camera immediately, no dialog needed
        const ok = await startCameraStream();
        if (!ok && isMountedRef.current) startMockScanning();
      } else if (perm === 'denied') {
        setState('error');
      } else {
        // 'prompt' — show our custom dialog before the browser one
        setShowPermissionDialog(true);
      }
    };

    init();

    return () => {
      isMountedRef.current = false;
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    torchEnabled,
    scannedData,
    videoRef,
    permissionState,
    showPermissionDialog,
    setShowPermissionDialog,
    requestCameraPermission,
    retry,
    toggleTorch,
    stopScanner,
    isScanning: state === 'scanning',
  };
}
