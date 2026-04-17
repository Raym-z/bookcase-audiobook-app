'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { SidebarProvider } from '@/contexts/SidebarContext';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ToastProvider>{children}</ToastProvider>
    </SidebarProvider>
  );
}
