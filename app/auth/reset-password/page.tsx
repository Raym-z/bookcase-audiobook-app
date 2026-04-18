'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlayCircle, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { clearGuestMarker } from '@/lib/utils';

type PageState = 'verifying' | 'invalid' | 'valid' | 'success';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState<PageState>('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    async function verifyToken() {
      const hash = window.location.hash;
      if (!hash) {
        setPageState('invalid');
        setError('Invalid reset link. Please request a new password reset.');
        return;
      }

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const tokenType = params.get('token_type');
      const type = params.get('type');

      if (!accessToken || tokenType !== 'bearer' || type !== 'recovery') {
        setPageState('invalid');
        setError('Invalid reset link. Please request a new password reset.');
        return;
      }

      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || accessToken,
      });

      if (error) {
        setPageState('invalid');
        setError('This reset link has expired. Please request a new password reset.');
        return;
      }

      setPageState('valid');
    }

    verifyToken();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setPageState('success');
      clearGuestMarker();

      setTimeout(() => {
        router.push('/login?reset=success');
      }, 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (pageState === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (pageState === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
        <div className="w-full max-w-md">
          <div className="bg-bg-card rounded-2xl p-8 border border-border text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Invalid Reset Link</h1>
            <p className="text-text-secondary mb-6">{error}</p>
            <Link
              href="/forgot-password"
              className="inline-block px-6 py-3 bg-accent text-bg-primary rounded-lg font-semibold hover:bg-accent-hover transition-all"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
        <div className="w-full max-w-md">
          <div className="bg-bg-card rounded-2xl p-8 border border-border text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Password Reset!</h1>
            <p className="text-text-secondary mb-6">Your password has been updated. Redirecting you to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-md">
        <div className="bg-bg-card rounded-2xl p-8 border border-border">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
          >
            Back to Login
          </Link>

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
              <PlayCircle className="w-10 h-10 text-bg-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Set New Password</h1>
            <p className="text-text-muted text-center text-sm">
              Enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors pr-10"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
