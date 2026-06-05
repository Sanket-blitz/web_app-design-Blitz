import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface StatProps {
  label: string
  value: string | number
  icon?: ReactNode
  change?: { value: number; direction: 'up' | 'down' }
  className?: string
}

export function Stat({ label, value, icon, change, className }: StatProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-[var(--radius-xl)] border border-border dark:border-white/10 bg-white dark:bg-white/5 transition-all hover:shadow-[var(--shadow-md)]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-graphite dark:text-graphite mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-semibold text-charcoal dark:text-charcoal">{value}</h3>
            {change && (
              <span className={cn(
                'text-xs font-medium',
                change.direction === 'up' ? 'text-success dark:text-success-light' : 'text-error dark:text-error-light'
              )}>
                {change.direction === 'up' ? '↑' : '↓'} {change.value}%
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="text-accent dark:text-accent-light opacity-20 ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
