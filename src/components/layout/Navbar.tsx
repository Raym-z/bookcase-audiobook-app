import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, LogOut } from 'lucide-react';

interface NavbarProps {
  user: User | null;
}

export async function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/60 border-b border-border">
      <div className="px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <Link
            href="/search"
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-bg-card border border-border text-text-muted hover:border-text-muted transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Search audiobooks...</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/favorites"
                className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 text-text-secondary" />
              </Link>
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url && (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.email || 'User'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-5 h-5 text-text-secondary" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-accent text-bg-primary font-semibold hover:bg-accent-hover transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
