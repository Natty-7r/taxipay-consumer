import { useCallback, useEffect, useState } from 'react';

type ScanState = 'scanning' | 'loading' | 'success' | 'error';

interface UseQRScannerProps {
  onSuccess?: () => void;
  scanDelay?: number;
  processDelay?: number;
}

export function useQRScanner({ onSuccess, scanDelay = 3000, processDelay = 1500 }: UseQRScannerProps = {}) {
  const [state, setState] = useState<ScanState>('scanning');
  const [torchEnabled, setTorchEnabled] = useState(false);

  const startScanning = useCallback(() => {
    setState('scanning');
  }, []);

  const simulateQRDetection = useCallback(() => {
    // Simulate random success/failure (90% success rate for demo)
    const isSuccess = Math.random() > 0.1;
    
    setState('loading');
    
    setTimeout(() => {
      if (isSuccess) {
        setState('success');
        setTimeout(() => {
          onSuccess?.();
        }, 1000);
      } else {
        setState('error');
      }
    }, processDelay);
  }, [onSuccess, processDelay]);

  const retry = useCallback(() => {
    setState('scanning');
    // Restart detection after retry
    setTimeout(() => {
      simulateQRDetection();
    }, 500);
  }, [simulateQRDetection]);

  const toggleTorch = useCallback(() => {
    setTorchEnabled(prev => !prev);
  }, []);

  useEffect(() => {
    if (state === 'scanning') {
      const timer = setTimeout(() => {
        simulateQRDetection();
      }, scanDelay);
      
      return () => clearTimeout(timer);
    }
  }, [state, scanDelay, simulateQRDetection]);

  return {
    state,
    torchEnabled,
    startScanning,
    retry,
    toggleTorch,
  };
}