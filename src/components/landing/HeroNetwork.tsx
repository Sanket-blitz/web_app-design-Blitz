import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, Warehouse, Bike, MapPin } from 'lucide-react'

const activities = [
  { id: 1, store: 'Koramangala', hub: 'Central', rider: 'Arjun K.', customer: 'HSR Layout', status: 'Delivered', time: '28 min' },
  { id: 2, store: 'Indiranagar', hub: 'East', rider: 'Priya M.', customer: 'Whitefield', status: 'In transit', time: '18 min' },
  { id: 3, store: 'MG Road', hub: 'Central', rider: 'Rahul S.', customer: 'Malleshwaram', status: 'At hub', time: '6 min' },
  { id: 4, store: 'Jayanagar', hub: 'South', rider: 'Vikram D.', customer: 'Electronic City', status: 'Picked up', time: '4 min' },
]

export function HeroNetwork() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex((i) => (i + 1) % activities.length), 3200)
    return () => clearInterval(interval)
  }, [])

  const activity = activities[activeIndex]

  return (
    <div className="relative w-full aspect-[4/3] max-h-[500px] rounded-2xl border-2 border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-900 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--color-accent-soft),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(91,141,239,0.12),transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 dark:opacity-50" style={{
        backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          <motion.path
            d="M 18% 50% Q 34% 35% 50% 50%"
            fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0.4 }} animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.path
            d="M 50% 50% Q 66% 35% 50% 50% Q 66% 65% 82% 50%"
            fill="none" stroke="var(--color-success)" strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0.4 }} animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, repeatType: 'reverse' }}
          />
        </svg>

        <div className="absolute left-[10%] top-[42%] flex flex-col items-center gap-1.5">
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-12 w-12 rounded-xl bg-slate flex items-center justify-center shadow-lg">
            <Store className="h-5 w-5 text-pure-white" />
          </motion.div>
          <span className="text-[10px] font-semibold text-charcoal bg-pure-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-border dark:border-zinc-600">Store</span>
        </div>

        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 flex flex-col items-center gap-1.5">
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center shadow-[0_0_24px_rgba(91,141,239,0.4)]">
            <Warehouse className="h-7 w-7 text-pure-white" />
          </motion.div>
          <span className="text-[10px] font-bold text-accent dark:text-[#7aa3f5] bg-pure-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-accent/30">Central Hub</span>
        </div>

        <div className="absolute left-[58%] top-[55%] flex flex-col items-center gap-1.5">
          <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="h-11 w-11 rounded-full bg-success flex items-center justify-center shadow-lg">
            <Bike className="h-5 w-5 text-pure-white" />
          </motion.div>
          <span className="text-[10px] font-semibold text-charcoal bg-pure-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-border dark:border-zinc-600">Rider</span>
        </div>

        <div className="absolute right-[10%] top-[42%] flex flex-col items-center gap-1.5">
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="h-12 w-12 rounded-xl bg-warning-soft dark:bg-[#2a2010] border-2 border-warning dark:border-amber-500 flex items-center justify-center shadow-lg">
            <MapPin className="h-5 w-5 text-warning dark:text-amber-400" />
          </motion.div>
          <span className="text-[10px] font-semibold text-charcoal bg-pure-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-border dark:border-zinc-600">Customer</span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 border-t-2 border-border dark:border-zinc-600 bg-pure-white/95 dark:bg-zinc-900/95 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-[10px] font-semibold text-graphite uppercase tracking-wider">Live fulfillment</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm"
          >
            <span className="font-semibold text-charcoal">{activity.store}</span>
            <span className="text-graphite">→</span>
            <span className="text-accent dark:text-[#7aa3f5] font-medium">{activity.hub}</span>
            <span className="text-graphite">→</span>
            <span className="text-success font-medium">{activity.rider}</span>
            <span className="text-graphite">→</span>
            <span className="font-semibold text-charcoal">{activity.customer}</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="text-graphite text-xs">{activity.time}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-soft dark:bg-[#1a2d52] text-accent dark:text-[#7aa3f5]">{activity.status}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
