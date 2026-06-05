import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { BlitzLogo } from '../../components/layout/BlitzLogo'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { StoreSwitcherModal } from '../../components/dashboard/StoreSwitcherModal'
import { OrderSearchModal } from '../../components/dashboard/OrderSearchModal'
import { useOnboarding } from '../../context/OnboardingContext'
import { DashboardHome } from './DashboardHome'
import { DashboardOrders } from './DashboardOrders'
import { DashboardFinance } from './DashboardFinance'
import { OrderTimelineModal } from '../../components/dashboard/OrderTimelineModal'
import type { Order } from '../../lib/orders'
import { cn } from '../../lib/utils'

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'orders', label: 'Orders' },
  { id: 'finance', label: 'Finance' },
] as const

type TabId = (typeof tabs)[number]['id']

export function DashboardLayout() {
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
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

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
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-[var(--radius-md)] border border-border bg-white text-sm text-graphite hover:border-border-strong transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search orders</span>
              <kbd className="text-xs bg-surface px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            <ThemeToggle showLabels className="hidden lg:flex" />
            <ThemeToggle className="lg:hidden" />
            <button className="h-9 w-9 rounded-[var(--radius-md)] border border-border bg-white flex items-center justify-center text-graphite hover:text-charcoal transition-colors relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <button
              onClick={() => setStoreSwitcherOpen(true)}
              className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-[var(--radius-md)] border border-border bg-white hover:border-border-strong transition-colors"
            >
              <div className="h-6 w-6 rounded-full bg-accent-soft text-accent text-xs font-semibold flex items-center justify-center">
                {userName[0]}
              </div>
              <span className="text-sm font-medium text-charcoal hidden sm:inline max-w-[140px] truncate">
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
    </div>
  )
}
