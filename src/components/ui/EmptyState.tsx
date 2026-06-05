import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon && (
        <div className="mb-4 p-3 rounded-full bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-light">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-charcoal dark:text-charcoal mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-graphite dark:text-graphite max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium text-accent hover:text-accent-hover dark:text-accent-light dark:hover:text-accent transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
