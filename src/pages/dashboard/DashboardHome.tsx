import { useState, useMemo } from 'react'
import {
  Package,
  Truck,
  CheckCircle,
  RotateCcw,
  Plus,
  Upload,
  MapPin,
  Headphones,
  Activity,
  Timer,
  Shield,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Stat } from '../../components/ui/Stat'
import { Modal } from '../../components/ui/Modal'
import { CreateDeliveryModal } from '../../components/dashboard/CreateDeliveryModal'
import { BulkUploadModal } from '../../components/dashboard/BulkUploadModal'
import { TrackOrderModal } from '../../components/dashboard/TrackOrderModal'
import { StoreSwitcherModal } from '../../components/dashboard/StoreSwitcherModal'
import { useOnboarding } from '../../context/OnboardingContext'
import { getStatusLabel, getStatusVariant, type Order } from '../../lib/orders'

interface DashboardHomeProps {
  onSelectOrder: (order: Order) => void
  onOpenSearch: () => void
}

export function DashboardHome({ onSelectOrder, onOpenSearch }: DashboardHomeProps) {
  const { activeStore, userName, orders } = useOnboarding()
  const [deliveryOpen, setDeliveryOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [trackOpen, setTrackOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [storeSwitcherOpen, setStoreSwitcherOpen] = useState(false)

  const storeOrders = useMemo(
    () => orders.filter((o) => o.storeId === activeStore.id),
    [orders, activeStore.id]
  )

  const stats = useMemo(() => ({
    total: storeOrders.length,
    inTransit: storeOrders.filter((o) => o.status === 'ongoing').length,
    delivered: storeOrders.filter((o) => o.status === 'delivered').length,
    returns: storeOrders.filter((o) => o.status === 'returned').length,
  }), [storeOrders])

  const recent = storeOrders.slice(0, 5)

  const quickActions = [
    { label: 'Add Order', icon: Plus, primary: true, action: () => setDeliveryOpen(true) },
    { label: 'Bulk Upload', icon: Upload, primary: false, action: () => setBulkOpen(true) },
    { label: 'Track Order', icon: MapPin, primary: false, action: () => setTrackOpen(true) },
    { label: 'Support', icon: Headphones, primary: false, action: () => setSupportOpen(true) },
  ]

  const healthMetrics = [
    { label: 'Operating Status', value: 'Open', variant: 'success' as const },
    { label: 'Avg. Fulfillment Time', value: '38 min' },
    { label: 'SLA Adherence', value: '96.2%' },
    { label: 'Active Deliveries', value: String(stats.inTransit) },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-3xl font-semibold text-charcoal dark:text-charcoal tracking-tight">
            Good afternoon, {userName}
          </h1>
          <p className="mt-2 text-sm text-graphite dark:text-graphite">{activeStore.storeName} · Today</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStoreSwitcherOpen(true)}>
          Switch Store
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          label="Overall Orders"
          value={stats.total}
          icon={<Package className="h-6 w-6" />}
          change={stats.total > 0 ? { value: 12, direction: 'up' } : undefined}
        />
        <Stat
          label="In Transit"
          value={stats.inTransit}
          icon={<Truck className="h-6 w-6" />}
        />
        <Stat
          label="Delivered Today"
          value={stats.delivered}
          icon={<CheckCircle className="h-6 w-6" />}
          change={stats.delivered > 0 ? { value: 8, direction: 'up' } : undefined}
        />
        <Stat
          label="Returns"
          value={stats.returns}
          icon={<RotateCcw className="h-6 w-6" />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-charcoal dark:text-charcoal">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className={`flex items-center gap-4 p-5 rounded-[var(--radius-xl)] border transition-all duration-200 text-left group ${
                  action.primary
                    ? 'bg-charcoal dark:bg-accent text-white border-charcoal dark:border-accent hover:bg-charcoal-soft dark:hover:bg-accent-light shadow-[var(--shadow-md)] dark:shadow-[var(--shadow-lg)]'
                    : 'bg-white dark:bg-white/5 border-border dark:border-white/10 hover:border-border-strong dark:hover:border-white/20 hover:shadow-[var(--shadow-md)] dark:hover:shadow-[var(--shadow-md)]'
                }`}
              >
                <div className={`h-11 w-11 rounded-[var(--radius-lg)] flex items-center justify-center transition-colors ${
                  action.primary ? 'bg-white/10 dark:bg-white/20' : 'bg-surface dark:bg-white/10 group-hover:bg-accent/10 dark:group-hover:bg-white/20'
                }`}>
                  <action.icon className={`h-5 w-5 ${action.primary ? 'text-white' : 'text-charcoal dark:text-charcoal'}`} />
                </div>
                <span className={`text-sm font-semibold ${action.primary ? 'text-white' : 'text-charcoal dark:text-charcoal'}`}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-charcoal dark:text-charcoal">Recent Deliveries</h2>
              <button onClick={onOpenSearch} className="text-sm text-accent dark:text-accent-light hover:text-accent-hover dark:hover:text-accent font-medium transition-colors">
                View all
              </button>
            </div>
            <Card padding="sm" className="divide-y divide-border dark:divide-white/10">
              {recent.length === 0 ? (
                <p className="px-4 py-8 text-sm text-graphite dark:text-graphite text-center">No deliveries yet for this store.</p>
              ) : (
                recent.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelectOrder(d)}
                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-sm font-mono font-medium text-charcoal dark:text-charcoal">{d.id}</span>
                      <span className="text-sm text-graphite dark:text-graphite truncate">{d.customer}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-graphite dark:text-graphite">₹{d.cost}</span>
                      <span className="text-xs text-graphite dark:text-graphite">{d.timeTaken ? `${d.timeTaken} min` : d.eta || '—'}</span>
                      <Badge variant={getStatusVariant(d.status)}>{getStatusLabel(d.status)}</Badge>
                    </div>
                  </button>
                ))
              )}
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-charcoal dark:text-charcoal">Store Health</h2>
          <Card padding="lg" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success-soft dark:bg-success/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-success dark:text-success-light" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal dark:text-charcoal">All systems operational</p>
                <p className="text-xs text-graphite dark:text-graphite">Last checked 2 min ago</p>
              </div>
            </div>
            <div className="space-y-4">
              {healthMetrics.map((h) => (
                <div key={h.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-graphite dark:text-graphite">
                    {h.label === 'Avg. Fulfillment Time' && <Timer className="h-3.5 w-3.5" />}
                    {h.label === 'SLA Adherence' && <Shield className="h-3.5 w-3.5" />}
                    {h.label}
                  </div>
                  {h.variant ? (
                    <Badge variant={h.variant}>{h.value}</Badge>
                  ) : (
                    <span className="text-sm font-semibold text-charcoal dark:text-charcoal">{h.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-graphite dark:text-graphite mb-2">
                <span>Today's capacity</span>
                <span>{stats.total} / 80</span>
              </div>
              <div className="h-2 bg-surface dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent-light dark:from-accent-light dark:to-accent rounded-full transition-all" style={{ width: `${Math.min((stats.total / 80) * 100, 100)}%` }} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CreateDeliveryModal open={deliveryOpen} onClose={() => setDeliveryOpen(false)} />
      <BulkUploadModal open={bulkOpen} onClose={() => setBulkOpen(false)} />
      <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} onFound={onSelectOrder} />
      <StoreSwitcherModal open={storeSwitcherOpen} onClose={() => setStoreSwitcherOpen(false)} />
      <Modal open={supportOpen} onClose={() => setSupportOpen(false)} title="Contact Support" size="sm">
        <div className="space-y-4 text-sm">
          <p className="text-graphite">Our operations team is available 7 AM – 11 PM IST.</p>
          <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-border space-y-2">
            <div className="flex justify-between"><span className="text-graphite">Phone</span><span className="font-medium text-charcoal">1800-BLITZ-OPS</span></div>
            <div className="flex justify-between"><span className="text-graphite">Email</span><span className="font-medium text-charcoal">ops@blitz.fulfillment</span></div>
            <div className="flex justify-between"><span className="text-graphite">Avg. response</span><span className="font-medium text-charcoal">4 min</span></div>
          </div>
          <Button className="w-full" onClick={() => setSupportOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  )
}
