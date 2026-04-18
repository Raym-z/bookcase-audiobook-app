'use client';

import { useEffect } from 'react';
import { setGuestMarker } from '@/lib/utils';

export function GuestMarker() {
  useEffect(() => {
    const guest = localStorage.getItem('is_guest');
    if (!guest) {
      setGuestMarker();
    }
  }, []);

  return null;
}
