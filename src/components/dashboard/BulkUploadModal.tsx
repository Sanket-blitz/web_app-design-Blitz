import { useState, useRef } from 'react'
import { Upload, Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'
import { buildOrderFromInput } from '../../lib/createOrder'
import { PRODUCT_CATALOG } from '../../lib/products'

interface BulkUploadModalProps {
  open: boolean
  onClose: () => void
}

const SAMPLE_ROWS = [
  { name: 'Kavya Nair', phone: '9876012345', address: '12, 100 Feet Road', pincode: '560038', sku: 'UT-SLK-001' },
  { name: 'Dev Patel', phone: '9876023456', address: '45, Koramangala 5th Block', pincode: '560034', sku: 'NV-BLK-008' },
  { name: 'Isha Gupta', phone: '9876034567', address: '8, Cunningham Road', pincode: '560001', sku: 'ME-GLD-022' },
]

export function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const { activeStore, orders, addOrder } = useOnboarding()
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const processUpload = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    let baseCount = orders.length
    for (const row of SAMPLE_ROWS) {
      const product = PRODUCT_CATALOG.find((p) => p.sku === row.sku) ?? PRODUCT_CATALOG[0]
      const order = buildOrderFromInput({
        customerName: row.name,
        phone: row.phone,
        sku: product.sku,
        productName: product.name,
        quantity: 1,
        itemValue: product.price,
        paymentType: 'prepaid',
        addressLine1: row.address,
        pincode: row.pincode,
        city: 'Bengaluru',
        deliveryOption: 'same_day',
        deliveryPrice: 85,
        deliveryEta: 'Today by 11:00 PM',
        serviceLabel: 'Same day',
        store: activeStore,
        existingCount: baseCount++,
      })
      addOrder(order)
    }

    setCount(SAMPLE_ROWS.length)
    setLoading(false)
    setUploaded(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setUploaded(false); setCount(0) }, 300)
  }

  return (
    <Modal open={open} onClose={handleClose} title={uploaded ? undefined : 'Bulk Upload Orders'} size="md">
      {uploaded ? (
        <div className="text-center py-4 space-y-4">
          <div className="h-14 w-14 mx-auto rounded-full bg-success-soft flex items-center justify-center">
            <Check className="h-7 w-7 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal dark:text-zinc-100">{count} orders imported.</h3>
            <p className="mt-2 text-sm text-graphite dark:text-zinc-400">Orders appear on your dashboard instantly — no refresh needed.</p>
          </div>
          <Button className="w-full" onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={() => processUpload()} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-[var(--radius-xl)] p-10 text-center hover:border-accent transition-colors cursor-pointer"
          >
            <Upload className="h-8 w-8 text-graphite dark:text-zinc-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-charcoal dark:text-zinc-100">Drop CSV file here</p>
            <p className="text-xs text-graphite dark:text-zinc-400 mt-1">or click to browse · Max 500 orders</p>
          </button>
          <div className="p-3 rounded-[var(--radius-lg)] bg-surface dark:bg-zinc-800/60 text-xs text-graphite dark:text-zinc-400">
            Required columns: customer_name, phone, address, pincode, sku, quantity, payment_type
          </div>
          <Button className="w-full" size="lg" loading={loading} onClick={processUpload}>
            Upload & Process
          </Button>
        </div>
      )}
    </Modal>
  )
}
