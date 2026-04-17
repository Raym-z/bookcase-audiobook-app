"use client";

import { Play } from "lucide-react";
import { Chapter } from "@/types/audiobook";

interface ChapterRowProps {
	chapter: Chapter;
	index: number;
	isActive?: boolean;
	onPlay: (index: number) => void;
}

function formatDuration(seconds: number): string {
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ChapterRow({ chapter, index, isActive, onPlay }: ChapterRowProps) {
	return (
		<button
			onClick={() => onPlay(index)}
			className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-bg-hover transition-colors text-left
        focus:outline-none focus:ring-0 border-none
        ${isActive ? "bg-accent/5 border-l-2 border-accent" : ""}
      `}
		>
			<div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? "bg-accent text-bg-primary" : "bg-accent/20 text-accent"}`}>
				<Play className='w-4 h-4 fill-current' />
			</div>

			<span className='w-8 text-center text-text-muted text-sm'>{index + 1}</span>

			<span className='flex-1 text-text-primary text-sm'>{chapter.title}</span>

			<span className='text-text-muted text-sm tabular-nums'>{formatDuration(chapter.length)}</span>
		</button>
	);
}
