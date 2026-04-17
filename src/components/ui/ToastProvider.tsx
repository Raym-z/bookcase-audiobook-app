'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Heart, Play, AlertCircle, X, Check } from 'lucide-react';

type ToastType = 'favorite-add' | 'favorite-remove' | 'play' | 'error' | 'speed' | 'finished';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const toastConfig: Record<ToastType, { icon: ReactNode; iconColor: string }> = {
  'favorite-add': { icon: <Heart className="w-5 h-5 fill-red-500 text-red-500" />, iconColor: 'text-red-500' },
  'favorite-remove': { icon: <Heart className="w-5 h-5 text-text-muted" />, iconColor: 'text-text-muted' },
  play: { icon: <Play className="w-5 h-5 fill-accent text-accent" />, iconColor: 'text-accent' },
  error: { icon: <AlertCircle className="w-5 h-5 text-red-500" />, iconColor: 'text-red-500' },
  speed: { icon: <Check className="w-5 h-5 text-accent" />, iconColor: 'text-accent' },
  finished: { icon: <Check className="w-5 h-5 text-green-500" />, iconColor: 'text-green-500' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          return (
            <div
              key={toast.id}
              className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border rounded-lg shadow-xl min-w-[280px] max-w-[400px] animate-toast-in"
            >
              <span className={config.iconColor}>{config.icon}</span>
              <span className="text-sm text-text-primary flex-1">{toast.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
