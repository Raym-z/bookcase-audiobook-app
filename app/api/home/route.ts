import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const [trending, recentlyAdded, librivoxPicks] = await Promise.all([ // Supposed to be different APIs depending on different categories
    supabase.from('audiobooks').select('id, title, author, cover_url, category').limit(20),
    supabase.from('audiobooks').select('id, title, author, cover_url, category').limit(20),
    supabase.from('audiobooks').select('id, title, author, cover_url, category').limit(20),
  ]);

  const mapCarousel = (row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    author: row.author as string,
    coverUrl: (row.cover_url as string) || '',
    category: (row.category as string) || '',
  });

  const result = {
    trending: (trending.data ?? []).map(mapCarousel),
    recentlyAdded: (recentlyAdded.data ?? []).map(mapCarousel),
    librivoxPicks: (librivoxPicks.data ?? []).map(mapCarousel),
  };

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
