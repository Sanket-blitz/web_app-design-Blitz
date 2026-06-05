import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertProps {
  type: AlertType
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

const icons: Record<AlertType, ReactNode> = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
}

const colors: Record<AlertType, string> = {
  success: 'bg-success-soft dark:bg-success/20 border-success/30 dark:border-success/40 text-success dark:text-success-light',
  error: 'bg-error-soft dark:bg-error/20 border-error/30 dark:border-error/40 text-error dark:text-error-light',
  warning: 'bg-warning-soft dark:bg-warning/20 border-warning/30 dark:border-warning/40 text-warning dark:text-warning-light',
  info: 'bg-info-soft dark:bg-info/20 border-info/30 dark:border-info/40 text-info dark:text-info-light',
}

export function Alert({ type, title, children, onClose, className }: AlertProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border p-4 transition-all',
        colors[type],
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
