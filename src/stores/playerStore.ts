import { create } from 'zustand';
import { Audiobook } from '@/types/audiobook';

interface PlayerStore {
  currentBook: Audiobook | null;
  currentChapterIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playbackSpeed: number;

  play: () => void;
  pause: () => void;
  toggle: () => void;
  loadBook: (book: Audiobook) => void;
  setBook: (book: Audiobook) => void;
  setChapter: (index: number) => void;
  setProgress: (seconds: number) => void;
  setDuration: (seconds: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentBook: null,
  currentChapterIndex: 0,
  isPlaying: false,
  progress: 0,
  duration: 0,
  playbackSpeed: 1,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  loadBook: (book) =>
    set({
      currentBook: book,
      currentChapterIndex: 0,
      progress: 0,
      duration: 0,
      isPlaying: false,
    }),

  setBook: (book) =>
    set({
      currentBook: book,
      progress: 0,
      duration: 0,
      isPlaying: false,
    }),

  setChapter: (index) => set({ currentChapterIndex: index, progress: 0 }),

  setProgress: (seconds) => set({ progress: seconds }),

  setDuration: (seconds) => set({ duration: seconds }),

  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  nextChapter: () => {
    const { currentBook, currentChapterIndex } = get();
    if (!currentBook) return;

    const nextIndex = currentChapterIndex + 1;
    if (nextIndex < currentBook.chapters.length) {
      set({ currentChapterIndex: nextIndex, progress: 0 });
    } else {
      set({ isPlaying: false, progress: 0 });
    }
  },

  prevChapter: () => {
    const { currentChapterIndex, progress } = get();
    if (progress > 3 || currentChapterIndex === 0) {
      set({ progress: 0 });
    } else {
      set({ currentChapterIndex: currentChapterIndex - 1, progress: 0 });
    }
  },

  reset: () =>
    set({
      currentBook: null,
      currentChapterIndex: 0,
      isPlaying: false,
      progress: 0,
      duration: 0,
    }),
}));
