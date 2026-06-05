import { PINCODE_DATA } from './utils'
import type { Store } from './stores'

export interface ContactSuggestion {
  name: string
  phone: string
  email?: string
  orderCount: number
}

export interface AddressSuggestion {
  id: string
  line1: string
  line2?: string
  landmark?: string
  pincode: string
  city: string
  lat?: number
  lng?: number
  usedCount: number
}

export const CONTACT_SUGGESTIONS: ContactSuggestion[] = [
  { name: 'Aryan Kapoor', phone: '9876543210', email: 'aryan@email.com', orderCount: 12 },
  { name: 'Priya Mehta', phone: '9876543210', email: 'priya.m@email.com', orderCount: 8 },
  { name: 'Rahul Kapoor', phone: '9123456789', orderCount: 5 },
  { name: 'Ananya Sharma', phone: '9988776655', email: 'ananya.s@email.com', orderCount: 4 },
  { name: 'Sneha Reddy', phone: '9654321098', orderCount: 3 },
]

export const FREQUENT_ADDRESSES: AddressSuggestion[] = [
  { id: 'addr-1', line1: 'House 42, 5th Main Road', line2: 'Indiranagar', landmark: 'Near Empire Restaurant', pincode: '560038', city: 'Bengaluru', lat: 12.9784, lng: 77.6408, usedCount: 14 },
  { id: 'addr-2', line1: '18, MG Road', line2: 'Shanthala Nagar', pincode: '560001', city: 'Bengaluru', lat: 12.9750, lng: 77.6063, usedCount: 9 },
  { id: 'addr-3', line1: '7, Brigade Road', pincode: '560001', city: 'Bengaluru', lat: 12.9716, lng: 77.6070, usedCount: 7 },
  { id: 'addr-4', line1: '42, 5th Cross', line2: 'HSR Layout Sector 2', pincode: '560102', city: 'Bengaluru', lat: 12.9121, lng: 77.6446, usedCount: 6 },
  { id: 'addr-5', line1: 'Whitefield Main Road', line2: 'ITPL Road', landmark: 'Opposite Phoenix Mall', pincode: '560066', city: 'Bengaluru', lat: 12.9698, lng: 77.7500, usedCount: 5 },
]

const BENGALURU_PINCODES = ['560001', '560034', '560038', '560066', '560102', '560095', '560078', '560041']

export function lookupPincode(pincode: string) {
  if (pincode.length !== 6) return null
  return PINCODE_DATA[pincode] ?? (BENGALURU_PINCODES.includes(pincode) ? { city: 'Bengaluru', state: 'Karnataka' } : null)
}

export function searchAddresses(query: string): AddressSuggestion[] {
  const q = query.toLowerCase().trim()
  if (q.length < 3) return []
  return FREQUENT_ADDRESSES.filter(
    (a) =>
      a.line1.toLowerCase().includes(q) ||
      a.line2?.toLowerCase().includes(q) ||
      a.landmark?.toLowerCase().includes(q) ||
      a.pincode.includes(q)
  ).slice(0, 4)
}

export function parseVoiceAddress(transcript: string): Partial<AddressSuggestion> {
  const text = transcript.trim()
  const pinMatch = text.match(/\b(\d{6})\b/)
  const pincode = pinMatch?.[1] ?? '560038'
  const city = lookupPincode(pincode)?.city ?? 'Bengaluru'

  const nearMatch = text.match(/near\s+(.+?)(?:,|$)/i)
  const landmark = nearMatch?.[1]?.trim()

  const parts = text.split(/,\s*/).filter(Boolean)
  const line1 = parts[0] ?? text

  return {
    line1,
    line2: parts[1],
    landmark,
    pincode,
    city,
  }
}

export type DeliveryOptionId = 'fastest' | 'same_day'

export interface DeliveryOption {
  id: DeliveryOptionId
  label: string
  eta: string
  price: number
  description: string
  recommended?: boolean
}

export interface ServiceabilityResult {
  serviceable: boolean
  confidence: 'high' | 'medium' | 'low'
  zone: string
  options: DeliveryOption[]
  distanceKm: number
}

function hashPin(pin: string, storeId: string): number {
  let h = 0
  const s = pin + storeId
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000
  return h
}

export async function calculateServiceability(
  pincode: string,
  addressLine1: string,
  store: Store,
  _itemValue?: number
): Promise<ServiceabilityResult> {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))

  if (pincode.length !== 6 || addressLine1.trim().length < 5) {
    return { serviceable: false, confidence: 'low', zone: '', options: [], distanceKm: 0 }
  }

  const seed = hashPin(pincode, store.id)
  const distanceKm = 3 + (seed % 18)
  const trafficFactor = 1 + (seed % 5) * 0.08
  const baseFast = 75 + Math.round(distanceKm * 2.2 * trafficFactor)
  const baseSame = 65 + Math.round(distanceKm * 1.6)

  const hours = Math.floor((192 + seed % 90) / 60)
  const mins = (192 + seed % 90) % 60

  const zones = ['Indiranagar Core', 'Koramangala Hub', 'HSR Corridor', 'Whitefield East', 'MG Road Central']
  const zone = zones[seed % zones.length]

  return {
    serviceable: true,
    confidence: distanceKm < 12 ? 'high' : distanceKm < 20 ? 'medium' : 'low',
    zone,
    distanceKm,
    options: [
      {
        id: 'fastest',
        label: 'Fastest Delivery',
        eta: `${hours} hrs ${mins} mins`,
        price: Math.min(baseFast, 149),
        description: 'Best for urgent deliveries.',
        recommended: true,
      },
      {
        id: 'same_day',
        label: 'Delivered by 11:00 PM',
        eta: 'Today by 11:00 PM',
        price: Math.min(baseSame, 129),
        description: 'Most economical option.',
      },
    ],
  }
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  if (digits.length === 12 && digits.startsWith('91')) {
    const d = digits.slice(2)
    return `+91 ${d.slice(0, 5)} ${d.slice(5)}`
  }
  return phone
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 || (digits.length === 12 && digits.startsWith('91'))
}

export function findRepeatCustomer(name: string, phone: string): ContactSuggestion | undefined {
  const digits = phone.replace(/\D/g, '').slice(-10)
  return CONTACT_SUGGESTIONS.find(
    (c) => c.name.toLowerCase() === name.toLowerCase().trim() || c.phone.endsWith(digits)
  )
}
