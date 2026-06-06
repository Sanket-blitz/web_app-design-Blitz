import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, Circle, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Crosshair, Loader2 } from 'lucide-react'
import { fetchOsrmRoute, type LatLng } from '../../lib/osrm'
import { BENGALURU_CENTER } from '../../lib/locations'
import type { MapMarkerIcon, TrackingCircle, TrackingRoute } from '../../lib/orderTracking'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import 'leaflet/dist/leaflet.css'

export interface OsrmMapMarker {
  position: LatLng
  label?: string
  color?: string
  icon?: MapMarkerIcon
}

interface OsrmMapProps {
  className?: string
  height?: string
  center?: LatLng
  zoom?: number
  pinMode?: boolean
  onPin?: (coords: LatLng) => void
  /** Legacy single route */
  waypoints?: LatLng[]
  markers?: OsrmMapMarker[]
  /** Multi-route support (rider path, full path, etc.) */
  routes?: TrackingRoute[]
  /** Geofence circles — Uber-style search zone */
  circles?: TrackingCircle[]
  mapLabel?: string
  interactive?: boolean
}

function MapResizer() {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200)
    return () => clearTimeout(t)
  }, [map])
  return null
}

function PinClickHandler({ onPin }: { onPin: (c: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPin({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

function MapRecenter({ center, zoom }: { center: LatLng; zoom: number }) {
  const map = useMap()
  const prev = useRef(center)

  useEffect(() => {
    if (prev.current.lat !== center.lat || prev.current.lng !== center.lng) {
      map.flyTo([center.lat, center.lng], zoom, { duration: 0.75 })
      prev.current = center
    }
  }, [center.lat, center.lng, zoom, map])

  return null
}

function PulsingFence({ center, radiusMeters }: { center: LatLng; radiusMeters: number }) {
  const map = useMap()
  const layerRef = useRef<L.Circle | null>(null)

  useEffect(() => {
    const circle = L.circle([center.lat, center.lng], {
      radius: radiusMeters,
      color: '#3b6fd9',
      fillColor: '#3b6fd9',
      fillOpacity: 0.06,
      weight: 2,
      dashArray: '10 8',
    })
    circle.addTo(map)
    layerRef.current = circle

    let growing = true
    let r = radiusMeters
    const id = window.setInterval(() => {
      r = growing ? r + 8 : r - 8
      if (r >= radiusMeters + 80) growing = false
      if (r <= radiusMeters) growing = true
      circle.setRadius(r)
      circle.setStyle({ fillOpacity: 0.04 + (r - radiusMeters) / 800 })
    }, 120)

    return () => {
      window.clearInterval(id)
      circle.remove()
    }
  }, [map, center.lat, center.lng, radiusMeters])

  return null
}

const markerColors: Record<string, string> = {
  store: '#1d1d1f',
  hub: '#3b6fd9',
  rider: '#1a7f4b',
  customer: '#b45309',
  default: '#3b6fd9',
}

const bikeIconHtml = `
<div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:#1a7f4b;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.25)">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V9l-3-3H4"/>
    <path d="M9 9h4l3 5"/>
  </svg>
</div>`

const storeIconHtml = `<div style="width:12px;height:12px;background:#1d1d1f;border:2.5px solid #fff;border-radius:2px;box-shadow:0 2px 6px rgba(0,0,0,.25)"></div>`
const customerIconHtml = `<div style="width:14px;height:14px;background:#b45309;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.25)"></div>`
const hubIconHtml = `<div style="width:12px;height:12px;background:#3b6fd9;border:2.5px solid #fff;border-radius:3px;box-shadow:0 2px 6px rgba(0,0,0,.25)"></div>`

function makeDivIcon(html: string, size: number, anchor: number) {
  return L.divIcon({ className: '', html, iconSize: [size, size], iconAnchor: [anchor, anchor] })
}

const iconMap: Partial<Record<MapMarkerIcon, L.DivIcon>> = {
  bike: makeDivIcon(bikeIconHtml, 28, 14),
  store: makeDivIcon(storeIconHtml, 12, 6),
  customer: makeDivIcon(customerIconHtml, 14, 7),
  hub: makeDivIcon(hubIconHtml, 12, 6),
}

const EMPTY_WAYPOINTS: LatLng[] = []
const EMPTY_MARKERS: OsrmMapMarker[] = []
const EMPTY_ROUTES: TrackingRoute[] = []
const EMPTY_CIRCLES: TrackingCircle[] = []

export function OsrmMap({
  className,
  height = 'h-48',
  center = BENGALURU_CENTER,
  zoom = 12,
  pinMode = false,
  onPin,
  waypoints = EMPTY_WAYPOINTS,
  markers = EMPTY_MARKERS,
  routes = EMPTY_ROUTES,
  circles = EMPTY_CIRCLES,
  mapLabel,
  interactive = true,
}: OsrmMapProps) {
  const [pin, setPin] = useState<LatLng | null>(null)
  const [resolvedRoutes, setResolvedRoutes] = useState<{ points: LatLng[]; color: string; dashed?: boolean; weight: number }[]>([])
  const [loading, setLoading] = useState(false)

  const activeRoutes = useMemo((): TrackingRoute[] => {
    if (routes.length > 0) return routes
    if (waypoints.length >= 2) return [{ waypoints, color: '#3b6fd9', weight: 4 }]
    return []
  }, [routes, waypoints])

  const loadRoutes = useCallback(async (routeList: TrackingRoute[]) => {
    if (routeList.length === 0) {
      setResolvedRoutes([])
      return
    }
    setLoading(true)
    const resolved = await Promise.all(
      routeList.map(async (r) => {
        if (r.waypoints.length < 2) return { points: r.waypoints, color: r.color ?? '#3b6fd9', dashed: r.dashed, weight: r.weight ?? 4 }
        const points = await fetchOsrmRoute(r.waypoints)
        return { points, color: r.color ?? '#3b6fd9', dashed: r.dashed, weight: r.weight ?? 4 }
      }),
    )
    setResolvedRoutes(resolved)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadRoutes(activeRoutes)
  }, [activeRoutes, loadRoutes])

  useEffect(() => {
    if (pinMode) setPin(center)
  }, [pinMode, center.lat, center.lng, center])

  const handlePin = (coords: LatLng) => {
    setPin(coords)
    onPin?.(coords)
  }

  const handleSetLocation = () => {
    const c = { lat: 12.9352 + (Math.random() - 0.5) * 0.02, lng: 77.6245 + (Math.random() - 0.5) * 0.02 }
    handlePin(c)
  }

  const allPoints = [
    ...activeRoutes.flatMap((r) => r.waypoints),
    ...markers.map((m) => m.position),
    ...circles.map((c) => c.center),
  ]
  const mapCenter = pin ?? (allPoints[0] ?? center)
  const displayMarkers = markers.length > 0
    ? markers
    : pin ? [{ position: pin, label: 'Pinned', color: 'default', icon: 'circle' as const }] : []

  return (
    <div className={cn('relative z-0 isolate overflow-hidden rounded-[var(--radius-lg)] border border-border contain-paint', height, className)}>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        className="h-full w-full !z-0"
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · Route by <a href="https://project-osrm.org/">OSRM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizer />
        <MapRecenter center={mapCenter} zoom={zoom} />
        {pinMode && <PinClickHandler onPin={handlePin} />}

        {circles.map((c, i) =>
          c.pulse ? (
            <PulsingFence key={`pulse-${i}`} center={c.center} radiusMeters={c.radiusMeters} />
          ) : (
            <Circle
              key={`circle-${i}`}
              center={[c.center.lat, c.center.lng]}
              radius={c.radiusMeters}
              pathOptions={{
                color: '#3b6fd9',
                fillColor: '#3b6fd9',
                fillOpacity: 0.05,
                weight: 1.5,
                dashArray: '6 6',
              }}
            />
          ),
        )}

        {resolvedRoutes.map((r, i) =>
          r.points.length > 1 && (
            <Polyline
              key={i}
              positions={r.points.map((p) => [p.lat, p.lng] as [number, number])}
              pathOptions={{
                color: r.color,
                weight: r.weight,
                opacity: 0.85,
                dashArray: r.dashed ? '8 6' : undefined,
              }}
            />
          ),
        )}

        {displayMarkers.map((m, i) => {
          const divIcon = m.icon && m.icon !== 'circle' ? iconMap[m.icon] : undefined
          if (divIcon) {
            return <Marker key={i} position={[m.position.lat, m.position.lng]} icon={divIcon} />
          }
          return (
            <CircleMarker
              key={i}
              center={[m.position.lat, m.position.lng]}
              radius={8}
              pathOptions={{
                fillColor: m.color ? markerColors[m.color] ?? m.color : markerColors.default,
                fillOpacity: 1,
                color: '#fff',
                weight: 2,
              }}
            />
          )
        })}

        {pin && pinMode && (
          <Marker
            position={[pin.lat, pin.lng]}
            icon={makeDivIcon(
              `<div style="background:#3b6fd9;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
              14,
              7,
            )}
          />
        )}
      </MapContainer>

      {mapLabel && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-charcoal dark:text-zinc-100 shadow-sm pointer-events-none border border-border/60">
          {mapLabel.includes('Searching') && (
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          )}
          {mapLabel}
        </div>
      )}

      {loading && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 dark:bg-surface/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs text-graphite shadow-sm pointer-events-none">
          <Loader2 className="h-3 w-3 animate-spin" />
          Routing
        </div>
      )}

      {pinMode && !pin && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-2 bg-white/90 dark:bg-surface/90 backdrop-blur-sm px-6 py-4 rounded-[var(--radius-lg)] shadow-md pointer-events-auto max-w-[90%]">
            <Crosshair className="h-5 w-5 text-accent mx-auto" />
            <p className="text-sm text-charcoal">Click map or pin location</p>
            <Button variant="outline" size="sm" onClick={handleSetLocation}>
              Set Location
            </Button>
          </div>
        </div>
      )}

      {pin && pinMode && (
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between bg-white/95 dark:bg-surface/95 backdrop-blur-sm px-3 py-2 rounded-[var(--radius-md)] border border-border text-xs shadow-sm pointer-events-auto">
          <span className="text-graphite font-mono">
            {pin.lat.toFixed(4)}° N, {pin.lng.toFixed(4)}° E
          </span>
          <button onClick={handleSetLocation} className="text-accent hover:text-accent-hover font-medium">
            Adjust
          </button>
        </div>
      )}
    </div>
  )
}
