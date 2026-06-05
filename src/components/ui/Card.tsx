import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  selected?: boolean
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'interactive'
}

const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({
  children,
  className,
  hover,
  selected,
  padding = 'md',
  variant = 'default',
  ...props
}: CardProps) {
  const variantClass = {
    default: 'bg-white dark:bg-white/5 border border-border dark:border-white/10',
    gradient: 'bg-gradient-accent dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent border border-border dark:border-white/10',
    interactive: 'bg-white dark:bg-white/5 border border-border dark:border-white/10 hover:bg-surface dark:hover:bg-white/8',
  }

  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] transition-all duration-200',
        variantClass[variant],
        hover && 'hover:border-border-strong dark:hover:border-white/20 hover:shadow-[var(--shadow-md)] cursor-pointer',
        selected && 'border-accent ring-2 ring-accent/20 dark:ring-accent/30 shadow-[var(--shadow-md)]',
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
