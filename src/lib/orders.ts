export type OrderStatus = 'pickup_pending' | 'ongoing' | 'delivered' | 'returned' | 'cancelled' | 'upcoming'

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
  customer: string
  phone: string
  address: string
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
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'ongoing',
    cost: randCost(1),
    timeTaken: 12,
    eta: '18 min',
    createdAt: '2026-06-05T10:30:00',
    cod: 2499,
    paymentStatus: 'pending',
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
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'delivered',
    cost: randCost(2),
    timeTaken: 28,
    createdAt: '2026-06-05T09:15:00',
    cod: 0,
    paymentStatus: 'remitted',
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
    storeId: 'ind-02',
    storeName: 'Indiranagar Store',
    status: 'pickup_pending',
    cost: randCost(3),
    eta: '25 min',
    createdAt: '2026-06-05T11:00:00',
    cod: 1899,
    paymentStatus: 'pending',
    timeline: [
      { time: '11:00 AM', label: 'Order placed', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
      { time: '11:02 AM', label: 'Awaiting pickup', location: 'Indiranagar Store', type: 'store', x: 58, y: 42, lat: 12.9784, lng: 77.6408 },
    ],
  },
  {
    id: 'BLZ-4815',
    customer: 'Vikram Desai',
    phone: '+91 97654 32109',
    address: 'Whitefield Main Road',
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'delivered',
    cost: randCost(4),
    timeTaken: 45,
    createdAt: '2026-06-05T08:00:00',
    cod: 3200,
    paymentStatus: 'remitted',
    timeline: [
      { time: '08:00 AM', label: 'Order placed', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
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
    storeId: 'ind-02',
    storeName: 'Indiranagar Store',
    status: 'returned',
    cost: randCost(5),
    timeTaken: 52,
    createdAt: '2026-06-04T14:00:00',
    cod: 0,
    paymentStatus: 'remitted',
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
    storeId: 'krm-01',
    storeName: 'Koramangala Flagship',
    status: 'upcoming',
    cost: randCost(6),
    eta: 'Scheduled 2:00 PM',
    createdAt: '2026-06-05T12:00:00',
    cod: 4500,
    paymentStatus: 'pending',
    timeline: [
      { time: '12:00 PM', label: 'Scheduled', location: 'Koramangala Flagship', type: 'store', x: 22, y: 58, lat: 12.9352, lng: 77.6245 },
    ],
  },
  {
    id: 'BLZ-4828',
    customer: 'Meera Iyer',
    phone: '+91 94321 09876',
    address: 'Malleshwaram 8th Cross',
    storeId: 'mgr-03',
    storeName: 'MG Road Boutique',
    status: 'ongoing',
    cost: randCost(7),
    timeTaken: 8,
    eta: '32 min',
    createdAt: '2026-06-05T10:50:00',
    cod: 1750,
    paymentStatus: 'pending',
    timeline: [
      { time: '10:50 AM', label: 'Order placed', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
      { time: '10:55 AM', label: 'Picked up', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
      { time: '10:58 AM', label: 'In transit', location: 'En route to Malleshwaram', type: 'rider', x: 35, y: 18, lat: 12.9900, lng: 77.5850 },
    ],
  },
  {
    id: 'BLZ-4825',
    customer: 'Karan Malhotra',
    phone: '+91 93210 98765',
    address: 'Banashankari 2nd Stage',
    storeId: 'mgr-03',
    storeName: 'MG Road Boutique',
    status: 'pickup_pending',
    cost: randCost(8),
    eta: '20 min',
    createdAt: '2026-06-05T11:15:00',
    cod: 2100,
    paymentStatus: 'pending',
    timeline: [
      { time: '11:15 AM', label: 'Order placed', location: 'MG Road Boutique', type: 'store', x: 48, y: 22, lat: 12.9750, lng: 77.6063 },
    ],
  },
]

export function getStatusLabel(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pickup_pending: 'Pickup pending',
    ongoing: 'In transit',
    delivered: 'Delivered',
    returned: 'Returned',
    cancelled: 'Cancelled',
    upcoming: 'Upcoming',
  }
  return map[status]
}

export function getStatusVariant(status: OrderStatus): 'default' | 'accent' | 'success' | 'warning' | 'error' {
  const map: Record<OrderStatus, 'default' | 'accent' | 'success' | 'warning' | 'error'> = {
    pickup_pending: 'warning',
    ongoing: 'accent',
    delivered: 'success',
    returned: 'default',
    cancelled: 'error',
    upcoming: 'default',
  }
  return map[status]
}
