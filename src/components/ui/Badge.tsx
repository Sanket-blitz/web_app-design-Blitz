import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'accent' | 'info'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-surface dark:bg-white/10 text-graphite dark:text-graphite',
  success: 'bg-success-soft dark:bg-success/20 text-success dark:text-success-light',
  warning: 'bg-warning-soft dark:bg-warning/20 text-warning dark:text-warning-light',
  error: 'bg-error-soft dark:bg-error/20 text-error dark:text-error-light',
  accent: 'bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-light',
  info: 'bg-info-soft dark:bg-info/20 text-info dark:text-info-light',
}

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
