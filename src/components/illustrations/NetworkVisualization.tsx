export function NetworkVisualization() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-auto animate-fadeInUp"
      aria-label="Store to door delivery network visualization"
    >
      {/* Background grid */}
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b6fd9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0.02" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Animated connections */}
      <line x1="80" y1="200" x2="220" y2="140" stroke="#3b6fd9" strokeWidth="2" opacity="0.3" />
      <line x1="80" y1="200" x2="220" y2="260" stroke="#3b6fd9" strokeWidth="2" opacity="0.3" />
      <line x1="220" y1="140" x2="340" y2="200" stroke="#1a7f4b" strokeWidth="2" opacity="0.3" />
      <line x1="220" y1="260" x2="340" y2="200" stroke="#1a7f4b" strokeWidth="2" opacity="0.3" />
      <line x1="340" y1="200" x2="480" y2="160" stroke="#f59e0b" strokeWidth="2" opacity="0.3" />
      <line x1="340" y1="200" x2="480" y2="240" stroke="#f59e0b" strokeWidth="2" opacity="0.3" />

      {/* Animated dots on connections */}
      <circle cx="80" cy="200" r="2" fill="#3b6fd9" opacity="0.5">
        <animate attributeName="cx" from="80" to="220" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" from="200" to="140" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="200" r="2" fill="#1a7f4b" opacity="0.5">
        <animate attributeName="cx" from="220" to="340" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" from="140" to="200" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="200" r="2" fill="#f59e0b" opacity="0.5">
        <animate attributeName="cx" from="340" to="480" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" from="200" to="160" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Store node */}
      <circle cx="80" cy="200" r="28" fill="url(#nodeGradient)" stroke="#3b6fd9" strokeWidth="2" />
      <text x="80" y="207" textAnchor="middle" fontSize="16" fontWeight="600" fill="#3b6fd9">
        🏪
      </text>

      {/* Hub/Depot nodes */}
      <circle cx="220" cy="140" r="24" fill="url(#nodeGradient)" stroke="#1a7f4b" strokeWidth="2" />
      <text x="220" y="147" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a7f4b">
        ⚡
      </text>

      <circle cx="220" cy="260" r="24" fill="url(#nodeGradient)" stroke="#1a7f4b" strokeWidth="2" />
      <text x="220" y="267" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a7f4b">
        ⚡
      </text>

      {/* Rider nodes */}
      <circle cx="340" cy="200" r="22" fill="url(#nodeGradient)" stroke="#f59e0b" strokeWidth="2" filter="url(#glow)" />
      <text x="340" y="206" textAnchor="middle" fontSize="14" fontWeight="600" fill="#f59e0b">
        🚴
      </text>

      {/* Delivery nodes */}
      <circle cx="480" cy="160" r="20" fill="url(#nodeGradient)" stroke="#e8e8ed" strokeWidth="2" />
      <text x="480" y="166" textAnchor="middle" fontSize="12">
        📍
      </text>

      <circle cx="480" cy="240" r="20" fill="url(#nodeGradient)" stroke="#e8e8ed" strokeWidth="2" />
      <text x="480" y="246" textAnchor="middle" fontSize="12">
        📍
      </text>

      {/* Labels */}
      <text x="80" y="245" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1d1d1f" className="dark:fill-current">
        Store
      </text>
      <text x="220" y="110" textAnchor="middle" fontSize="11" fontWeight="500" fill="#6e6e73">
        Pickup
      </text>
      <text x="220" y="295" textAnchor="middle" fontSize="11" fontWeight="500" fill="#6e6e73">
        Pickup
      </text>
      <text x="340" y="230" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1d1d1f" className="dark:fill-current">
        Rider
      </text>
      <text x="480" y="135" textAnchor="middle" fontSize="11" fontWeight="500" fill="#6e6e73">
        Customer
      </text>
      <text x="480" y="270" textAnchor="middle" fontSize="11" fontWeight="500" fill="#6e6e73">
        Customer
      </text>
    </svg>
  )
}
