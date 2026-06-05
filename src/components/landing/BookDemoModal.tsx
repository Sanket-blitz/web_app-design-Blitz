import { useState } from 'react'
import { Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

interface BookDemoModalProps {
  open: boolean
  onClose: () => void
}

export function BookDemoModal({ open, onClose }: BookDemoModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setSubmitted(false), 300)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={submitted ? undefined : 'Book a demo'}
      description={submitted ? undefined : 'See how Blitz transforms your store network into fulfillment centers.'}
      size="sm"
    >
      {submitted ? (
        <div className="text-center py-4 space-y-4">
          <div className="h-14 w-14 mx-auto rounded-full bg-success-soft flex items-center justify-center">
            <Check className="h-7 w-7 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal">Demo scheduled.</h3>
            <p className="mt-2 text-sm text-graphite">
              Our team will reach out within 24 hours to confirm your session.
            </p>
          </div>
          <Button className="w-full" onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Your name" />
          <Input label="Work Email" type="email" placeholder="you@brand.com" />
          <Input label="Company" placeholder="Brand or retailer name" />
          <Input label="Monthly Orders" placeholder="e.g. 5,000 – 20,000" hint="Approximate volume" />
          <Button className="w-full" size="lg" loading={loading} onClick={handleSubmit}>
            Request Demo
          </Button>
        </div>
      )}
    </Modal>
  )
}
