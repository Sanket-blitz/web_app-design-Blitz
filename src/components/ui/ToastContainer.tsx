import { useState, useCallback, useRef, useEffect } from 'react'
import { Toast } from './Toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
  action?: { label: string; onClick: () => void }
  duration?: number
}

export interface ToastContextValue {
  show: (toast: Omit<ToastItem, 'id'>) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

let toastContext: ToastContextValue | null = null

export function setToastContext(ctx: ToastContextValue) {
  toastContext = ctx
}

export function getToastContext(): ToastContextValue {
  if (!toastContext) {
    throw new Error('Toast context not initialized')
  }
  return toastContext
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counterRef = useRef(0)

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${counterRef.current++}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const success = useCallback((title: string, message?: string) => {
    show({ type: 'success', title, message })
  }, [show])

  const error = useCallback((title: string, message?: string) => {
    show({ type: 'error', title, message })
  }, [show])

  const warning = useCallback((title: string, message?: string) => {
    show({ type: 'warning', title, message })
  }, [show])

  const info = useCallback((title: string, message?: string) => {
    show({ type: 'info', title, message })
  }, [show])

  useEffect(() => {
    setToastContext({ show, success, error, warning, info })
  }, [show, success, error, warning, info])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}
