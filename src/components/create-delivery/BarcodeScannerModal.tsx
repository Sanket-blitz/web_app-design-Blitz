import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Barcode, Check, ScanLine, X } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { PRODUCT_CATALOG } from '../../lib/products'

interface BarcodeScannerModalProps {
  open: boolean
  onClose: () => void
  onScan: (barcode: string) => boolean
}

export function BarcodeScannerModal({ open, onClose, onScan }: BarcodeScannerModalProps) {
  const [scanning, setScanning] = useState(true)
  const [manualCode, setManualCode] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleDetected = (code: string) => {
    const ok = onScan(code)
    if (ok) {
      setScanning(false)
      setSuccess(true)
      setTimeout(onClose, 1200)
    } else {
      setError('Item not found in catalog')
      setScanning(false)
    }
  }

  const handleManual = () => {
    if (!manualCode.trim()) return
    handleDetected(manualCode.trim())
  }

  useEffect(() => {
    if (!open) return
    setScanning(true)
    setSuccess(false)
    setError('')
    setManualCode('')

    const t = setTimeout(() => {
      const demo = PRODUCT_CATALOG[Math.floor(Math.random() * 3)]
      const ok = onScan(demo.barcode)
      if (ok) {
        setScanning(false)
        setSuccess(true)
        setTimeout(onClose, 1200)
      } else {
        setError('Item not found in catalog')
        setScanning(false)
      }
    }, 2200)

    return () => clearTimeout(t)
  }, [open, onScan, onClose])

  return (
    <Modal open={open} onClose={onClose} title="Scan Barcode" size="md">
      <div className="space-y-4">
        <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden bg-charcoal">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-28 border-2 border-pure-white/80 rounded-lg relative">
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ top: '10%' }}
                    animate={{ top: '85%' }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-2 right-2 h-0.5 bg-accent shadow-[0_0_12px_rgba(91,141,239,0.8)]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            {success ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-success-light"
              >
                <Check className="h-4 w-4" /> Item identified
              </motion.span>
            ) : scanning ? (
              <span className="text-xs text-pure-white/80 flex items-center justify-center gap-1.5">
                <ScanLine className="h-3.5 w-3.5 animate-pulse" /> Point camera at barcode
              </span>
            ) : null}
          </div>
        </div>

        {error && (
          <p className="text-sm text-error text-center" role="alert">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-graphite">or enter manually</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Input
          label="Barcode / SKU"
          placeholder="8901234567890"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleManual()}
        />

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button className="flex-1" onClick={handleManual}>
            <Barcode className="h-4 w-4" /> Lookup
          </Button>
        </div>
      </div>
    </Modal>
  )
}
