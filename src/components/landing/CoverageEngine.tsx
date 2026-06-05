import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Clock, Zap } from 'lucide-react'

const DEMAND_ZONES = [
  { name: 'Malleshwaram', x: 28, y: 14, intensity: 0.78 },
  { name: 'Whitefield', x: 88, y: 12, intensity: 0.92 },
  { name: 'Indiranagar', x: 82, y: 36, intensity: 0.9 },
  { name: 'Koramangala', x: 52, y: 46, intensity: 0.95 },
  { name: 'Jayanagar', x: 18, y: 68, intensity: 0.82 },
  { name: 'HSR Layout', x: 38, y: 86, intensity: 0.88 },
]

const OUTCOMES = [
  { area: 'Whitefield', result: 'Delivered Today', detail: '11:42 AM' },
  { area: 'Koramangala', result: 'Delivered in 54 Min', detail: 'Same day' },
  { area: 'HSR Layout', result: 'Delivered Same Day', detail: 'Before 8 PM' },
  { area: 'Indiranagar', result: 'Delivered in 47 Min', detail: 'Express zone' },
  { area: 'Electronic City', result: 'Delivered Today', detail: 'Order by 5 PM' },
]

function Counter({ to, suffix = '', active }: { to: number; suffix?: string; active: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, to])
  return <>{v}{suffix}</>
}

function ZoneMarker({ zone, index }: { zone: (typeof DEMAND_ZONES)[0]; index: number }) {
  return (
    <div
      className="absolute"
      style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <span className="absolute left-1/2 -translate-x-1/2 -top-7 z-20 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap bg-slate text-pure-white border border-violet-400/60 shadow-md">
        {zone.name}
      </span>
      <motion.div
        className="absolute rounded-full bg-violet-500/25 dark:bg-violet-400/30"
        style={{
          width: 90 * zone.intensity,
          height: 90 * zone.intensity,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full bg-violet-500/40 dark:bg-violet-400/45 blur-md"
        style={{
          width: 44 * zone.intensity,
          height: 44 * zone.intensity,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 2 + index * 0.2, repeat: Infinity, delay: index * 0.15 }}
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet-500 dark:bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
    </div>
  )
}

export function CoverageEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border-2 border-border dark:border-zinc-600 overflow-hidden bg-pure-white dark:bg-[#0f0f14] shadow-xl"
      style={{ minHeight: 'clamp(430px, 52vw, 520px)' }}
    >
      {/* Map backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-off-white via-surface to-off-white dark:from-[#0f0f14] dark:via-[#14141c] dark:to-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-40 dark:opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.14),transparent_55%)]" />

      <div className="relative z-10 grid lg:grid-cols-[minmax(210px,1fr)_auto_280px] gap-4 p-4 sm:p-5 items-start">
        {/* Left: demand map — zones scoped to this column only */}
        <div className="relative hidden lg:block min-h-[380px] w-full">
          <div className="absolute inset-0 pointer-events-none">
            {DEMAND_ZONES.map((z, i) => (
              <ZoneMarker key={z.name} zone={z} index={i} />
            ))}
          </div>
          <div className="absolute bottom-2 left-0 z-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
              Customer demand
            </span>
            <p className="text-xs font-medium text-charcoal dark:text-zinc-200 mt-1">Bangalore high-density zones</p>
          </div>
        </div>

        {/* Mobile / tablet zone chips */}
        <div className="lg:hidden flex flex-wrap gap-2 col-span-full -mb-2">
          {DEMAND_ZONES.map((z) => (
            <span
              key={z.name}
              className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate text-pure-white border border-violet-400/50"
            >
              {z.name}
            </span>
          ))}
        </div>

        {/* Center coverage card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="group relative mx-auto w-full max-w-[340px] rounded-2xl border-2 border-violet-500/30 dark:border-violet-400/40 bg-pure-white/90 dark:bg-zinc-900/85 backdrop-blur-xl p-6 sm:p-8 shadow-2xl dark:shadow-[0_0_48px_rgba(139,92,246,0.15)] hover:shadow-[0_0_56px_rgba(139,92,246,0.2)] transition-shadow duration-500"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 dark:bg-violet-400/15 text-[10px] font-bold uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-4">
              Store2Door Coverage
            </span>
            <div className="text-5xl sm:text-6xl font-bold text-charcoal tabular-nums leading-none">
              <Counter to={98} suffix="%" active={inView} />
            </div>
            <p className="text-sm font-semibold text-graphite dark:text-zinc-300 mt-2">SDD Success Rate</p>

            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/80 dark:bg-zinc-800/80 border border-border dark:border-zinc-600">
                <Clock className="h-5 w-5 text-violet-600 dark:text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-charcoal">Orders Before 5 PM</p>
                  <p className="text-[11px] text-graphite dark:text-zinc-400">Delivered same day</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/80 dark:bg-zinc-800/80 border border-border dark:border-zinc-600">
                <Zap className="h-5 w-5 text-warning shrink-0" />
                <div>
                  <p className="text-xs font-bold text-charcoal">Up to 40 km Radius</p>
                  <p className="text-[11px] text-graphite dark:text-zinc-400">From nearest stores</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/80 dark:bg-zinc-800/80 border border-border dark:border-zinc-600">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                <div>
                  <p className="text-xs font-bold text-charcoal">&lt;1–2% RTO</p>
                  <p className="text-[11px] text-graphite dark:text-zinc-400">Local fulfillment advantage</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outcome cards */}
        <div className="flex flex-col gap-2">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={o.area}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border dark:border-zinc-600 bg-pure-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-2.5 shadow-sm hover:shadow-md hover:border-success/40 dark:hover:border-emerald-500/40 transition-all"
            >
              <p className="text-[10px] font-semibold text-graphite dark:text-zinc-400">{o.area}</p>
              <p className="text-sm font-bold text-charcoal dark:text-zinc-100 mt-0.5">{o.result}</p>
              <p className="text-[10px] text-success dark:text-emerald-400 font-medium mt-0.5">{o.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
