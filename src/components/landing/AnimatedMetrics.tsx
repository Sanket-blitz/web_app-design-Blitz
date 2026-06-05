import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const metrics: { value: number; suffix: string; label: string; trend: string; decimals?: number; prefix?: string }[] = [
  { value: 98, suffix: '%', label: 'SDD success rate', trend: '95–98% range' },
  { value: 60, suffix: '%', label: '60-min delivery', trend: 'High-density zones' },
  { value: 2, suffix: '%', label: 'RTO rate', trend: 'Ultra-low <1–2%' },
  { value: 75, suffix: '', label: 'Avg. CPO', trend: 'Rs. 70–80 flat', prefix: '₹' },
]

function Counter({ target, suffix, decimals = 0, active, prefix = '' }: { target: number; suffix: string; decimals?: number; active: boolean; prefix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const dur = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString()
  return <span>{prefix}{display}{suffix}</span>
}

export function AnimatedMetrics({ brands = [] }: { brands?: string[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="border-y border-border dark:border-zinc-700 bg-surface/50 dark:bg-zinc-900/40 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 justify-items-center">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center w-full max-w-[200px]"
            >
              <div className="text-3xl md:text-4xl font-bold text-charcoal dark:text-zinc-100 tabular-nums tracking-tight">
                <Counter target={m.value} suffix={m.suffix} decimals={m.decimals} active={inView} prefix={m.prefix ?? ''} />
              </div>
              <div className="mt-1.5 text-sm text-graphite dark:text-zinc-400">{m.label}</div>
              <div className="mt-2 inline-flex items-center justify-center gap-1 text-xs font-semibold text-success dark:text-success-light">
                <TrendingUp className="h-3 w-3 shrink-0" />
                {m.trend}
              </div>
            </motion.div>
          ))}
        </div>
        {brands.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-medium text-graphite/70 dark:text-zinc-400 tracking-wide">{brand}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
