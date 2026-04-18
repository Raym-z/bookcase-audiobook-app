import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearGuestMarker() {
  localStorage.removeItem('is_guest');
}

export function setGuestMarker() {
  localStorage.setItem('is_guest', 'true');
}
