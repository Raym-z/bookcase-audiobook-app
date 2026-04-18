'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { User } from '@supabase/supabase-js';
import { usePlayerStore } from '@/stores/playerStore';
import { saveProgress } from '@/lib/listeningHistory';
import { useUser } from '@/hooks/useUser';

export function useAudioPlayer() {
  const howlRef = useRef<Howl | null>(null);
  const activeChapterRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const userRef = useRef<User | null>(null);
  const { user } = useUser();

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const {
    currentBook,
    currentChapterIndex,
    isPlaying,
    playbackSpeed,
    setProgress,
    setDuration,
    nextChapter,
  } = usePlayerStore();

  const getCurrentChapter = useCallback(() => {
    if (!currentBook?.chapters[currentChapterIndex]) return null;
    return currentBook.chapters[currentChapterIndex];
  }, [currentBook, currentChapterIndex]);

  const stopProgressLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startProgressLoop = useCallback(() => {
    stopProgressLoop();

    const update = () => {
      if (!howlRef.current) return;

      try {
        const seek = howlRef.current.seek() as number;
        if (typeof seek === 'number' && seek > 0) {
          setProgress(seek);
        }
      } catch {
        // ignore locked audio edge case
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
  }, [stopProgressLoop, setProgress]);

  /**
   * 🔥 CORE: Load / switch chapter (NO timeout, NO race conditions)
   */
  useEffect(() => {
    const chapter = getCurrentChapter();
    if (!chapter) return;

    const chapterIdx = currentChapterIndex;

    // ✅ Prevent duplicate loads
    if (
      howlRef.current &&
      activeChapterRef.current === chapterIdx &&
      howlRef.current.playing()
    ) {
      return;
    }

    // ✅ ALWAYS cleanup previous audio
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }

    stopProgressLoop();

    activeChapterRef.current = chapterIdx;

    const sound = new Howl({
      src: [chapter.playUrl],
      html5: true, // keep if streaming large files
      preload: true,

      onload: () => {
        setDuration(sound.duration());
      },

      onplay: () => {
        setDuration(sound.duration());
        startProgressLoop();
        const pendingSeek = usePlayerStore.getState().pendingSeekTime;
        if (pendingSeek !== null) {
          sound.seek(pendingSeek);
          setProgress(pendingSeek);
          usePlayerStore.getState().setPendingSeekTime(null);
        }
      },

      onpause: () => {
        stopProgressLoop();
      },

      onstop: () => {
        stopProgressLoop();
      },

      onend: () => {
        stopProgressLoop();
        nextChapter();
      },

      onloaderror: (_id, err) => {
        console.error('Audio load error:', err);
        nextChapter();
      },

      onplayerror: (_id, err) => {
        console.error('Audio play error:', err);

        // mobile unlock fix
        sound.once('unlock', () => {
          sound.play();
        });
      },
    });

    howlRef.current = sound;

    return () => {
      // ❗ Only cleanup if we are actually switching chapters
      if (activeChapterRef.current !== currentChapterIndex) {
        if (howlRef.current) {
          howlRef.current.stop();
          howlRef.current.unload();
          howlRef.current = null;
          // console.log("cleanup (chapter changed)");
        }

        activeChapterRef.current = -1;
        stopProgressLoop();
      } else {
        // console.log("skip cleanup (same chapter)");
      }
    };
  }, [
    currentBook?.id,
    currentChapterIndex,
    getCurrentChapter,
    setDuration,
    nextChapter,
    startProgressLoop,
    stopProgressLoop,
  ]);

  /**
   * ▶️ Play / Pause
   */
  useEffect(() => {
    if (!howlRef.current) return;
    if (activeChapterRef.current !== currentChapterIndex) return;

    if (isPlaying) {
      howlRef.current.play();
    } else {
      howlRef.current.pause();
    }
  }, [isPlaying, currentChapterIndex]);

  /**
   * ⚡ Playback speed
   */
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.rate(playbackSpeed);
    }
  }, [playbackSpeed]);

  /**
   * 💾 Save progress when tab hidden
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (howlRef.current && userRef.current) {
          const { currentBook: book } = usePlayerStore.getState();
          const idx = activeChapterRef.current;

          if (idx < 0 || !book) return;

          try {
            const seek = howlRef.current.seek() as number;
            if (seek > 0) {
              saveProgress(userRef.current.id, book, idx, Math.floor(seek));
            }
          } catch {
            // ignore
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  /**
   * 💾 Save progress every ~20s during playback
   */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (howlRef.current && userRef.current && activeChapterRef.current === currentChapterIndex) {
        const { currentBook: book } = usePlayerStore.getState();
        const idx = activeChapterRef.current;
        if (idx < 0 || !book) return;
        try {
          const seek = howlRef.current.seek() as number;
          if (seek > 0) {
            saveProgress(userRef.current.id, book, idx, Math.floor(seek));
          }
        } catch { /* ignore */ }
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isPlaying, currentChapterIndex]);

  /**
   * 💾 Save progress on pause
   */
  useEffect(() => {
    if (isPlaying) return;
    if (!howlRef.current || !userRef.current) return;
    if (activeChapterRef.current !== currentChapterIndex) return;

    const { currentBook: book } = usePlayerStore.getState();
    const idx = activeChapterRef.current;
    if (idx < 0 || !book) return;

    try {
      const seek = howlRef.current.seek() as number;
      if (seek > 0) {
        saveProgress(userRef.current.id, book, idx, Math.floor(seek));
      }
    } catch {
      // ignore
    }
  }, [isPlaying, currentChapterIndex]);

  /**
   * ⏩ Seek
   */
  function seek(time: number) {
    if (!howlRef.current) return;
    if (activeChapterRef.current !== currentChapterIndex) return;

    howlRef.current.seek(time);
    setProgress(time);
  }

  return { seek };
}