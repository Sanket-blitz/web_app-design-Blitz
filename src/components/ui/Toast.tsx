import { useEffect } from 'react'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  id: string
  type: ToastType
  title: string
  message?: string
  action?: { label: string; onClick: () => void }
  onClose: (id: string) => void
  duration?: number
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
}

const colors: Record<ToastType, string> = {
  success: 'bg-success-soft dark:bg-success/20 border-success/30 dark:border-success/40 text-success dark:text-success-light',
  error: 'bg-error-soft dark:bg-error/20 border-error/30 dark:border-error/40 text-error dark:text-error-light',
  warning: 'bg-warning-soft dark:bg-warning/20 border-warning/30 dark:border-warning/40 text-warning dark:text-warning-light',
  info: 'bg-info-soft dark:bg-info/20 border-info/30 dark:border-info/40 text-info dark:text-info-light',
}

export function Toast({ id, type, title, message, action, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div
      className={cn(
        'animate-fadeInUp rounded-[var(--radius-lg)] border p-4 shadow-lg backdrop-blur-sm transition-all duration-300',
        colors[type]
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{title}</h3>
          {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
          {action && (
            <button
              onClick={() => {
                action.onClick()
                onClose(id)
              }}
              className="text-sm font-medium mt-2 hover:opacity-75 transition-opacity"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
