import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-gradient-to-r from-border via-border to-border dark:from-white/10 dark:via-white/5 dark:to-white/10 animate-shimmer rounded-[var(--radius-md)]',
            className
          )}
        />
      ))}
    </>
  )
}

export function SkeletonText({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === count - 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-6 border border-border rounded-[var(--radius-xl)] bg-white dark:bg-white/5">
      <Skeleton className="h-8 w-1/3" />
      <div className="space-y-3">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-10 w-1/4 mt-6" />
    </div>
  )
}
