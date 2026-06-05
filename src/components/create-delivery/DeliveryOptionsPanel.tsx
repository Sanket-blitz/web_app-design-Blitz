import { motion } from 'framer-motion'
import { Clock, Sparkles, Zap } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Skeleton } from '../ui/Skeleton'
import { cn } from '../../lib/utils'
import type { DeliveryOption, ServiceabilityResult } from '../../lib/deliveryIntel'

interface DeliveryOptionsPanelProps {
  loading: boolean
  serviceability: ServiceabilityResult | null
  selectedId: 'fastest' | 'same_day' | null
  onSelect: (id: 'fastest' | 'same_day') => void
  addressReady: boolean
}

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: DeliveryOption
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-[var(--radius-xl)] border-2 transition-all duration-200',
        selected
          ? 'border-accent bg-accent-soft/50 shadow-[var(--shadow-md)] ring-1 ring-accent/20'
          : 'border-border hover:border-border-strong hover:bg-surface/50'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {option.id === 'fastest' ? (
            <Zap className={cn('h-4 w-4', selected ? 'text-accent' : 'text-graphite')} />
          ) : (
            <Clock className={cn('h-4 w-4', selected ? 'text-accent' : 'text-graphite')} />
          )}
          <span className="text-sm font-semibold text-charcoal">{option.label}</span>
        </div>
        {option.recommended && <Badge variant="accent">Recommended</Badge>}
      </div>
      <p className="mt-2 text-lg font-semibold text-charcoal">₹{option.price}</p>
      <p className="text-sm text-graphite mt-0.5">ETA: {option.eta}</p>
      <p className="text-xs text-graphite mt-2">{option.description}</p>
    </button>
  )
}

export function DeliveryOptionsPanel({
  loading,
  serviceability,
  selectedId,
  onSelect,
  addressReady,
}: DeliveryOptionsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-charcoal">Delivery Options</h3>
      </div>

      {!addressReady && (
        <div className="p-4 rounded-[var(--radius-xl)] border border-dashed border-border text-sm text-graphite text-center">
          Enter address to see live pricing
        </div>
      )}

      {addressReady && loading && (
        <div className="space-y-3">
          <p className="text-sm text-graphite animate-pulse">Calculating best route…</p>
          <Skeleton className="h-28 w-full rounded-[var(--radius-xl)]" />
          <Skeleton className="h-28 w-full rounded-[var(--radius-xl)]" />
        </div>
      )}

      {addressReady && !loading && serviceability && !serviceability.serviceable && (
        <div className="p-4 rounded-[var(--radius-xl)] border border-warning/30 bg-warning-soft text-sm text-warning">
          Address not serviceable yet. Check pincode and try a nearby landmark.
        </div>
      )}

      {addressReady && !loading && serviceability?.serviceable && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between text-xs text-graphite">
            <span>Zone: {serviceability.zone}</span>
            <span className="capitalize">{serviceability.confidence} confidence · {serviceability.distanceKm} km</span>
          </div>
          {serviceability.options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={selectedId === opt.id}
              onSelect={() => onSelect(opt.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
