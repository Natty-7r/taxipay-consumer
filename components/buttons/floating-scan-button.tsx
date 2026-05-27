'use client';

import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function FloatingScanButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
      <Button
        onClick={() => router.push('/scan')}
        className="w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Scan className="w-7 h-7 text-primary-foreground" />
      </Button>
      <p className="text-center text-xs font-medium text-foreground mt-2">
        Scan to Pay
      </p>
    </div>
  );
}