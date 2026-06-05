import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Store, MapPin, Check, Trash2 } from 'lucide-react'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { useOnboarding } from '../../context/OnboardingContext'
import { cn } from '../../lib/utils'
import type { Store as StoreType } from '../../lib/stores'

export function StoreSelectPage() {
  const { stores, activeStoreId, setActiveStoreId, deleteStore, company, userName } = useOnboarding()
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState<StoreType | null>(null)
  const orgName = company.brandName || company.registeredName || 'Your Organization'

  const handleSelect = (id: string) => {
    setActiveStoreId(id)
    const store = stores.find((s) => s.id === id)
    if (store) {
      navigate('/dashboard')
    }
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    deleteStore(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm text-graphite dark:text-zinc-400">{orgName}</p>
          <h1 className="text-2xl font-semibold text-charcoal dark:text-zinc-100 tracking-tight">
            Select a store, {userName}
          </h1>
          <p className="text-graphite dark:text-zinc-400">
            Choose a store to manage or add a new location to your organization.
          </p>
        </div>

        <div className="space-y-3">
          {stores.length === 0 && (
            <p className="text-sm text-graphite dark:text-zinc-400 text-center py-6">
              No stores yet. Add your first location below.
            </p>
          )}

          {stores.map((s) => (
            <Card
              key={s.id}
              hover
              selected={activeStoreId === s.id}
              padding="md"
              onClick={() => setActiveStoreId(s.id)}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveStoreId(s.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'h-11 w-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-colors',
                    activeStoreId === s.id ? 'bg-accent text-white' : 'bg-surface dark:bg-zinc-800 text-charcoal dark:text-zinc-200'
                  )}
                >
                  <Store className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-charcoal dark:text-zinc-100">{s.storeName}</h3>
                    <span className="text-xs font-mono text-graphite dark:text-zinc-400">{s.storeCode}</span>
                  </div>
                  <p className="text-sm text-graphite dark:text-zinc-400 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {s.storeAddress}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {activeStoreId === s.id && (
                    <div className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteTarget(s)
                    }}
                    className="h-9 w-9 rounded-[var(--radius-md)] flex items-center justify-center text-graphite dark:text-zinc-400 hover:text-error dark:hover:text-error-light hover:bg-error-soft dark:hover:bg-error/20 transition-colors opacity-70 group-hover:opacity-100"
                    aria-label={`Delete ${s.storeName}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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
              <div className="h-11 w-11 rounded-[var(--radius-lg)] bg-surface dark:bg-zinc-800 text-graphite dark:text-zinc-400 flex items-center justify-center shrink-0">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal dark:text-zinc-100">Add New Store</h3>
                <p className="text-sm text-graphite dark:text-zinc-400">Set up a new location in under 60 seconds.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="success">
            {stores.length} store{stores.length === 1 ? '' : 's'} active
          </Badge>
          <Button size="lg" disabled={!activeStoreId} onClick={() => handleSelect(activeStoreId)}>
            Open Dashboard
          </Button>
        </div>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete store?"
        description={
          deleteTarget
            ? `Remove "${deleteTarget.storeName}" (${deleteTarget.storeCode}) from your organization. This cannot be undone.`
            : undefined
        }
        size="sm"
      >
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="error" className="flex-1" onClick={confirmDelete}>
            Delete Store
          </Button>
        </div>
      </Modal>
    </AuthLayout>
  )
}
