'use client';

import { useEffect, useCallback } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Howler } from 'howler';

export function PlayerBar() {
  const {
    currentBook,
    currentChapterIndex,
    isPlaying,
    progress,
    duration,
    playbackSpeed,
    toggle,
    nextChapter,
    prevChapter,
    setPlaybackSpeed,
  } = usePlayerStore();

  const { seek } = useAudioPlayer();
  const [isMuted, setIsMuted] = useState(false);

  const chapter = currentBook?.chapters[currentChapterIndex];
  const isVisible = !!currentBook;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const cycleSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      seek(ratio * duration);
    },
    [duration, seek]
  );

  useEffect(() => {
    if (isMuted) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
  }, [isMuted]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggle]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-20 bg-bg-card/95 backdrop-blur-xl border-t border-border transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 40 }}
    >
      <div className="h-full px-4 flex items-center gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-shrink-0 w-64">
          {currentBook && (
            <>
              <div className="relative w-14 h-14 rounded-lg bg-bg-hover flex-shrink-0 overflow-hidden">
                {currentBook.coverUrl ? (
                  <Image
                    src={currentBook.coverUrl}
                    alt={currentBook.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-bold text-lg">
                    {currentBook.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 hidden sm:block">
                <p className="text-sm font-medium text-text-primary truncate">
                  {chapter?.title || currentBook.title}
                </p>
                <p className="text-xs text-text-muted truncate">{currentBook.author}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={prevChapter}
              className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
              aria-label="Previous chapter"
            >
              <SkipBack className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={toggle}
              className="p-3 rounded-full bg-accent hover:bg-accent-hover transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-bg-primary" />
              ) : (
                <Play className="w-6 h-6 text-bg-primary" />
              )}
            </button>
            <button
              onClick={nextChapter}
              className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
              aria-label="Next chapter"
            >
              <SkipForward className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          <div className="w-full max-w-xl flex items-center gap-2">
            <span className="text-xs text-text-muted w-12 text-right tabular-nums">
              {formatTime(progress)}
            </span>
            <div
              className="flex-1 h-1 bg-bg-hover rounded-full overflow-hidden cursor-pointer group"
              onClick={handleProgressClick}
              role="slider"
              aria-label="Seek"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
            >
              <div
                className="h-full bg-accent group-hover:h-2"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-text-muted w-12 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 w-48 justify-end">
          <button
            onClick={cycleSpeed}
            className="px-2 py-1 text-xs font-mono text-text-secondary bg-bg-hover rounded hover:bg-border transition-colors"
            aria-label="Change playback speed"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-text-secondary" />
            ) : (
              <Volume2 className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
