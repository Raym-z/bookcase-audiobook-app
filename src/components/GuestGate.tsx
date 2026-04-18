'use client';

import Link from 'next/link';
import { Heart, Clock } from 'lucide-react';

interface GuestGateProps {
  type: 'favorites' | 'continue-listening';
}

export function GuestGate({ type }: GuestGateProps) {
  if (type === 'favorites') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Heart className="w-16 h-16 text-text-muted mb-6" />
        <h2 className="text-xl font-bold text-text-primary mb-2">Save Your Favorites</h2>
        <p className="text-text-secondary mb-6 max-w-sm">
          Sign in to save audiobooks you love and access them on any device.
        </p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-6 py-3 bg-accent text-bg-primary rounded-lg font-semibold hover:bg-accent-hover transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/login?mode=signup"
            className="px-6 py-3 border border-border text-text-primary rounded-lg font-semibold hover:border-accent hover:text-accent transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Clock className="w-16 h-16 text-text-muted mb-6" />
      <h2 className="text-xl font-bold text-text-primary mb-2">Resume Your Listening</h2>
      <p className="text-text-secondary mb-6 max-w-sm">
        Sign in to track your listening progress across all your devices.
      </p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-6 py-3 bg-accent text-bg-primary rounded-lg font-semibold hover:bg-accent-hover transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/login?mode=signup"
          className="px-6 py-3 border border-border text-text-primary rounded-lg font-semibold hover:border-accent hover:text-accent transition-all"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
