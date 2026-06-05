import { useState, useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'
import { getStatusLabel, getStatusVariant, type Order, type OrderStatus } from '../../lib/orders'
import { cn } from '../../lib/utils'

const filters: { id: OrderStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pickup_pending', label: 'Pickup Pending' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'returned', label: 'Returns' },
  { id: 'cancelled', label: 'Cancelled' },
]

interface DashboardOrdersProps {
  onSelectOrder: (order: Order) => void
}

export function DashboardOrders({ onSelectOrder }: DashboardOrdersProps) {
  const { orders, activeStore, updateOrder } = useOnboarding()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const storeOrders = useMemo(() => {
    const filtered = orders.filter((o) => o.storeId === activeStore.id)
    if (filter === 'all') return filtered
    return filtered.filter((o) => o.status === filter)
  }, [orders, activeStore.id, filter])

  const handleCancel = (id: string) => {
    updateOrder(id, { status: 'cancelled' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">Orders</h1>
          <p className="mt-1 text-sm text-graphite">{activeStore.storeName} · {storeOrders.length} orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-graphite shrink-0" />
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-full border whitespace-nowrap transition-colors',
              filter === f.id
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-white text-graphite border-border hover:border-border-strong'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card padding="sm" className="divide-y divide-border">
        {storeOrders.length === 0 ? (
          <p className="px-4 py-12 text-sm text-graphite text-center">No orders match this filter.</p>
        ) : (
          storeOrders.map((o) => (
            <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 gap-3 hover:bg-surface/50 transition-colors">
              <button onClick={() => onSelectOrder(o)} className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-mono font-semibold text-charcoal">{o.id}</span>
                  <Badge variant={getStatusVariant(o.status)}>{getStatusLabel(o.status)}</Badge>
                  {o.eta && o.status !== 'delivered' && o.status !== 'returned' && (
                    <span className="text-xs text-graphite">ETA: {o.eta}</span>
                  )}
                </div>
                <p className="text-sm text-graphite mt-1">{o.customer} · {o.address}</p>
                <p className="text-xs text-graphite mt-0.5">
                  {new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </button>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal">₹{o.cost}</p>
                  {o.timeTaken && <p className="text-xs text-graphite">{o.timeTaken} min</p>}
                  {o.cod > 0 && <p className="text-xs text-warning">COD ₹{o.cod}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectOrder(o)}>View</Button>
                  {(o.status === 'pickup_pending' || o.status === 'upcoming') && (
                    <Button variant="ghost" size="sm" onClick={() => handleCancel(o.id)}>
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}
