import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Network data ─────────────────────────────────────────────────────────────
const STORES = [
  { id: 's1', name: 'Koramangala', x: 108, y: 150 },
  { id: 's2', name: 'Indiranagar', x: 152, y: 110 },
  { id: 's3', name: 'MG Road',     x: 192, y: 78  },
  { id: 's4', name: 'Jayanagar',   x: 75,  y: 188 },
]

const HUBS = [
  { id: 'h1', name: 'South Hub',   x: 120, y: 188 },
  { id: 'h2', name: 'Central Hub', x: 198, y: 132 },
  { id: 'h3', name: 'East Hub',    x: 272,  y: 95  },
]

const DESTS = [
  { id: 'd1', name: 'Malleshwaram',    x: 28,  y: 38  },
  { id: 'd2', name: 'Yelahanka',       x: 130, y: 18  },
  { id: 'd3', name: 'Whitefield',      x: 365, y: 50  },
  { id: 'd4', name: 'HSR Layout',      x: 318, y: 200 },
  { id: 'd5', name: 'Electronic City', x: 205, y: 250 },
]

// ─── Edges ────────────────────────────────────────────────────────────────────
// Store → Hub  (middle mile)
const STORE_HUB: [string, string][] = [
  ['s4', 'h1'], ['s1', 'h1'],
  ['s2', 'h2'], ['s3', 'h2'],
]
// Hub ↔ Hub  (backbone)
const HUB_HUB: [string, string][] = [
  ['h1', 'h2'], ['h2', 'h3'],
]
// Hub → Destination  (last mile)
const HUB_DEST: [string, string][] = [
  ['h1', 'd5'], ['h1', 'd4'],
  ['h2', 'd1'], ['h2', 'd2'],
  ['h3', 'd3'], ['h3', 'd4'],
]

// ─── Rider animation paths  (store → hub → destination) ──────────────────────
const RIDER_ROUTES = [
  { path: [[108,150],[120,188],[205,250]], color: '#3b6fd9', delay: 0,   dur: 4   },
  { path: [[152,110],[198,132],[365,50]],  color: '#1a7f4b', delay: 1.2, dur: 4.5 },
  { path: [[75,188], [120,188],[318,200]], color: '#3b6fd9', delay: 2.4, dur: 5   },
  { path: [[192,78], [198,132],[130,18]],  color: '#1a7f4b', delay: 0.8, dur: 3.8 },
]

// ─── Lookup helpers ───────────────────────────────────────────────────────────
const nodeById = (id: string) =>
  [...STORES, ...HUBS, ...DESTS].find((n) => n.id === id)!

// ─── Component ────────────────────────────────────────────────────────────────
export function FulfillmentInfographic() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView) return
    // Stagger reveal phases: 0→stores 1→middle-mile 2→hubs 3→backbone 4→last-mile 5→riders
    const timers = [0, 400, 900, 1400, 1900].map((ms, i) =>
      setTimeout(() => setPhase(i + 1), ms)
    )
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <div
      ref={ref}
      className="w-full rounded-[var(--radius-xl)] border border-border dark:border-white/10
                 bg-white dark:bg-[#141416] shadow-[var(--shadow-lg)] overflow-hidden"
    >
      {/* ── Map ── */}
      <div className="relative bg-[#fafafa] dark:bg-[#0e0e10]">
        {/* faint grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
          aria-hidden
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg
          viewBox="0 0 400 270"
          className="w-full"
          style={{ height: 'clamp(240px, 44vw, 360px)' }}
          aria-label="Blitz fulfillment network map"
          role="img"
        >
          <defs>
            {/* hub glow */}
            <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* destination pin drop shadow */}
            <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#f59e0b" floodOpacity="0.35" />
            </filter>
            {/* city outer glow */}
            <radialGradient id="cityGlow" cx="52%" cy="50%" r="45%">
              <stop offset="0%"   stopColor="#3b6fd9" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0"    />
            </radialGradient>
            {/* hub coverage gradient */}
            <radialGradient id="hubCover1" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#3b6fd9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0"    />
            </radialGradient>
            <radialGradient id="hubCover2" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#3b6fd9" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0"    />
            </radialGradient>
            <radialGradient id="hubCover3" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#3b6fd9" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#3b6fd9" stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/* City backdrop glow */}
          <ellipse cx="195" cy="138" rx="185" ry="130" fill="url(#cityGlow)" />

          {/* City boundary ring */}
          <motion.ellipse
            cx="195" cy="140" rx="182" ry="125"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            opacity="0"
            animate={inView ? { opacity: 0.18 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.ellipse
            cx="195" cy="140" rx="130" ry="90"
            fill="none"
            stroke="var(--color-border-strong)"
            strokeWidth="0.3"
            strokeDasharray="3 4"
            opacity="0"
            animate={inView ? { opacity: 0.25 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* ── Hub coverage radii ── */}
          {phase >= 3 && HUBS.map((h, i) => (
            <motion.circle
              key={`cov-${h.id}`}
              cx={h.x} cy={h.y} r={75}
              fill={`url(#hubCover${i + 1})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            />
          ))}

          {/* ── LAYER 1: Store → Hub  (middle-mile, dashed accent) ── */}
          {phase >= 2 && STORE_HUB.map(([sId, hId], i) => {
            const s = nodeById(sId), h = nodeById(hId)
            const len = Math.hypot(h.x - s.x, h.y - s.y)
            return (
              <motion.line
                key={`sh-${sId}-${hId}`}
                x1={s.x} y1={s.y} x2={h.x} y2={h.y}
                stroke="var(--color-accent)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                strokeLinecap="round"
                opacity="0"
                initial={{ strokeDashoffset: len, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 0.45 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              />
            )
          })}

          {/* ── LAYER 2: Hub ↔ Hub  (backbone, solid accent, thicker) ── */}
          {phase >= 4 && HUB_HUB.map(([aId, bId], i) => {
            const a = nodeById(aId), b = nodeById(bId)
            return (
              <motion.line
                key={`hh-${aId}-${bId}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="var(--color-accent)"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0"
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              />
            )
          })}

          {/* ── LAYER 3: Hub → Destination  (last-mile, success green) ── */}
          {phase >= 5 && HUB_DEST.map(([hId, dId], i) => {
            const h = nodeById(hId), d = nodeById(dId)
            return (
              <motion.line
                key={`hd-${hId}-${dId}`}
                x1={h.x} y1={h.y} x2={d.x} y2={d.y}
                stroke="var(--color-success)"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0"
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            )
          })}

          {/* ── Animated rider dots ── */}
          {phase >= 5 && RIDER_ROUTES.map((r, i) => {
            const d = r.path.map(([x, y], j) => `${j === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
            return (
              <g key={`rider-${i}`}>
                {/* invisible path for animateMotion */}
                <path id={`rp${i}`} d={d} fill="none" />
                <circle r="3" fill={r.color} opacity="0.85">
                  <animateMotion
                    dur={`${r.dur}s`}
                    begin={`${r.delay}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#rp${i}`} />
                  </animateMotion>
                </circle>
                {/* trailing glow dot */}
                <circle r="5" fill={r.color} opacity="0.2">
                  <animateMotion
                    dur={`${r.dur}s`}
                    begin={`${r.delay}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#rp${i}`} />
                  </animateMotion>
                </circle>
              </g>
            )
          })}

          {/* ── Store nodes ── */}
          {STORES.map((s, i) => (
            <motion.g
              key={s.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
              style={{ transformOrigin: `${s.x}px ${s.y}px` }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: i * 0.1 }}
            >
              {/* Store square tile */}
              <rect
                x={s.x - 13} y={s.y - 13} width="26" height="26"
                rx="6"
                fill="var(--color-charcoal)"
                className="dark:fill-white/20"
              />
              {/* Storefront icon paths */}
              <g transform={`translate(${s.x - 7}, ${s.y - 7})`}>
                <path d="M1 5l.8-2.5h10.4L13 5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M1 5h12v.5a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 011 5.5V5z" stroke="white" strokeWidth="1.1" fill="none" />
                <path d="M2.5 8V13h9V8" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" />
                <rect x="5" y="10" width="4" height="3" rx="0.5" stroke="white" strokeWidth="1" fill="none" />
              </g>
              {/* Name label */}
              <text x={s.x} y={s.y + 22} textAnchor="middle" fontSize="7.5" fontWeight="600"
                fill="var(--color-charcoal)" className="dark:fill-white/70 select-none">
                {s.name}
              </text>
            </motion.g>
          ))}

          {/* ── Hub nodes ── */}
          {HUBS.map((h, i) => (
            <motion.g
              key={h.id}
              filter="url(#hubGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={phase >= 3 ? { scale: 1, opacity: 1 } : {}}
              style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              transition={{ type: 'spring', stiffness: 250, damping: 20, delay: i * 0.15 }}
            >
              {/* Outer pulse ring */}
              <circle cx={h.x} cy={h.y} r="20" fill="var(--color-accent)" opacity="0.12" />
              {/* Main circle */}
              <circle cx={h.x} cy={h.y} r="14" fill="var(--color-accent)" />
              {/* Hub icon */}
              <g transform={`translate(${h.x - 8}, ${h.y - 8})`}>
                <path d="M0 6l8-5 8 5v8a1 1 0 01-1 1H1a1 1 0 01-1-1V6z" stroke="white" strokeWidth="1.1" strokeLinejoin="round" fill="none" />
                <path d="M5 15v-5h6v5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
              {/* Label pill */}
              <rect x={h.x - 22} y={h.y + 17} width="44" height="10" rx="5"
                fill="var(--color-accent-soft)" className="dark:fill-accent/20" />
              <text x={h.x} y={h.y + 24.5} textAnchor="middle" fontSize="7" fontWeight="700"
                fill="var(--color-accent)" className="dark:fill-accent-light select-none">
                {h.name}
              </text>
            </motion.g>
          ))}

          {/* ── Destination nodes ── */}
          {DESTS.map((d, i) => (
            <motion.g
              key={d.id}
              filter="url(#pinShadow)"
              initial={{ y: -8, opacity: 0 }}
              animate={phase >= 5 ? { y: 0, opacity: 1 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.1 }}
            >
              {/* Pin body */}
              <path
                d={`M ${d.x} ${d.y - 18} C ${d.x - 9} ${d.y - 18} ${d.x - 9} ${d.y - 5}
                    ${d.x} ${d.y + 2} C ${d.x + 9} ${d.y - 5} ${d.x + 9} ${d.y - 18} ${d.x} ${d.y - 18} Z`}
                fill="#f59e0b"
                opacity="0.9"
              />
              {/* Inner circle on pin */}
              <circle cx={d.x} cy={d.y - 11} r="3.5" fill="white" opacity="0.85" />
              {/* Label */}
              <text x={d.x} y={d.y + 10} textAnchor="middle" fontSize="7" fontWeight="600"
                fill="var(--color-graphite)" className="dark:fill-white/60 select-none">
                {d.name}
              </text>
            </motion.g>
          ))}

          {/* ── Coverage extent labels ── */}
          {phase >= 5 && (
            <motion.text
              x="195" y="264" textAnchor="middle" fontSize="8" fontWeight="500"
              fill="var(--color-graphite)"
              className="dark:fill-white/40 select-none"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
              transition={{ delay: 0.6 }}
            >
              City-wide coverage · 30–90 min delivery radius
            </motion.text>
          )}
        </svg>

        {/* ── Legend strip (over the map, top-right) ── */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {[
            { label: 'Retail Stores',         bg: 'bg-[#1d1d1f] dark:bg-white/20', text: 'text-white' },
            { label: 'Middle Mile Hubs',       bg: 'bg-accent',                     text: 'text-white' },
            { label: 'Last Mile Riders',       bg: 'bg-success',                    text: 'text-white' },
            { label: 'Customer Destinations',  bg: 'bg-warning',                    text: 'text-white' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-sm
                         rounded-full px-2 py-1 border border-white/60 dark:border-white/10"
              initial={{ x: 16, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <span className={`h-3.5 w-3.5 rounded-sm ${item.bg} flex-shrink-0`} />
              <span className="text-[10px] font-medium text-graphite dark:text-white/70 whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── "How it works" step strip ── */}
      <div className="border-t border-border dark:border-white/10 bg-white dark:bg-[#141416]">
        <div className="grid grid-cols-3 divide-x divide-border dark:divide-white/10">
          {[
            {
              step: 1,
              icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M3 9.5L5 4h14l2 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9.5h18v.5a3 3 0 01-3 3h-.5a3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3H8a3 3 0 01-3-3v-.5z" stroke="currentColor" strokeWidth="1.6" fill="none"/>
                  <path d="M5 13.5V20h14v-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <rect x="9.5" y="16" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              ),
              title: 'Store pickup',
              desc: 'Order fulfilled from nearest store inventory',
              color: 'bg-[#1d1d1f] dark:bg-white/15 text-white',
              badge: 'bg-[#1d1d1f] dark:bg-white/20',
            },
            {
              step: 2,
              icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M9 22V13h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 8h1.5M13 8h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
                </svg>
              ),
              title: 'Hub consolidation',
              desc: 'Middle mile hubs optimise cross-city routing',
              color: 'bg-accent text-white',
              badge: 'bg-accent',
            },
            {
              step: 3,
              icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <circle cx="6.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="17.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M9 17h4.5l2.5-6M7.5 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.5 11l-1.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="14.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16.5 11h-3l-1-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Last mile delivery',
              desc: 'Riders reach farthest city points in 30–90 min',
              color: 'bg-warning/90 text-white',
              badge: 'bg-warning',
            },
          ].map((s, i) => (
            <div key={s.step} className="flex items-start gap-3 p-4 sm:p-5">
              <div className="relative flex-shrink-0">
                <div className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center shadow-[var(--shadow-sm)]`}>
                  {s.icon}
                </div>
                <span className={`absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full ${s.badge}
                                  text-white text-[9px] font-bold flex items-center justify-center`}>
                  {s.step}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-charcoal dark:text-charcoal leading-tight">
                  {s.title}
                </p>
                <p className="mt-0.5 text-[10px] sm:text-xs text-graphite dark:text-graphite leading-snug">
                  {s.desc}
                </p>
              </div>
              {/* Inter-step arrow (between cards, not after last) */}
              {i < 2 && (
                <svg viewBox="0 0 16 16" className="hidden sm:block h-4 w-4 flex-shrink-0 mt-3 text-border-strong dark:text-white/20 -mr-6 relative z-10" fill="none">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
