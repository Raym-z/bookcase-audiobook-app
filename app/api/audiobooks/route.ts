import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');
  const title = searchParams.get('title');
  const author = searchParams.get('author');
  const category = searchParams.get('category');

  const supabase = await createClient();

  let query = supabase
    .from('audiobooks')
    .select('id, title, author, description, cover_url, language, num_sections, url, chapters, category');

  if (title) {
    query = query.ilike('title', `%${title}%`);
  }

  if (author) {
    query = query.ilike('author', `%${author}%`);
  }

  if (category) {
    query = query.eq('category', category);
  }

  if (offset) {
    query = query.range(Number(offset), Number(offset) + (limit ? Number(limit) - 1 : 19));
  } else if (limit) {
    query = query.limit(Number(limit));
  }

  const { data, error } = await query;

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
