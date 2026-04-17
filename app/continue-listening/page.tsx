'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { usePlayerStore } from '@/stores/playerStore';
import { getListeningHistory, ListeningHistoryEntry } from '@/lib/listeningHistory';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ContinueListeningPage() {
  const { user, loading: userLoading } = useUser();
  const [history, setHistory] = useState<ListeningHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { setBook, setChapter, play } = usePlayerStore();

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    async function load() {
      setLoading(true);
      try {
        const data = await getListeningHistory(userId);
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  function handleResume(entry: ListeningHistoryEntry) {
    setBook(entry.audiobook_data);
    setChapter(entry.chapter_index);
    play();
  }

  function getProgressPercent(entry: ListeningHistoryEntry): number {
    const chapter = entry.audiobook_data.chapters[entry.chapter_index];
    if (!chapter || chapter.length === 0) return 0;
    return Math.min(100, (entry.progress_seconds / chapter.length) * 100);
  }

  if (userLoading || loading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Continue Listening</h1>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-bg-card rounded-xl">
              <Skeleton.SkeletonCard className="w-16 h-16 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton.SkeletonText lines={2} />
                <div className="h-1 bg-bg-hover rounded-full overflow-hidden w-full">
                  <div className="h-full bg-accent rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Continue Listening</h1>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Clock className="w-20 h-20 text-text-muted mb-6" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Nothing in progress
          </h2>
          <p className="text-text-muted mb-6">
            Start listening to an audiobook and pick up where you left off.
          </p>
          <Link
            href="/"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Browse audiobooks
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => {
            const percent = getProgressPercent(entry);
            return (
              <div
                key={entry.audiobook_id}
                className="flex items-center gap-4 p-4 bg-bg-card rounded-xl hover:bg-bg-hover transition-colors"
              >
                <div className="w-16 h-16 rounded-lg bg-bg-hover flex-shrink-0 overflow-hidden relative">
                  {entry.audiobook_data.coverUrl ? (
                    <Image
                      src={entry.audiobook_data.coverUrl}
                      alt={entry.audiobook_data.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bg-hover to-bg-card">
                      <span className="text-lg font-bold text-accent">
                        {entry.audiobook_data.title[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate mb-1">
                    {entry.audiobook_data.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-2 truncate">
                    {entry.audiobook_data.author}
                  </p>
                  <div className="h-1 bg-bg-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleResume(entry)}
                  className="px-4 py-2 rounded-lg bg-accent text-bg-primary text-sm font-semibold hover:bg-accent-hover transition-all flex-shrink-0"
                >
                  Resume
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
