import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface BlitzLogoProps {
  className?: string
  /** Force light wordmark on dark backgrounds (e.g. CTA banners) */
  onDark?: boolean
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const heights = {
  sm: { h: 'h-6', maxW: 'max-w-[88px]' },
  md: { h: 'h-7', maxW: 'max-w-[100px]' },
  lg: { h: 'h-9', maxW: 'max-w-[128px]' },
}

const iconSizes = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
}

const iconSrc = `${import.meta.env.BASE_URL}logos/logo-icon-dark.png`
const wordmarkSrc = `${import.meta.env.BASE_URL}logos/logo-dark.png`

export function BlitzLogo({ className, onDark = false, size = 'md', showText = true }: BlitzLogoProps) {
  const { theme } = useTheme()
  const dims = heights[size]
  const lightLogo = onDark || theme === 'dark'

  if (!showText) {
    return (
      <Link
        to="/"
        className={cn('inline-flex items-center shrink-0 transition-opacity hover:opacity-80', className)}
        aria-label="Blitz home"
      >
        <img
          src={iconSrc}
          alt=""
          className={cn(iconSizes[size], 'object-contain', lightLogo && 'brightness-0 invert')}
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      className={cn('inline-flex items-center shrink-0 transition-opacity hover:opacity-80', className)}
      aria-label="Blitz Fulfillment OS home"
    >
      <img
        src={wordmarkSrc}
        alt="Blitz"
        className={cn(
          dims.h,
          dims.maxW,
          'w-auto object-contain object-left',
          lightLogo && 'brightness-0 invert'
        )}
      />
    </Link>
  )
}
