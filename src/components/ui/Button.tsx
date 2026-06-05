import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'on-dark' | 'success' | 'warning' | 'error'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  isCompact?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-slate text-pure-white hover:bg-slate-soft active:scale-[0.98] shadow-sm dark:bg-accent dark:hover:bg-accent-hover disabled:opacity-60 transition-all',
  secondary:
    'bg-accent text-pure-white hover:bg-accent-hover active:scale-[0.98] shadow-sm dark:bg-accent dark:hover:bg-accent-light disabled:opacity-60 transition-all',
  accent:
    'bg-accent text-pure-white hover:bg-accent-hover active:scale-[0.98] shadow-sm dark:bg-accent-light dark:hover:bg-accent disabled:opacity-60 transition-all',
  ghost:
    'bg-transparent text-charcoal hover:bg-surface active:bg-border dark:text-charcoal-soft dark:hover:bg-zinc-800 transition-colors',
  outline:
    'bg-pure-white text-slate border border-border-strong hover:border-slate/30 hover:bg-off-white active:scale-[0.98] dark:bg-transparent dark:text-charcoal-soft dark:border-zinc-500 dark:hover:border-zinc-400 dark:hover:bg-zinc-800/60 transition-all',
  'on-dark':
    'bg-transparent text-pure-white border border-pure-white/30 hover:bg-pure-white/10 hover:border-pure-white/50 active:scale-[0.98] transition-all [color:#ffffff]',
  success:
    'bg-success text-pure-white hover:bg-success-light active:scale-[0.98] shadow-sm dark:bg-success-light dark:hover:bg-success disabled:opacity-60 transition-all [color:#ffffff]',
  warning:
    'bg-warning text-pure-white hover:bg-warning-light active:scale-[0.98] shadow-sm dark:bg-warning-light dark:hover:bg-warning disabled:opacity-60 transition-all [color:#ffffff]',
  error:
    'bg-error text-pure-white hover:bg-error-light active:scale-[0.98] shadow-sm dark:bg-error-light dark:hover:bg-error disabled:opacity-60 transition-all [color:#ffffff]',
}

const sizes: Record<Size, string> = {
  xs: 'h-8 px-3 text-xs gap-1',
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm font-medium',
  lg: 'h-12 px-6 text-base font-medium',
  xl: 'h-14 px-7 text-base font-medium',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
