import { useState } from 'react'
import { Bike, Search, Package } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'
import { findOrdersByRiderId, getStatusLabel, getStatusVariant, type Order } from '../../lib/orders'
import { getRiderById, MOCK_RIDERS } from '../../lib/riders'

interface RiderSearchModalProps {
  open: boolean
  onClose: () => void
  onSelectOrder: (order: Order) => void
}

export function RiderSearchModal({ open, onClose, onSelectOrder }: RiderSearchModalProps) {
  const { orders } = useOnboarding()
  const [query, setQuery] = useState('')

  const rider = query.trim() ? getRiderById(query.trim()) : undefined
  const orderResults = query.trim() ? findOrdersByRiderId(orders, query.trim()) : []

  const handleSelect = (order: Order) => {
    onSelectOrder(order)
    onClose()
    setQuery('')
  }

  const handleClose = () => {
    onClose()
    setQuery('')
  }

  return (
    <Modal open={open} onClose={handleClose} title="Search Rider" size="md">
      <div className="space-y-4">
        <Input
          label="Rider ID"
          placeholder="e.g. R-1042"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.trim() && (
          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {rider && (
              <div className="p-3 rounded-[var(--radius-lg)] border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Bike className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal dark:text-zinc-100">{rider.name}</p>
                    <p className="text-xs font-mono text-graphite dark:text-zinc-400">{rider.id} · ★ {rider.rating}</p>
                  </div>
                </div>
              </div>
            )}

            {orderResults.length === 0 ? (
              <p className="text-sm text-graphite dark:text-zinc-400 text-center py-4">
                No active orders for &quot;{query}&quot;
              </p>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-zinc-500">
                  Orders ({orderResults.length})
                </p>
                {orderResults.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => handleSelect(o)}
                    className="w-full flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-border hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Package className="h-4 w-4 text-graphite shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm font-mono font-semibold text-charcoal dark:text-zinc-100">{o.id}</span>
                        <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5 truncate">{o.customer} · {o.address}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(o.status)}>{getStatusLabel(o.status)}</Badge>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {!query.trim() && (
          <div className="space-y-3">
            <div className="text-center py-6 text-graphite dark:text-zinc-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Search by rider ID to view assigned orders</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOCK_RIDERS.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setQuery(r.id)}
                  className="text-xs font-mono px-2.5 py-1 rounded-full border border-border hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  {r.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
