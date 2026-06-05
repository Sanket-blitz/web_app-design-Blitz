import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { ProgressIndicator } from '../../../components/ui/ProgressIndicator'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'
import { IFSC_BANKS } from '../../../lib/utils'

export function BankDetails() {
  const { company, setCompany } = useOnboarding()
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(false)
  const [verified, setVerified] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (company.ifsc.length >= 11) {
      setFetching(true)
      setVerified(false)
      const timer = setTimeout(() => {
        const bank = IFSC_BANKS[company.ifsc.toUpperCase()]
        if (bank) {
          setCompany({ bankName: bank.bank, branch: bank.branch })
          setVerified(true)
        } else {
          setCompany({ bankName: 'Bank lookup pending', branch: '' })
        }
        setFetching(false)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setCompany({ bankName: '', branch: '' })
      setVerified(false)
    }
  }, [company.ifsc])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!company.accountHolder.trim()) e.accountHolder = 'Account holder name is required'
    if (!company.accountNumber.trim()) e.accountNumber = 'Account number is required'
    if (!company.ifsc.trim()) e.ifsc = 'IFSC code is required'
    else if (company.ifsc.length < 11) e.ifsc = 'IFSC must be 11 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <AuthLayout
      progress={
        <ProgressIndicator currentStep={3} totalSteps={4} minutesLeft={1} message="Almost done. Just one more step." />
      }
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Bank details
          </h1>
          <p className="text-graphite">For settlement of delivery fees and payouts.</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Account Holder Name"
            placeholder="As per bank records"
            value={company.accountHolder}
            onChange={(e) => setCompany({ accountHolder: e.target.value })}
            error={errors.accountHolder}
          />
          <Input
            label="Account Number"
            placeholder="Enter account number"
            value={company.accountNumber}
            onChange={(e) => setCompany({ accountNumber: e.target.value })}
            error={errors.accountNumber}
          />
          <Input
            label="IFSC Code"
            placeholder="e.g. HDFC0001234"
            value={company.ifsc}
            onChange={(e) => setCompany({ ifsc: e.target.value.toUpperCase() })}
            error={errors.ifsc}
            success={verified}
            hint="Bank details auto-fetch after IFSC entry"
          />

          {(fetching || company.bankName) && (
            <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-border space-y-2">
              {fetching ? (
                <div className="flex items-center gap-2 text-sm text-graphite">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                  Fetching bank details...
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-graphite">Bank Name</span>
                    <span className="text-sm font-medium text-charcoal">{company.bankName}</span>
                  </div>
                  {company.branch && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-graphite">Branch</span>
                      <span className="text-sm font-medium text-charcoal">{company.branch}</span>
                    </div>
                  )}
                  {verified && (
                    <div className="flex items-center gap-1.5 text-xs text-success pt-1">
                      <Check className="h-3.5 w-3.5" />
                      IFSC verified
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" size="lg" onClick={() => navigate('/auth/register/kyc')}>
            Back
          </Button>
          <Button
            className="flex-1"
            size="lg"
            onClick={() => { if (validate()) navigate('/auth/register/address') }}
          >
            Continue
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
