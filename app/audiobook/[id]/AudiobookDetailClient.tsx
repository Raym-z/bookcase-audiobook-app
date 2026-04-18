"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Play, ChevronLeft, Globe, List } from "lucide-react";
import { useAudiobook } from "@/hooks/useAudiobook";
import { usePlayerStore } from "@/stores/playerStore";
import { useUser } from "@/hooks/useUser";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/favorites";
import { ChapterRow } from "@/components/audiobook/ChapterRow";
import { useToast } from "@/components/ui/ToastProvider";

interface AudiobookDetailClientProps {
	id: string;
}

export function AudiobookDetailClient({ id }: AudiobookDetailClientProps) {
	const { user } = useUser();
	const { currentBook, currentChapterIndex, play } = usePlayerStore();
	const { setChapter } = usePlayerStore();
	const { addToast } = useToast();
	const [favorited, setFavorited] = useState(false);
	const [showFullDesc, setShowFullDesc] = useState(false);
	const [loadingFavorite, setLoadingFavorite] = useState(false);

	useAudiobook(id);

	const audiobook = currentBook;
	const isCurrentBook = currentBook?.id === id;

	useEffect(() => {
		if (!user || !id) return;
		isFavorite(user.id, id).then(setFavorited).catch(console.error);
	}, [user, id]);

	async function toggleFavorite() {
		if (!user) {
			addToast("Sign in to save favorites", "error");
			return;
		}
		if (!audiobook) return;
		setLoadingFavorite(true);
		try {
			if (favorited) {
				await removeFavorite(user.id, id);
				setFavorited(false);
			} else {
				await addFavorite(user.id, audiobook);
				setFavorited(true);
			}
		} catch (err) {
			console.error("Favorite error:", err);
		} finally {
			setLoadingFavorite(false);
		}
	}

	function handlePlayChapter(index: number) {
		setChapter(index);
		play();
	}

	const description = audiobook?.description?.replace(/<[^>]*>/g, "") || "";
	const isLongDesc = description.length > 300;
	const displayDesc = showFullDesc || !isLongDesc ? description : `${description.slice(0, 300)}...`;

	if (!audiobook) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<div className='text-center'>
					<div className='w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4' />
					<p className='text-text-muted'>Loading audiobook...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='flex-1 overflow-y-auto'>
			<div className='px-4 md:px-8 py-6'>
				<Link href='/' className='inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6'>
					<ChevronLeft className='w-5 h-5' />
					Back
				</Link>

				<div className='flex flex-col md:flex-row gap-8 p-6 bg-bg-card rounded-xl'>
					<div className='w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0'>
						{audiobook.coverUrl ? (
							<div className='relative aspect-square rounded-xl overflow-hidden shadow-2xl shadow-black/50'>
								<Image src={audiobook.coverUrl} alt={audiobook.title} fill className='object-cover' sizes='(max-width: 768px) 192px, 256px' />
							</div>
						) : (
							<div className='aspect-square rounded-xl bg-gradient-to-br from-bg-hover to-bg-card flex items-center justify-center shadow-2xl shadow-black/50'>
								<span className='text-5xl font-bold text-accent'>{audiobook.title[0]}</span>
							</div>
						)}
					</div>

					<div className='flex flex-col justify-center flex-1'>
						<h1 className='text-2xl md:text-4xl font-bold text-text-primary mb-2'>{audiobook.title}</h1>
						<p className='text-lg text-text-secondary mb-4'>{audiobook.author}</p>

						<div className='flex items-center gap-4 text-sm text-text-muted mb-6'>
							<span className='flex items-center gap-1'>
								<Globe className='w-4 h-4' />
								{audiobook.language}
							</span>
							<span className='flex items-center gap-1'>
								<List className='w-4 h-4' />
								{audiobook.numSections} chapters
							</span>
						</div>

						{description && (
							<p className='text-sm text-text-secondary mb-6 leading-relaxed'>
								{displayDesc}
								{isLongDesc && !showFullDesc && (
									<button onClick={() => setShowFullDesc(true)} className='ml-2 text-accent hover:text-accent-hover'>
										Read more
									</button>
								)}
							</p>
						)}

						<div className='flex gap-3'>
							<button onClick={() => handlePlayChapter(0)} className='flex items-center gap-2 px-8 py-3 rounded-lg bg-accent text-bg-primary font-bold hover:bg-accent-hover transition-all'>
								<Play className='w-5 h-5 fill-current' />
								Play
							</button>
							<button onClick={toggleFavorite} disabled={loadingFavorite} className='p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all disabled:opacity-50'>
								<Heart className={`w-5 h-5 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
							</button>
						</div>
					</div>
				</div>

				<div className='mt-8'>
					<h2 className='text-lg font-bold text-text-primary mb-4 px-6'>Chapters ({audiobook.chapters.length})</h2>
					<div className='divide-y divide-border bg-bg-card rounded-xl overflow-hidden'>
						{audiobook.chapters.map((chapter, index) => (
							<ChapterRow key={chapter.id} chapter={chapter} index={index} isActive={isCurrentBook && currentChapterIndex === index} onPlay={handlePlayChapter} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
