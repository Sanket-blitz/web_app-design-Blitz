import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Barcode,
  Check,
  ChevronRight,
  MapPin,
  Mic,
  Package,
  ScanLine,
  User,
} from 'lucide-react'
import { BlitzLogo } from '../../components/layout/BlitzLogo'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { AutoSaveIndicator } from '../../components/ui/AutoSaveIndicator'
import { BarcodeScannerModal } from '../../components/create-delivery/BarcodeScannerModal'
import { VoiceAddressModal } from '../../components/create-delivery/VoiceAddressModal'
import { MapPinModal } from '../../components/create-delivery/MapPinModal'
import { DeliveryOptionsPanel } from '../../components/create-delivery/DeliveryOptionsPanel'
import { CreateDeliverySuccess } from '../../components/create-delivery/CreateDeliverySuccess'
import { useCreateDelivery } from '../../hooks/useCreateDelivery'
import { FREQUENT_ADDRESSES } from '../../lib/deliveryIntel'
import { cn } from '../../lib/utils'

export function CreateDeliveryPage() {
  const navigate = useNavigate()
  const {
    form,
    update,
    errors,
    nameRef,
    itemTotal,
    codAmount,
    serviceability,
    pricingLoading,
    creating,
    createdOrder,
    itemIdentified,
    repeatCustomer,
    addressSuggestions,
    pinConfirmed,
    setPinConfirmed,
    applyProduct,
    applyAddress,
    autofillRepeat,
    createOrder,
    resetForAnother,
    recentProducts,
    selectedOption,
    activeStore,
  } = useCreateDelivery()

  const [barcodeOpen, setBarcodeOpen] = useState(false)
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)

  const addressReady = form.addressLine1.trim().length >= 5 && form.pincode.length === 6
  const canSubmit = addressReady && !!form.deliveryOption && serviceability?.serviceable

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape') (e.target as HTMLInputElement).blur()
        return
      }
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        nameRef.current?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canSubmit) {
        e.preventDefault()
        createOrder()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [canSubmit, createOrder, nameRef])

  if (createdOrder) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-off-white">
        <header className="border-b border-border bg-white/80 dark:bg-white/5 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
            <BlitzLogo size="sm" />
          </div>
        </header>
        <CreateDeliverySuccess
          order={createdOrder}
          onCreateAnother={resetForAnother}
          onTrack={() => navigate('/dashboard?tab=orders')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white dark:bg-off-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/90 dark:bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/dashboard"
              className="h-9 w-9 rounded-[var(--radius-md)] border border-border flex items-center justify-center text-graphite hover:text-charcoal hover:bg-surface transition-colors shrink-0"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-charcoal truncate">Create Delivery</h1>
              <p className="text-xs text-graphite truncate">{activeStore.storeName}</p>
            </div>
          </div>
          <AutoSaveIndicator />
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 pb-28 lg:pb-8">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left — Order details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Customer */}
            <section aria-labelledby="customer-heading">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4 text-accent" />
                <h2 id="customer-heading" className="text-sm font-semibold text-charcoal">Customer Details</h2>
              </div>
              <p className="text-xs text-graphite mb-4">Who should receive this order?</p>

              <AnimatePresence>
                {repeatCustomer && (
                  <motion.button
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    type="button"
                    onClick={autofillRepeat}
                    className="w-full mb-4 p-3 rounded-[var(--radius-lg)] border border-accent/30 bg-accent-soft/40 text-left text-sm hover:bg-accent-soft transition-colors"
                  >
                    <span className="font-medium text-charcoal">Delivering to {repeatCustomer.name} again?</span>
                    <span className="text-graphite ml-1">· One-click autofill</span>
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  ref={nameRef}
                  label="Customer Name"
                  placeholder="Full name"
                  value={form.customerName}
                  onChange={(e) => update({ customerName: e.target.value })}
                  error={errors.customerName}
                  autoComplete="name"
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Email (optional)"
                  type="email"
                  placeholder="customer@email.com"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </section>

            {/* Item */}
            <section aria-labelledby="item-heading">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-accent" />
                  <h2 id="item-heading" className="text-sm font-semibold text-charcoal">Item Information</h2>
                </div>
                <Button variant="outline" size="sm" onClick={() => setBarcodeOpen(true)}>
                  <ScanLine className="h-4 w-4" /> Scan Barcode
                </Button>
              </div>

              <AnimatePresence>
                {itemIdentified && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-success flex items-center gap-1.5 mb-3"
                  >
                    <Check className="h-4 w-4" /> Item identified
                  </motion.p>
                )}
              </AnimatePresence>

              {form.productName && (
                <Card padding="sm" className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-surface flex items-center justify-center shrink-0">
                    <Barcode className="h-5 w-5 text-graphite" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-charcoal truncate">{form.productName}</p>
                    <p className="text-xs text-graphite">{form.sku} · ₹{form.price.toLocaleString('en-IN')}</p>
                  </div>
                </Card>
              )}

              {recentProducts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-graphite mb-2">Recent products</p>
                  <div className="flex flex-wrap gap-2">
                    {recentProducts.map((p) => (
                      <button
                        key={p.sku}
                        type="button"
                        onClick={() => applyProduct(p.sku)}
                        className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-accent hover:bg-accent-soft transition-colors text-charcoal"
                      >
                        {p.sku}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="SKU Code"
                  placeholder="UT-SLK-001"
                  value={form.sku}
                  onChange={(e) => {
                    update({ sku: e.target.value })
                    if (e.target.value.length >= 6) applyProduct(e.target.value)
                  }}
                  error={errors.sku}
                />
                <Input
                  label="Product Name"
                  placeholder="Product name"
                  value={form.productName}
                  onChange={(e) => update({ productName: e.target.value })}
                  error={errors.productName}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Quantity"
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => update({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                  error={errors.quantity}
                />
                <Input
                  label="Price (₹)"
                  type="number"
                  min={0}
                  value={form.price || ''}
                  onChange={(e) => update({ price: parseFloat(e.target.value) || 0 })}
                  error={errors.price}
                />
              </div>

              {/* Payment */}
              <div className="mt-5">
                <p className="text-sm font-medium text-charcoal mb-2">Payment Type</p>
                <div className="inline-flex p-1 rounded-[var(--radius-lg)] bg-surface border border-border" role="group" aria-label="Payment type">
                  {(['prepaid', 'cod'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => update({ paymentType: type })}
                      className={cn(
                        'px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all',
                        form.paymentType === type
                          ? 'bg-white dark:bg-white/10 text-charcoal shadow-sm'
                          : 'text-graphite hover:text-charcoal'
                      )}
                    >
                      {type === 'prepaid' ? 'Prepaid' : 'Cash on Delivery'}
                    </button>
                  ))}
                </div>
                {form.paymentType === 'cod' && itemTotal > 0 && (
                  <p className="mt-2 text-sm text-graphite">
                    Collect <span className="font-semibold text-charcoal">₹{codAmount.toLocaleString('en-IN')}</span> from customer
                  </p>
                )}
                {errors.paymentType && (
                  <p className="mt-1 text-xs text-error" role="alert">{errors.paymentType}</p>
                )}
              </div>
            </section>

            {/* Address */}
            <section aria-labelledby="address-heading">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-accent" />
                <h2 id="address-heading" className="text-sm font-semibold text-charcoal">Delivery Address</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => setVoiceOpen(true)}>
                  <Mic className="h-4 w-4" /> Add by Voice
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMapOpen(true)}>
                  <MapPin className="h-4 w-4" /> Pin Location
                </Button>
              </div>

              {pinConfirmed && (
                <p className="text-sm text-success flex items-center gap-1.5 mb-3">
                  <Check className="h-4 w-4" /> Precise delivery location captured
                </p>
              )}

              <div className="mb-3">
                <p className="text-xs text-graphite mb-2">Frequent addresses</p>
                <div className="flex flex-wrap gap-2">
                  {FREQUENT_ADDRESSES.slice(0, 3).map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => applyAddress(a)}
                      className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-accent hover:bg-accent-soft transition-colors text-charcoal text-left max-w-[200px] truncate"
                    >
                      {a.line1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    label="Address Line 1"
                    placeholder="House no., street"
                    value={form.addressLine1}
                    onChange={(e) => update({ addressLine1: e.target.value })}
                    error={errors.addressLine1}
                    autoComplete="address-line1"
                  />
                  {addressSuggestions.length > 0 && (
                    <div
                      className="mt-1.5 rounded-[var(--radius-lg)] border border-border dark:border-zinc-600 bg-pure-white dark:bg-zinc-900 shadow-[var(--shadow-lg)] overflow-hidden divide-y divide-border dark:divide-zinc-700"
                      role="listbox"
                      aria-label="Address suggestions"
                    >
                      {addressSuggestions.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          role="option"
                          onClick={() => applyAddress(a)}
                          className="w-full px-3 py-2.5 text-left text-sm hover:bg-surface dark:hover:bg-zinc-800 transition-colors"
                        >
                          <span className="font-medium text-charcoal">{a.line1}</span>
                          {a.line2 && (
                            <span className="text-graphite text-xs block mt-0.5">{a.line2}</span>
                          )}
                          <span className="text-graphite text-xs">{a.pincode} · {a.city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Input
                  label="Address Line 2"
                  placeholder="Area, locality"
                  value={form.addressLine2}
                  onChange={(e) => update({ addressLine2: e.target.value })}
                  autoComplete="address-line2"
                />
                <Input
                  label="Landmark"
                  placeholder="Near…"
                  value={form.landmark}
                  onChange={(e) => update({ landmark: e.target.value })}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Pincode"
                    placeholder="560038"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    error={errors.pincode}
                    success={form.pincode.length === 6 && !!form.city}
                  />
                  <Input
                    label="City"
                    value={form.city}
                    onChange={(e) => update({ city: e.target.value })}
                    hint={form.pincode.length === 6 && form.city ? 'Auto-detected' : undefined}
                  />
                </div>
                {serviceability?.serviceable && (
                  <Badge variant="success" className="gap-1">
                    <Check className="h-3 w-3" /> Serviceable · {serviceability.zone}
                  </Badge>
                )}
              </div>
            </section>
          </div>

          {/* Right — Pricing + summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-20 space-y-4">
              <Card padding="lg" className="space-y-4">
                <DeliveryOptionsPanel
                  loading={pricingLoading}
                  serviceability={serviceability}
                  selectedId={form.deliveryOption}
                  onSelect={(id) => update({ deliveryOption: id })}
                  addressReady={addressReady}
                />
                {errors.deliveryOption && (
                  <p className="text-xs text-error" role="alert">{errors.deliveryOption}</p>
                )}
              </Card>

              {/* Order review */}
              {form.deliveryOption && selectedOption && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Card padding="lg" className="space-y-3">
                    <h3 className="text-sm font-semibold text-charcoal">Order Summary</h3>
                    <SummaryRow label="Customer" value={form.customerName || '—'} />
                    <SummaryRow label="Item" value={form.productName ? `${form.productName} × ${form.quantity}` : '—'} />
                    <SummaryRow label="Payment" value={form.paymentType === 'cod' ? `COD ₹${codAmount}` : 'Prepaid'} />
                    <SummaryRow label="Address" value={form.addressLine1 || '—'} truncate />
                    <SummaryRow label="Service" value={selectedOption.label} />
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-sm font-medium text-charcoal">Total delivery fee</span>
                      <span className="text-lg font-semibold text-charcoal">₹{selectedOption.price}</span>
                    </div>
                    <p className="text-xs text-graphite">ETA: {selectedOption.eta}</p>
                  </Card>
                </motion.div>
              )}

              <Button
                className="w-full hidden lg:flex"
                size="lg"
                loading={creating}
                disabled={!canSubmit}
                onClick={createOrder}
              >
                Create Delivery <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="hidden lg:block text-center text-xs text-graphite">
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">⌘</kbd>
                {' '}
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Enter</kbd>
                {' '}to submit ·{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">N</kbd>
                {' '}focus name
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-white/10 backdrop-blur-md border-t border-border z-30">
        <Button className="w-full" size="lg" loading={creating} disabled={!canSubmit} onClick={createOrder}>
          Create Delivery · {selectedOption ? `₹${selectedOption.price}` : '—'}
        </Button>
      </div>

      <BarcodeScannerModal
        open={barcodeOpen}
        onClose={() => setBarcodeOpen(false)}
        onScan={(code) => applyProduct(code)}
      />
      <VoiceAddressModal
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onConfirm={(parsed) => {
          applyAddress({
            line1: parsed.line1 ?? '',
            line2: parsed.line2,
            landmark: parsed.landmark,
            pincode: parsed.pincode ?? '',
            city: parsed.city ?? '',
          })
        }}
      />
      <MapPinModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onConfirm={(coords) => {
          update({ lat: coords.lat, lng: coords.lng })
          setPinConfirmed(true)
        }}
      />
    </div>
  )
}

function SummaryRow({ label, value, truncate }: { label: string; value: string; truncate?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-graphite shrink-0">{label}</span>
      <span className={cn('text-charcoal font-medium text-right', truncate && 'truncate max-w-[180px]')}>{value}</span>
    </div>
  )
}
