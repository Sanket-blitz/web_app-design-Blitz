import { motion } from 'framer-motion'
import { Store, Warehouse, Bike, MapPin } from 'lucide-react'

const stores = [
  { name: 'Koramangala', x: 18, y: 62 },
  { name: 'Indiranagar', x: 42, y: 45 },
  { name: 'MG Road', x: 55, y: 28 },
  { name: 'Jayanagar', x: 25, y: 82 },
]

const hubs = [
  { name: 'Central Hub', x: 50, y: 50, type: 'middle' },
  { name: 'East Hub', x: 78, y: 35, type: 'middle' },
  { name: 'South Hub', x: 35, y: 72, type: 'middle' },
]

const destinations = [
  { name: 'Whitefield', x: 92, y: 22 },
  { name: 'Electronic City', x: 48, y: 92 },
  { name: 'Malleshwaram', x: 12, y: 18 },
  { name: 'HSR Layout', x: 72, y: 78 },
]

export function FulfillmentInfographic() {
  return (
    <div className="relative w-full rounded-[var(--radius-xl)] border border-border bg-white dark:bg-surface shadow-[var(--shadow-lg)] overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />

      {/* City zone rings */}
      <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <ellipse cx="50" cy="50" rx="48" ry="42" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="2 2" />
        <ellipse cx="50" cy="50" rx="35" ry="30" fill="none" stroke="var(--color-border-strong)" strokeWidth="0.2" />
        <ellipse cx="50" cy="50" rx="20" ry="18" fill="none" stroke="var(--color-border-strong)" strokeWidth="0.2" />
      </svg>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {stores.map((s, i) => (
          <motion.line
            key={`s-hub-${i}`}
            x1={`${s.x}%`} y1={`${s.y}%`} x2="50%" y2="50%"
            stroke="var(--color-accent)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        ))}
        {hubs.map((h, i) => (
          <motion.line
            key={`hub-central-${i}`}
            x1={`${h.x}%`} y1={`${h.y}%`} x2="50%" y2="50%"
            stroke="var(--color-accent)"
            strokeWidth="0.3"
            strokeDasharray="1.5 1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
          />
        ))}
        {destinations.map((d, i) => (
          <motion.line
            key={`hub-d-${i}`}
            x1="50%" y1="50%" x2={`${d.x}%`} y2={`${d.y}%`}
            stroke="var(--color-success)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
          />
        ))}
        {/* Animated rider dots */}
        <motion.circle
          r="0.8"
          fill="var(--color-accent)"
          animate={{ cx: ['18%', '50%', '92%'], cy: ['62%', '50%', '22%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          r="0.8"
          fill="var(--color-success)"
          animate={{ cx: ['42%', '50%', '72%'], cy: ['45%', '50%', '78%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </svg>

      <div className="relative p-6 md:p-8 min-h-[420px]">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
          {[
            { icon: Store,     label: 'Retail Stores',         bg: 'bg-[#1d1d1f] dark:bg-white/10',  stroke: 'white' },
            { icon: Warehouse, label: 'Middle Mile Hubs',      bg: 'bg-accent',                       stroke: 'white' },
            { icon: Bike,      label: 'Last Mile Riders',      bg: 'bg-warning',                      stroke: 'white' },
            { icon: MapPin,    label: 'Customer Destinations', bg: 'bg-warning-soft dark:bg-warning/20', stroke: 'var(--color-warning)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`h-5 w-5 rounded-md ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className="h-3 w-3" style={{ color: item.stroke }} />
              </div>
              <span className="text-[11px] font-medium text-graphite dark:text-graphite">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Nodes */}
        <div className="relative h-[300px]">
          {stores.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[#1d1d1f] dark:bg-white/20 text-white flex items-center justify-center shadow-[var(--shadow-md)] border border-white/10">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M3 9.5L5 4h14l2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13.5V20h14v-6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="9" y="16" width="6" height="4" rx="0.5" stroke="white" strokeWidth="1.2"/>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-charcoal dark:text-charcoal bg-white/95 dark:bg-surface/95 px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-border dark:border-white/10">
                {s.name}
              </span>
            </motion.div>
          ))}

          {hubs.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center shadow-[var(--shadow-lg)] ring-4 ring-accent/15 dark:ring-accent/25">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 22V13h6v9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[9px] font-semibold text-accent dark:text-accent-light bg-accent-soft dark:bg-accent/20 px-1.5 py-0.5 rounded-full whitespace-nowrap border border-accent/20">
                {h.name}
              </span>
            </motion.div>
          ))}

          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="h-8 w-8 rounded-full bg-warning-soft dark:bg-warning/20 border-2 border-warning dark:border-warning-light text-warning flex items-center justify-center shadow-[var(--shadow-sm)]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-graphite dark:text-graphite bg-white/95 dark:bg-surface/95 px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-border dark:border-white/10">
                {d.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Flow steps */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {/* Step 1 — Store Pickup */}
          <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-[var(--radius-xl)] bg-white dark:bg-white/5 border border-border dark:border-white/10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <div className="relative">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-[var(--radius-lg)] bg-[#1d1d1f] dark:bg-white/10 flex items-center justify-center shadow-[var(--shadow-md)]">
                {/* Store SVG icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
                  <path d="M3 9.5L5 4h14l2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9.5h18v1a3 3 0 01-3 3h-1a3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3H7a3 3 0 01-3-3v-1z" stroke="white" strokeWidth="1.5"/>
                  <path d="M5 13.5V20h14v-6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="9" y="16" width="6" height="4" rx="1" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center leading-none">1</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-charcoal dark:text-charcoal leading-tight">Store pickup</p>
              <p className="text-[10px] sm:text-xs text-graphite dark:text-graphite leading-snug hidden sm:block">Order fulfilled from nearest store inventory</p>
            </div>
          </div>

          {/* Connector arrow — visible on sm+ */}
          {/* Step 2 — Hub Consolidation */}
          <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-[var(--radius-xl)] bg-white dark:bg-white/5 border border-border dark:border-white/10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow relative">
            <div className="relative">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent flex items-center justify-center shadow-[var(--shadow-md)] ring-4 ring-accent/10 dark:ring-accent/20">
                {/* Hub/warehouse SVG icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
                  <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8h1M12 8h1M16 8h1" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-success text-white text-[9px] font-bold flex items-center justify-center leading-none">2</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-charcoal dark:text-charcoal leading-tight">Hub consolidation</p>
              <p className="text-[10px] sm:text-xs text-graphite dark:text-graphite leading-snug hidden sm:block">Middle mile hubs optimize cross-city routing</p>
            </div>
            {/* Animated pulse ring on hub */}
            <span className="absolute inset-0 rounded-[var(--radius-xl)] ring-2 ring-accent/10 dark:ring-accent/15 animate-pulse pointer-events-none" />
          </div>

          {/* Step 3 — Last Mile Delivery */}
          <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-[var(--radius-xl)] bg-white dark:bg-white/5 border border-border dark:border-white/10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <div className="relative">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-[var(--radius-lg)] bg-warning/90 flex items-center justify-center shadow-[var(--shadow-md)]">
                {/* Rider/bike SVG icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
                  <circle cx="6" cy="17" r="3" stroke="white" strokeWidth="1.5"/>
                  <circle cx="18" cy="17" r="3" stroke="white" strokeWidth="1.5"/>
                  <path d="M9 17h5l2-6M8 11h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11l-2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="15" cy="6" r="1.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M17 11h-3l-1.5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-warning text-white text-[9px] font-bold flex items-center justify-center leading-none">3</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-charcoal dark:text-charcoal leading-tight">Last mile delivery</p>
              <p className="text-[10px] sm:text-xs text-graphite dark:text-graphite leading-snug hidden sm:block">Riders reach farthest city points in 30–90 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
