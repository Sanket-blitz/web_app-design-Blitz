import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { ProgressIndicator } from '../../../components/ui/ProgressIndicator'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'
import { PINCODE_DATA } from '../../../lib/utils'
import { MapPinPicker } from '../../../components/ui/MapPinPicker'

export function BusinessAddress() {
  const { company, setCompany } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pinLoading, setPinLoading] = useState(false)

  useEffect(() => {
    if (company.pincode.length === 6) {
      setPinLoading(true)
      const timer = setTimeout(() => {
        const data = PINCODE_DATA[company.pincode]
        if (data) setCompany({ city: data.city, state: data.state })
        setPinLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [company.pincode])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!company.addressLine1.trim()) e.addressLine1 = 'Address is required'
    if (!company.city.trim()) e.city = 'City is required'
    if (!company.state.trim()) e.state = 'State is required'
    if (!company.pincode.trim()) e.pincode = 'Pincode is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <AuthLayout
      progress={
        <ProgressIndicator currentStep={4} totalSteps={4} minutesLeft={1} />
      }
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Business address
          </h1>
          <p className="text-graphite">Your registered office location.</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Address Line 1"
            placeholder="Street address"
            value={company.addressLine1}
            onChange={(e) => setCompany({ addressLine1: e.target.value })}
            error={errors.addressLine1}
          />
          <Input
            label="Address Line 2"
            placeholder="Suite, floor, etc."
            hint="Optional"
            value={company.addressLine2}
            onChange={(e) => setCompany({ addressLine2: e.target.value })}
          />
          <Input
            label="Landmark"
            placeholder="Near..."
            hint="Optional"
            value={company.landmark}
            onChange={(e) => setCompany({ landmark: e.target.value })}
          />
          <div className="grid sm:grid-cols-3 gap-5">
            <Input
              label="Pincode"
              placeholder="560034"
              value={company.pincode}
              onChange={(e) => setCompany({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              error={errors.pincode}
            />
            <Input
              label="City"
              placeholder="Auto-filled"
              value={company.city}
              onChange={(e) => setCompany({ city: e.target.value })}
              error={errors.city}
              success={!!company.city && !pinLoading}
            />
            <Input
              label="State"
              placeholder="Auto-filled"
              value={company.state}
              onChange={(e) => setCompany({ state: e.target.value })}
              error={errors.state}
              success={!!company.state && !pinLoading}
            />
          </div>

          <MapPinPicker />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" size="lg" onClick={() => navigate('/auth/register/bank')}>
            Back
          </Button>
          <Button
            className="flex-1"
            size="lg"
            onClick={() => { if (validate()) navigate('/auth/register/success') }}
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
