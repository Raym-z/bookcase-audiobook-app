import { createClient } from '@/lib/supabase/client';
import { Audiobook } from '@/types/audiobook';

export async function getFavorites(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => row.audiobook_data as Audiobook);
}

export async function addFavorite(userId: string, audiobook: Audiobook) {
  const supabase = createClient();
  const { error } = await supabase.from('favorites').upsert(
    {
      user_id: userId,
      audiobook_id: audiobook.id,
      audiobook_data: audiobook,
    },
    { onConflict: 'user_id,audiobook_id' }
  );

  if (error) throw error;
}

export async function removeFavorite(userId: string, audiobookId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('audiobook_id', audiobookId);

  if (error) throw error;
}

export async function isFavorite(userId: string, audiobookId: string): Promise<boolean> {
  const supabase = createClient();
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('audiobook_id', audiobookId)
    .maybeSingle();

  return !!data;
}
