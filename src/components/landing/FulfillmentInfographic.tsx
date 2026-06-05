import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, Warehouse, Bike, MapPin, X } from 'lucide-react'
import { cn } from '../../lib/utils'

type NodeType = 'store' | 'hub' | 'destination'

interface NetworkNode {
  id: string
  name: string
  type: NodeType
  x: number
  y: number
}

const NODES: NetworkNode[] = [
  { id: 'koramangala', name: 'Koramangala', type: 'store', x: 18, y: 56 },
  { id: 'jayanagar', name: 'Jayanagar', type: 'store', x: 22, y: 76 },
  { id: 'indiranagar', name: 'Indiranagar', type: 'store', x: 38, y: 40 },
  { id: 'mgRoad', name: 'MG Road', type: 'store', x: 52, y: 24 },
  { id: 'southHub', name: 'South Hub', type: 'hub', x: 30, y: 64 },
  { id: 'centralHub', name: 'Central Hub', type: 'hub', x: 50, y: 46 },
  { id: 'eastHub', name: 'East Hub', type: 'hub', x: 74, y: 32 },
  { id: 'malleshwaram', name: 'Malleshwaram', type: 'destination', x: 12, y: 16 },
  { id: 'whitefield', name: 'Whitefield', type: 'destination', x: 90, y: 16 },
  { id: 'hsr', name: 'HSR Layout', type: 'destination', x: 72, y: 74 },
  { id: 'electronicCity', name: 'Electronic City', type: 'destination', x: 44, y: 88 },
]

/** Delivery route shown when each node is clicked */
const ROUTES: Record<string, string[]> = {
  koramangala: ['koramangala', 'southHub', 'centralHub', 'hsr'],
  jayanagar: ['jayanagar', 'southHub', 'centralHub', 'electronicCity'],
  indiranagar: ['indiranagar', 'centralHub', 'malleshwaram'],
  mgRoad: ['mgRoad', 'centralHub', 'eastHub', 'whitefield'],
  southHub: ['koramangala', 'southHub', 'centralHub', 'hsr'],
  centralHub: ['indiranagar', 'centralHub', 'malleshwaram'],
  eastHub: ['mgRoad', 'centralHub', 'eastHub', 'whitefield'],
  malleshwaram: ['indiranagar', 'centralHub', 'malleshwaram'],
  whitefield: ['mgRoad', 'centralHub', 'eastHub', 'whitefield'],
  hsr: ['koramangala', 'southHub', 'centralHub', 'hsr'],
  electronicCity: ['jayanagar', 'southHub', 'centralHub', 'electronicCity'],
}

const ROUTE_META: Record<string, { time: string; label: string }> = {
  koramangala: { time: '38 min', label: 'Same-day express' },
  jayanagar: { time: '52 min', label: 'Cross-city delivery' },
  indiranagar: { time: '28 min', label: 'North corridor' },
  mgRoad: { time: '45 min', label: 'East corridor' },
  southHub: { time: '38 min', label: 'South zone routing' },
  centralHub: { time: '28 min', label: 'Central consolidation' },
  eastHub: { time: '45 min', label: 'East zone routing' },
  malleshwaram: { time: '28 min', label: 'North delivery' },
  whitefield: { time: '45 min', label: 'East delivery' },
  hsr: { time: '38 min', label: 'South-east delivery' },
  electronicCity: { time: '52 min', label: 'South delivery' },
}

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]))

/** All network edges for faint background grid */
const BACKGROUND_EDGES: [string, string][] = [
  ['koramangala', 'southHub'],
  ['jayanagar', 'southHub'],
  ['southHub', 'centralHub'],
  ['indiranagar', 'centralHub'],
  ['mgRoad', 'centralHub'],
  ['centralHub', 'eastHub'],
  ['centralHub', 'malleshwaram'],
  ['centralHub', 'hsr'],
  ['centralHub', 'electronicCity'],
  ['eastHub', 'whitefield'],
]

function curvedPath(x1: number, y1: number, x2: number, y2: number, bend = 0.12): string {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const cx = mx - dy * bend
  const cy = my + dx * bend
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

function isLastMile(fromId: string, toId: string, route: string[]): boolean {
  const toNode = nodeMap[toId]
  if (toNode?.type !== 'destination') return false
  const toIdx = route.indexOf(toId)
  const fromIdx = route.indexOf(fromId)
  return toIdx === fromIdx + 1
}

export function FulfillmentInfographic() {
  const [selected, setSelected] = useState<string | null>(null)

  const activeRoute = selected ? ROUTES[selected] ?? [] : []
  const activeSegments = useMemo(() => {
    const segs: { from: string; to: string; lastMile: boolean }[] = []
    for (let i = 0; i < activeRoute.length - 1; i++) {
      segs.push({
        from: activeRoute[i],
        to: activeRoute[i + 1],
        lastMile: isLastMile(activeRoute[i], activeRoute[i + 1], activeRoute),
      })
    }
    return segs
  }, [activeRoute])

  const activeSegmentKeys = useMemo(
    () => new Set(activeSegments.map((s) => `${s.from}-${s.to}`)),
    [activeSegments]
  )

  const handleNodeClick = (id: string) => {
    setSelected((prev) => (prev === id ? null : id))
  }

  const routeLabel = selected
    ? activeRoute.map((id) => nodeMap[id]?.name).join(' → ')
    : null

  return (
    <div className="relative w-full rounded-[var(--radius-xl)] border border-border bg-white dark:bg-surface shadow-[var(--shadow-lg)] overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative p-5 md:p-7">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              { icon: Store, label: 'Retail Stores', color: 'text-charcoal' },
              { icon: Warehouse, label: 'Middle Mile Hubs', color: 'text-accent' },
              { icon: Bike, label: 'Last Mile Riders', color: 'text-success' },
              { icon: MapPin, label: 'Customer Destinations', color: 'text-warning' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-graphite">
                <item.icon className={cn('h-3.5 w-3.5', item.color)} />
                {item.label}
              </div>
            ))}
          </div>
          <p className="text-xs text-graphite hidden sm:block">Click any node to trace its delivery path</p>
        </div>

        {/* Active path banner */}
        <AnimatePresence>
          {selected && routeLabel && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 flex items-center justify-between gap-3 p-3 rounded-[var(--radius-lg)] bg-accent-soft/60 border border-accent/20"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-accent uppercase tracking-wider">Active route</p>
                <p className="text-sm font-semibold text-charcoal truncate">{routeLabel}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-charcoal">{ROUTE_META[selected]?.time}</span>
                <button
                  onClick={() => setSelected(null)}
                  className="h-7 w-7 rounded-full bg-white dark:bg-surface border border-border flex items-center justify-center text-graphite hover:text-charcoal"
                  aria-label="Clear selection"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG network map */}
        <div className="relative rounded-[var(--radius-lg)] border border-border bg-off-white/50 dark:bg-surface/50 overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-auto min-h-[320px] md:min-h-[360px]"
            role="img"
            aria-label="Fulfillment network map. Click nodes to see delivery paths."
          >
            {/* Zone rings */}
            <ellipse cx="50" cy="48" rx="46" ry="40" fill="none" stroke="var(--color-border)" strokeWidth="0.15" strokeDasharray="1.5 2" opacity="0.6" />
            <ellipse cx="50" cy="48" rx="32" ry="28" fill="none" stroke="var(--color-border)" strokeWidth="0.12" strokeDasharray="1 2" opacity="0.4" />
            <ellipse cx="50" cy="48" rx="18" ry="16" fill="none" stroke="var(--color-accent)" strokeWidth="0.1" strokeDasharray="1 2" opacity="0.25" />

            {/* Background edges */}
            {BACKGROUND_EDGES.map(([fromId, toId]) => {
              const from = nodeMap[fromId]
              const to = nodeMap[toId]
              if (!from || !to) return null
              const key = `${fromId}-${toId}`
              const isActive = activeSegmentKeys.has(key)
              if (selected && isActive) return null
              return (
                <path
                  key={key}
                  d={curvedPath(from.x, from.y, to.x, to.y)}
                  fill="none"
                  stroke="var(--color-border-strong)"
                  strokeWidth={0.35}
                  strokeDasharray="1.2 1.2"
                  opacity={selected ? 0.15 : 0.35}
                />
              )
            })}

            {/* Active route segments */}
            {activeSegments.map((seg, i) => {
              const from = nodeMap[seg.from]
              const to = nodeMap[seg.to]
              if (!from || !to) return null
              const d = curvedPath(from.x, from.y, to.x, to.y)
              const color = seg.lastMile ? 'var(--color-success)' : 'var(--color-accent)'
              return (
                <g key={`${seg.from}-${seg.to}`}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  />
                  {/* Rider dot on last mile */}
                  {seg.lastMile && (
                    <circle r={1.2} fill="var(--color-success)">
                      <animateMotion dur="2.5s" repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                </g>
              )
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const isActive = selected === node.id || activeRoute.includes(node.id)
              const isSelected = selected === node.id
              const r = node.type === 'hub' ? 4.2 : node.type === 'store' ? 3.6 : 3.2

              let fill = 'var(--color-slate)'
              let stroke = 'var(--color-pure-white)'
              if (node.type === 'hub') {
                fill = 'var(--color-accent)'
                stroke = 'var(--color-pure-white)'
              }
              if (node.type === 'destination') {
                fill = 'var(--color-warning-soft)'
                stroke = 'var(--color-warning)'
              }
              if (isSelected) {
                stroke = 'var(--color-accent)'
              }

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(node.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleNodeClick(node.id)}
                  aria-label={`${node.name}. Click to show delivery path.`}
                  aria-pressed={isSelected}
                >
                  {/* Hit area */}
                  <circle cx={node.x} cy={node.y} r={r + 3} fill="transparent" />
                  {/* Glow when active */}
                  {isActive && selected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r + 2}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={0.5}
                      opacity={0.5}
                    />
                  )}
                  {node.type === 'store' ? (
                    <rect
                      x={node.x - r}
                      y={node.y - r}
                      width={r * 2}
                      height={r * 2}
                      rx={1}
                      fill={fill}
                      stroke={isSelected ? 'var(--color-accent)' : stroke}
                      strokeWidth={isSelected ? 0.6 : 0.3}
                      opacity={selected && !isActive ? 0.35 : 1}
                    />
                  ) : (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill={fill}
                      stroke={isSelected ? 'var(--color-accent)' : stroke}
                      strokeWidth={node.type === 'hub' ? 0.8 : 0.5}
                      opacity={selected && !isActive ? 0.35 : 1}
                    />
                  )}
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + r + 4.5}
                    textAnchor="middle"
                    fontSize={2.8}
                    fontWeight={node.type === 'hub' ? 600 : 500}
                    fill="var(--color-charcoal)"
                    opacity={selected && !isActive ? 0.35 : 1}
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.name}
                  </text>
                  {node.type === 'hub' && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r - 1.2}
                      fill="none"
                      stroke="var(--color-pure-white)"
                      strokeWidth={0.4}
                      opacity={selected && !isActive ? 0.35 : 0.6}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {node.type === 'destination' && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={1}
                      fill="var(--color-warning)"
                      opacity={selected && !isActive ? 0.35 : 1}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Flow steps */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { step: '1', title: 'Store pickup', desc: 'Order fulfilled from nearest store inventory' },
            { step: '2', title: 'Hub consolidation', desc: 'Middle mile hubs optimize cross-city routing' },
            { step: '3', title: 'Last mile delivery', desc: 'Riders reach farthest city points in 30–90 min' },
          ].map((f) => (
            <div key={f.step} className="flex items-start gap-3 p-3 rounded-[var(--radius-lg)] bg-surface/80 border border-border">
              <span className="h-6 w-6 rounded-full bg-slate text-pure-white text-xs font-bold flex items-center justify-center shrink-0">
                {f.step}
              </span>
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
