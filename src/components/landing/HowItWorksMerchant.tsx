import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../lib/utils'

const steps = [
  {
    num: '01',
    title: 'Customer Orders Online',
    desc: 'Customer orders online from your brand website.',
    color: 'border-violet-500/40 dark:border-violet-400/50',
    bg: 'bg-violet-500/5 dark:bg-violet-400/10',
  },
  {
    num: '02',
    title: 'Nearest Store Allocated',
    desc: 'Brand allocates the order to the nearest store from the customer\'s location.',
    color: 'border-accent/40',
    bg: 'bg-accent/5 dark:bg-accent/10',
  },
  {
    num: '03',
    title: 'Up to 40 km Radius',
    desc: 'Delivering orders up to 40 km from nearest stores.',
    color: 'border-warning/40',
    bg: 'bg-warning-soft/30 dark:bg-warning/10',
  },
  {
    num: '04',
    title: '60 Min to Same Day',
    desc: 'Customer receives their order from 60 minutes to within 6 hours — for orders placed before 5 PM.',
    color: 'border-success/40',
    bg: 'bg-success-soft/40 dark:bg-success/10',
  },
]

export function HowItWorksMerchant() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <p className="text-center text-sm text-graphite mb-8 max-w-2xl mx-auto">
        Convert physical storefront retail inventory into hyper-local fulfillment networks. Avoid warehouse delays entirely.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={cn(
              'group relative rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
              s.color, s.bg, 'bg-pure-white dark:bg-zinc-900'
            )}
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-graphite/50">{s.num}</span>
            <h3 className="mt-3 text-base font-bold text-charcoal">{s.title}</h3>
            <p className="mt-2 text-sm text-graphite leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-bold text-charcoal uppercase tracking-wide">
        <span>Order Placed</span>
        <span className="text-violet-600">→</span>
        <span>Before 5 PM</span>
        <span className="text-violet-600">→</span>
        <span>60 Min to Same Day Delivery</span>
      </div>
    </div>
  )
}
