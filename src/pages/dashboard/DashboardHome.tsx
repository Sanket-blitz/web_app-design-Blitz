import { useState, useMemo, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
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
  IndianRupee,
  TrendingUp,
  Radio,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Stat } from '../../components/ui/Stat'
import { Modal } from '../../components/ui/Modal'
import { EmptyState } from '../../components/ui/EmptyState'
import { BulkUploadModal } from '../../components/dashboard/BulkUploadModal'
import { TrackOrderModal } from '../../components/dashboard/TrackOrderModal'
import { StoreSwitcherModal } from '../../components/dashboard/StoreSwitcherModal'
import { EmptyOrdersIllustration } from '../../components/illustrations/EmptyOrdersIllustration'
import { useOnboarding } from '../../context/OnboardingContext'
import {
  getStatusLabel,
  getStatusVariant,
  getServiceLabel,
  getOrderAmount,
  isActiveStatus,
  type Order,
} from '../../lib/orders'

interface DashboardHomeProps {
  onSelectOrder: (order: Order) => void
  onOpenSearch: () => void
}

function isToday(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  return d.toDateString() === now.toDateString()
}

export function DashboardHome({ onSelectOrder, onOpenSearch }: DashboardHomeProps) {
  const navigate = useNavigate()
  const { activeStore, userName, orders, stores } = useOnboarding()
  const [bulkOpen, setBulkOpen] = useState(false)
  const [trackOpen, setTrackOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [storeSwitcherOpen, setStoreSwitcherOpen] = useState(false)

  const storeOrders = useMemo(
    () => orders.filter((o) => o.storeId === activeStore.id),
    [orders, activeStore.id]
  )

  const todayOrders = useMemo(() => storeOrders.filter((o) => isToday(o.createdAt)), [storeOrders])
  const liveDeliveries = useMemo(
    () => storeOrders.filter((o) => isActiveStatus(o.status) && o.status !== 'created'),
    [storeOrders]
  )
  const pendingCod = useMemo(
    () => storeOrders.filter((o) => o.cod > 0 && o.paymentStatus === 'pending'),
    [storeOrders]
  )
  const pendingCodTotal = pendingCod.reduce((s, o) => s + o.cod, 0)

  const stats = useMemo(() => ({
    total: storeOrders.length,
    inTransit: storeOrders.filter((o) => ['ongoing', 'in_transit', 'picked_up'].includes(o.status)).length,
    delivered: todayOrders.filter((o) => o.status === 'delivered').length,
    returns: storeOrders.filter((o) => o.status === 'returned').length,
  }), [storeOrders, todayOrders])

  const recent = storeOrders.slice(0, 5)

  const topStore = useMemo(() => {
    const counts = stores.map((s) => ({
      name: s.storeName,
      count: orders.filter((o) => o.storeId === s.id && isToday(o.createdAt)).length,
    }))
    return counts.sort((a, b) => b.count - a.count)[0]
  }, [stores, orders])

  const quickActions = [
    { label: 'Create Delivery', icon: Plus, primary: true, action: () => navigate('/dashboard/create') },
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
        <div className="flex gap-2">
          <Button size="sm" onClick={() => navigate('/dashboard/create')}>
            <Plus className="h-4 w-4" /> Create Delivery
          </Button>
          <Button variant="outline" size="sm" onClick={() => setStoreSwitcherOpen(true)}>
            Switch Store
          </Button>
        </div>
      </div>

      {storeOrders.length === 0 && (
        <Card padding="lg">
          <EmptyState
            icon={<EmptyOrdersIllustration className="h-16 w-16" />}
            title="Your first delivery is just a few clicks away."
            description="Create a delivery in under 30 seconds with smart defaults and live pricing."
            action={{ label: 'Create Delivery', onClick: () => navigate('/dashboard/create') }}
          />
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Overall Orders" value={stats.total} icon={<Package className="h-6 w-6" />} />
        <Stat label="In Transit" value={stats.inTransit} icon={<Truck className="h-6 w-6" />} />
        <Stat label="Delivered Today" value={stats.delivered} icon={<CheckCircle className="h-6 w-6" />} />
        <Stat label="Returns" value={stats.returns} icon={<RotateCcw className="h-6 w-6" />} />
      </div>

      {/* Widget row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Today's Orders" icon={<Package className="h-4 w-4" />} value={String(todayOrders.length)} sub="Created today" />
        <WidgetCard title="Live Deliveries" icon={<Radio className="h-4 w-4" />} value={String(liveDeliveries.length)} sub="In progress" accent />
        <WidgetCard title="Pending COD" icon={<IndianRupee className="h-4 w-4" />} value={`₹${pendingCodTotal.toLocaleString('en-IN')}`} sub={`${pendingCod.length} orders`} />
        <WidgetCard title="Top Store Today" icon={<TrendingUp className="h-4 w-4" />} value={topStore?.name.split(' ')[0] ?? '—'} sub={`${topStore?.count ?? 0} orders`} />
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
                    ? 'bg-slate dark:bg-accent text-pure-white border-slate dark:border-accent hover:bg-slate-soft dark:hover:bg-accent-hover shadow-[var(--shadow-md)]'
                    : 'bg-white dark:bg-white/5 border-border dark:border-white/10 hover:border-border-strong dark:hover:border-white/20 hover:shadow-[var(--shadow-md)]'
                }`}
              >
                <div className={`h-11 w-11 rounded-[var(--radius-lg)] flex items-center justify-center transition-colors ${
                  action.primary ? 'bg-white/10' : 'bg-surface dark:bg-white/10 group-hover:bg-accent/10'
                }`}>
                  <action.icon className={`h-5 w-5 ${action.primary ? 'text-pure-white' : 'text-charcoal dark:text-charcoal'}`} />
                </div>
                <span className={`text-sm font-semibold ${action.primary ? 'text-pure-white' : 'text-charcoal dark:text-charcoal'}`}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-charcoal dark:text-charcoal">Recent Orders</h2>
              <button onClick={onOpenSearch} className="text-sm text-accent dark:text-accent-light hover:text-accent-hover font-medium transition-colors">
                View all
              </button>
            </div>
            <Card padding="sm" className="divide-y divide-border dark:divide-white/10">
              {recent.length === 0 ? (
                <p className="px-4 py-8 text-sm text-graphite text-center">No deliveries yet for this store.</p>
              ) : (
                recent.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelectOrder(d)}
                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-sm font-mono font-medium text-charcoal">{d.id}</span>
                      <span className="text-sm text-graphite truncate">{d.customer}</span>
                      {d.sku && <span className="text-xs text-graphite hidden sm:inline">{d.sku}</span>}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-graphite">₹{getOrderAmount(d)}</span>
                      <span className="text-xs text-graphite">{d.eta || '—'}</span>
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
                <p className="text-sm font-semibold text-charcoal">All systems operational</p>
                <p className="text-xs text-graphite">Last checked 2 min ago</p>
              </div>
            </div>
            <div className="space-y-4">
              {healthMetrics.map((h) => (
                <div key={h.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-graphite">
                    {h.label === 'Avg. Fulfillment Time' && <Timer className="h-3.5 w-3.5" />}
                    {h.label === 'SLA Adherence' && <Shield className="h-3.5 w-3.5" />}
                    {h.label}
                  </div>
                  {h.variant ? (
                    <Badge variant={h.variant}>{h.value}</Badge>
                  ) : (
                    <span className="text-sm font-semibold text-charcoal">{h.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-graphite mb-2">
                <span>Today's capacity</span>
                <span>{todayOrders.length} / 80</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all" style={{ width: `${Math.min((todayOrders.length / 80) * 100, 100)}%` }} />
              </div>
            </div>
          </Card>

          {liveDeliveries.length > 0 && (
            <Card padding="md" className="space-y-3">
              <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Live Deliveries
              </h3>
              {liveDeliveries.slice(0, 3).map((o) => (
                <button key={o.id} onClick={() => onSelectOrder(o)} className="w-full text-left text-sm hover:bg-surface dark:hover:bg-white/5 p-2 rounded-[var(--radius-md)] transition-colors">
                  <span className="font-mono text-charcoal">{o.id}</span>
                  <span className="text-graphite ml-2">{o.customer}</span>
                  <span className="text-xs text-graphite block mt-0.5">{getServiceLabel(o)} · {o.eta}</span>
                </button>
              ))}
            </Card>
          )}
        </div>
      </div>

      <BulkUploadModal open={bulkOpen} onClose={() => setBulkOpen(false)} />
      <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} onFound={onSelectOrder} />
      <StoreSwitcherModal open={storeSwitcherOpen} onClose={() => setStoreSwitcherOpen(false)} />
      <Modal open={supportOpen} onClose={() => setSupportOpen(false)} title="Contact Support" size="sm">
        <div className="space-y-4 text-sm">
          <p className="text-graphite">Our operations team is available 7 AM – 11 PM IST.</p>
          <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-border space-y-2">
            <div className="flex justify-between"><span className="text-graphite">Phone</span><span className="font-medium text-charcoal">1800-BLITZ-OPS</span></div>
            <div className="flex justify-between"><span className="text-graphite">Email</span><span className="font-medium text-charcoal">ops@blitz.fulfillment</span></div>
          </div>
          <Button className="w-full" onClick={() => setSupportOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  )
}

function WidgetCard({
  title,
  icon,
  value,
  sub,
  accent,
}: {
  title: string
  icon: ReactNode
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <Card padding="md" className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-medium text-graphite">
        {icon}
        {title}
      </div>
      <p className={`text-2xl font-semibold ${accent ? 'text-accent' : 'text-charcoal'}`}>{value}</p>
      <p className="text-xs text-graphite">{sub}</p>
    </Card>
  )
}
