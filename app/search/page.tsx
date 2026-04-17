'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Audiobook } from '@/types/audiobook';
import { AudiobookCard } from '@/components/audiobook/AudiobookCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch('/api/audiobooks?limit=100')
      .then((r) => r.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSearched(false);
      fetch('/api/audiobooks?limit=100')
        .then((r) => r.json())
        .then((data) => setResults(Array.isArray(data) ? data : []));
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doSearch(query)}
              placeholder="Search audiobooks by title or author..."
              autoFocus
              className="w-full px-6 py-4 pl-14 bg-bg-card border border-border rounded-2xl text-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => doSearch(query)}
            disabled={!query.trim() || loading}
            className="px-6 py-4 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-2xl transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {!searched && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <SearchIcon className="w-16 h-16 text-text-muted mb-6" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Search for audiobooks
          </h2>
          <p className="text-text-muted">
            Search by title or author to find free public domain audiobooks.
          </p>
        </div>
      )}

      {loading && (
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
      )}

      {!loading && searched && results.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            No results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-text-muted">Try a different search term.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((audiobook) => (
            <AudiobookCard key={audiobook.id} audiobook={audiobook} size="md" />
          ))}
        </div>
      )}
    </div>
  );
}
