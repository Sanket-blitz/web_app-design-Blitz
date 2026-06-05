import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const points = [
  { num: '01', title: 'Cart Abandonment' },
  { num: '02', title: 'Increased Cancellations' },
  { num: '03', title: 'Higher Return-to-Origin Rates' },
  { num: '04', title: 'Lost Revenue Opportunities' },
]

export function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 md:py-28 bg-pure-white dark:bg-zinc-900 border-y border-border dark:border-zinc-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight uppercase">
            Slow Delivery Costs More Than Shipping Fees.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {points.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border dark:border-zinc-600"
            >
              <span className="h-10 w-10 rounded-full bg-slate text-pure-white flex items-center justify-center text-sm font-bold shrink-0">
                {p.num}
              </span>
              <span className="font-bold text-charcoal">{p.title}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg font-bold text-charcoal">
          Stop Losing Checkout Velocity To Shipping Delays
        </p>
      </div>
    </section>
  )
}
