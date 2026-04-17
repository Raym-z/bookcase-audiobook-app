import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Audiobook } from '@/types/audiobook';

export async function POST(req: Request) {
  const { userId, audiobook, chapterIndex, progressSeconds } = await req.json();

  if (!userId || !audiobook || typeof chapterIndex !== 'number' || typeof progressSeconds !== 'number') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('listening_history')
    .upsert(
      {
        user_id: userId,
        audiobook_id: audiobook.id,
        audiobook_data: audiobook as Audiobook,
        chapter_index: chapterIndex,
        progress_seconds: progressSeconds,
      },
      { onConflict: 'user_id,audiobook_id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
