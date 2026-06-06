import type { LatLng } from './osrm'

export interface Rider {
  id: string
  name: string
  phone: string
  rating: number
  vehicle: string
}

export const MOCK_RIDERS: Rider[] = [
  { id: 'R-1042', name: 'Arjun Singh', phone: '+91 98765 11042', rating: 4.9, vehicle: 'Bike' },
  { id: 'R-2088', name: 'Kavya Reddy', phone: '+91 98765 22088', rating: 4.8, vehicle: 'Bike' },
  { id: 'R-3115', name: 'Rohit Menon', phone: '+91 98765 33115', rating: 4.7, vehicle: 'Bike' },
  { id: 'R-1844', name: 'Divya Nair', phone: '+91 98765 11844', rating: 4.6, vehicle: 'Bike' },
  { id: 'R-0921', name: 'Imran Khan', phone: '+91 98765 10921', rating: 4.9, vehicle: 'Bike' },
  { id: 'R-3301', name: 'Neha Patel', phone: '+91 98765 33301', rating: 4.8, vehicle: 'Bike' },
  { id: 'R-4477', name: 'Suresh Kumar', phone: '+91 98765 44477', rating: 4.5, vehicle: 'Bike' },
  { id: 'R-5512', name: 'Pooja Sharma', phone: '+91 98765 55512', rating: 4.7, vehicle: 'Bike' },
]

export function getRiderById(id: string): Rider | undefined {
  return MOCK_RIDERS.find((r) => r.id.toLowerCase() === id.toLowerCase())
}

/** Scatter bike markers around a center — simulates nearby rider search */
export function generateNearbyRiders(center: LatLng, count = 5, seed = 0): LatLng[] {
  const points: LatLng[] = []
  for (let i = 0; i < count; i++) {
    const angle = ((i * 72 + seed * 17) * Math.PI) / 180
    const dist = 0.003 + (i % 3) * 0.0018
    points.push({
      lat: center.lat + Math.sin(angle) * dist,
      lng: center.lng + Math.cos(angle) * dist,
    })
  }
  return points
}

export function formatOrderTime(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

export function formatClockTime(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}
