import { useState } from 'react'
import { Search } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'
import { findOrdersByRiderId, getStatusLabel, getStatusVariant } from '../../lib/orders'
import type { Order } from '../../lib/orders'

interface OrderSearchModalProps {
  open: boolean
  onClose: () => void
  onSelectOrder: (order: Order) => void
}

export function OrderSearchModal({ open, onClose, onSelectOrder }: OrderSearchModalProps) {
  const { orders } = useOnboarding()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const results = q
    ? orders.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.riderId?.toLowerCase().includes(q) ||
        o.riderName?.toLowerCase().includes(q),
      )
    : []

  const riderMatches = q ? findOrdersByRiderId(orders, q) : []
  const combined = [...new Map([...results, ...riderMatches].map((o) => [o.id, o])).values()]

  const handleSelect = (order: Order) => {
    onSelectOrder(order)
    onClose()
    setQuery('')
  }

  return (
    <Modal open={open} onClose={() => { onClose(); setQuery('') }} title="Search Orders" size="md">
      <div className="space-y-4">
        <Input
          label="Order / Rider / Customer"
          placeholder="e.g. BLZ-4821 or R-1042"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() && (
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {combined.length === 0 ? (
              <p className="text-sm text-graphite dark:text-zinc-400 text-center py-6">No orders found for &quot;{query}&quot;</p>
            ) : (
              combined.map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleSelect(o)}
                  className="w-full flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-border hover:border-accent hover:bg-accent-soft/30 transition-all text-left"
                >
                  <div>
                    <span className="text-sm font-mono font-semibold text-charcoal dark:text-zinc-100">{o.id}</span>
                    <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5">{o.customer}</p>
                    {o.riderId && (
                      <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">{o.riderId} · {o.riderName}</p>
                    )}
                  </div>
                  <Badge variant={getStatusVariant(o.status)}>{getStatusLabel(o.status)}</Badge>
                </button>
              ))
            )}
          </div>
        )}
        {!query.trim() && (
          <div className="text-center py-8 text-graphite dark:text-zinc-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">Search by order ID, rider ID, or customer name</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
