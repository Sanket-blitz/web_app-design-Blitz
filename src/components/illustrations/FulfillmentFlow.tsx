/**
 * Fulfillment Flow Illustrations
 * Meaningful graphics for each stage of the delivery network
 */

interface IllustrationProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
}

export function RetailStoreIllustration({ className, size = 'md' }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeMap[size]} ${className}`}
      aria-label="Retail store"
    >
      <defs>
        <linearGradient id="storeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b6fd9" />
          <stop offset="100%" stopColor="#2f5bb8" />
        </linearGradient>
      </defs>

      {/* Building */}
      <rect x="40" y="80" width="120" height="90" rx="8" fill="url(#storeGrad)" opacity="0.2" />
      <rect x="40" y="80" width="120" height="90" rx="8" fill="none" stroke="#3b6fd9" strokeWidth="2" />

      {/* Door */}
      <rect x="80" y="130" width="40" height="40" rx="4" fill="#3b6fd9" opacity="0.3" />
      <circle cx="115" cy="150" r="2" fill="#3b6fd9" />

      {/* Windows */}
      <rect x="55" y="95" width="20" height="20" rx="2" fill="none" stroke="#3b6fd9" strokeWidth="1.5" opacity="0.6" />
      <rect x="85" y="95" width="20" height="20" rx="2" fill="none" stroke="#3b6fd9" strokeWidth="1.5" opacity="0.6" />
      <rect x="115" y="95" width="20" height="20" rx="2" fill="none" stroke="#3b6fd9" strokeWidth="1.5" opacity="0.6" />

      {/* Roof */}
      <polygon points="40,80 100,40 160,80" fill="#3b6fd9" opacity="0.4" />

      {/* Flag/Store sign */}
      <rect x="155" y="70" width="3" height="20" fill="#3b6fd9" />
      <polygon points="158,70 158,78 168,74" fill="#3b6fd9" />

      {/* Products inside */}
      <g opacity="0.5">
        <rect x="50" y="110" width="12" height="15" fill="#3b6fd9" />
        <rect x="68" y="110" width="12" height="15" fill="#3b6fd9" />
        <rect x="140" y="110" width="12" height="15" fill="#3b6fd9" />
      </g>

      {/* Label */}
      <text x="100" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d1d1f" className="dark:fill-current">
        Retail Stores
      </text>
    </svg>
  )
}

export function MiddleMileHubIllustration({ className, size = 'md' }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeMap[size]} ${className}`}
      aria-label="Middle mile hub"
    >
      <defs>
        <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a7f4b" />
          <stop offset="100%" stopColor="#10543a" />
        </linearGradient>
      </defs>

      {/* Central hub circle */}
      <circle cx="100" cy="90" r="35" fill="url(#hubGrad)" opacity="0.2" />
      <circle cx="100" cy="90" r="35" fill="none" stroke="#1a7f4b" strokeWidth="2" />

      {/* Warehouse structure */}
      <g opacity="0.7">
        {/* Shelves */}
        <line x1="75" y1="70" x2="125" y2="70" stroke="#1a7f4b" strokeWidth="2" />
        <line x1="75" y1="85" x2="125" y2="85" stroke="#1a7f4b" strokeWidth="2" />
        <line x1="75" y1="100" x2="125" y2="100" stroke="#1a7f4b" strokeWidth="2" />

        {/* Vertical supports */}
        <line x1="80" y1="60" x2="80" y2="110" stroke="#1a7f4b" strokeWidth="1.5" />
        <line x1="100" y1="60" x2="100" y2="110" stroke="#1a7f4b" strokeWidth="1.5" />
        <line x1="120" y1="60" x2="120" y2="110" stroke="#1a7f4b" strokeWidth="1.5" />
      </g>

      {/* Packages on shelves */}
      <g fill="#1a7f4b" opacity="0.5">
        <rect x="82" y="72" width="8" height="8" />
        <rect x="102" y="72" width="8" height="8" />
        <rect x="82" y="87" width="8" height="8" />
        <rect x="117" y="87" width="8" height="8" />
        <rect x="97" y="102" width="8" height="8" />
      </g>

      {/* Incoming/Outgoing arrows */}
      <g stroke="#1a7f4b" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 50 90 L 65 90" />
        <polygon points="65,90 58,85 60,90 58,95" fill="#1a7f4b" />

        <path d="M 135 90 L 150 90" />
        <polygon points="150,90 143,85 145,90 143,95" fill="#1a7f4b" />
      </g>

      {/* Label */}
      <text x="100" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d1d1f" className="dark:fill-current">
        Middle Mile Hubs
      </text>
    </svg>
  )
}

export function RiderIllustration({ className, size = 'md' }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeMap[size]} ${className}`}
      aria-label="Last mile rider"
    >
      <defs>
        <linearGradient id="riderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Bike frame */}
      <g stroke="#f59e0b" strokeWidth="2.5" fill="none">
        {/* Wheels */}
        <circle cx="60" cy="110" r="20" />
        <circle cx="130" cy="110" r="20" />

        {/* Wheel spokes */}
        <g opacity="0.5">
          <line x1="60" y1="90" x2="60" y2="130" />
          <line x1="40" y1="110" x2="80" y2="110" />
          <line x1="130" y1="90" x2="130" y2="130" />
          <line x1="110" y1="110" x2="150" y2="110" />
        </g>

        {/* Frame */}
        <line x1="60" y1="110" x2="100" y2="70" />
        <line x1="100" y1="70" x2="130" y2="110" />
        <line x1="100" y1="70" x2="80" y2="90" />

        {/* Handlebars */}
        <line x1="100" y1="70" x2="95" y2="50" />
        <line x1="95" y1="50" x2="105" y2="50" />
      </g>

      {/* Rider */}
      <g fill="#f59e0b" opacity="0.7">
        {/* Head */}
        <circle cx="100" cy="55" r="6" />
        {/* Body */}
        <rect x="97" y="62" width="6" height="12" rx="2" />
      </g>

      {/* Package on bike */}
      <g>
        <rect x="110" y="85" width="18" height="18" rx="2" fill="url(#riderGrad)" opacity="0.3" />
        <rect x="110" y="85" width="18" height="18" rx="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Package lines */}
        <line x1="115" y1="93" x2="123" y2="93" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
        <line x1="115" y1="99" x2="123" y2="99" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Motion lines */}
      <g stroke="#f59e0b" strokeWidth="1.5" opacity="0.4">
        <line x1="35" y1="105" x2="45" y2="105" />
        <line x1="155" y1="115" x2="165" y2="115" />
      </g>

      {/* Label */}
      <text x="100" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d1d1f" className="dark:fill-current">
        Last Mile Riders
      </text>
    </svg>
  )
}

export function CustomerDestinationIllustration({ className, size = 'md' }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeMap[size]} ${className}`}
      aria-label="Customer destination"
    >
      <defs>
        <linearGradient id="destGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#a01728" />
        </linearGradient>
      </defs>

      {/* Map pin background */}
      <circle cx="100" cy="85" r="35" fill="url(#destGrad)" opacity="0.15" />

      {/* Map pin */}
      <path
        d="M 100 45 C 90 45 82 53 82 65 C 82 85 100 120 100 120 C 100 120 118 85 118 65 C 118 53 110 45 100 45 Z"
        fill="url(#destGrad)"
        opacity="0.8"
      />

      {/* Inner circle of pin */}
      <circle cx="100" cy="65" r="7" fill="white" opacity="0.9" />

      {/* House at destination */}
      <g opacity="0.6">
        {/* Roof */}
        <polygon points="75,100 100,80 125,100" fill="#c41e3a" />

        {/* Walls */}
        <rect x="75" y="100" width="50" height="30" fill="#c41e3a" opacity="0.3" />
        <rect x="75" y="100" width="50" height="30" fill="none" stroke="#c41e3a" strokeWidth="2" />

        {/* Door */}
        <rect x="90" y="110" width="20" height="20" fill="#c41e3a" opacity="0.3" />
      </g>

      {/* Delivery checkmark */}
      <g>
        <circle cx="140" cy="135" r="12" fill="#1a7f4b" opacity="0.7" />
        <path
          d="M 136 135 L 138.5 137.5 L 143 132"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Label */}
      <text x="100" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d1d1f" className="dark:fill-current">
        Customer Destinations
      </text>
    </svg>
  )
}
