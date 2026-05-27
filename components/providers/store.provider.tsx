'use client';

import { ReactNode } from 'react';

// Initialize stores on client side
export function StoreProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}