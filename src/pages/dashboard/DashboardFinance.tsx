import { useMemo } from 'react'
import { IndianRupee, Clock, CheckCircle, Banknote } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'

export function DashboardFinance() {
  const { orders, activeStore } = useOnboarding()

  const storeOrders = useMemo(
    () => orders.filter((o) => o.storeId === activeStore.id),
    [orders, activeStore.id]
  )

  const pending = storeOrders.filter((o) => o.paymentStatus === 'pending')
  const remitted = storeOrders.filter((o) => o.paymentStatus === 'remitted')
  const codOrders = storeOrders.filter((o) => o.cod > 0)

  const pendingTotal = pending.reduce((s, o) => s + o.cost + o.cod, 0)
  const remittedTotal = remitted.reduce((s, o) => s + o.cost, 0)
  const codPending = codOrders.filter((o) => o.paymentStatus === 'pending').reduce((s, o) => s + o.cod, 0)
  const codCollected = codOrders.filter((o) => o.paymentStatus === 'remitted').reduce((s, o) => s + o.cod, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-charcoal tracking-tight">Finance</h1>
        <p className="mt-1 text-sm text-graphite">{activeStore.storeName} · Payments & COD</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Payments', value: `₹${pendingTotal.toLocaleString('en-IN')}`, icon: Clock, count: pending.length },
          { label: 'Remitted', value: `₹${remittedTotal.toLocaleString('en-IN')}`, icon: CheckCircle, count: remitted.length },
          { label: 'COD Pending', value: `₹${codPending.toLocaleString('en-IN')}`, icon: Banknote, count: codOrders.filter((o) => o.paymentStatus === 'pending').length },
          { label: 'COD Collected', value: `₹${codCollected.toLocaleString('en-IN')}`, icon: IndianRupee, count: codOrders.filter((o) => o.paymentStatus === 'remitted').length },
        ].map((m) => (
          <Card key={m.label} padding="md" className="space-y-3">
            <m.icon className="h-4 w-4 text-graphite" />
            <div>
              <p className="text-2xl font-semibold text-charcoal tracking-tight">{m.value}</p>
              <p className="text-xs text-graphite mt-0.5">{m.label} · {m.count} orders</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-charcoal flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            Pending Payments
          </h2>
          <Card padding="sm" className="divide-y divide-border">
            {pending.length === 0 ? (
              <p className="px-4 py-8 text-sm text-graphite text-center">No pending payments.</p>
            ) : (
              pending.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <span className="text-sm font-mono font-medium text-charcoal">{o.id}</span>
                    <p className="text-xs text-graphite mt-0.5">{o.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal">₹{o.cost + o.cod}</p>
                    <Badge variant="warning" className="mt-1">Pending</Badge>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Remitted */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-charcoal flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            Remitted Payments
          </h2>
          <Card padding="sm" className="divide-y divide-border">
            {remitted.length === 0 ? (
              <p className="px-4 py-8 text-sm text-graphite text-center">No remitted payments yet.</p>
            ) : (
              remitted.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <span className="text-sm font-mono font-medium text-charcoal">{o.id}</span>
                    <p className="text-xs text-graphite mt-0.5">{o.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal">₹{o.cost}</p>
                    <Badge variant="success" className="mt-1">Remitted</Badge>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>

      {/* COD Details */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-charcoal flex items-center gap-2">
          <Banknote className="h-4 w-4 text-accent" />
          COD Details
        </h2>
        <Card padding="sm" className="divide-y divide-border">
          {codOrders.length === 0 ? (
            <p className="px-4 py-8 text-sm text-graphite text-center">No COD orders for this store.</p>
          ) : (
            codOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-4 py-3.5">
                <div>
                  <span className="text-sm font-mono font-medium text-charcoal">{o.id}</span>
                  <p className="text-xs text-graphite mt-0.5">{o.customer} · {o.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal">₹{o.cod}</p>
                  <Badge variant={o.paymentStatus === 'remitted' ? 'success' : 'warning'}>
                    {o.paymentStatus === 'remitted' ? 'Collected' : 'Pending collection'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  )
}
