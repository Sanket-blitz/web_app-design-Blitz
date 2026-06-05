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

      {/* City silhouette */}
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
            stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        ))}
        {destinations.map((d, i) => (
          <motion.line
            key={`hub-d-${i}`}
            x1="50%" y1="50%" x2={`${d.x}%`} y2={`${d.y}%`}
            stroke="var(--color-success)" strokeWidth="0.4" strokeDasharray="1.5 1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
          />
        ))}
        {/* Animated rider paths */}
        <motion.circle
          r="0.8" fill="var(--color-accent)"
          animate={{ cx: ['18%', '50%', '92%'], cy: ['62%', '50%', '22%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          r="0.8" fill="var(--color-success)"
          animate={{ cx: ['42%', '50%', '72%'], cy: ['45%', '50%', '78%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </svg>

      <div className="relative p-6 md:p-8 min-h-[420px]">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { icon: Store, label: 'Retail Stores', color: 'text-charcoal' },
            { icon: Warehouse, label: 'Middle Mile Hubs', color: 'text-accent' },
            { icon: Bike, label: 'Last Mile Riders', color: 'text-success' },
            { icon: MapPin, label: 'Customer Destinations', color: 'text-warning' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs font-medium text-graphite">
              <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              {item.label}
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
              <div className="h-10 w-10 rounded-[var(--radius-md)] bg-charcoal text-white flex items-center justify-center shadow-[var(--shadow-md)]">
                <Store className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-medium text-charcoal bg-white/90 dark:bg-charcoal-soft/90 px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">{s.name}</span>
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
              <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center shadow-[var(--shadow-md)] ring-4 ring-accent-soft">
                <Warehouse className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold text-accent bg-accent-soft px-2 py-0.5 rounded-full whitespace-nowrap">{h.name}</span>
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
              <div className="h-8 w-8 rounded-full bg-warning-soft border-2 border-warning text-warning flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-medium text-graphite bg-white/90 dark:bg-charcoal-soft/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">{d.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Flow explanation */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { step: '1', title: 'Store pickup', desc: 'Order fulfilled from nearest store inventory' },
            { step: '2', title: 'Hub consolidation', desc: 'Middle mile hubs optimize cross-city routing' },
            { step: '3', title: 'Last mile delivery', desc: 'Riders reach farthest city points in 30–90 min' },
          ].map((f) => (
            <div key={f.step} className="flex items-start gap-3 p-3 rounded-[var(--radius-lg)] bg-surface/80 border border-border">
              <span className="h-6 w-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center shrink-0">{f.step}</span>
              <div>
                <p className="text-sm font-semibold text-charcoal">{f.title}</p>
                <p className="text-xs text-graphite mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
