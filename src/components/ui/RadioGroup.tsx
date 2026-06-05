import { cn } from '../../lib/utils'

interface Option {
  value: string
  label: string
}

interface RadioGroupProps {
  label?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  name: string
}

export function RadioGroup({ label, options, value, onChange, name }: RadioGroupProps) {
  return (
    <fieldset className="space-y-3">
      {label && (
        <legend className="text-sm font-medium text-charcoal mb-3">{label}</legend>
      )}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-lg)] border cursor-pointer transition-all duration-200',
              value === opt.value
                ? 'border-accent bg-accent-soft ring-1 ring-accent/30'
                : 'border-border-strong hover:border-graphite/30 hover:bg-off-white'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-accent"
            />
            <span className="text-sm font-medium text-charcoal">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
