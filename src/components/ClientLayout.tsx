'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { GuestMarker } from '@/components/GuestMarker';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <GuestMarker />
      <ToastProvider>{children}</ToastProvider>
    </SidebarProvider>
  );
}
