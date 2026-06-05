import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Store, Warehouse, Bike, Home, CheckCircle2, ArrowRight, Star } from 'lucide-react'
import { SmartTooltip } from './SmartTooltip'
import { cn } from '../../lib/utils'

const VB = { w: 1000, h: 600 }

const STORES = [
  { id: 's3', brand: 'Loom Collective', location: 'MG Road', x: 14, y: 22, inventory: 203, orders: 24, revenue: '₹58K', sla: '99%', regionalId: 'h2', customerId: 'c1', riderId: 'r3' },
  { id: 's1', brand: 'Urban Thread', location: 'Koramangala', x: 14, y: 42, inventory: 127, orders: 18, revenue: '₹42K', sla: '98%', regionalId: 'h1', customerId: 'c4', riderId: 'r1' },
  { id: 's2', brand: 'Maison Élise', location: 'Indiranagar', x: 14, y: 62, inventory: 92, orders: 14, revenue: '₹31K', sla: '97%', regionalId: 'h2', customerId: 'c2', riderId: 'r2' },
  { id: 's4', brand: 'NOVA Apparel', location: 'Jayanagar', x: 14, y: 82, inventory: 76, orders: 11, revenue: '₹24K', sla: '96%', regionalId: 'h1', customerId: 'c3', riderId: 'r4' },
] as const

const CENTRAL_HUB = { id: 'h0', name: 'Central Hub', x: 50, y: 50, parcels: 2841, sla: 98.7, routes: 24, capacity: 72 } as const

const REGIONAL_HUBS = [
  { id: 'h1', name: 'South Hub', x: 34, y: 66, parcels: 1240, sla: 97.2, routes: 14, capacity: 58 },
  { id: 'h2', name: 'East Hub', x: 66, y: 36, parcels: 1180, sla: 98.1, routes: 12, capacity: 61 },
] as const

const RIDERS = [
  { id: 'r1', name: 'Arjun K.', rating: 4.9, deliveries: 3, eta: '28 min' },
  { id: 'r2', name: 'Priya M.', rating: 4.8, deliveries: 2, eta: '18 min' },
  { id: 'r3', name: 'Rahul S.', rating: 5.0, deliveries: 4, eta: '22 min' },
  { id: 'r4', name: 'Vikram D.', rating: 4.7, deliveries: 2, eta: '35 min' },
] as const

const CUSTOMERS = [
  { id: 'c1', name: 'Malleshwaram', x: 85, y: 14, status: 'Delivered', eta: null as string | null, deliveries: 214 },
  { id: 'c2', name: 'Whitefield', x: 87, y: 32, status: 'Out for delivery', eta: '18 min', deliveries: 387 },
  { id: 'c3', name: 'HSR Layout', x: 86, y: 58, status: 'Out for delivery', eta: '24 min', deliveries: 156 },
  { id: 'c4', name: 'Electronic City', x: 82, y: 82, status: 'In transit', eta: '28 min', deliveries: 298 },
] as const

type AnimPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

const pct = (p: number, axis: 'x' | 'y') => (axis === 'x' ? (p / 100) * VB.w : (p / 100) * VB.h)

function curvedPath(x1: number, y1: number, x2: number, y2: number, bend = 0.08) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * bend
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
}

export function FulfillmentInfographic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-40px' })
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [animPhase, setAnimPhase] = useState<AnimPhase>(0)
  const [hoverAnchor, setHoverAnchor] = useState<HTMLElement | null>(null)
  const [hoverContent, setHoverContent] = useState<ReactNode>(null)
  const [riderActive, setRiderActive] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const activeStore = STORES.find((s) => s.id === selectedStore)
  const activeRegional = activeStore ? REGIONAL_HUBS.find((h) => h.id === activeStore.regionalId) : null
  const activeCustomer = activeStore ? CUSTOMERS.find((c) => c.id === activeStore.customerId) : null
  const activeRider = activeStore ? RIDERS.find((r) => r.id === activeStore.riderId) : null
  const journeyActive = animPhase > 0 && animPhase < 7

  const pathStoreCentral = activeStore
    ? curvedPath(pct(activeStore.x, 'x'), pct(activeStore.y, 'y'), pct(CENTRAL_HUB.x, 'x'), pct(CENTRAL_HUB.y, 'y'))
    : ''
  const pathCentralRegional = activeRegional
    ? curvedPath(pct(CENTRAL_HUB.x, 'x'), pct(CENTRAL_HUB.y, 'y'), pct(activeRegional.x, 'x'), pct(activeRegional.y, 'y'))
    : ''
  const pathRegionalCustomer = activeRegional && activeCustomer
    ? curvedPath(pct(activeRegional.x, 'x'), pct(activeRegional.y, 'y'), pct(activeCustomer.x, 'x'), pct(activeCustomer.y, 'y'), 0.06)
    : ''

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const runJourney = useCallback((storeId: string) => {
    if (!STORES.find((s) => s.id === storeId)) return
    clearTimers()
    setSelectedStore(storeId)
    setAnimPhase(0)
    setRiderActive(false)
    ;([
      { p: 1, ms: 0 },
      { p: 2, ms: 350 },
      { p: 3, ms: 700 },
      { p: 4, ms: 1000 },
      { p: 5, ms: 1300 },
      { p: 6, ms: 1600 },
      { p: 7, ms: 2200 },
    ] as { p: AnimPhase; ms: number }[]).forEach(({ p, ms }) => {
      timersRef.current.push(setTimeout(() => {
        setAnimPhase(p)
        if (p === 5) setRiderActive(true)
      }, ms))
    })
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])
  useEffect(() => {
    if (!inView || selectedStore) return
    const t = setTimeout(() => runJourney('s1'), 1600)
    return () => clearTimeout(t)
  }, [inView, selectedStore, runJourney])

  const showHover = (el: HTMLElement, content: ReactNode) => {
    setHoverAnchor(el)
    setHoverContent(content)
  }
  const hideHover = () => {
    setHoverAnchor(null)
    setHoverContent(null)
  }

  const dim = (inJourney: boolean) => journeyActive && !inJourney && 'opacity-25 dark:opacity-20 pointer-events-none'

  return (
    <div ref={containerRef} className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {[
          { label: 'Store', color: 'bg-slate' },
          { label: 'Central Hub', color: 'bg-accent' },
          { label: 'Regional Hub', color: 'bg-accent/70' },
          { label: 'Rider', color: 'bg-success' },
          { label: 'Customer', color: 'bg-warning' },
        ].map((l) => (
          <span key={l.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-graphite dark:text-zinc-300 border border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-800/80">
            <span className={cn('h-2 w-2 rounded-full', l.color)} />
            {l.label}
          </span>
        ))}
        <span className="text-[10px] text-graphite dark:text-zinc-500 hidden sm:inline">Click a store to trace</span>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="relative rounded-2xl border-2 border-border dark:border-zinc-600 bg-pure-white dark:bg-[#0f0f14] shadow-xl dark:shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
        style={{ height: 'clamp(460px, 58vw, 620px)' }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-off-white to-surface dark:from-[#0f0f14] dark:to-[#14141c]" />
          <div className="absolute inset-0 opacity-[0.35] dark:opacity-100" style={{
            backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />
          <div className="absolute inset-0 hidden dark:block" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,111,217,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(91,141,239,0.14),transparent_55%)]" />

          {/* Zone labels */}
          <div className="absolute top-14 bottom-16 left-0 w-[30%] border-r border-dashed border-border/50 dark:border-zinc-700/50 pointer-events-none" />
          <div className="absolute top-14 bottom-16 left-[30%] w-[32%] border-r border-dashed border-border/50 dark:border-zinc-700/50 pointer-events-none" />
          <div className="absolute top-14 bottom-16 right-0 w-[38%] pointer-events-none" />
          {[
            { label: 'Stores', x: '15%' },
            { label: 'Hubs', x: '46%' },
            { label: 'Customers', x: '80%' },
          ].map((z) => (
            <span key={z.label} className="absolute top-[52px] text-[9px] font-bold uppercase tracking-[0.2em] text-graphite/50 dark:text-zinc-500 pointer-events-none" style={{ left: z.x, transform: 'translateX(-50%)' }}>
              {z.label}
            </span>
          ))}

          {/* Header */}
          <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-graphite dark:text-zinc-400">
              <span>Bangalore</span>
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="normal-case font-medium">Live network</span>
            </div>
            <div className="flex gap-5 text-right">
              <div>
                <div className="text-[9px] uppercase text-graphite dark:text-zinc-500">Riders</div>
                <div className="text-sm font-bold text-charcoal tabular-nums">847</div>
              </div>
              <div>
                <div className="text-[9px] uppercase text-graphite dark:text-zinc-500">Deliveries/hr</div>
                <div className="text-sm font-bold text-success tabular-nums">2.4k</div>
              </div>
            </div>
          </div>

          {/* SVG */}
          <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5b8def" /></marker>
              <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#34c77b" /></marker>
            </defs>

            {/* Idle routes: store → central */}
            {!journeyActive && STORES.map((s) => {
              const p = curvedPath(pct(s.x, 'x'), pct(s.y, 'y'), pct(CENTRAL_HUB.x, 'x'), pct(CENTRAL_HUB.y, 'y'))
              return <path key={s.id} d={p} fill="none" className="stroke-border dark:stroke-zinc-600" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7" />
            })}

            {/* Central pulse */}
            <circle cx={pct(CENTRAL_HUB.x, 'x')} cy={pct(CENTRAL_HUB.y, 'y')} r={animPhase >= 3 ? 95 : 75} fill="none" className="stroke-accent dark:stroke-[#5b8def]" strokeWidth={animPhase >= 3 ? 2 : 1} opacity={animPhase >= 3 ? 0.35 : 0.15} />

            {pathStoreCentral && animPhase >= 2 && (
              <motion.path d={pathStoreCentral} fill="none" stroke="#5b8def" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrB)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45 }} style={{ filter: 'drop-shadow(0 0 8px rgba(91,141,239,0.6))' }} />
            )}
            {pathCentralRegional && animPhase >= 4 && (
              <motion.path d={pathCentralRegional} fill="none" stroke="#5b8def" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 4" markerEnd="url(#arrB)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            )}
            {pathRegionalCustomer && animPhase >= 6 && (
              <motion.path d={pathRegionalCustomer} fill="none" stroke="#34c77b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrG)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} style={{ filter: 'drop-shadow(0 0 8px rgba(52,199,123,0.6))' }} />
            )}
          </svg>

          {/* Nodes layer */}
          <div className="absolute inset-0 pt-10 pb-12">
            {/* CENTRAL HUB — hero */}
            <div
              className={cn('absolute z-30 transition-all duration-500', dim(animPhase >= 3))}
              style={{ left: `${CENTRAL_HUB.x}%`, top: `${CENTRAL_HUB.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={(e) => showHover(e.currentTarget, (
                <div className="space-y-1 text-charcoal dark:text-zinc-100">
                  <p className="font-bold">{CENTRAL_HUB.name}</p>
                  <p>{CENTRAL_HUB.parcels.toLocaleString()} parcels · {CENTRAL_HUB.sla}% SLA</p>
                  <p>{CENTRAL_HUB.routes} active routes · {CENTRAL_HUB.capacity}% capacity</p>
                </div>
              ))}
              onMouseLeave={hideHover}
            >
              <motion.div
                animate={animPhase >= 3 ? { scale: [1, 1.03, 1] } : {}}
                transition={{ duration: 1.2, repeat: animPhase >= 3 ? Infinity : 0 }}
                className={cn(
                  'relative flex flex-col items-center justify-center rounded-2xl border-2 text-center',
                  'w-[120px] sm:w-[148px] h-[120px] sm:h-[148px]',
                  animPhase >= 3
                    ? 'bg-accent-soft dark:bg-[#1a2d52] border-accent dark:border-[#5b8def] shadow-[0_0_40px_rgba(91,141,239,0.4)]'
                    : 'bg-pure-white dark:bg-zinc-800 border-accent/60 dark:border-[#5b8def]/70 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                )}
              >
                <span className="absolute -top-3 px-2.5 py-0.5 rounded-full bg-accent text-[9px] font-bold tracking-wider text-pure-white shadow-md">CENTRAL HUB</span>
                <Warehouse className="h-9 w-9 sm:h-10 sm:w-10 text-accent dark:text-[#7aa3f5] mb-1.5" strokeWidth={1.5} />
                <span className="text-xs sm:text-sm font-bold text-charcoal leading-tight">{CENTRAL_HUB.name}</span>
                <span className="text-[10px] text-graphite dark:text-zinc-300 mt-1">{CENTRAL_HUB.parcels.toLocaleString()} parcels</span>
                <span className="text-[9px] font-semibold text-success mt-0.5">{CENTRAL_HUB.sla}% SLA</span>
              </motion.div>
            </div>

            {/* Regional hubs */}
            {REGIONAL_HUBS.map((h) => {
              const lit = activeRegional?.id === h.id && animPhase >= 4
              return (
                <div
                  key={h.id}
                  className={cn('absolute z-20 transition-all duration-500', dim(lit || (journeyActive && activeRegional?.id === h.id)))}
                  style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={(e) => showHover(e.currentTarget, (
                    <div className="space-y-1 text-charcoal dark:text-zinc-100">
                      <p className="font-bold">{h.name}</p>
                      <p>{h.parcels.toLocaleString()} parcels · {h.sla}% SLA</p>
                      <p>{h.routes} routes · {h.capacity}% capacity</p>
                    </div>
                  ))}
                  onMouseLeave={hideHover}
                >
                  <motion.div
                    animate={lit ? { scale: [1, 1.04, 1] } : {}}
                    transition={{ duration: 1, repeat: lit ? Infinity : 0 }}
                    className={cn(
                      'relative flex flex-col items-center rounded-xl border-2 w-[88px] sm:w-[100px] py-3 px-2',
                      lit ? 'bg-accent-soft dark:bg-[#1a2d52] border-accent dark:border-[#5b8def] shadow-[0_0_24px_rgba(91,141,239,0.35)]' : 'bg-pure-white dark:bg-zinc-800 border-accent/40 dark:border-zinc-500 shadow-md'
                    )}
                  >
                    <span className="absolute -top-2 px-1.5 py-0.5 rounded text-[8px] font-bold bg-accent/90 text-pure-white">HUB</span>
                    <Warehouse className="h-6 w-6 text-accent dark:text-[#7aa3f5] mb-1" />
                    <span className="text-[10px] font-bold text-charcoal text-center">{h.name}</span>
                    <span className="text-[9px] text-graphite dark:text-zinc-400">{h.parcels.toLocaleString()} pkgs</span>
                  </motion.div>
                </div>
              )
            })}

            {/* Stores */}
            {STORES.map((s) => {
              const lit = selectedStore === s.id && animPhase >= 1
              return (
                <div
                  key={s.id}
                  className={cn('absolute z-20 transition-all duration-500', dim(lit))}
                  style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={(e) => showHover(e.currentTarget, (
                    <div className="space-y-1.5 text-charcoal dark:text-zinc-100">
                      <p className="font-bold">{s.brand}</p>
                      <p>Revenue today: {s.revenue}</p>
                      <p>Fulfillment rate: {s.sla}</p>
                      <p>Delivery SLA: on track</p>
                    </div>
                  ))}
                  onMouseLeave={hideHover}
                >
                  <motion.button
                    type="button"
                    onClick={() => runJourney(s.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'text-left rounded-xl border-2 w-[90px] sm:w-[118px] p-2 sm:p-2.5 transition-all',
                      lit ? 'bg-pure-white dark:bg-zinc-700 border-accent dark:border-[#5b8def] ring-2 ring-accent/25 shadow-lg' : 'bg-pure-white dark:bg-zinc-800 border-border dark:border-zinc-500 hover:border-accent/50 shadow-sm'
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="h-7 w-7 rounded-lg bg-slate flex items-center justify-center shrink-0">
                        <Store className="h-3.5 w-3.5 text-pure-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-charcoal truncate">{s.brand}</p>
                        <p className="text-[8px] text-graphite dark:text-zinc-400 truncate">{s.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-[8px] text-graphite dark:text-zinc-400">
                      <span>{s.inventory} items</span>
                      <span>{s.orders} orders</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      <span className="text-[8px] font-semibold text-success">Live</span>
                    </div>
                  </motion.button>
                </div>
              )
            })}

            {/* Customers */}
            {CUSTOMERS.map((c) => {
              const lit = activeCustomer?.id === c.id && animPhase >= 6
              return (
                <div
                  key={c.id}
                  className={cn('absolute z-15 transition-all duration-500', dim(lit))}
                  style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={(e) => showHover(e.currentTarget, (
                    <div className="text-charcoal dark:text-zinc-100">
                      <p className="font-bold">{c.name}</p>
                      <p>{c.deliveries} deliveries today</p>
                      {c.eta && <p>ETA: {c.eta}</p>}
                    </div>
                  ))}
                  onMouseLeave={hideHover}
                >
                  <motion.div
                    animate={lit ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.8, repeat: lit ? Infinity : 0 }}
                    className={cn(
                      'rounded-xl border-2 w-[72px] sm:w-[92px] p-1.5 sm:p-2 text-center',
                      lit ? 'bg-warning-soft dark:bg-[#2a2010] border-warning dark:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]' : 'bg-pure-white dark:bg-zinc-800 border-warning/50 dark:border-amber-500/50 shadow-sm'
                    )}
                  >
                    <Home className="h-4 w-4 text-warning dark:text-amber-400 mx-auto mb-1" />
                    <p className="text-[9px] font-bold text-charcoal leading-tight">{c.name}</p>
                    <p className={cn('text-[8px] font-semibold mt-1', c.status === 'Delivered' ? 'text-success' : 'text-warning dark:text-amber-300')}>
                      {c.status === 'Delivered' ? '✓ Delivered' : `ETA ${c.eta ?? '—'}`}
                    </p>
                  </motion.div>
                </div>
              )
            })}

            {/* Rider */}
            <AnimatePresence>
              {riderActive && animPhase >= 5 && animPhase < 7 && activeRegional && activeCustomer && activeRider && (
                <motion.div
                  key="rider"
                  className="absolute z-40 pointer-events-none"
                  initial={{ left: `${activeRegional.x}%`, top: `${activeRegional.y}%` }}
                  animate={{ left: `${activeCustomer.x}%`, top: `${activeCustomer.y}%` }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="flex items-center gap-2 rounded-xl border-2 border-success dark:border-emerald-400 bg-pure-white dark:bg-zinc-800 px-2.5 py-2 shadow-xl dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                    <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center shrink-0">
                      <Bike className="h-4 w-4 text-pure-white" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[10px] font-bold text-charcoal truncate">{activeRider.name}</p>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5 text-warning fill-warning" />
                        <span className="text-[8px] text-graphite dark:text-zinc-400">{activeRider.rating}</span>
                      </div>
                      <p className="text-[8px] font-semibold text-success">ETA {activeRider.eta}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {animPhase >= 7 && activeCustomer && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 left-1/2 bottom-14 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-success-soft dark:bg-emerald-950 border-2 border-success/40 dark:border-emerald-500/60 shadow-lg">
                    <CheckCircle2 className="h-4 w-4 text-success dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-success dark:text-emerald-200">Delivered to {activeCustomer.name}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Flow bar */}
          <div className="absolute bottom-0 inset-x-0 h-11 flex items-center justify-center gap-2 border-t-2 border-border dark:border-zinc-600 bg-pure-white/90 dark:bg-zinc-900/95 backdrop-blur-sm">
            {['Store', 'Central Hub', 'Regional Hub', 'Rider', 'Customer'].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <span className={cn('text-[9px] sm:text-[10px] font-semibold', (
                  (i === 0 && animPhase >= 1) || (i === 1 && animPhase >= 3) || (i === 2 && animPhase >= 4) || (i === 3 && animPhase >= 5) || (i === 4 && animPhase >= 6)
                ) ? 'text-accent dark:text-[#7aa3f5]' : 'text-graphite/50 dark:text-zinc-500')}>{step}</span>
                {i < 4 && <ArrowRight className="h-3 w-3 text-graphite/30 dark:text-zinc-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal tooltip — escapes overflow:hidden */}
      {typeof document !== 'undefined' && hoverAnchor && createPortal(
        <SmartTooltip anchorRef={{ current: hoverAnchor }} visible={!!hoverAnchor}>
          {hoverContent}
        </SmartTooltip>,
        document.body
      )}
    </div>
  )
}
