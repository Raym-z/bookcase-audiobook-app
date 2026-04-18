import Image from 'next/image';
import Link from 'next/link';
import { Heart, Play } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { CarouselRow } from '@/components/ui/CarouselRow';

async function getHomeData() {
  const supabase = await createClient();

  const [trending, recentlyAdded, librivoxPicks] = await Promise.all([
    supabase.from('audiobooks').select('id, title, author, description, cover_url, category').limit(20),
    supabase.from('audiobooks').select('id, title, author, cover_url, category').limit(20),
    supabase.from('audiobooks').select('id, title, author, cover_url, category').limit(20),
  ]);

  const mapTrending = (row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    author: row.author as string,
    description: (row.description as string) || '',
    coverUrl: (row.cover_url as string) || '',
    category: (row.category as string) || '',
  });

  const mapCarousel = (row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    author: row.author as string,
    coverUrl: (row.cover_url as string) || '',
    category: (row.category as string) || '',
  });

  return {
    trending: (trending.data ?? []).map(mapTrending),
    recentlyAdded: (recentlyAdded.data ?? []).map(mapCarousel),
    librivoxPicks: (librivoxPicks.data ?? []).map(mapCarousel),
  };
}

export const revalidate = 300;

export default async function HomePage() {
  const { trending, recentlyAdded, librivoxPicks } = await getHomeData();

  const hero = trending[0];
  const heroDescription = hero?.description?.replace(/<[^>]*>/g, '').slice(0, 200);

  return (
    <div className="flex-1 overflow-y-auto">
      {hero && (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0">
            {hero.coverUrl ? (
              <Image
                src={hero.coverUrl}
                alt={hero.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-bg-card to-bg-primary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
              {hero.title}
            </h1>
            <p className="text-xl text-text-secondary mb-4">{hero.author}</p>
            {heroDescription && (
              <p className="text-sm text-text-muted max-w-xl line-clamp-2 mb-6">
                {heroDescription}
              </p>
            )}
            <div className="flex gap-3">
              <Link
                href={`/audiobook/${hero.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-semibold hover:bg-accent-hover transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                Play
              </Link>
              <Link
                href={`/audiobook/${hero.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-primary font-medium hover:border-accent hover:text-accent transition-all"
              >
                <Heart className="w-5 h-5" />
                Details
              </Link>
            </div>
          </div>

          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 bg-accent text-bg-primary text-xs font-bold rounded-full">
              Featured
            </span>
          </div>
        </section>
      )}

      <div className="px-2 sm:px-4 md:px-8 py-6 sm:py-8">
        <CarouselRow title="Trending Now" audiobooks={trending} seeAllHref="/search" />
        <CarouselRow title="Recently Added" audiobooks={recentlyAdded} seeAllHref="/search" />
        <CarouselRow title="LibriVox Picks" audiobooks={librivoxPicks} seeAllHref="/search" />
      </div>
    </div>
  );
}
