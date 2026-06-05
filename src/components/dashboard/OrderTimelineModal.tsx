import { useMemo } from 'react'
import { Store, Warehouse, Bike, MapPin, X } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { OsrmMap } from '../map/OsrmMap'
import { getStatusLabel, getStatusVariant, type Order } from '../../lib/orders'

interface OrderTimelineModalProps {
  order: Order | null
  onClose: () => void
  onCancel?: (id: string) => void
}

const typeIcons = { store: Store, hub: Warehouse, rider: Bike, customer: MapPin }

export function OrderTimelineModal({ order, onClose, onCancel }: OrderTimelineModalProps) {
  const waypoints = useMemo(
    () => order?.timeline.map((p) => ({ lat: p.lat, lng: p.lng })) ?? [],
    [order]
  )

  const markers = useMemo(
    () => order?.timeline.map((p) => ({
      position: { lat: p.lat, lng: p.lng },
      label: p.location,
      color: p.type,
    })) ?? [],
    [order]
  )

  if (!order) return null

  const points = order.timeline

  return (
    <Modal open={!!order} onClose={onClose} size="lg">
      <div className="space-y-6 -mt-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold font-mono text-charcoal">{order.id}</h2>
              <Badge variant={getStatusVariant(order.status)}>{getStatusLabel(order.status)}</Badge>
            </div>
            <p className="text-sm text-graphite mt-1">{order.customer} · {order.address}</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-[var(--radius-md)] flex items-center justify-center text-graphite hover:bg-surface">
            <X className="h-4 w-4" />
          </button>
        </div>

        <OsrmMap
          height="h-64"
          waypoints={waypoints}
          markers={markers}
          zoom={12}
        />

        <div className="flex items-center justify-between text-xs text-graphite px-1">
          <span>₹{order.cost} delivery fee · OSRM routed</span>
          {order.timeTaken && <span>{order.timeTaken} min total</span>}
          {order.eta && order.status !== 'delivered' && <span>ETA: {order.eta}</span>}
        </div>

        <div className="space-y-0">
          {points.map((event, i) => {
            const Icon = typeIcons[event.type]
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-charcoal" />
                  </div>
                  {i < points.length - 1 && <div className="w-px flex-1 bg-border my-1 min-h-[20px]" />}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-charcoal">{event.label}</p>
                    <span className="text-xs text-graphite font-mono">{event.time}</span>
                  </div>
                  <p className="text-xs text-graphite mt-0.5">{event.location}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 pt-2 border-t border-border">
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
