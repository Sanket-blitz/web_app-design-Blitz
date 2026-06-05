import { cn } from '../../lib/utils'

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India' },
  { code: '+1', country: 'US', label: 'United States' },
  { code: '+44', country: 'GB', label: 'United Kingdom' },
  { code: '+971', country: 'AE', label: 'UAE' },
]

const fieldClass = cn(
  'h-11 rounded-[var(--radius-md)] border text-sm transition-all duration-200',
  'bg-white dark:bg-white/5 text-charcoal dark:text-charcoal',
  'border-border-strong dark:border-white/20',
  'hover:border-graphite/40 dark:hover:border-white/30',
  'focus:border-accent dark:focus:border-accent-light focus:ring-2 focus:ring-accent/20 dark:focus:ring-accent-light/20 focus:outline-none'
)

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
      <label className="block text-sm font-medium text-charcoal dark:text-charcoal">{label}</label>
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className={cn(fieldClass, 'px-2.5 shrink-0 w-[100px]', error && 'border-error dark:border-error-light')}
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code} className="bg-white dark:bg-zinc-900 text-charcoal dark:text-charcoal">
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
            fieldClass,
            'flex-1 px-3.5 placeholder:text-graphite/60 dark:placeholder:text-graphite',
            error
              ? 'border-error dark:border-error-light focus:border-error dark:focus:border-error-light focus:ring-error/20'
              : 'focus:border-accent dark:focus:border-accent-light'
          )}
          aria-invalid={!!error}
        />
      </div>
      {error && <p className="text-xs text-error dark:text-error-light" role="alert">{error}</p>}
      {!error && hint && <p className="text-xs text-graphite dark:text-graphite">{hint}</p>}
    </div>
  )
}
