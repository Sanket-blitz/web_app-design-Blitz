import type { Order, TimelineEvent } from './orders'
import type { Store } from './stores'
import type { DeliveryOptionId } from './deliveryIntel'
import { formatPhone } from './deliveryIntel'

export interface CreateOrderInput {
  customerName: string
  phone: string
  email?: string
  sku: string
  productName: string
  quantity: number
  itemValue: number
  paymentType: 'prepaid' | 'cod'
  addressLine1: string
  addressLine2?: string
  landmark?: string
  pincode: string
  city: string
  deliveryOption: DeliveryOptionId
  deliveryPrice: number
  deliveryEta: string
  serviceLabel: string
  lat?: number
  lng?: number
  store: Store
  existingCount: number
}

function generateId(count: number): string {
  return `BLZ-${4830 + count}`
}

function generateAwb(id: string): string {
  return `AWB${id.replace('BLZ-', '')}${Math.floor(Math.random() * 900 + 100)}`
}

function buildAddress(input: CreateOrderInput): string {
  const parts = [input.addressLine1, input.addressLine2, input.landmark, input.city, input.pincode].filter(Boolean)
  return parts.join(', ')
}

function buildTimeline(store: Store, customerLat: number, customerLng: number): TimelineEvent[] {
  const now = new Date()
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const storeLat = 12.9352
  const storeLng = 77.6245

  return [
    {
      time,
      label: 'Order created',
      location: store.storeName,
      type: 'store',
      x: 22,
      y: 58,
      lat: storeLat,
      lng: storeLng,
    },
    {
      time,
      label: 'Awaiting assignment',
      location: store.storeName,
      type: 'store',
      x: 22,
      y: 58,
      lat: customerLat || storeLat,
      lng: customerLng || storeLng,
    },
  ]
}

export function buildOrderFromInput(input: CreateOrderInput): Order {
  const id = generateId(input.existingCount)
  const itemTotal = input.itemValue * input.quantity
  const cod = input.paymentType === 'cod' ? itemTotal : 0

  return {
    id,
    awb: generateAwb(id),
    customer: input.customerName.trim(),
    phone: formatPhone(input.phone),
    email: input.email?.trim(),
    address: buildAddress(input),
    addressLine1: input.addressLine1,
    addressLine2: input.addressLine2,
    landmark: input.landmark,
    pincode: input.pincode,
    city: input.city,
    lat: input.lat,
    lng: input.lng,
    storeId: input.store.id,
    storeName: input.store.storeName,
    status: 'created',
    cost: input.deliveryPrice,
    eta: input.deliveryEta,
    createdAt: new Date().toISOString(),
    timeline: buildTimeline(input.store, input.lat ?? 12.97, input.lng ?? 77.64),
    cod,
    paymentStatus: input.paymentType === 'cod' ? 'pending' : 'remitted',
    paymentType: input.paymentType,
    sku: input.sku,
    productName: input.productName,
    quantity: input.quantity,
    itemValue: input.itemValue,
    serviceType: input.deliveryOption,
    serviceLabel: input.serviceLabel,
  }
}
