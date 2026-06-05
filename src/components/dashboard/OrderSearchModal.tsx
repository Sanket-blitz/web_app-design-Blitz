import { useState } from 'react'
import { Search } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'
import { getStatusLabel, getStatusVariant } from '../../lib/orders'
import type { Order } from '../../lib/orders'

interface OrderSearchModalProps {
  open: boolean
  onClose: () => void
  onSelectOrder: (order: Order) => void
}

export function OrderSearchModal({ open, onClose, onSelectOrder }: OrderSearchModalProps) {
  const { orders } = useOnboarding()
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? orders.filter((o) =>
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleSelect = (order: Order) => {
    onSelectOrder(order)
    onClose()
    setQuery('')
  }

  return (
    <Modal open={open} onClose={() => { onClose(); setQuery('') }} title="Search Orders" size="md">
      <div className="space-y-4">
        <Input
          label="Order Number"
          placeholder="e.g. BLZ-4821"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() && (
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-graphite dark:text-zinc-400 text-center py-6">No orders found for "{query}"</p>
            ) : (
              results.map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleSelect(o)}
                  className="w-full flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-border hover:border-accent hover:bg-accent-soft/30 transition-all text-left"
                >
                  <div>
                    <span className="text-sm font-mono font-semibold text-charcoal dark:text-zinc-100">{o.id}</span>
                    <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5">{o.customer}</p>
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
            <p className="text-sm">Search by order number or customer name</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
