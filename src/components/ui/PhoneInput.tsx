import { cn } from '../../lib/utils'

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India' },
  { code: '+1', country: 'US', label: 'United States' },
  { code: '+44', country: 'GB', label: 'United Kingdom' },
  { code: '+971', country: 'AE', label: 'UAE' },
]

interface PhoneInputProps {
  label?: string
  countryCode: string
  phone: string
  onCountryCodeChange: (code: string) => void
  onPhoneChange: (phone: string) => void
  error?: string
  hint?: string
}

export function PhoneInput({
  label = 'Phone Number',
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  error,
  hint,
}: PhoneInputProps) {
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    onPhoneChange(digits)
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-charcoal">{label}</label>
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className="h-11 px-2.5 rounded-[var(--radius-md)] border border-border-strong bg-white dark:bg-charcoal-soft text-sm text-charcoal focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none shrink-0 w-[100px]"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="98765 43210"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className={cn(
            'flex-1 h-11 px-3.5 rounded-[var(--radius-md)] border text-sm bg-white dark:bg-charcoal-soft text-charcoal placeholder:text-graphite/60 focus:outline-none focus:ring-2 focus:ring-accent/20',
            error ? 'border-error focus:border-error' : 'border-border-strong focus:border-accent'
          )}
        />
      </div>
      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && hint && <p className="text-xs text-graphite">{hint}</p>}
    </div>
  )
}
