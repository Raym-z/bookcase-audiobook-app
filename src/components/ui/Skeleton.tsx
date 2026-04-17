export const Skeleton = {
  SkeletonCard,
  SkeletonText,
  SkeletonRow,
};

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`aspect-square w-full rounded-xl skeleton ${className ?? ''}`}
    />
  );
}

export function SkeletonText({ className, lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton h-4 rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'} ${className ?? ''}`}
        />
      ))}
    </div>
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-44">
          <SkeletonCard />
          <div className="mt-3 space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-3 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
