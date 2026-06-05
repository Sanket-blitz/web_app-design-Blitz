import { useState } from 'react'
import { Upload, Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface BulkUploadModalProps {
  open: boolean
  onClose: () => void
}

export function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setUploaded(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setUploaded(false), 300)
  }

  return (
    <Modal open={open} onClose={handleClose} title={uploaded ? undefined : 'Bulk Upload Orders'} size="md">
      {uploaded ? (
        <div className="text-center py-4 space-y-4">
          <div className="h-14 w-14 mx-auto rounded-full bg-success-soft flex items-center justify-center">
            <Check className="h-7 w-7 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal">24 orders imported.</h3>
            <p className="mt-2 text-sm text-graphite">Orders are queued for pickup. Riders will be assigned automatically.</p>
          </div>
          <Button className="w-full" onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-[var(--radius-xl)] p-10 text-center hover:border-accent transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-graphite mx-auto mb-3" />
            <p className="text-sm font-medium text-charcoal">Drop CSV file here</p>
            <p className="text-xs text-graphite mt-1">or click to browse · Max 500 orders</p>
          </div>
          <div className="p-3 rounded-[var(--radius-lg)] bg-surface text-xs text-graphite">
            Required columns: order_id, customer_name, phone, address, items, cod_amount
          </div>
          <Button className="w-full" size="lg" loading={loading} onClick={handleUpload}>
            Upload & Process
          </Button>
        </div>
      )}
    </Modal>
  )
}
