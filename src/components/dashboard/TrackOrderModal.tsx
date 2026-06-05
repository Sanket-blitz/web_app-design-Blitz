import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'
import type { Order } from '../../lib/orders'

interface TrackOrderModalProps {
  open: boolean
  onClose: () => void
  onFound: (order: Order) => void
}

export function TrackOrderModal({ open, onClose, onFound }: TrackOrderModalProps) {
  const { orders } = useOnboarding()
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  const handleTrack = () => {
    const found = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase().trim())
    if (found) {
      onFound(found)
      onClose()
      setOrderId('')
      setError('')
    } else {
      setError('Order not found. Check the order number and try again.')
    }
  }

  return (
    <Modal open={open} onClose={() => { onClose(); setOrderId(''); setError('') }} title="Track Shipment" size="sm">
      <div className="space-y-4">
        <Input
          label="Order Number"
          placeholder="BLZ-4821"
          value={orderId}
          onChange={(e) => { setOrderId(e.target.value); setError('') }}
          error={error}
        />
        <Button className="w-full" size="lg" onClick={handleTrack} disabled={!orderId.trim()}>
          Track Order
        </Button>
      </div>
    </Modal>
  )
}
