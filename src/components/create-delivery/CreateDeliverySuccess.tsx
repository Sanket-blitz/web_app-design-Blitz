import { Check, Copy, ExternalLink, LayoutDashboard, Plus, Printer } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import type { Order } from '../../lib/orders'
import { getServiceLabel } from '../../lib/orders'

interface CreateDeliverySuccessProps {
  order: Order
  onCreateAnother: () => void
  onTrack: () => void
}

export function CreateDeliverySuccess({ order, onCreateAnother, onTrack }: CreateDeliverySuccessProps) {
  const [copied, setCopied] = useState(false)
  const trackingUrl = `${window.location.origin}/dashboard?track=${order.id}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(trackingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-lg mx-auto py-8 space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <div className="h-14 w-14 mx-auto rounded-full bg-success-soft flex items-center justify-center">
          <Check className="h-7 w-7 text-success" />
        </div>
        <h2 className="text-xl font-semibold text-charcoal">Order successfully created</h2>
        <p className="text-sm text-graphite">Your delivery is queued for assignment.</p>
      </div>

      <Card padding="lg" className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-graphite">Tracking ID</span>
          <span className="font-mono font-semibold text-charcoal">{order.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-graphite">AWB Number</span>
          <span className="font-mono text-sm text-charcoal">{order.awb}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-graphite">Estimated delivery</span>
          <span className="text-sm font-medium text-charcoal">{order.eta}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-graphite">Service</span>
          <Badge variant="accent">{getServiceLabel(order)}</Badge>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-graphite">Delivery fee</span>
          <span className="font-semibold text-charcoal">₹{order.cost}</span>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button onClick={onTrack}>
          <ExternalLink className="h-4 w-4" /> Track Order
        </Button>
        <Button variant="outline" onClick={onCreateAnother}>
          <Plus className="h-4 w-4" /> Create Another
        </Button>
        <Link to="/dashboard" className="sm:col-span-1">
          <Button variant="ghost" className="w-full">
            <LayoutDashboard className="h-4 w-4" /> View Dashboard
          </Button>
        </Link>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Print Label
        </Button>
      </div>

      <button
        onClick={copyLink}
        className="w-full flex items-center justify-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
      >
        <Copy className="h-4 w-4" />
        {copied ? 'Link copied!' : 'Copy tracking link'}
      </button>
    </div>
  )
}
