import { createClient } from '@/lib/supabase/client';
import { Audiobook } from '@/types/audiobook';

export interface ListeningHistoryEntry {
  audiobook_id: string;
  audiobook_data: Audiobook;
  chapter_index: number;
  progress_seconds: number;
  updated_at: string;
}

export async function saveProgress(
  userId: string,
  audiobook: Audiobook,
  chapterIndex: number,
  progressSeconds: number
) {
  const res = await fetch('/api/save-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, audiobook, chapterIndex, progressSeconds }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Failed to save progress:', err.error);
  }
}

export async function getListeningHistory(userId: string): Promise<ListeningHistoryEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('listening_history')
    .select('*')
    .eq('user_id', userId)
    .gt('progress_seconds', 0)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as ListeningHistoryEntry[];
}
