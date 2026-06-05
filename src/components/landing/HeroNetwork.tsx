import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, Bike, MapPin } from 'lucide-react'

const activities = [
  { id: 1, store: 'Indiranagar', rider: 'R-2847', customer: 'Jayanagar', status: 'Delivered', time: '12 min' },
  { id: 2, store: 'Koramangala', rider: 'R-1093', customer: 'HSR Layout', status: 'In transit', time: '8 min' },
  { id: 3, store: 'MG Road', rider: 'R-4521', customer: 'Whitefield', status: 'Picked up', time: '4 min' },
  { id: 4, store: 'Brigade Rd', rider: 'R-3302', customer: 'Indiranagar', status: 'Assigned', time: '1 min' },
]

export function HeroNetwork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % activities.length)
      setPulse((p) => p + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const activity = activities[activeIndex]

  return (
    <div className="relative w-full aspect-[4/3] max-h-[480px] rounded-[var(--radius-xl)] bg-white border border-border shadow-[var(--shadow-lg)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-accent-soft)_0%,transparent_50%)]" />

      {/* Network nodes */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          <motion.line
            key={`line1-${pulse}`}
            x1="18%" y1="45%" x2="50%" y2="50%"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.line
            key={`line2-${pulse}`}
            x1="50%" y1="50%" x2="82%" y2="42%"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          />
        </svg>

        {/* Store node */}
        <div className="absolute left-[12%] top-[38%] flex flex-col items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-14 w-14 rounded-[var(--radius-lg)] bg-charcoal text-white flex items-center justify-center shadow-[var(--shadow-md)]"
          >
            <Store className="h-6 w-6" />
          </motion.div>
          <span className="text-xs font-medium text-charcoal bg-white/90 px-2 py-0.5 rounded-full shadow-sm">Store</span>
        </div>

        {/* Rider node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="h-14 w-14 rounded-full bg-accent text-white flex items-center justify-center shadow-[var(--shadow-md)]"
          >
            <Bike className="h-6 w-6" />
          </motion.div>
          <span className="text-xs font-medium text-charcoal bg-white/90 px-2 py-0.5 rounded-full shadow-sm">Rider</span>
        </div>

        {/* Customer node */}
        <div className="absolute right-[12%] top-[35%] flex flex-col items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="h-14 w-14 rounded-[var(--radius-lg)] bg-white border-2 border-accent text-accent flex items-center justify-center shadow-[var(--shadow-md)]"
          >
            <MapPin className="h-6 w-6" />
          </motion.div>
          <span className="text-xs font-medium text-charcoal bg-white/90 px-2 py-0.5 rounded-full shadow-sm">Customer</span>
        </div>
      </div>

      {/* Live activity feed */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-medium text-graphite uppercase tracking-wider">Live fulfillment</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-medium text-charcoal truncate">{activity.store}</span>
              <span className="text-graphite">→</span>
              <span className="text-graphite">{activity.rider}</span>
              <span className="text-graphite">→</span>
              <span className="font-medium text-charcoal truncate">{activity.customer}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className="text-xs text-graphite">{activity.time}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-soft text-accent">
                {activity.status}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
