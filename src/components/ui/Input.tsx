import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  success?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, success, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-charcoal dark:text-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-11 px-3.5 rounded-[var(--radius-md)] border bg-white dark:bg-white/5 text-sm text-charcoal dark:text-charcoal placeholder:text-graphite/60 dark:placeholder:text-graphite transition-all duration-200',
            'focus:border-accent dark:focus:border-accent-light focus:ring-2 focus:ring-accent/20 dark:focus:ring-accent-light/20 focus:outline-none',
            error && 'border-error dark:border-error-light focus:border-error dark:focus:border-error-light focus:ring-error/20 dark:focus:ring-error-light/20',
            success && 'border-success dark:border-success-light focus:border-success dark:focus:border-success-light focus:ring-success/20 dark:focus:ring-success-light/20',
            !error && !success && 'border-border-strong dark:border-white/20 hover:border-graphite/40 dark:hover:border-white/30',
            props.disabled && 'bg-surface dark:bg-white/5 cursor-not-allowed opacity-60',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-graphite dark:text-graphite">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error dark:text-error-light" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
