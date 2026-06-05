import { cn } from '../../lib/utils'

interface BlitzLogoSVGProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

export function BlitzLogoSVG({ className, size = 'md', showText = true }: BlitzLogoSVGProps) {
  const sizes = {
    sm: { viewBox: '0 0 40 40', icon: 32, text: 14 },
    md: { viewBox: '0 0 48 48', icon: 40, text: 16 },
    lg: { viewBox: '0 0 56 56', icon: 48, text: 18 },
    xl: { viewBox: '0 0 64 64', icon: 56, text: 20 },
  }

  const config = sizes[size]

  return (
    <div className={cn('inline-flex items-center gap-2 group', className)}>
      <svg
        viewBox={config.viewBox}
        className="w-auto h-8 dark:h-8"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="blitzGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b6fd9" />
            <stop offset="100%" stopColor="#1a7f4b" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={config.icon / 2}
          cy={config.icon / 2}
          r={config.icon / 2}
          fill="url(#blitzGradient)"
          opacity="0.15"
          className="transition-opacity group-hover:opacity-25"
        />

        {/* Lightning bolt - represents speed */}
        <g transform={`translate(${config.icon / 4}, ${config.icon / 4})`} filter="url(#glow)">
          {/* Vertical line - top part */}
          <path
            d={`M 8 0 L 4 12 L 8 12 L 4 24 L 12 8 L 8 8 L 12 0 Z`}
            fill="#3b6fd9"
            className="dark:fill-current"
          />
        </g>

        {/* Dots representing network nodes */}
        <circle cx={config.icon * 0.75} cy={config.icon * 0.3} r="2.5" fill="#1a7f4b" opacity="0.8" />
        <circle cx={config.icon * 0.85} cy={config.icon * 0.65} r="2" fill="#f59e0b" opacity="0.7" />

        {/* Connection lines */}
        <line
          x1={config.icon * 0.55}
          y1={config.icon * 0.35}
          x2={config.icon * 0.72}
          y2={config.icon * 0.32}
          stroke="#3b6fd9"
          strokeWidth="1.5"
          opacity="0.4"
          className="dark:stroke-current"
        />
        <line
          x1={config.icon * 0.72}
          y1={config.icon * 0.32}
          x2={config.icon * 0.82}
          y2={config.icon * 0.62}
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold tracking-tight text-charcoal dark:text-charcoal text-sm">
            Blitz
          </span>
          <span className="text-xs text-graphite dark:text-graphite font-medium">
            Fulfillment OS
          </span>
        </div>
      )}
    </div>
  )
}

export function BlitzLogoIcon({ className, size = 'md' }: Omit<BlitzLogoSVGProps, 'showText'>) {
  return <BlitzLogoSVG className={className} size={size} showText={false} />
}
