export function SuccessCheckmark() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-16 h-16"
      aria-label="Success checkmark"
    >
      <defs>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a7f4b" />
          <stop offset="100%" stopColor="#34c77b" />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="url(#successGrad)" opacity="0.2" />

      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#successGrad)"
        strokeWidth="2"
        opacity="0.5"
      >
        <animate attributeName="r" from="38" to="45" dur="0.6s" begin="0s" />
        <animate attributeName="opacity" from="0.5" to="0" dur="0.6s" begin="0s" />
      </circle>

      {/* Main circle with checkmark */}
      <circle cx="50" cy="50" r="35" fill="url(#successGrad)" />

      {/* Checkmark */}
      <path
        d="M 35 50 L 45 60 L 65 40"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="30"
        strokeDashoffset="30"
      >
        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" begin="0.2s" />
      </path>
    </svg>
  )
}
