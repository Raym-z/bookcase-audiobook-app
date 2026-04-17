export interface Audiobook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  language: string;
  numSections: number;
  url: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  playUrl: string;
  length: number;
}

export interface PlayerState {
  currentBook: Audiobook | null;
  currentChapterIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playbackSpeed: number;
}
