import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('audiobooks')
    .select('id, title, author, description, cover_url, language, num_sections, url, chapters')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Audiobook not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    title: data.title,
    author: data.author,
    description: data.description || '',
    coverUrl: data.cover_url || '',
    language: data.language || 'English',
    numSections: data.num_sections || 0,
    url: data.url || '',
    chapters: data.chapters || [],
  });
}
