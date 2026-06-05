import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/40 dark:bg-slate/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative w-full rounded-[var(--radius-xl)] bg-white dark:bg-white/5 shadow-[var(--shadow-xl)] border border-border dark:border-white/10',
              sizeMap[size]
            )}
          >
            {(title || description) && (
              <div className="px-6 pt-6 pb-4 border-b border-border dark:border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold text-charcoal dark:text-zinc-100 tracking-tight">
                        {title}
                      </h2>
                    )}
                    {description && <p className="mt-1 text-sm text-graphite dark:text-zinc-400">{description}</p>}
                  </div>
                  <button
                    onClick={onClose}
                    className="h-8 w-8 rounded-[var(--radius-md)] flex items-center justify-center text-graphite dark:text-zinc-400 hover:bg-surface dark:hover:bg-zinc-800 hover:text-charcoal dark:hover:text-zinc-200 transition-colors shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
