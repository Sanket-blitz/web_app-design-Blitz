import { cn } from '../../lib/utils'

interface Store2DoorMarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-[11px]',
  md: 'text-xs sm:text-[13px]',
  lg: 'text-[13px] sm:text-[15px]',
}

export function Store2DoorMark({ className, size = 'md' }: Store2DoorMarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-baseline whitespace-nowrap leading-none select-none',
        'font-extrabold uppercase tracking-tight',
        'text-violet-600 dark:text-violet-400',
        '-translate-y-1.5',
        sizes[size],
        className,
      )}
      aria-label="STORE2DOOR"
    >
      {/* Soft violet glow */}
      <span
        className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded-md bg-violet-500/15 dark:bg-violet-400/20 blur-md"
        aria-hidden
      />
      {/* Top accent line */}
      <span
        className="pointer-events-none absolute -top-1.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent dark:via-violet-400 opacity-80"
        aria-hidden
      />

      <span className="relative">STORE</span>
      <span className="relative italic">2</span>
      <span className="relative">
        DOOR
        <sup className="ml-px text-[0.42em] font-bold not-italic align-super opacity-90">™</sup>
      </span>
    </span>
  )
}
