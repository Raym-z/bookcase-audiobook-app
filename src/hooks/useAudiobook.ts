'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';

export function useAudiobook(id: string) {
  const { loadBook } = usePlayerStore();

  useEffect(() => {
    if (!id) return;

    fetch(`/api/audiobooks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((audiobook) => {
        loadBook(audiobook);
      })
      .catch(console.error);
  }, [id, loadBook]);
}
