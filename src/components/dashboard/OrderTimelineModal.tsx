import { useMemo } from 'react'
import { Store, Warehouse, Bike, MapPin, X, Star, Navigation, PackageCheck } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { OsrmMap } from '../map/OsrmMap'
import {
  getStatusLabel,
  getStatusVariant,
  getRiderDisplay,
  isSearchingRider,
  isInTransit,
  type Order,
} from '../../lib/orders'
import { buildOrderMapState } from '../../lib/orderTracking'
import { formatOrderTime, formatClockTime } from '../../lib/riders'
import { cn } from '../../lib/utils'

interface OrderTimelineModalProps {
  order: Order | null
  onClose: () => void
  onCancel?: (id: string) => void
}

const typeIcons = { store: Store, hub: Warehouse, rider: Bike, customer: MapPin }

function TimingCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border px-2.5 py-2',
        accent
          ? 'border-success/30 bg-success-soft/40 dark:bg-success/10'
          : 'border-border dark:border-zinc-700 bg-surface/40 dark:bg-zinc-800/40',
      )}
    >
      <p className="text-[9px] font-semibold uppercase tracking-wider text-graphite dark:text-zinc-400 leading-none">{label}</p>
      <p className={cn('text-[13px] font-semibold font-mono mt-1 leading-tight', accent ? 'text-success dark:text-success-light' : 'text-charcoal dark:text-zinc-100')}>
        {value}
      </p>
      {sub && <p className="text-[10px] text-graphite dark:text-zinc-500 mt-0.5 truncate">{sub}</p>}
    </div>
  )
}

export function OrderTimelineModal({ order, onClose, onCancel }: OrderTimelineModalProps) {
  const mapState = useMemo(() => (order ? buildOrderMapState(order) : null), [order])

  if (!order || !mapState) return null

  const rider = getRiderDisplay(order)
  const searching = isSearchingRider(order)
  const transit = isInTransit(order)
  const delivered = order.status === 'delivered'
  const points = order.timeline

  return (
    <Modal open={!!order} onClose={onClose} size="lg">
      <div className="space-y-3 -mt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h2 className="text-base font-semibold font-mono text-charcoal dark:text-zinc-100">{order.id}</h2>
              <Badge variant={getStatusVariant(order.status)} className="text-[10px] px-2 py-0">{getStatusLabel(order.status)}</Badge>
            </div>
            <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5 truncate">{order.customer} · {order.address}</p>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center text-graphite dark:text-zinc-400 hover:bg-surface dark:hover:bg-zinc-800"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {rider && (
          <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-[var(--radius-md)] border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20">
            <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bike className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
              <span className="font-semibold text-charcoal dark:text-zinc-100">{rider.name}</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">{rider.id}</span>
              {rider.rating && (
                <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
                  <Star className="h-2.5 w-2.5 fill-current" /> {rider.rating}
                </span>
              )}
              {rider.phone && (
                <span className="text-graphite dark:text-zinc-400 hidden sm:inline">{rider.phone}</span>
              )}
            </div>
            {transit && (
              <Badge variant="accent" className="shrink-0 gap-0.5 text-[10px] px-1.5 py-0 h-5">
                <Navigation className="h-2.5 w-2.5" /> Live
              </Badge>
            )}
          </div>
        )}

        {searching && (
          <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-[var(--radius-md)] border border-accent/30 bg-accent-soft/30 dark:bg-accent/10">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <p className="text-xs text-charcoal dark:text-zinc-100">
              <span className="font-semibold">Searching nearby riders</span>
              <span className="text-graphite dark:text-zinc-400"> · 1.1 km · {order.storeName}</span>
            </p>
          </div>
        )}

        <OsrmMap
          height="h-60"
          routes={mapState.routes}
          markers={mapState.markers}
          circles={mapState.circles}
          fenceMode={mapState.mode === 'searching' ? 'search' : mapState.mode === 'transit' ? 'transit' : 'none'}
          mapLabel={mapState.mapLabel}
          zoom={mapState.mode === 'searching' ? 14 : 13}
        />

        {/* Timing grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <TimingCard
            label="Assigned at"
            value={order.assignedAt ? formatClockTime(order.assignedAt) : searching ? 'Pending' : '—'}
            sub={order.assignedAt ? formatOrderTime(order.assignedAt) : undefined}
          />
          <TimingCard
            label="Rider arriving"
            value={order.riderArrivingAt ? formatClockTime(order.riderArrivingAt) : searching ? 'Scanning…' : '—'}
            sub={order.riderArrivingAt ? formatOrderTime(order.riderArrivingAt) : undefined}
          />
          <TimingCard
            label="Deliver by"
            value={order.deliverBy ? formatClockTime(order.deliverBy) : order.eta ?? '—'}
            sub={order.deliverBy ? formatOrderTime(order.deliverBy) : 'SLA target'}
          />
          <TimingCard
            label={delivered ? 'Delivered at' : 'Status'}
            value={delivered && order.deliveredAt ? formatClockTime(order.deliveredAt) : order.eta ?? '—'}
            sub={delivered && order.deliveredAt ? formatOrderTime(order.deliveredAt) : order.timeTaken ? `${order.timeTaken} min elapsed` : undefined}
            accent={delivered}
          />
        </div>

        {delivered && order.timeTaken && (
          <div className="flex items-center gap-1.5 text-[11px] text-success dark:text-success-light bg-success-soft/50 dark:bg-success/10 px-2.5 py-1.5 rounded-[var(--radius-md)]">
            <PackageCheck className="h-3.5 w-3.5 shrink-0" />
            Delivered in <strong>{order.timeTaken} min</strong>
            {order.deliveredAt && order.assignedAt && (
              <span className="text-graphite dark:text-zinc-400">
                · {Math.round((new Date(order.deliveredAt).getTime() - new Date(order.assignedAt).getTime()) / 60000)} min from assign
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-graphite dark:text-zinc-400 px-0.5">
          <span>₹{order.cost} delivery · OSRM routed</span>
          {transit && order.eta && <span className="font-medium text-accent">ETA {order.eta}</span>}
        </div>

        <div className="space-y-0 max-h-[180px] overflow-y-auto pr-1">
          {points.map((event, i) => {
            const Icon = typeIcons[event.type]
            return (
              <div key={i} className="flex gap-2.5">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'h-6 w-6 rounded-full border flex items-center justify-center',
                    event.type === 'rider'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                      : 'bg-surface dark:bg-zinc-800 border-border dark:border-zinc-600',
                  )}>
                    <Icon className={cn('h-3 w-3', event.type === 'rider' ? 'text-emerald-700 dark:text-emerald-400' : 'text-charcoal dark:text-zinc-200')} />
                  </div>
                  {i < points.length - 1 && <div className="w-px flex-1 bg-border dark:bg-zinc-600 my-0.5 min-h-[12px]" />}
                </div>
                <div className="pb-2 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-charcoal dark:text-zinc-100 truncate">{event.label}</p>
                    <span className="text-[10px] text-graphite dark:text-zinc-400 font-mono shrink-0">{event.time}</span>
                  </div>
                  <p className="text-[10px] text-graphite dark:text-zinc-400 truncate">{event.location}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 pt-1.5 border-t border-border dark:border-zinc-700">
          {(order.status === 'pickup_pending' || order.status === 'upcoming') && onCancel && (
            <Button variant="outline" className="flex-1" onClick={() => { onCancel(order.id); onClose() }}>
              Cancel Order
            </Button>
          )}
          <Button className="flex-1" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}
