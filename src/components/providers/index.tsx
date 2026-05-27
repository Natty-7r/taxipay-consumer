'use client';

import { ReactQueryProvider } from './react-query.provider';
import { ThemeProvider } from './theme.provider';
import { StoreProvider } from './store.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </ReactQueryProvider>
  );
}