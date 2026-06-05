import { cn } from '../../lib/utils'

interface LogoProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'map'
}

const box = {
  xs: 'h-7 w-7 rounded-md',
  sm: 'h-9 w-9 rounded-lg',
  md: 'h-11 w-11 rounded-xl',
  lg: 'h-14 w-14 rounded-2xl',
  map: 'h-6 w-6 rounded-md',
}

const icon = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
  map: 'h-3 w-3',
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M4 10l1.2-3.6h13.6L20 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10h16v1a4 4 0 01-4 4h-1a4 4 0 01-4-4 4 4 0 01-4 4H8a4 4 0 01-4-4v-1z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 15v5h12v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="9.5" y="17" width="5" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function HubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M3 10l9-6 9 6v9a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 20.5V14h6v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11h2M14 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

function LMIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="6.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 17.5h5l2-6.5H8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11l-1.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 11h-3.5L12 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Store pickup logo */
export function StoreLogo({ className, size = 'md' }: LogoProps) {
  return (
    <div
      className={cn(
        box[size],
        'bg-slate flex items-center justify-center shadow-[var(--shadow-sm)] shrink-0',
        className
      )}
      aria-hidden
    >
      <StoreIcon className={cn(icon[size], 'text-pure-white')} />
    </div>
  )
}

/** Hub consolidation logo */
export function HubLogo({ className, size = 'md' }: LogoProps) {
  return (
    <div
      className={cn(
        box[size],
        'bg-accent flex items-center justify-center shadow-[var(--shadow-sm)] ring-[3px] ring-accent-soft shrink-0',
        size === 'lg' && 'ring-4',
        className
      )}
      aria-hidden
    >
      <HubIcon className={cn(icon[size], 'text-pure-white')} />
    </div>
  )
}

/** Last mile (LM) rider logo */
export function LMLogo({ className, size = 'md' }: LogoProps) {
  return (
    <div
      className={cn(
        box[size],
        'bg-success flex items-center justify-center shadow-[var(--shadow-sm)] shrink-0',
        className
      )}
      aria-hidden
    >
      <LMIcon className={cn(icon[size], 'text-pure-white')} />
    </div>
  )
}

/** Inline SVG badges for map nodes */
export function StoreMapNode({ x, y }: { x: number; y: number }) {
  const s = 12
  return (
    <g transform={`translate(${x - s}, ${y - s})`}>
      <rect width={s * 2} height={s * 2} rx="4" fill="var(--color-slate)" />
      <g transform="translate(6, 6)" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5l0.6-1.8h6.8L12 5" />
        <path d="M2 5h10v0.5a2.5 2.5 0 01-2.5 2.5h-0.5a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 01-2.5 2.5H4.5A2.5 2.5 0 012 7.5V5z" />
        <path d="M3 7.5v2.5h8v-2.5" />
      </g>
    </g>
  )
}

export function HubMapNode({ x, y }: { x: number; y: number }) {
  const r = 14
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="var(--color-accent)" opacity="0.12" />
      <circle cx={x} cy={y} r={r - 4} fill="var(--color-accent)" />
      <g transform={`translate(${x - 6}, ${y - 6})`} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.5 5l6-4 6 4v4.5a1 1 0 01-1 1H2.5a1 1 0 01-1-1V5z" />
        <path d="M6 10V7h4v3" />
      </g>
    </g>
  )
}

export function LMMapNode({ x = 0, y = 0, origin }: { x?: number; y?: number; origin?: boolean }) {
  const s = 8
  const offset = origin ? -s : 0
  return (
    <g transform={origin ? `translate(${offset}, ${offset})` : `translate(${x - s}, ${y - s})`}>
      <circle cx={s} cy={s} r={s} fill="var(--color-success)" />
      <g transform="translate(2.5, 2.5)" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="2.5" cy="8" r="1.2" />
        <circle cx="8.5" cy="8" r="1.2" />
        <path d="M3.7 8h3l1-2.8H3.5" />
        <circle cx="7" cy="2.2" r="0.9" />
        <path d="M8.5 5H6.5L5.5 3.2" />
      </g>
    </g>
  )
}
