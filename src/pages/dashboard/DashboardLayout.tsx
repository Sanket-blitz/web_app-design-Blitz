import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Bell, Plus, Search, ChevronDown } from 'lucide-react'
import { BlitzLogo } from '../../components/layout/BlitzLogo'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { StoreSwitcherModal } from '../../components/dashboard/StoreSwitcherModal'
import { OrderSearchModal } from '../../components/dashboard/OrderSearchModal'
import { useOnboarding } from '../../context/OnboardingContext'
import { DashboardHome } from './DashboardHome.tsx'
import { DashboardOrders } from './DashboardOrders.tsx'
import { DashboardFinance } from './DashboardFinance.tsx'
import { OrderTimelineModal } from '../../components/dashboard/OrderTimelineModal'
import { FloatingCreateButton } from '../../components/dashboard/FloatingCreateButton'
import { Button } from '../../components/ui/Button'
import type { Order } from '../../lib/orders'
import { cn } from '../../lib/utils'

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'orders', label: 'Orders' },
  { id: 'finance', label: 'Finance' },
] as const

type TabId = (typeof tabs)[number]['id']

export function DashboardLayout() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = (searchParams.get('tab') as TabId) || 'home'
  const { activeStore, userName, updateOrder } = useOnboarding()
  const [storeSwitcherOpen, setStoreSwitcherOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const setTab = (id: TabId) => setSearchParams({ tab: id })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (
        e.key === 'n' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        navigate('/dashboard/create')
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate])

  return (
    <div className="min-h-screen bg-off-white dark:bg-off-white">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-white/5 backdrop-blur-md border-b border-border dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <BlitzLogo />
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-[var(--radius-md)] transition-colors',
                    tab === t.id
                      ? 'font-medium text-charcoal bg-surface'
                      : 'text-graphite hover:text-charcoal hover:bg-surface'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden md:inline-flex" onClick={() => navigate('/dashboard/create')}>
              <Plus className="h-4 w-4" /> Create Delivery
            </Button>
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-[var(--radius-md)] border border-border dark:border-white/10 bg-white dark:bg-white/5 text-sm text-graphite dark:text-zinc-400 hover:border-border-strong dark:hover:border-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search orders</span>
              <kbd className="text-xs bg-surface dark:bg-white/10 dark:text-zinc-400 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            <ThemeToggle showLabels className="hidden lg:flex" />
            <ThemeToggle className="lg:hidden" />
            <button className="h-9 w-9 rounded-[var(--radius-md)] border border-border dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-graphite dark:text-zinc-400 hover:text-charcoal dark:hover:text-zinc-200 dark:hover:bg-white/10 transition-colors relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <button
              onClick={() => setStoreSwitcherOpen(true)}
              className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-[var(--radius-md)] border border-border dark:border-white/10 bg-white dark:bg-white/5 hover:border-border-strong dark:hover:border-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <div className="h-6 w-6 rounded-full bg-accent-soft text-accent text-xs font-semibold flex items-center justify-center">
                {userName[0]}
              </div>
              <span className="text-sm font-medium text-charcoal dark:text-zinc-200 hidden sm:inline max-w-[140px] truncate">
                {activeStore.storeName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-graphite" />
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-t border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex-1 py-2.5 text-sm text-center transition-colors',
                tab === t.id ? 'font-medium text-accent border-b-2 border-accent' : 'text-graphite'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'home' && <DashboardHome onSelectOrder={setSelectedOrder} onOpenSearch={() => setSearchOpen(true)} />}
        {tab === 'orders' && <DashboardOrders onSelectOrder={setSelectedOrder} />}
        {tab === 'finance' && <DashboardFinance />}
      </main>

      <StoreSwitcherModal open={storeSwitcherOpen} onClose={() => setStoreSwitcherOpen(false)} />
      <OrderSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onSelectOrder={setSelectedOrder} />
      <OrderTimelineModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onCancel={(id) => updateOrder(id, { status: 'cancelled' })}
      />
      <FloatingCreateButton />
    </div>
  )
}
