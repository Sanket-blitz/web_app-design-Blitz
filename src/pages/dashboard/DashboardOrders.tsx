import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, Plus, Bike } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { EmptyOrdersIllustration } from '../../components/illustrations/EmptyOrdersIllustration'
import { useOnboarding } from '../../context/OnboardingContext'
import {
  getStatusLabel,
  getStatusVariant,
  getServiceLabel,
  getOrderAmount,
  findOrdersByRiderQuery,
  type Order,
  type OrderStatus,
} from '../../lib/orders'
import { cn } from '../../lib/utils'

const filters: { id: OrderStatus | 'all' | 'active'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'created', label: 'Created' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'returned', label: 'Returned' },
  { id: 'cancelled', label: 'Cancelled' },
]

interface DashboardOrdersProps {
  onSelectOrder: (order: Order) => void
  onOpenRiderSearch: () => void
}

export function DashboardOrders({ onSelectOrder, onOpenRiderSearch }: DashboardOrdersProps) {
  const navigate = useNavigate()
  const { orders, activeStore } = useOnboarding()
  const [filter, setFilter] = useState<OrderStatus | 'all' | 'active'>('all')
  const [riderQuery, setRiderQuery] = useState('')

  const storeOrders = useMemo(() => {
    let filtered = orders.filter((o) => o.storeId === activeStore.id)
    if (filter === 'all') {
      /* keep all */
    } else if (filter === 'active') {
      filtered = filtered.filter((o) =>
        ['created', 'assigned', 'picked_up', 'in_transit', 'pickup_pending', 'ongoing', 'upcoming'].includes(o.status)
      )
    } else if (filter === 'in_transit') {
      filtered = filtered.filter((o) => ['in_transit', 'ongoing', 'picked_up'].includes(o.status))
    } else if (filter === 'assigned') {
      filtered = filtered.filter((o) => ['assigned', 'upcoming', 'pickup_pending'].includes(o.status))
    } else {
      filtered = filtered.filter((o) => o.status === filter)
    }

    if (riderQuery.trim()) {
      filtered = findOrdersByRiderQuery(filtered, riderQuery)
    }

    return filtered
  }, [orders, activeStore.id, filter, riderQuery])

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">Orders</h1>
          <p className="mt-1 text-sm text-graphite">{activeStore.storeName} · {storeOrders.length} orders</p>
        </div>
        <Button size="sm" onClick={() => navigate('/dashboard/create')}>
          <Plus className="h-4 w-4" /> Create Delivery
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 min-w-0 flex-1">
          <Filter className="h-4 w-4 text-graphite shrink-0" />
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full border whitespace-nowrap transition-colors',
                filter === f.id
                  ? 'bg-slate text-pure-white border-slate dark:bg-accent dark:border-accent'
                  : 'bg-white dark:bg-white/5 text-graphite dark:text-zinc-300 border-border dark:border-white/10 hover:border-border-strong dark:hover:border-white/25 dark:hover:bg-white/10'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-initial lg:min-w-[240px]">
            <Bike className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite dark:text-zinc-400 pointer-events-none" />
            <input
              type="search"
              value={riderQuery}
              onChange={(e) => setRiderQuery(e.target.value)}
              placeholder="Search rider ID or name"
              className="w-full h-9 pl-9 pr-3 text-sm rounded-full border border-border dark:border-white/10 bg-white dark:bg-white/5 text-charcoal dark:text-zinc-200 placeholder:text-graphite dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
          <Button variant="outline" size="sm" className="shrink-0 rounded-full h-9 px-3" onClick={onOpenRiderSearch}>
            Search
          </Button>
        </div>
      </div>

      <Card padding="sm" className="overflow-x-auto">
        {storeOrders.length === 0 ? (
          <EmptyState
            icon={<EmptyOrdersIllustration className="h-14 w-14" />}
            title="Your first delivery is just a few clicks away."
            action={{ label: 'Create Delivery', onClick: () => navigate('/dashboard/create') }}
          />
        ) : (
          <table className="w-full min-w-[920px] text-sm">
            <thead>
              <tr className="border-b border-border dark:border-white/10 text-left text-xs text-graphite dark:text-zinc-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Tracking ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Rider</th>
                <th className="px-4 py-3 font-medium">ETA</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/10">
              {storeOrders.map((o) => (
                <tr key={o.id} className="hover:bg-surface/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-medium text-charcoal dark:text-zinc-200">{o.id}</td>
                  <td className="px-4 py-3.5 text-charcoal dark:text-zinc-200">{o.customer}</td>
                  <td className="px-4 py-3.5 text-graphite dark:text-zinc-400">{o.sku ?? '—'}</td>
                  <td className="px-4 py-3.5 text-graphite dark:text-zinc-400">{getServiceLabel(o)}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={getStatusVariant(o.status)}>{getStatusLabel(o.status)}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-graphite dark:text-zinc-400">
                    {o.riderId ? (
                      <div className="leading-snug">
                        <span className="font-mono font-medium text-emerald-700 dark:text-emerald-400">{o.riderId}</span>
                        {o.riderName && (
                          <span className="block text-charcoal dark:text-zinc-300 normal-case mt-0.5">{o.riderName}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">Searching…</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-graphite dark:text-zinc-400">{o.eta ?? '—'}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-charcoal dark:text-zinc-200">₹{getOrderAmount(o)}</td>
                  <td className="px-4 py-3.5 text-graphite dark:text-zinc-400 text-xs">{formatTime(o.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <Button variant="outline" size="sm" onClick={() => onSelectOrder(o)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
