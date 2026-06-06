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
        'rounded-[var(--radius-lg)] border p-3 space-y-1',
        accent
          ? 'border-success/30 bg-success-soft/40 dark:bg-success/10'
          : 'border-border dark:border-zinc-700 bg-surface/40 dark:bg-zinc-800/40',
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-graphite dark:text-zinc-400">{label}</p>
      <p className={cn('text-sm font-semibold font-mono', accent ? 'text-success dark:text-success-light' : 'text-charcoal dark:text-zinc-100')}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-graphite dark:text-zinc-500">{sub}</p>}
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
      <div className="space-y-5 -mt-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold font-mono text-charcoal dark:text-zinc-100">{order.id}</h2>
              <Badge variant={getStatusVariant(order.status)}>{getStatusLabel(order.status)}</Badge>
            </div>
            <p className="text-sm text-graphite dark:text-zinc-300 mt-1 truncate">{order.customer} · {order.address}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center text-graphite dark:text-zinc-400 hover:bg-surface dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Rider card */}
        {rider && (
          <div className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] border border-border dark:border-zinc-700 bg-gradient-to-r from-emerald-500/5 to-transparent">
            <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bike className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-charcoal dark:text-zinc-100">{rider.name}</p>
                <span className="text-xs font-mono text-graphite dark:text-zinc-400">{rider.id}</span>
                {rider.rating && (
                  <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400">
                    <Star className="h-3 w-3 fill-current" /> {rider.rating}
                  </span>
                )}
              </div>
              {rider.phone && <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5">{rider.phone}</p>}
            </div>
            {transit && (
              <Badge variant="accent" className="shrink-0 gap-1">
                <Navigation className="h-3 w-3" /> Live
              </Badge>
            )}
          </div>
        )}

        {searching && (
          <div className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] border border-accent/30 bg-accent-soft/30 dark:bg-accent/10">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal dark:text-zinc-100">Searching nearby riders</p>
              <p className="text-xs text-graphite dark:text-zinc-400">Scanning within 1.1 km of {order.storeName}</p>
            </div>
          </div>
        )}

        <OsrmMap
          height="h-72"
          routes={mapState.routes}
          markers={mapState.markers}
          circles={mapState.circles}
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
          <div className="flex items-center gap-2 text-xs text-success dark:text-success-light bg-success-soft/50 dark:bg-success/10 px-3 py-2 rounded-[var(--radius-md)]">
            <PackageCheck className="h-4 w-4 shrink-0" />
            Delivered by {rider?.name ?? 'rider'} in <strong className="ml-1">{order.timeTaken} min</strong>
            {order.deliveredAt && order.assignedAt && (
              <span className="text-graphite dark:text-zinc-400 ml-1">
                · {Math.round((new Date(order.deliveredAt).getTime() - new Date(order.assignedAt).getTime()) / 60000)} min from assign
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-graphite dark:text-zinc-400 px-1">
          <span>₹{order.cost} delivery · OSRM routed</span>
          {transit && order.eta && <span className="font-medium text-accent">ETA {order.eta}</span>}
        </div>

        <div className="space-y-0 max-h-[220px] overflow-y-auto pr-1">
          {points.map((event, i) => {
            const Icon = typeIcons[event.type]
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'h-8 w-8 rounded-full border flex items-center justify-center',
                    event.type === 'rider'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                      : 'bg-surface dark:bg-zinc-800 border-border dark:border-zinc-600',
                  )}>
                    <Icon className={cn('h-3.5 w-3.5', event.type === 'rider' ? 'text-emerald-700 dark:text-emerald-400' : 'text-charcoal dark:text-zinc-200')} />
                  </div>
                  {i < points.length - 1 && <div className="w-px flex-1 bg-border dark:bg-zinc-600 my-1 min-h-[16px]" />}
                </div>
                <div className="pb-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-charcoal dark:text-zinc-100">{event.label}</p>
                    <span className="text-xs text-graphite dark:text-zinc-400 font-mono shrink-0">{event.time}</span>
                  </div>
                  <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5">{event.location}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 pt-2 border-t border-border dark:border-zinc-700">
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
