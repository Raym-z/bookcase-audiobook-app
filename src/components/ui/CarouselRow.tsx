'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AudiobookCarousel } from '@/types/audiobook';
import { AudiobookCard } from '@/components/audiobook/AudiobookCard';
import { SkeletonRow } from '@/components/ui/Skeleton';

interface CarouselRowProps {
  title: string;
  audiobooks: AudiobookCarousel[];
  seeAllHref?: string;
  isLoading?: boolean;
}

export function CarouselRow({ title, audiobooks, seeAllHref, isLoading }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }

  if (isLoading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">{title}</h2>
        <SkeletonRow count={8} />
      </section>
    );
  }

  if (audiobooks.length === 0) return null;

  return (
    <section className="mb-8 group/row relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {seeAllHref && (
          <a
            href={seeAllHref}
            className="text-sm text-accent hover:text-accent-hover transition-colors"
          >
            See All
          </a>
        )}
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-bg-hover transition-all opacity-0 group-hover/row:opacity-100 z-10 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-text-primary" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {audiobooks.map((book) => (
            <AudiobookCard key={book.id} audiobook={book} size="md" />
          ))}
        </div>

        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-bg-hover transition-all opacity-0 group-hover/row:opacity-100 z-10 shadow-lg"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-text-primary" />
        </button>
      </div>
    </section>
  );
}
