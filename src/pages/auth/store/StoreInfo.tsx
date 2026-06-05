import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { MapPinPicker } from '../../../components/ui/MapPinPicker'
import { useOnboarding } from '../../../context/OnboardingContext'
import { cn } from '../../../lib/utils'

const FORM_ID = 'store-info-form'

const timeInputClass = cn(
  'w-full h-11 px-3.5 rounded-[var(--radius-md)] border text-sm transition-all',
  'bg-white dark:bg-white/5 text-charcoal dark:text-zinc-100',
  'border-border-strong dark:border-white/20',
  'focus:border-accent dark:focus:border-accent-light focus:ring-2 focus:ring-accent/20 focus:outline-none'
)

export function StoreInfo() {
  const { store, setStore } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')

    const data = new FormData(event.currentTarget)
    const storeName = String(data.get('storeName') ?? '').trim()
    const storeCode = String(data.get('storeCode') ?? '').trim()
    const storeAddress = String(data.get('storeAddress') ?? '').trim()

    const e: Record<string, string> = {}
    if (!storeName) e.storeName = 'Store name is required'
    if (!storeCode) e.storeCode = 'Store code is required'
    if (!storeAddress) e.storeAddress = 'Store address is required'
    setErrors(e)

    if (Object.keys(e).length > 0) {
      setSubmitError('Please complete all required fields to continue.')
      const firstKey = Object.keys(e)[0]
      const fieldIds: Record<string, string> = {
        storeName: 'store-name',
        storeCode: 'store-code',
        storeAddress: 'store-address',
      }
      document.getElementById(fieldIds[firstKey])?.focus()
      return
    }

    setStore({ storeName, storeCode, storeAddress })
    navigate('/auth/store/login')
  }

  return (
    <AuthLayout>
      <form id={FORM_ID} onSubmit={handleContinue} className="space-y-8 pb-28">
        {/* sticky footer lives inside the form so the button submits natively */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal dark:text-zinc-100 tracking-tight">
            Set up your store
          </h1>
          <p className="text-graphite dark:text-zinc-400">Store setup takes less than 60 seconds.</p>
        </div>

        {submitError && (
          <Alert type="error" title="Missing information">
            {submitError}
          </Alert>
        )}

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              id="store-name"
              name="storeName"
              label="Store Name"
              placeholder="e.g. Koramangala Flagship"
              defaultValue={store.storeName}
              onChange={(e) => setStore({ storeName: e.target.value })}
              error={errors.storeName}
              autoComplete="organization"
            />
            <Input
              id="store-code"
              name="storeCode"
              label="Store Code"
              placeholder="e.g. KRM-01"
              hint="Unique identifier for this location"
              defaultValue={store.storeCode}
              onChange={(e) => setStore({ storeCode: e.target.value.toUpperCase() })}
              error={errors.storeCode}
              autoComplete="off"
            />
          </div>
          <Input
            id="store-address"
            name="storeAddress"
            label="Store Address"
            placeholder="Full store address with pincode"
            defaultValue={store.storeAddress}
            onChange={(e) => setStore({ storeAddress: e.target.value })}
            error={errors.storeAddress}
            autoComplete="street-address"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal dark:text-zinc-200">
              Store location on map
            </label>
            <p className="text-xs text-graphite dark:text-zinc-400">
              Click the map or use Adjust to set your store pin.
            </p>
            <div data-map-picker className="map-picker-shell h-44">
              <MapPinPicker height="h-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-zinc-200 mb-3">
              Operating Hours
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="time"
                  name="openTime"
                  defaultValue={store.openTime}
                  onChange={(e) => setStore({ openTime: e.target.value })}
                  className={timeInputClass}
                />
              </div>
              <span className="text-graphite dark:text-zinc-400 text-sm">to</span>
              <div className="flex-1">
                <input
                  type="time"
                  name="closeTime"
                  defaultValue={store.closeTime}
                  onChange={(e) => setStore({ closeTime: e.target.value })}
                  className={timeInputClass}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-graphite dark:text-zinc-400">
              {formatTime(store.openTime)} → {formatTime(store.closeTime)}
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-[200] border-t border-border dark:border-zinc-700 bg-off-white/95 dark:bg-[#141416]/95 backdrop-blur-md px-6 py-4">
          <div className="max-w-xl mx-auto">
            <Button type="submit" className="w-full" size="lg">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
}
