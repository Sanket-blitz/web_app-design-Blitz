export function EmptyOrdersIllustration() {
  return (
    <svg
      viewBox="0 0 200 180"
      className="w-24 h-24 opacity-75"
      aria-label="No orders illustration"
    >
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b6fd9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Large package */}
      <rect x="40" y="40" width="80" height="80" rx="8" fill="url(#boxGrad)" stroke="#3b6fd9" strokeWidth="2" />

      {/* Package details */}
      <line x1="50" y1="55" x2="150" y2="55" stroke="#3b6fd9" strokeWidth="1" opacity="0.3" />
      <line x1="50" y1="70" x2="100" y2="70" stroke="#3b6fd9" strokeWidth="1" opacity="0.3" />

      {/* Tape */}
      <rect x="85" y="40" width="10" height="80" fill="#3b6fd9" opacity="0.2" />

      {/* Question mark */}
      <text x="100" y="140" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#3b6fd9" opacity="0.5">
        ?
      </text>
    </svg>
  )
}
