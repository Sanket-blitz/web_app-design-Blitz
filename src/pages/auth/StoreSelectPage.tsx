import { useNavigate } from 'react-router-dom'
import { Plus, Store, MapPin, Check } from 'lucide-react'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useOnboarding } from '../../context/OnboardingContext'
import { cn } from '../../lib/utils'

export function StoreSelectPage() {
  const { stores, activeStoreId, setActiveStoreId, company, userName } = useOnboarding()
  const navigate = useNavigate()
  const orgName = company.brandName || company.registeredName || 'Your Organization'

  const handleSelect = (id: string) => {
    setActiveStoreId(id)
    const store = stores.find((s) => s.id === id)
    if (store) {
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm text-graphite">{orgName}</p>
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Select a store, {userName}
          </h1>
          <p className="text-graphite">
            Choose a store to manage or add a new location to your organization.
          </p>
        </div>

        <div className="space-y-3">
          {stores.map((s) => (
            <Card
              key={s.id}
              hover
              selected={activeStoreId === s.id}
              padding="md"
              onClick={() => setActiveStoreId(s.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveStoreId(s.id)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'h-11 w-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-colors',
                  activeStoreId === s.id ? 'bg-accent text-white' : 'bg-surface text-charcoal'
                )}>
                  <Store className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-charcoal">{s.storeName}</h3>
                    <span className="text-xs font-mono text-graphite">{s.storeCode}</span>
                  </div>
                  <p className="text-sm text-graphite truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {s.storeAddress}
                  </p>
                </div>
                {activeStoreId === s.id && (
                  <div className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </Card>
          ))}

          <Card
            hover
            padding="md"
            onClick={() => navigate('/auth/store')}
            className="cursor-pointer border-dashed"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/auth/store')}
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-[var(--radius-lg)] bg-surface text-graphite flex items-center justify-center shrink-0">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">Add New Store</h3>
                <p className="text-sm text-graphite">Set up a new location in under 60 seconds.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="success">{stores.length} stores active</Badge>
          <Button size="lg" disabled={!activeStoreId} onClick={() => handleSelect(activeStoreId)}>
            Open Dashboard
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
