import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'
import { MapPinPicker } from '../../../components/ui/MapPinPicker'

export function StoreInfo() {
  const { store, setStore } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!store.storeName.trim()) e.storeName = 'Store name is required'
    if (!store.storeCode.trim()) e.storeCode = 'Store code is required'
    if (!store.storeAddress.trim()) e.storeAddress = 'Store address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Set up your store
          </h1>
          <p className="text-graphite">Store setup takes less than 60 seconds.</p>
        </div>

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Store Name"
              placeholder="e.g. Koramangala Flagship"
              value={store.storeName}
              onChange={(e) => setStore({ storeName: e.target.value })}
              error={errors.storeName}
            />
            <Input
              label="Store Code"
              placeholder="e.g. KRM-01"
              hint="Unique identifier for this location"
              value={store.storeCode}
              onChange={(e) => setStore({ storeCode: e.target.value.toUpperCase() })}
              error={errors.storeCode}
            />
          </div>
          <Input
            label="Store Address"
            placeholder="Full store address"
            value={store.storeAddress}
            onChange={(e) => setStore({ storeAddress: e.target.value })}
            error={errors.storeAddress}
          />

          <MapPinPicker height="h-32" />

          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">Operating Hours</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="time"
                  value={store.openTime}
                  onChange={(e) => setStore({ openTime: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-[var(--radius-md)] border border-border-strong text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                />
              </div>
              <span className="text-graphite text-sm">to</span>
              <div className="flex-1">
                <input
                  type="time"
                  value={store.closeTime}
                  onChange={(e) => setStore({ closeTime: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-[var(--radius-md)] border border-border-strong text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-graphite">
              {formatTime(store.openTime)} → {formatTime(store.closeTime)}
            </p>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={() => { if (validate()) navigate('/auth/store/login') }}>
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
}
