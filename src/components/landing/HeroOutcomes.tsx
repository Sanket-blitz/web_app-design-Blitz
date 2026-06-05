import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HeroFulfillmentBackground } from './HeroFulfillmentBackground'

const liveOrders = [
  { from: 'Koramangala', to: 'HSR Layout', time: '47 min' },
  { from: 'Whitefield', to: 'Indiranagar', time: '58 min' },
  { from: 'MG Road', to: 'Electronic City', time: '38 min' },
  { from: 'Jayanagar', to: 'Marathahalli', time: '51 min' },
]

export function HeroOutcomes() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % liveOrders.length), 3500)
    return () => clearInterval(t)
  }, [])

  const order = liveOrders[idx]

  return (
    <div className="relative w-full aspect-[4/3] max-h-[480px] rounded-2xl border-2 border-border dark:border-zinc-700 bg-pure-white dark:bg-zinc-900 shadow-xl overflow-hidden flex flex-col">
      {/* Main content */}
      <div className="flex-1 min-h-0">
        <HeroFulfillmentBackground />
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-4 py-3 border-t-2 border-border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80">
        <div className="flex items-center gap-4">
          {/* 98% */}
          <div className="shrink-0 text-center pr-4 border-r border-border dark:border-zinc-600">
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">98%</p>
            <p className="text-[9px] font-semibold uppercase text-zinc-600 dark:text-zinc-300">SDD Success</p>
          </div>

          {/* Live order */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-green-500 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[9px] font-bold uppercase text-zinc-600 dark:text-zinc-300">Live</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={order.from}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">{order.from}</span>
                <ArrowRight className="h-4 w-4 text-violet-500 shrink-0" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">{order.to}</span>
                <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-bold shrink-0">
                  <CheckCircle2 className="h-3 w-3" />
                  {order.time}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
