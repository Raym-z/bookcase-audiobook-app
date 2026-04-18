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

  const LIST_SELECT = 'id, title, author, description, cover_url, language, num_sections, url, category';
  const DETAIL_SELECT = 'id, title, author, description, cover_url, language, num_sections, url, chapters, category';

  const includeChapters = searchParams.get('includeChapters') === 'true';

  let query = supabase
    .from('audiobooks')
    .select(includeChapters ? DETAIL_SELECT : LIST_SELECT);

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

  const audiobooks = ((data as unknown) as Record<string, unknown>[] ?? []).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    author: row.author as string,
    description: (row.description as string) || '',
    coverUrl: (row.cover_url as string) || '',
    language: (row.language as string) || 'English',
    numSections: (row.num_sections as number) || 0,
    url: (row.url as string) || '',
    chapters: (row.chapters as unknown[]) || [],
  }));

  return NextResponse.json(audiobooks);
}
