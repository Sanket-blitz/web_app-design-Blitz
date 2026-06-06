import type { LatLng } from './osrm'
import type { Order } from './orders'
import {
  getCustomerCenter,
  getStoreCenter,
  isInTransit,
  isSearchingRider,
} from './orders'
import { generateNearbyRiders } from './riders'

export type MapMarkerIcon = 'circle' | 'bike' | 'store' | 'customer' | 'hub'

export interface TrackingMarker {
  position: LatLng
  label?: string
  color?: string
  icon?: MapMarkerIcon
}

export interface TrackingRoute {
  waypoints: LatLng[]
  color?: string
  dashed?: boolean
  weight?: number
}

export interface TrackingCircle {
  center: LatLng
  radiusMeters: number
  pulse?: boolean
}

export interface OrderMapState {
  routes: TrackingRoute[]
  markers: TrackingMarker[]
  circles: TrackingCircle[]
  mode: 'searching' | 'transit' | 'delivered' | 'default'
  mapLabel?: string
}

export function buildOrderMapState(order: Order): OrderMapState {
  const store = getStoreCenter(order)
  const customer = getCustomerCenter(order)

  if (isSearchingRider(order)) {
    const nearby = generateNearbyRiders(store, 6, order.id.length)
    return {
      mode: 'searching',
      mapLabel: 'Searching nearby riders…',
      circles: [
        { center: store, radiusMeters: 650, pulse: true },
        { center: store, radiusMeters: 1100, pulse: false },
      ],
      markers: [
        { position: store, label: order.storeName, color: 'store', icon: 'store' },
        ...nearby.map((p, i) => ({
          position: p,
          label: `Rider nearby ${i + 1}`,
          color: 'rider',
          icon: 'bike' as const,
        })),
      ],
      routes: [],
    }
  }

  if (isInTransit(order)) {
    const riderPos =
      order.riderLat && order.riderLng
        ? { lat: order.riderLat, lng: order.riderLng }
        : order.timeline.filter((e) => e.type === 'rider').at(-1) ?? store

    const riderLeg: LatLng[] = [store, riderPos]
    if (customer) riderLeg.push(customer)

    const fullRoute = order.timeline.map((e) => ({ lat: e.lat, lng: e.lng }))

    return {
      mode: 'transit',
      mapLabel: `${order.riderName ?? 'Rider'} en route`,
      circles: customer
        ? [{ center: customer, radiusMeters: 400, pulse: false }]
        : [],
      routes: [
        { waypoints: fullRoute, color: '#94a3b8', dashed: true, weight: 3 },
        { waypoints: riderLeg, color: '#1a7f4b', weight: 5 },
      ],
      markers: [
        { position: store, label: order.storeName, color: 'store', icon: 'store' },
        { position: riderPos, label: order.riderName ?? 'Rider', color: 'rider', icon: 'bike' },
        ...(customer
          ? [{ position: customer, label: order.customer, color: 'customer', icon: 'customer' as const }]
          : []),
      ],
    }
  }

  if (order.status === 'delivered') {
    const waypoints = order.timeline.map((e) => ({ lat: e.lat, lng: e.lng }))
    return {
      mode: 'delivered',
      mapLabel: 'Delivery completed',
      circles: [],
      routes: [{ waypoints, color: '#1a7f4b', weight: 4 }],
      markers: order.timeline.map((e) => ({
        position: { lat: e.lat, lng: e.lng },
        label: e.location,
        color: e.type,
        icon: e.type === 'rider' ? 'bike' : e.type === 'customer' ? 'customer' : e.type === 'store' ? 'store' : 'hub',
      })),
    }
  }

  const waypoints = order.timeline.map((e) => ({ lat: e.lat, lng: e.lng }))
  return {
    mode: 'default',
    routes: waypoints.length >= 2 ? [{ waypoints, color: '#3b6fd9', weight: 4 }] : [],
    circles: [],
    markers: order.timeline.map((e) => ({
      position: { lat: e.lat, lng: e.lng },
      label: e.location,
      color: e.type,
      icon: 'circle' as const,
    })),
  }
}
