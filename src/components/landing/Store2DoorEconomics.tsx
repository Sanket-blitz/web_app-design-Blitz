import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

type Cell = { headline: string; detail: string; good?: boolean }

type MetricRow = {
  metric: string
  blitz: Cell
  traditional: Cell
  porter: Cell
  sdfx: Cell
  shiprocket: Cell
}

const ROWS: MetricRow[] = [
  {
    metric: 'Average CPO',
    blitz: { headline: 'Low & Flat', detail: 'Rs. 70–80', good: true },
    traditional: { headline: 'High', detail: 'Rs. 80–90' },
    porter: { headline: 'High', detail: 'Rs. 150–250+' },
    sdfx: { headline: 'Mid-Tier', detail: 'Rs. 90–130' },
    shiprocket: { headline: 'High Base', detail: 'Rs. 110–160+' },
  },
  {
    metric: 'SDD TAT %',
    blitz: { headline: '95–98% Success', detail: 'Hard 5PM cutoff; 60-min locally', good: true },
    traditional: { headline: '0%', detail: 'Standard 3–5 business days' },
    porter: { headline: '99% (Immediate)', detail: 'Single unbatched order route' },
    sdfx: { headline: '75–85% Success', detail: 'Central hub processing step' },
    shiprocket: { headline: '65–80% Success', detail: 'Rigid 12–2PM cutoffs' },
  },
  {
    metric: 'RTO %',
    blitz: { headline: 'Ultra-Low <1–2%', detail: 'Hyper-local eradicates buyer remorse', good: true },
    traditional: { headline: 'High 15–30%', detail: 'Long transit = high cancellation' },
    porter: { headline: '0%', detail: 'Failed delivery = reverse billing to you' },
    sdfx: { headline: '5–8%', detail: '' },
    shiprocket: { headline: '10–18%', detail: 'SDD slipping to NDD = refusal spikes' },
  },
  {
    metric: 'Inventory Liquidation',
    blitz: { headline: '100% Maximized', detail: 'Unlocks store stock into digital orders', good: true },
    traditional: { headline: 'Low', detail: 'Requires separate warehouse/3PL inventory' },
    porter: { headline: 'Disruptive', detail: 'Manual vehicle hailing per order' },
    sdfx: { headline: 'Hub Dependent', detail: 'Inventory trucked to central hubs' },
    shiprocket: { headline: 'Heavy Labeling', detail: 'Manual AWBs, invoices, daily couriers' },
  },
  {
    metric: 'Customer Data & Marketing',
    blitz: { headline: '100% Sovereign', detail: 'You own phones, emails, full remarketing', good: true },
    traditional: { headline: 'Walled Garden', detail: 'Marketplace masks customer data' },
    porter: { headline: 'Transactional Only', detail: 'Zero direct brand association' },
    sdfx: { headline: 'Standard 3PL Tracking', detail: 'Generic tracking pages & text updates' },
    shiprocket: { headline: 'Fragmented', detail: 'Generic 3rd-party tracking across 25+ couriers' },
  },
]

const COLS = [
  { key: 'blitz' as const, label: 'Blitz Store2Door', highlight: true },
  { key: 'traditional' as const, label: 'Traditional E-Com' },
  { key: 'porter' as const, label: 'Porter On-Demand' },
  { key: 'sdfx' as const, label: 'SDFX SDD' },
  { key: 'shiprocket' as const, label: 'Shiprocket SDD/NDD' },
]

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <div className="space-y-0.5">
      <p className={cn(
        'font-semibold text-sm leading-snug',
        cell.good || highlight ? 'text-success' : 'text-error/90 dark:text-error-light'
      )}>
        {cell.headline}
      </p>
      {cell.detail && <p className="text-[11px] text-graphite leading-relaxed">{cell.detail}</p>}
    </div>
  )
}

export function Store2DoorEconomics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="economics" ref={ref} className="py-24 md:py-28 bg-off-white dark:bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-graphite mb-3">Unit Economics</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            The Unit Economics Don&apos;t Lie
          </h2>
          <p className="mt-4 text-base text-graphite max-w-2xl mx-auto">
            How Blitz <span className="font-semibold text-lime-600 dark:text-lime-400">STORE2DOOR</span> compares to the market.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="rounded-2xl border-2 border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-900 overflow-hidden shadow-xl"
        >
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-violet-700 dark:bg-violet-800 text-pure-white">
                  <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider w-[140px]">Metric</th>
                  {COLS.map((c) => (
                    <th key={c.key} className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider">
                      <span className={cn('inline-flex items-center gap-1.5', c.highlight && 'text-lime-300')}>
                        {c.highlight && <Zap className="h-3.5 w-3.5" />}
                        {c.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.metric}
                    onMouseEnter={() => setHovered(row.metric)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      'border-b border-border dark:border-zinc-700 transition-colors',
                      hovered === row.metric && 'bg-surface/50 dark:bg-zinc-800/40'
                    )}
                  >
                    <td className="px-4 py-4 font-bold text-charcoal bg-violet-50/50 dark:bg-violet-950/20">{row.metric}</td>
                    {COLS.map((c) => (
                      <td
                        key={c.key}
                        className={cn(
                          'px-4 py-4 align-top',
                          c.highlight && 'bg-violet-500/5 dark:bg-violet-400/10'
                        )}
                      >
                        <CellContent cell={row[c.key]} highlight={c.highlight} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-border dark:divide-zinc-700">
            {ROWS.map((row) => (
              <div key={row.metric} className="p-4">
                <p className="font-bold text-charcoal mb-3">{row.metric}</p>
                <div className="space-y-3">
                  {COLS.map((c) => (
                    <div key={c.key} className={cn('p-3 rounded-lg border border-border', c.highlight && 'border-violet-500/30 bg-violet-500/5')}>
                      <p className="text-[10px] font-bold uppercase text-graphite mb-1 flex items-center gap-1">
                        {c.highlight && <Check className="h-3 w-3 text-violet-600" />}
                        {c.label}
                      </p>
                      <CellContent cell={row[c.key]} highlight={c.highlight} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
