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
  const [isPermissionRequested, setIsPermissionRequested] = useState(false);
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
      if (onSuccess) {
        onSuccess(data);
      }
    }, processDelay);
  }, [onSuccess, processDelay]);

  const stopScanner = useCallback(() => {
    isScanningRef.current = false;

    if (controlsRef.current) {
      try {
        controlsRef.current.stop();
      } catch (e) {
        // Ignore
      }
      controlsRef.current = null;
    }

    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach(track => track.stop());
      } catch (e) {
        // Ignore
      }
      streamRef.current = null;
    }

    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.load();
      } catch (e) {
        // Ignore
      }
    }

    if (mockTimerRef.current) {
      clearTimeout(mockTimerRef.current);
      mockTimerRef.current = null;
    }
  }, []);

  const startMockScanning = useCallback(() => {
    if (state !== 'scanning' || !isMountedRef.current) return;

    mockTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      const mockQRData = JSON.stringify({
        taxiId: 'TAXI-12345',
        routeId: 'r1',
        timestamp: new Date().toISOString(),
      });

      setScannedData(mockQRData);
      setState('loading');

      setTimeout(() => {
        if (!isMountedRef.current) return;
        setState('success');
        if (onSuccess) {
          onSuccess(mockQRData);
        }
      }, processDelay);
    }, scanDelay);
  }, [state, scanDelay, processDelay, onSuccess]);

  const checkCameraPermission = useCallback(async () => {
    try {
      // Check if we already have permission
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });

      if (permissionStatus.state === 'granted') {
        return 'granted';
      } else if (permissionStatus.state === 'denied') {
        return 'denied';
      } else {
        return 'prompt';
      }
    } catch (error) {
      // Some browsers don't support navigator.permissions
      // We'll assume we need to show the dialog
      return 'prompt';
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (!videoRef.current) {
        console.error('Video element not available');
        return null;
      }

      // Check permission first
      const permissionStatus = await checkCameraPermission();

      if (permissionStatus === 'denied') {
        setState('error');
        return null;
      }

      if (permissionStatus === 'prompt' && !isPermissionRequested) {
        // Show our custom dialog instead of browser prompt
        setShowPermissionDialog(true);
        return null;
      }

      // If we already have permission or user just granted it
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current && isMountedRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((err) => {
          console.warn('Video play error:', err);
        });
      }

      const reader = new BrowserQRCodeReader();
      isScanningRef.current = true;

      controlsRef.current = await reader.decodeFromStream(
        stream,
        videoRef.current || undefined,
        (result: Result | undefined, error: Error | undefined) => {
          if (error || !isMountedRef.current) {
            return;
          }

          if (result && isScanningRef.current) {
            isScanningRef.current = false;
            const qrData = result.getText();
            handleScanSuccess(qrData);
          }
        }
      );

      return stream;
    } catch (error) {
      console.error('Camera access error:', error);
      // If user denied permission in browser dialog
      if ((error as Error).name === 'NotAllowedError') {
        setState('error');
        setShowPermissionDialog(false);
      } else if (isMountedRef.current) {
        startMockScanning();
      }
      return null;
    }
  }, [checkCameraPermission, handleScanSuccess, isPermissionRequested]);

  const requestCameraPermission = useCallback(async () => {
    try {
      setShowPermissionDialog(false);
      setIsPermissionRequested(true);

      // Now call getUserMedia - this will show the browser's native dialog
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      // If we got here, permission was granted
      stream.getTracks().forEach(track => track.stop());
      setIsPermissionRequested(true);
      setState('scanning');

      // Start scanning with the camera
      await startCamera();
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      setIsPermissionRequested(false);
      setState('error');
      return false;
    }
  }, [startCamera]);

  const startScanning = useCallback(async () => {
    if (!isMountedRef.current) return;

    stopScanner();

    setState('scanning');
    setScannedData(null);
    isScanningRef.current = true;

    // Check if we have permission before starting camera
    const permissionStatus = await checkCameraPermission();

    if (permissionStatus === 'granted') {
      // We have permission, start camera directly
      const stream = await startCamera();
      if (!stream && isMountedRef.current) {
        startMockScanning();
      }
    } else if (permissionStatus === 'prompt' && !isPermissionRequested) {
      // Show our custom permission dialog
      setShowPermissionDialog(true);
    } else if (permissionStatus === 'denied') {
      setState('error');
    } else {
      // Fallback to mock
      startMockScanning();
    }
  }, [startCamera, startMockScanning, stopScanner, checkCameraPermission, isPermissionRequested]);

  const retry = useCallback(() => {
    if (isMountedRef.current) {
      setIsPermissionRequested(false);
      setShowPermissionDialog(true);
    }
  }, []);

  const toggleTorch = useCallback(() => {
    setTorchEnabled(prev => !prev);
  }, []);

  // Check permission on mount
  useEffect(() => {
    const init = async () => {
      const permissionStatus = await checkCameraPermission();
      if (permissionStatus === 'granted') {
        startScanning();
      } else if (permissionStatus === 'prompt') {
        setShowPermissionDialog(true);
      } else if (permissionStatus === 'denied') {
        setState('error');
      }
    };
    init();
  }, [checkCameraPermission, startScanning]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      stopScanner();
    };
  }, [stopScanner]);

  return {
    state,
    torchEnabled,
    scannedData,
    videoRef,
    showPermissionDialog,
    startScanning,
    retry,
    toggleTorch,
    stopScanner,
    isScanning: state === 'scanning',
    requestCameraPermission,
    setShowPermissionDialog,
  };
}