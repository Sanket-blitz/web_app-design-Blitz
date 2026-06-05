import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, MapPin } from 'lucide-react'

const deliveries = [
  { area: 'Koramangala', outcome: 'Delivered in 47 min', time: '2 min ago' },
  { area: 'Whitefield', outcome: 'Delivered same day', time: '14 min ago' },
  { area: 'HSR Layout', outcome: 'Delivered in 54 min', time: '22 min ago' },
  { area: 'Indiranagar', outcome: 'Delivered today', time: '31 min ago' },
]

export function HeroOutcomes() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % deliveries.length), 3000)
    return () => clearInterval(t)
  }, [])

  const d = deliveries[idx]

  return (
    <div className="relative w-full aspect-[4/3] max-h-[480px] rounded-2xl border-2 border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-900 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(139,92,246,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_30%,rgba(139,92,246,0.15),transparent_60%)]" />

      {/* Demand heatmap preview */}
      <div className="absolute inset-0 p-8">
        {[
          { x: 30, y: 45, s: 80 },
          { x: 55, y: 35, s: 100 },
          { x: 70, y: 55, s: 70 },
          { x: 45, y: 65, s: 90 },
        ].map((z, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-500/20 dark:bg-violet-400/25 blur-sm"
            style={{ left: `${z.x}%`, top: `${z.y}%`, width: z.s, height: z.s, transform: 'translate(-50%, -50%)' }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Center message */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="text-center rounded-2xl border-2 border-violet-500/25 dark:border-violet-400/35 bg-pure-white/85 dark:bg-zinc-900/80 backdrop-blur-md px-8 py-6 shadow-lg max-w-[280px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Store2Door</p>
          <p className="text-4xl font-bold text-charcoal mt-2">98%</p>
          <p className="text-sm text-graphite mt-1">SDD success rate</p>
          <p className="text-xs text-graphite dark:text-zinc-400 mt-3">Same-day by 11 PM · orders up to 5 PM</p>
        </div>
      </div>

      {/* Live outcomes ticker */}
      <div className="absolute bottom-0 inset-x-0 border-t-2 border-border dark:border-zinc-600 bg-pure-white/95 dark:bg-zinc-900/95 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-graphite">Live deliveries</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={d.area} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0" />
              <span className="font-semibold text-charcoal truncate">{d.area}</span>
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <span className="text-sm text-graphite truncate">{d.outcome}</span>
            </div>
            <span className="text-xs text-graphite shrink-0">{d.time}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
