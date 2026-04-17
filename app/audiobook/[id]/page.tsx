import { Suspense } from 'react';
import { AudiobookDetailClient } from './AudiobookDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AudiobookDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AudiobookDetailClient id={id} />
    </Suspense>
  );
}
