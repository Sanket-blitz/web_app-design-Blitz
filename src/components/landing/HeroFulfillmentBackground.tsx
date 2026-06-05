import { motion } from 'framer-motion'
import { Bike, Home, Store, Warehouse } from 'lucide-react'

/** Simple Store2Door flow. Remove import from HeroOutcomes to revert. */
export function HeroFulfillmentBackground() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-6 py-6 gap-6">
      {/* Title */}
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          How Store2Door Works
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
          Same-day delivery in 60 min – 6 hours
        </p>
      </div>

      {/* Main flow: Store → Hub → Rider → Door */}
      <div className="flex items-start justify-center">
        <Step icon={Store} label="Store" sub="Pickup" color="violet" />
        <FlowArrow from="#8b5cf6" to="#3b82f6" />
        <Step icon={Warehouse} label="Hub" sub="Sort" color="blue" pulse />
        <FlowArrow from="#3b82f6" to="#22c55e" />
        <Step icon={Bike} label="Rider" sub="Deliver" color="green" />
        <FlowArrow from="#22c55e" to="#f59e0b" />
        <Step icon={Home} label="Door" sub="Done" color="amber" />
      </div>

      {/* Key stats */}
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <Stat value="47 min" label="Avg delivery" />
        <Stat value="40 km" label="Max range" />
        <Stat value="5 PM" label="Cutoff" />
      </div>
    </div>
  )
}

function Step({
  icon: Icon,
  label,
  sub,
  color,
  pulse,
}: {
  icon: typeof Store
  label: string
  sub: string
  color: 'violet' | 'blue' | 'green' | 'amber'
  pulse?: boolean
}) {
  const bg = {
    violet: 'bg-violet-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
  }[color]

  return (
    <motion.div
      className="flex flex-col items-center shrink-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl ${bg} flex items-center justify-center shadow-lg`}
        animate={pulse ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2} />
      </motion.div>
      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-2">{label}</p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{sub}</p>
    </motion.div>
  )
}

/** Animated dashed arrow with center arrowhead: ----▶---- */
function FlowArrow({ from, to }: { from: string; to: string }) {
  const uid = `arrow-${from.slice(1)}-${to.slice(1)}`

  return (
    <div className="w-12 sm:w-16 shrink-0 flex items-center justify-center h-14 sm:h-16" aria-hidden>
      <svg viewBox="0 0 64 24" className="w-full h-6 overflow-visible">
        <defs>
          <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow track */}
        <line x1="4" y1="12" x2="60" y2="12" stroke={from} strokeWidth="4" strokeLinecap="round" opacity="0.15" />

        {/* Left dashed segment */}
        <motion.line
          x1="4"
          y1="12"
          x2="26"
          y2="12"
          stroke={`url(#${uid})`}
          strokeWidth="3"
          strokeDasharray="8 5"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -26] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center arrow ▶ with glow */}
        <motion.polygon
          points="34,12 24,6 24,18"
          fill={to}
          filter={`url(#glow-${uid})`}
          animate={{ 
            scale: [0.85, 1.15, 0.85],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '29px 12px' }}
        />

        {/* Right dashed segment */}
        <motion.line
          x1="38"
          y1="12"
          x2="60"
          y2="12"
          stroke={`url(#${uid})`}
          strokeWidth="3"
          strokeDasharray="8 5"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -26] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Traveling dot */}
        <motion.circle
          r="4"
          fill="white"
          stroke={to}
          strokeWidth="2"
          filter={`url(#glow-${uid})`}
          animate={{ cx: [6, 58, 6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          cy="12"
        />
      </svg>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100">{value}</p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{label}</p>
    </div>
  )
}
