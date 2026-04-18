'use client';

import { useUser } from './useUser';
import { clearGuestMarker, setGuestMarker } from '@/lib/utils';

export function useGuestDetection() {
  const { user } = useUser();

  const isGuest = !user;

  if (!user) {
    const guest = localStorage.getItem('is_guest');
    if (!guest) {
      setGuestMarker();
    }
  } else {
    clearGuestMarker();
  }

  return { isGuest, isAuthenticated: !!user };
}
