import { useCallback, useEffect, useRef, useState } from 'react'
import { useOnboarding } from '../context/OnboardingContext'
import {
  calculateServiceability,
  findRepeatCustomer,
  isValidPhone,
  lookupPincode,
  searchAddresses,
  type ServiceabilityResult,
} from '../lib/deliveryIntel'
import { findProductBySku, getRecentSkus } from '../lib/products'
import { EMPTY_DRAFT, loadDraft, saveDraft, clearDraft } from '../lib/orderDraft'
import { buildOrderFromInput } from '../lib/createOrder'
import type { Order } from '../lib/orders'

export function useCreateDelivery() {
  const { activeStore, orders, addOrder } = useOnboarding()
  const nameRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState(() => {
    const draft = loadDraft(activeStore.id)
    return draft ? { ...EMPTY_DRAFT, ...draft } : { ...EMPTY_DRAFT }
  })

  const [serviceability, setServiceability] = useState<ServiceabilityResult | null>(null)
  const [pricingLoading, setPricingLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null)
  const [itemIdentified, setItemIdentified] = useState(false)
  const [repeatCustomer, setRepeatCustomer] = useState<ReturnType<typeof findRepeatCustomer>>(undefined)
  const [addressSuggestions, setAddressSuggestions] = useState(searchAddresses(''))
  const [pinConfirmed, setPinConfirmed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const itemTotal = form.price * form.quantity
  const codAmount = form.paymentType === 'cod' ? itemTotal : 0

  const update = useCallback((patch: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }, [])

  // Draft autosave
  useEffect(() => {
    const t = setTimeout(() => saveDraft(activeStore.id, form), 500)
    return () => clearTimeout(t)
  }, [form, activeStore.id])

  // Repeat customer detection
  useEffect(() => {
    if (form.customerName.length >= 2 && form.phone.length >= 6) {
      setRepeatCustomer(findRepeatCustomer(form.customerName, form.phone))
    } else {
      setRepeatCustomer(undefined)
    }
  }, [form.customerName, form.phone])

  // Pincode lookup
  useEffect(() => {
    if (form.pincode.length === 6) {
      const data = lookupPincode(form.pincode)
      if (data) update({ city: data.city })
    }
  }, [form.pincode, update])

  // Address suggestions
  useEffect(() => {
    if (form.addressLine1.length >= 3) {
      setAddressSuggestions(searchAddresses(form.addressLine1))
    } else {
      setAddressSuggestions([])
    }
  }, [form.addressLine1])

  // Serviceability engine
  useEffect(() => {
    if (form.addressLine1.trim().length < 5 || form.pincode.length !== 6) {
      setServiceability(null)
      return
    }

    setPricingLoading(true)
    const controller = new AbortController()
    const t = setTimeout(async () => {
      const result = await calculateServiceability(
        form.pincode,
        form.addressLine1,
        activeStore,
        itemTotal
      )
      if (!controller.signal.aborted) {
        setServiceability(result)
        setPricingLoading(false)
        setForm((prev) =>
          result.serviceable && !prev.deliveryOption
            ? { ...prev, deliveryOption: 'fastest' }
            : prev
        )
      }
    }, 400)

    return () => {
      controller.abort()
      clearTimeout(t)
    }
  }, [form.addressLine1, form.pincode, activeStore, itemTotal, update])

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const applyProduct = (sku: string) => {
    const product = findProductBySku(sku)
    if (!product) return false
    update({
      sku: product.sku,
      productName: product.name,
      price: product.price,
    })
    setItemIdentified(true)
    setTimeout(() => setItemIdentified(false), 2000)
    return true
  }

  const applyAddress = (addr: {
    line1: string
    line2?: string
    landmark?: string
    pincode: string
    city: string
    lat?: number
    lng?: number
  }) => {
    update({
      addressLine1: addr.line1,
      addressLine2: addr.line2 ?? '',
      landmark: addr.landmark ?? '',
      pincode: addr.pincode,
      city: addr.city,
      lat: addr.lat,
      lng: addr.lng,
    })
    setAddressSuggestions([])
  }

  const autofillRepeat = () => {
    if (!repeatCustomer) return
    update({
      customerName: repeatCustomer.name,
      phone: repeatCustomer.phone,
      email: repeatCustomer.email ?? form.email,
    })
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!form.customerName.trim()) next.customerName = 'Customer name is required'
    if (!isValidPhone(form.phone)) next.phone = 'Enter a valid 10-digit mobile number'
    if (!form.sku.trim()) next.sku = 'SKU is required'
    if (!form.productName.trim()) next.productName = 'Product name is required'
    if (form.quantity < 1) next.quantity = 'Quantity must be at least 1'
    if (form.price <= 0) next.price = 'Price must be greater than 0'
    if (!form.addressLine1.trim()) next.addressLine1 = 'Address is required'
    if (form.pincode.length !== 6) next.pincode = 'Enter a valid 6-digit pincode'
    if (!form.deliveryOption) next.deliveryOption = 'Select a delivery option'
    if (form.paymentType === 'cod' && codAmount > itemTotal) next.paymentType = 'COD cannot exceed item value'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const createOrder = async () => {
    if (!validate() || !serviceability?.serviceable || !form.deliveryOption) return

    const selected = serviceability.options.find((o) => o.id === form.deliveryOption)
    if (!selected) return

    setCreating(true)
    await new Promise((r) => setTimeout(r, 900))

    const order = buildOrderFromInput({
      customerName: form.customerName,
      phone: form.phone,
      email: form.email || undefined,
      sku: form.sku,
      productName: form.productName,
      quantity: form.quantity,
      itemValue: form.price,
      paymentType: form.paymentType,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2 || undefined,
      landmark: form.landmark || undefined,
      pincode: form.pincode,
      city: form.city,
      deliveryOption: form.deliveryOption,
      deliveryPrice: selected.price,
      deliveryEta: selected.eta,
      serviceLabel: selected.label,
      lat: form.lat,
      lng: form.lng,
      store: activeStore,
      existingCount: orders.length,
    })

    addOrder(order)
    clearDraft(activeStore.id)
    setCreatedOrder(order)
    setCreating(false)
  }

  const resetForAnother = () => {
    setForm({ ...EMPTY_DRAFT })
    setCreatedOrder(null)
    setServiceability(null)
    setErrors({})
    nameRef.current?.focus()
  }

  const recentProducts = getRecentSkus(
    orders.filter((o) => o.storeId === activeStore.id && o.sku).map((o) => o.sku!)
  )

  const selectedOption = serviceability?.options.find((o) => o.id === form.deliveryOption)

  return {
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
  }
}
