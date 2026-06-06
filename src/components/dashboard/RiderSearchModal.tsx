import { useState, useMemo } from 'react'
import { Bike, Search, Package } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'
import { findOrdersByRiderQuery, getStatusLabel, getStatusVariant, type Order } from '../../lib/orders'
import { MOCK_RIDERS } from '../../lib/riders'

interface RiderSearchModalProps {
  open: boolean
  onClose: () => void
  onSelectOrder: (order: Order) => void
}

function matchRider(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  return MOCK_RIDERS.find(
    (r) => r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q),
  )
}

export function RiderSearchModal({ open, onClose, onSelectOrder }: RiderSearchModalProps) {
  const { orders } = useOnboarding()
  const [query, setQuery] = useState('')

  const rider = useMemo(() => (query.trim() ? matchRider(query) : undefined), [query])
  const orderResults = useMemo(
    () => (query.trim() ? findOrdersByRiderQuery(orders, query) : []),
    [orders, query],
  )

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
          label="Rider ID / Rider name"
          placeholder="e.g. R-1042 or Arjun Singh"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.trim() && (
          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {rider && (
              <div className="p-3 rounded-[var(--radius-lg)] border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Bike className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal dark:text-zinc-100">{rider.name}</p>
                    <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">{rider.id}</p>
                    <p className="text-[11px] text-graphite dark:text-zinc-400 mt-0.5">★ {rider.rating} · {rider.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {orderResults.length === 0 ? (
              <p className="text-sm text-graphite dark:text-zinc-400 text-center py-4">
                No orders found for &quot;{query}&quot;
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
                    className="w-full flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-border hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-left gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Package className="h-4 w-4 text-graphite shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm font-mono font-semibold text-charcoal dark:text-zinc-100">{o.id}</span>
                        <p className="text-xs text-graphite dark:text-zinc-400 mt-0.5 truncate">{o.customer} · {o.address}</p>
                        {o.riderId && (
                          <p className="text-[11px] mt-0.5">
                            <span className="font-mono text-emerald-700 dark:text-emerald-400">{o.riderId}</span>
                            {o.riderName && (
                              <span className="text-graphite dark:text-zinc-400"> · {o.riderName}</span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(o.status)} className="shrink-0">{getStatusLabel(o.status)}</Badge>
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
              <p className="text-sm">Search by rider ID or rider name</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOCK_RIDERS.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setQuery(r.id)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-emerald-500 transition-colors text-left"
                >
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">{r.id}</span>
                  <span className="text-graphite dark:text-zinc-400 ml-1">· {r.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
