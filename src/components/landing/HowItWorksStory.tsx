import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Store, Warehouse, Bike, Package, Route, MapPin, CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const stories = [
  {
    step: '01',
    title: 'Store Pickup',
    desc: 'Inventory syncs in real time. Orders are picked from the nearest store shelf.',
    icon: Store,
    color: 'bg-slate text-pure-white',
    items: [
      { icon: Package, label: 'Inventory sync' },
      { icon: CheckCircle2, label: 'Order pickup' },
    ],
  },
  {
    step: '02',
    title: 'Hub Consolidation',
    desc: 'Parcels aggregate at Central Hub. Routes optimize across regional hubs.',
    icon: Warehouse,
    color: 'bg-accent text-pure-white',
    items: [
      { icon: Package, label: 'Parcel aggregation' },
      { icon: Route, label: 'Route optimization' },
    ],
  },
  {
    step: '03',
    title: 'Last Mile Delivery',
    desc: 'Riders dispatch with live ETA. Customers track every mile to their door.',
    icon: Bike,
    color: 'bg-success text-pure-white',
    items: [
      { icon: Bike, label: 'Rider dispatch' },
      { icon: MapPin, label: 'Doorstep delivery' },
    ],
  },
]

export function HowItWorksStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-5 mt-8">
      {stories.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.12 }}
            className="group relative rounded-2xl border border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-900/80 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:from-accent/10" />
            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl shadow-md', s.color)}>
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-graphite/50 dark:text-zinc-500">{s.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm text-graphite leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface dark:bg-zinc-800 border border-border dark:border-zinc-600 text-[11px] font-medium text-charcoal dark:text-zinc-200"
                  >
                    <item.icon className="h-3 w-3 text-accent dark:text-accent-light" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
