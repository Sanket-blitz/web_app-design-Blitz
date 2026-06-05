import { useNavigate } from 'react-router-dom'
import { Store, Plus, Check, MapPin } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'
import { cn } from '../../lib/utils'

interface StoreSwitcherModalProps {
  open: boolean
  onClose: () => void
}

export function StoreSwitcherModal({ open, onClose }: StoreSwitcherModalProps) {
  const { stores, activeStoreId, setActiveStoreId } = useOnboarding()
  const navigate = useNavigate()

  const handleSwitch = (id: string) => {
    setActiveStoreId(id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Switch Store" description="Select a store to manage." size="md">
      <div className="space-y-2 max-h-[360px] overflow-y-auto">
        {stores.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSwitch(s.id)}
            className={cn(
              'w-full flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border text-left transition-all',
              activeStoreId === s.id
                ? 'border-accent bg-accent-soft/50 ring-2 ring-accent/20'
                : 'border-border hover:border-border-strong hover:bg-surface'
            )}
          >
            <div className={cn(
              'h-10 w-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0',
              activeStoreId === s.id ? 'bg-accent text-white' : 'bg-surface dark:bg-zinc-800 text-charcoal dark:text-zinc-200'
            )}>
              <Store className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal dark:text-zinc-100">{s.storeName}</p>
              <p className="text-xs text-graphite dark:text-zinc-400 flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3" />{s.storeAddress}
              </p>
            </div>
            {activeStoreId === s.id && <Check className="h-4 w-4 text-accent shrink-0" />}
          </button>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={() => { onClose(); navigate('/auth/store') }}
      >
        <Plus className="h-4 w-4" />
        Add New Store
      </Button>
    </Modal>
  )
}
