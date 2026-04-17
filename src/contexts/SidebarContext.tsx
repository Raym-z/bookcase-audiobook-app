'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface SidebarContextValue {
  isExpanded: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  isExpanded: true,
  toggle: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', '240px');
  }, []);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      document.documentElement.style.setProperty('--sidebar-width', next ? '240px' : '64px');
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
