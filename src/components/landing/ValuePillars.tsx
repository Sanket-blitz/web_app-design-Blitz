import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  {
    title: 'Dead Inventory Mobilization',
    pain: 'Capital trapped in retail shelves. Foot traffic fluctuations leave premium inventory untouched.',
    solution: 'Mini-Fulfillment Hubs: Turns every store into a hyper-local dark store, instantly liquidating sitting stock through digital channels.',
  },
  {
    title: 'Cart Abandonment & Conversion',
    pain: 'E-commerce visitors abandon carts at checkout when they see 3–5 day delivery windows, opting for instant gratification elsewhere.',
    solution: '60-Min Hyper-Logistics: Enables an unbeatable fast-checkout promise (60-minute to same-day delivery for all orders placed up to 5 PM).',
  },
  {
    title: 'Data & Margin Sovereignty',
    pain: 'Brands list on giant e-com aggregators, losing 15–30% margin and completely losing access to customer data.',
    solution: 'Direct-to-Consumer (DTC) Control: Brands retain 100% control over customer data, marketing remarketing loops, and their own pricing margins.',
  },
  {
    title: 'Operational Ease',
    pain: 'Managing delivery fleets, tracking, and customer complaints is incredibly distracting for store staff.',
    solution: 'End-to-End Tracking: A plug-and-play logistics layer ensuring customer delight, seamless driver tracking, and hands-off ease of business.',
  },
]

export function ValuePillars() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="why-store2door" ref={ref} className="py-24 md:py-28 border-t border-border dark:border-zinc-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-violet-700 dark:text-violet-400 tracking-tight">
            BLITZ STORE2DOOR™
          </h2>
          <p className="mt-3 text-graphite max-w-2xl mx-auto">
            4 Value Pillars That Drive Revenue From Your Existing Stores
          </p>
        </div>

        <div className="hidden md:grid grid-cols-[1.2fr_1.4fr_1.4fr] gap-0 rounded-2xl border-2 border-violet-500/20 overflow-hidden">
          <div className="bg-violet-700 text-pure-white px-5 py-4 text-xs font-bold uppercase tracking-wider">Value Pillar</div>
          <div className="bg-violet-100 dark:bg-violet-950/40 px-5 py-4 text-xs font-bold uppercase tracking-wider text-charcoal">Your Pain Points</div>
          <div className="bg-violet-700 text-pure-white px-5 py-4 text-xs font-bold uppercase tracking-wider">The Blitz Solution</div>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="contents"
            >
              <div className="px-5 py-5 border-t border-violet-500/15 bg-violet-50/80 dark:bg-violet-950/20 font-bold text-charcoal text-sm">
                {p.title}
              </div>
              <div className="px-5 py-5 border-t border-violet-500/15 text-sm text-graphite leading-relaxed">
                {p.pain}
              </div>
              <div className="px-5 py-5 border-t border-violet-500/15 text-sm text-charcoal leading-relaxed">
                <span className="font-semibold text-violet-700 dark:text-violet-300">{p.solution.split(':')[0]}:</span>
                {p.solution.includes(':') ? p.solution.slice(p.solution.indexOf(':') + 1) : p.solution}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden space-y-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border-2 border-violet-500/20 bg-pure-white dark:bg-zinc-900 overflow-hidden"
            >
              <div className="px-5 py-3 bg-violet-700 text-pure-white font-bold text-sm">{p.title}</div>
              <div className="px-5 py-4 border-b border-border">
                <p className="text-[10px] font-bold uppercase text-graphite mb-1">Your Pain Points</p>
                <p className="text-sm text-graphite">{p.pain}</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase text-graphite mb-1">The Blitz Solution</p>
                <p className="text-sm text-charcoal">{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center text-sm font-bold text-charcoal uppercase tracking-wide">
          <span>Immediate Distribution</span>
          <span className="text-violet-600">=</span>
          <span>Lower RTO</span>
          <span className="text-violet-600">=</span>
          <span>Protected Margins</span>
        </div>
      </div>
    </section>
  )
}
