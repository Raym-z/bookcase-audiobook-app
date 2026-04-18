'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { AudiobookCarousel } from '@/types/audiobook';
import { cn } from '@/lib/utils';

interface AudiobookCardProps {
  audiobook: AudiobookCarousel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-28 sm:w-32',
  md: 'w-36 sm:w-44',
  lg: 'w-44 sm:w-56',
};

export function AudiobookCard({ audiobook, size = 'md', className }: AudiobookCardProps) {
  const initials = audiobook.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <Link
      href={`/audiobook/${audiobook.id}`}
      className={cn(
        'relative flex-shrink-0 rounded-xl overflow-hidden bg-bg-card transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 group cursor-pointer',
        sizeClasses[size],
        className
      )}
    >
      <div className="aspect-square w-full bg-bg-hover relative">
        {audiobook.coverUrl ? (
          <Image
            src={audiobook.coverUrl}
            alt={audiobook.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 176px, 224px"
          />
        ) : (
          <div className="aspect-square w-full bg-gradient-to-br from-bg-hover to-bg-card flex items-center justify-center">
            <span className="text-3xl font-bold text-accent">{initials}</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent-hover transition-colors">
            <Play className="w-5 h-5 text-bg-primary fill-current" />
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">
          {audiobook.title}
        </h3>
        <p className="text-xs text-text-muted line-clamp-1">{audiobook.author}</p>
      </div>
    </Link>
  );
}
