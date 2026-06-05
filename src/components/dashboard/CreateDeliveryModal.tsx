import { useState } from 'react'
import { Package } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface CreateDeliveryModalProps {
  open: boolean
  onClose: () => void
}

export function CreateDeliveryModal({ open, onClose }: CreateDeliveryModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setStep('success')
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setStep('form'), 300)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === 'form' ? 'Create delivery' : undefined}
      description={step === 'form' ? 'Dispatch a rider from your store to the customer.' : undefined}
      size="md"
    >
      {step === 'success' ? (
        <div className="text-center py-2 space-y-5">
          <div className="h-14 w-14 mx-auto rounded-full bg-accent-soft flex items-center justify-center">
            <Package className="h-7 w-7 text-accent" />
          </div>
          <div>
            <Badge variant="success" className="mb-3">Rider assigned</Badge>
            <h3 className="text-lg font-semibold text-charcoal">Delivery BLZ-4822 created.</h3>
            <p className="mt-2 text-sm text-graphite">ETA 38 minutes · Rider R-2847 en route to store</p>
          </div>
          <Button className="w-full" onClick={handleClose}>Back to Dashboard</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Customer Name" placeholder="Full name" defaultValue="Priya Mehta" />
            <Input label="Phone" type="tel" placeholder="+91" defaultValue="+91 98765 43210" />
          </div>
          <Input label="Delivery Address" placeholder="Full address with landmark" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Order ID" placeholder="Optional" hint="Link to existing order" />
            <Input label="Items" placeholder="e.g. 2 items" defaultValue="1 item" />
          </div>
          <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-graphite">Delivery type</span>
              <Badge variant="accent">Same-day Express</Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-graphite">Estimated fee</span>
              <span className="font-semibold text-charcoal">₹89</span>
            </div>
          </div>
          <Button className="w-full" size="lg" loading={loading} onClick={handleCreate}>
            Dispatch Rider
          </Button>
        </div>
      )}
    </Modal>
  )
}
