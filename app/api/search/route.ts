import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Missing q parameter' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('audiobooks')
    .select('id, title, author, description, cover_url, language, num_sections, url, chapters')
    .or(`title.ilike.%${q}%,author.ilike.%${q}%,description.ilike.%${q}%`)
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const audiobooks = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    description: row.description || '',
    coverUrl: row.cover_url || '',
    language: row.language || 'English',
    numSections: row.num_sections || 0,
    url: row.url || '',
    chapters: row.chapters || [],
  }));

  return NextResponse.json(audiobooks);
}
