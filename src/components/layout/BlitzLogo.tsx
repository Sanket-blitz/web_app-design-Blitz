import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { BlitzLogoSVG } from './BlitzLogoSVG'

interface BlitzLogoProps {
  className?: string
  /** Use white wordmark on dark backgrounds (e.g. CTA banners) */
  onDark?: boolean
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function BlitzLogo({ className, size = 'md', showText = true }: BlitzLogoProps) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center group transition-opacity hover:opacity-75', className)}
      aria-label="Blitz Fulfillment OS home"
    >
      <BlitzLogoSVG size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} showText={showText} />
    </Link>
  )
}
