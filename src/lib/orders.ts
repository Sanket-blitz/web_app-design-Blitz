import { getRiderById } from './riders'

export type OrderStatus =
  | 'created'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'returned'
  | 'cancelled'
  | 'pickup_pending'
  | 'ongoing'
  | 'upcoming'

export type PaymentType = 'prepaid' | 'cod'
export type ServiceType = 'fastest' | 'same_day'

export interface TimelineEvent {
  time: string
  label: string
  location: string
  type: 'store' | 'hub' | 'rider' | 'customer'
  x: number
  y: number
  lat: number
  lng: number
}

export interface Order {
  id: string
  awb?: string
  customer: string
  phone: string
  email?: string
  address: string
  addressLine1?: string
  addressLine2?: string
  landmark?: string
  pincode?: string
  city?: string
  lat?: number
  lng?: number
  storeId: string
  storeName: string
  status: OrderStatus
  cost: number
  timeTaken?: number
  eta?: string
  createdAt: string
  timeline: TimelineEvent[]
  cod: number
  paymentStatus: 'pending' | 'remitted'
  paymentType?: PaymentType
  sku?: string
  productName?: string
  quantity?: number
  itemValue?: number
  serviceType?: ServiceType
  serviceLabel?: string
  /** Assigned rider */
  riderId?: string
  riderName?: string
  /** ISO timestamps for live tracking */
  assignedAt?: string
  riderArrivingAt?: string
  deliverBy?: string
  deliveredAt?: string
  /** Live rider position (in-transit) */
  riderLat?: number
  riderLng?: number
}

function randCost(seed: number) {
  return 60 + (seed % 31)
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'BLZ-4821',
    customer: 'Priya Mehta',
    phone: '+91 98765 43210',
    address: '42, 5th Cross, HSR Layout',
    lat: 12.9120,
    lng: 77.6450,
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'ongoing',
    cost: randCost(1),
    timeTaken: 12,
    eta: '18 min',
    createdAt: '2026-06-05T10:30:00',
    cod: 2499,
    paymentStatus: 'pending',
    riderId: 'R-1042',
    riderName: 'Arjun Singh',
    assignedAt: '2026-06-05T10:35:00',
    riderArrivingAt: '2026-06-05T10:48:00',
    deliverBy: '2026-06-05T11:05:00',
    riderLat: 12.9200,
    riderLng: 77.6350,
    timeline: [
      { time: '10:30 AM', label: 'Order placed', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '10:35 AM', label: 'Rider assigned', location: 'Koramangala Hub', type: 'hub', x: 38, y: 52, lat: 12.9301, lng: 77.6182 },
      { time: '10:42 AM', label: 'Picked up', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '10:48 AM', label: 'At sorting hub', location: 'Central Hub — Indiranagar', type: 'hub', x: 55, y: 38, lat: 12.9650, lng: 77.6380 },
      { time: '10:52 AM', label: 'In transit', location: 'En route to HSR', type: 'rider', x: 72, y: 65, lat: 12.9200, lng: 77.6350 },
    ],
  },
  {
    id: 'BLZ-4819',
    customer: 'Rahul Kapoor',
    phone: '+91 91234 56789',
    address: '18, MG Road, Bengaluru',
    lat: 12.9750,
    lng: 77.6063,
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'delivered',
    cost: randCost(2),
    timeTaken: 28,
    createdAt: '2026-06-05T09:15:00',
    cod: 0,
    paymentStatus: 'remitted',
    riderId: 'R-2088',
    riderName: 'Kavya Reddy',
    assignedAt: '2026-06-05T09:20:00',
    riderArrivingAt: '2026-06-05T09:35:00',
    deliverBy: '2026-06-05T09:50:00',
    deliveredAt: '2026-06-05T09:43:00',
    timeline: [
      { time: '09:15 AM', label: 'Order placed', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '09:20 AM', label: 'Rider assigned', location: 'Koramangala Hub', type: 'hub', x: 38, y: 52, lat: 12.9301, lng: 77.6182 },
      { time: '09:28 AM', label: 'Picked up', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '09:35 AM', label: 'At sorting hub', location: 'Central Hub — Indiranagar', type: 'hub', x: 55, y: 38, lat: 12.9650, lng: 77.6380 },
      { time: '09:43 AM', label: 'Delivered', location: 'MG Road', type: 'customer', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
    ],
  },
  {
    id: 'BLZ-4817',
    customer: 'Ananya Sharma',
    phone: '+91 99887 76655',
    address: '7, Brigade Road',
    lat: 12.9650,
    lng: 77.6100,
    storeId: 'ind-02',
    storeName: 'Indiranagar Store',
    status: 'pickup_pending',
    cost: randCost(3),
    eta: '25 min',
    deliverBy: '2026-06-05T11:30:00',
    createdAt: '2026-06-05T11:00:00',
    cod: 1899,
    paymentStatus: 'pending',
    timeline: [
      { time: '11:00 AM', label: 'Order placed', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
      { time: '11:02 AM', label: 'Searching nearby riders', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
    ],
  },
  {
    id: 'BLZ-4815',
    customer: 'Vikram Desai',
    phone: '+91 97654 32109',
    address: 'Whitefield Main Road',
    lat: 12.9698,
    lng: 77.7500,
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'delivered',
    cost: randCost(4),
    timeTaken: 45,
    createdAt: '2026-06-05T08:00:00',
    cod: 3200,
    paymentStatus: 'remitted',
    riderId: 'R-3115',
    riderName: 'Rohit Menon',
    assignedAt: '2026-06-05T08:05:00',
    riderArrivingAt: '2026-06-05T08:40:00',
    deliverBy: '2026-06-05T08:55:00',
    deliveredAt: '2026-06-05T08:45:00',
    timeline: [
      { time: '08:00 AM', label: 'Order placed', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '08:05 AM', label: 'Rider assigned', location: 'Koramangala Hub', type: 'hub', x: 38, y: 52, lat: 12.9301, lng: 77.6182 },
      { time: '08:08 AM', label: 'Picked up', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '08:15 AM', label: 'At sorting hub', location: 'Central Hub — Indiranagar', type: 'hub', x: 55, y: 38, lat: 12.9650, lng: 77.6380 },
      { time: '08:28 AM', label: 'Middle mile transfer', location: 'East Hub — Whitefield', type: 'hub', x: 88, y: 30, lat: 12.9600, lng: 77.7200 },
      { time: '08:45 AM', label: 'Delivered', location: 'Whitefield', type: 'customer', x: 92, y: 28, lat: 12.9698, lng: 77.7500 },
    ],
  },
  {
    id: 'BLZ-4812',
    customer: 'Sneha Reddy',
    phone: '+91 96543 21098',
    address: 'Jayanagar 4th Block',
    lat: 12.9250,
    lng: 77.5937,
    storeId: 'ind-02',
    storeName: 'Indiranagar Store',
    status: 'returned',
    cost: randCost(5),
    timeTaken: 52,
    createdAt: '2026-06-04T14:00:00',
    cod: 0,
    paymentStatus: 'remitted',
    riderId: 'R-1844',
    riderName: 'Divya Nair',
    assignedAt: '2026-06-04T14:05:00',
    deliveredAt: '2026-06-04T14:45:00',
    timeline: [
      { time: '02:00 PM', label: 'Order placed', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
      { time: '02:45 PM', label: 'Delivered', location: 'Jayanagar', type: 'customer', x: 30, y: 78, lat: 12.9250, lng: 77.5937 },
      { time: '04:30 PM', label: 'Return initiated', location: 'Jayanagar', type: 'customer', x: 30, y: 78, lat: 12.9250, lng: 77.5937 },
      { time: '05:22 PM', label: 'Returned to store', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
    ],
  },
  {
    id: 'BLZ-4830',
    customer: 'Arjun Nair',
    phone: '+91 95432 10987',
    address: 'Electronic City Phase 1',
    lat: 12.8450,
    lng: 77.6650,
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'upcoming',
    cost: randCost(6),
    eta: 'Scheduled 2:00 PM',
    deliverBy: '2026-06-05T14:30:00',
    createdAt: '2026-06-05T12:00:00',
    cod: 4500,
    paymentStatus: 'pending',
    timeline: [
      { time: '12:00 PM', label: 'Scheduled', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
      { time: '12:02 PM', label: 'Searching nearby riders', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
    ],
  },
  {
    id: 'BLZ-4828',
    customer: 'Meera Iyer',
    phone: '+91 94321 09876',
    address: 'Malleshwaram 8th Cross',
    lat: 12.9980,
    lng: 77.5700,
    storeId: 'mgr-03',
    storeName: 'MG Road Boutique',
    status: 'ongoing',
    cost: randCost(7),
    timeTaken: 8,
    eta: '32 min',
    createdAt: '2026-06-05T10:50:00',
    cod: 1750,
    paymentStatus: 'pending',
    riderId: 'R-0921',
    riderName: 'Imran Khan',
    assignedAt: '2026-06-05T10:52:00',
    riderArrivingAt: '2026-06-05T11:05:00',
    deliverBy: '2026-06-05T11:25:00',
    riderLat: 12.9900,
    riderLng: 77.5850,
    timeline: [
      { time: '10:50 AM', label: 'Order placed', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
      { time: '10:52 AM', label: 'Rider assigned', location: 'MG Road Hub', type: 'hub', x: 45, y: 25, lat: 12.9720, lng: 77.6080 },
      { time: '10:55 AM', label: 'Picked up', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
      { time: '10:58 AM', label: 'In transit', location: 'En route to Malleshwaram', type: 'rider', x: 35, y: 18, lat: 12.9900, lng: 77.5850 },
    ],
  },
  {
    id: 'BLZ-4825',
    customer: 'Karan Malhotra',
    phone: '+91 93210 98765',
    address: 'Banashankari 2nd Stage',
    lat: 12.9180,
    lng: 77.5680,
    storeId: 'mgr-03',
    storeName: 'MG Road Boutique',
    status: 'pickup_pending',
    cost: randCost(8),
    eta: '20 min',
    deliverBy: '2026-06-05T11:40:00',
    createdAt: '2026-06-05T11:15:00',
    cod: 2100,
    paymentStatus: 'pending',
    timeline: [
      { time: '11:15 AM', label: 'Order placed', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
      { time: '11:16 AM', label: 'Searching nearby riders', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
    ],
  },
]

const MOCK_BY_ID = new Map(MOCK_ORDERS.map((o) => [o.id, o]))

/** Merge rider/tracking fields from mock seed when localStorage has stale orders */
export function hydrateOrders(stored: Order[]): Order[] {
  return stored.map((o) => {
    const seed = MOCK_BY_ID.get(o.id)
    if (!seed) return o

    const seedSearching = !seed.riderId && ['created', 'pickup_pending', 'upcoming'].includes(seed.status)
    const merged: Order = {
      ...o,
      status: o.status === 'cancelled' ? o.status : seed.status,
      timeline: seed.timeline.length > o.timeline.length ? seed.timeline : o.timeline,
      lat: o.lat ?? seed.lat,
      lng: o.lng ?? seed.lng,
      deliverBy: o.deliverBy ?? seed.deliverBy,
      eta: o.eta ?? seed.eta,
    }

    if (seedSearching) {
      merged.riderId = undefined
      merged.riderName = undefined
      merged.assignedAt = undefined
      merged.riderArrivingAt = undefined
      merged.riderLat = undefined
      merged.riderLng = undefined
      merged.deliveredAt = undefined
      return merged
    }

    return {
      ...merged,
      riderId: o.riderId ?? seed.riderId,
      riderName: o.riderName ?? seed.riderName,
      assignedAt: o.assignedAt ?? seed.assignedAt,
      riderArrivingAt: o.riderArrivingAt ?? seed.riderArrivingAt,
      deliveredAt: o.deliveredAt ?? seed.deliveredAt,
      riderLat: o.riderLat ?? seed.riderLat,
      riderLng: o.riderLng ?? seed.riderLng,
    }
  })
}

export function isSearchingRider(order: Order): boolean {
  return !order.riderId && ['created', 'pickup_pending', 'upcoming'].includes(order.status)
}

export function isInTransit(order: Order): boolean {
  return !!order.riderId && ['ongoing', 'in_transit', 'picked_up', 'assigned'].includes(order.status)
}

export function findOrdersByRiderQuery(orders: Order[], query: string): Order[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return orders.filter(
    (o) =>
      o.riderId?.toLowerCase().includes(q) ||
      o.riderName?.toLowerCase().includes(q),
  )
}

/** @deprecated use findOrdersByRiderQuery */
export function findOrdersByRiderId(orders: Order[], riderId: string): Order[] {
  return findOrdersByRiderQuery(orders, riderId)
}

export function getRiderDisplay(order: Order) {
  if (!order.riderId) return null
  const rider = getRiderById(order.riderId)
  return {
    id: order.riderId,
    name: order.riderName ?? rider?.name ?? order.riderId,
    phone: rider?.phone,
    rating: rider?.rating,
  }
}

export function getStatusLabel(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    created: 'Created',
    assigned: 'Assigned',
    picked_up: 'Picked up',
    in_transit: 'In transit',
    delivered: 'Delivered',
    failed: 'Failed',
    returned: 'Returned',
    cancelled: 'Cancelled',
    pickup_pending: 'Searching rider',
    ongoing: 'In transit',
    upcoming: 'Scheduled',
  }
  return map[status]
}

export function getStatusVariant(status: OrderStatus): 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' {
  const map: Record<OrderStatus, 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info'> = {
    created: 'info',
    assigned: 'warning',
    picked_up: 'accent',
    in_transit: 'accent',
    delivered: 'success',
    failed: 'error',
    returned: 'default',
    cancelled: 'error',
    pickup_pending: 'warning',
    ongoing: 'accent',
    upcoming: 'warning',
  }
  return map[status]
}

export function getServiceLabel(order: Order): string {
  if (order.serviceLabel) return order.serviceLabel
  if (order.serviceType === 'fastest') return 'Fastest'
  if (order.serviceType === 'same_day') return 'Same day'
  return 'Express'
}

export function getOrderAmount(order: Order): number {
  const itemTotal = (order.itemValue ?? 0) * (order.quantity ?? 1)
  return itemTotal > 0 ? itemTotal : order.cost
}

export function isActiveStatus(status: OrderStatus): boolean {
  return ['created', 'assigned', 'picked_up', 'in_transit', 'pickup_pending', 'ongoing', 'upcoming'].includes(status)
}

export function getStoreCenter(order: Order): { lat: number; lng: number } {
  const store = order.timeline.find((e) => e.type === 'store')
  return store ? { lat: store.lat, lng: store.lng } : { lat: order.lat ?? 12.97, lng: order.lng ?? 77.64 }
}

export function getCustomerCenter(order: Order): { lat: number; lng: number } | null {
  const drop = order.timeline.find((e) => e.type === 'customer')
  if (drop) return { lat: drop.lat, lng: drop.lng }
  if (order.lat && order.lng) return { lat: order.lat, lng: order.lng }
  return null
}
