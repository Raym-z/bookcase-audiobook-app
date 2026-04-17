'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Audiobook } from '@/types/audiobook';
import { AudiobookCard } from '@/components/audiobook/AudiobookCard';
import { Skeleton } from '@/components/ui/Skeleton';

const categoryNames: Record<string, string> = {
  fiction: 'Fiction',
  'non-fiction': 'Non-Fiction',
  mystery: 'Mystery',
  'science-fiction': 'Science Fiction',
  romance: 'Romance',
  history: 'History',
  biography: 'Biography',
  'self-help': 'Self-Help',
  classics: 'Classics',
  poetry: 'Poetry',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>('');
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/audiobooks?category=${encodeURIComponent(slug)}&limit=50`);
        const books: Audiobook[] = await res.json();
        setAudiobooks(books);
      } catch {
        setAudiobooks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const categoryName = categoryNames[slug] ?? slug;

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          All Categories
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mb-8">{categoryName}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <Skeleton.SkeletonCard />
              <div className="mt-3 space-y-2">
                <Skeleton.SkeletonText lines={2} />
                <Skeleton.SkeletonText lines={1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        All Categories
      </Link>

      <h1 className="text-3xl font-bold text-text-primary mb-8">{categoryName}</h1>

      {audiobooks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted">No audiobooks found in this category.</p>
          <Link href="/categories" className="text-accent hover:text-accent-hover mt-2 inline-block">
            Browse all categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {audiobooks.map((audiobook) => (
            <AudiobookCard key={audiobook.id} audiobook={audiobook} size="md" />
          ))}
        </div>
      )}
    </div>
  );
}
