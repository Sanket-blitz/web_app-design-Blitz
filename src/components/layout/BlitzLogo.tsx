import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface BlitzLogoProps {
  className?: string
  /** Force white logo (for dark backgrounds like CTA banners) */
  onDark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
}

export function BlitzLogo({ className, onDark, size = 'md' }: BlitzLogoProps) {
  return (
    <Link to="/" className={cn('inline-flex items-center group', className)} aria-label="Blitz home">
      <img
        src="/logo.png"
        alt="blitz"
        className={cn(
          'w-auto transition-all duration-200 group-hover:opacity-90',
          sizes[size],
          onDark ? 'brightness-100' : 'brightness-0 dark:brightness-100'
        )}
      />
    </Link>
  )
}
