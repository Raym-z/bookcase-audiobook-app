'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { getFavorites, removeFavorite } from '@/lib/favorites';
import { Audiobook } from '@/types/audiobook';
import { Skeleton } from '@/components/ui/Skeleton';

export default function FavoritesPage() {
  const { user, loading: userLoading } = useUser();
  const [favorites, setFavorites] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    async function load() {
      setLoading(true);
      try {
        const data = await getFavorites(userId);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  async function handleRemove(audiobookId: string) {
    if (!user) return;
    setRemovingId(audiobookId);
    try {
      await removeFavorite(user.id, audiobookId);
      setFavorites((prev) => prev.filter((f) => f.id !== audiobookId));
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  }

  if (userLoading || loading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-text-primary mb-8">My Favorites</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
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
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Heart className="w-20 h-20 text-text-muted mb-6" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            No favorites yet
          </h2>
          <p className="text-text-muted mb-6">
            Start adding audiobooks to your favorites to see them here.
          </p>
          <Link
            href="/"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Browse audiobooks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((audiobook) => (
            <div key={audiobook.id} className="relative group">
              <Link
                href={`/audiobook/${audiobook.id}`}
                className="block rounded-xl overflow-hidden bg-bg-card hover:bg-bg-hover transition-all"
              >
                <div className="aspect-square bg-bg-hover relative">
                  {audiobook.coverUrl ? (
                    <Image
                      src={audiobook.coverUrl}
                      alt={audiobook.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bg-hover to-bg-card">
                      <span className="text-3xl font-bold text-accent">
                        {audiobook.title[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">
                    {audiobook.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-1">
                    {audiobook.author}
                  </p>
                </div>
              </Link>

              <button
                onClick={() => handleRemove(audiobook.id)}
                disabled={removingId === audiobook.id}
                className="absolute top-2 right-2 w-8 h-8 bg-bg-card/90 rounded-full flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-bg-card transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                aria-label="Remove from favorites"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
