import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { ProgressIndicator } from '../../../components/ui/ProgressIndicator'
import { Input } from '../../../components/ui/Input'
import { PhoneInput } from '../../../components/ui/PhoneInput'
import { RadioGroup } from '../../../components/ui/RadioGroup'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'

const orderOptions = [
  { value: '0-1000', label: '0 – 1,000' },
  { value: '1000-5000', label: '1,000 – 5,000' },
  { value: '5000-20000', label: '5,000 – 20,000' },
  { value: '20000+', label: '20,000+' },
]

export function CompanyInfo() {
  const { company, setCompany } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!company.brandName.trim()) e.brandName = 'Brand name is required'
    if (!company.registeredName.trim()) e.registeredName = 'Registered name is required'
    if (!company.businessEmail.trim()) e.businessEmail = 'Business email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.businessEmail)) e.businessEmail = 'Enter a valid email'
    if (!company.phone.trim()) e.phone = 'Phone number is required'
    else if (company.phone.length < 10) e.phone = 'Enter a valid 10-digit phone number'
    if (!company.monthlyOrders) e.monthlyOrders = 'Select monthly order volume'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) navigate('/auth/register/kyc')
  }

  return (
    <AuthLayout
      progress={
        <ProgressIndicator currentStep={1} totalSteps={4} minutesLeft={2} />
      }
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Let's get your organization set up.
          </h1>
          <p className="text-graphite">Tell us about your brand.</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Brand Name"
            placeholder="e.g. Urban Thread"
            value={company.brandName}
            onChange={(e) => setCompany({ brandName: e.target.value })}
            error={errors.brandName}
          />
          <Input
            label="Registered Company Name"
            placeholder="As per incorporation documents"
            value={company.registeredName}
            onChange={(e) => setCompany({ registeredName: e.target.value })}
            error={errors.registeredName}
          />
          <Input
            label="Business Email"
            type="email"
            placeholder="ops@brand.com"
            value={company.businessEmail}
            onChange={(e) => setCompany({ businessEmail: e.target.value })}
            error={errors.businessEmail}
          />
          <PhoneInput
            countryCode={company.phoneCountryCode}
            phone={company.phone}
            onCountryCodeChange={(code) => setCompany({ phoneCountryCode: code })}
            onPhoneChange={(phone) => setCompany({ phone })}
            error={errors.phone}
          />
          <Input
            label="Website"
            placeholder="https://yourbrand.com"
            hint="Optional"
            value={company.website}
            onChange={(e) => setCompany({ website: e.target.value })}
          />
          <RadioGroup
            label="Monthly Order Volume"
            name="monthlyOrders"
            options={orderOptions}
            value={company.monthlyOrders}
            onChange={(v) => setCompany({ monthlyOrders: v })}
          />
          {errors.monthlyOrders && (
            <p className="text-xs text-error" role="alert">{errors.monthlyOrders}</p>
          )}
        </div>

        <Button className="w-full" size="lg" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}
