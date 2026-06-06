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
  /** CSS overlay fence — always visible on top of map tiles */
  fenceMode?: 'search' | 'transit' | 'none'
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

  useEffect(() => {
    const circle = L.circle([center.lat, center.lng], {
      radius: radiusMeters,
      color: '#7c3aed',
      fillColor: '#8b5cf6',
      fillOpacity: 0.18,
      weight: 3,
      dashArray: '12 8',
    })
    circle.addTo(map)
    circle.bringToFront()

    let growing = true
    let r = radiusMeters
    const id = window.setInterval(() => {
      r = growing ? r + 12 : r - 12
      if (r >= radiusMeters + 120) growing = false
      if (r <= radiusMeters) growing = true
      circle.setRadius(r)
      circle.setStyle({ fillOpacity: 0.12 + (r - radiusMeters) / 600 })
    }, 100)

    return () => {
      window.clearInterval(id)
      circle.remove()
    }
  }, [map, center.lat, center.lng, radiusMeters])

  return null
}

function StaticFence({ center, radiusMeters }: { center: LatLng; radiusMeters: number }) {
  return (
    <Circle
      center={[center.lat, center.lng]}
      radius={radiusMeters}
      pathOptions={{
        color: '#7c3aed',
        fillColor: '#8b5cf6',
        fillOpacity: 0.1,
        weight: 2.5,
        dashArray: '8 8',
      }}
    />
  )
}

function MapFitBounds({ points }: { points: LatLng[] }) {
  const map = useMap()
  const pointsKey = points.map((p) => `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`).join('|')

  useEffect(() => {
    if (!pointsKey) return
    const t = setTimeout(() => {
      const pts = pointsKey.split('|').map((s) => {
        const [lat, lng] = s.split(',').map(Number)
        return { lat, lng }
      })
      if (pts.length === 1) {
        map.setView([pts[0].lat, pts[0].lng], 14, { animate: false })
      } else {
        const bounds = L.latLngBounds(pts.map((p) => [p.lat, p.lng] as [number, number]))
        map.fitBounds(bounds.pad(0.35), { maxZoom: 15, animate: false })
      }
      map.invalidateSize()
    }, 350)
    return () => clearTimeout(t)
  }, [map, pointsKey, points])

  return null
}

function GeofenceOverlay({ mode }: { mode: 'search' | 'transit' }) {
  const isSearch = mode === 'search'
  return (
    <div className="absolute inset-0 pointer-events-none z-[400] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'absolute left-0 top-0 rounded-full border-2 animate-geofence-ring',
              isSearch
                ? 'border-violet-500 bg-violet-500/15'
                : 'border-emerald-500 bg-emerald-500/15',
            )}
            style={{
              width: isSearch ? 'min(72vw, 280px)' : 'min(56vw, 220px)',
              height: isSearch ? 'min(72vw, 280px)' : 'min(56vw, 220px)',
              animationDelay: `${i * 0.85}s`,
            }}
          />
        ))}
        <span
          className={cn(
            'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-lg',
            isSearch ? 'bg-violet-600' : 'bg-emerald-600',
          )}
        />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-violet-300/50 dark:border-violet-600/40 text-[9px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300 shadow-sm">
        {isSearch ? 'Scanning · 1.4 km' : 'Live zone'}
      </div>
    </div>
  )
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
  fenceMode = 'none',
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

  const fitPoints = useMemo(() => {
    const pts = [...markers.map((m) => m.position), ...circles.map((c) => c.center)]
    for (const c of circles) {
      const d = c.radiusMeters / 111320
      pts.push({ lat: c.center.lat + d, lng: c.center.lng })
      pts.push({ lat: c.center.lat - d, lng: c.center.lng })
    }
    return pts
  }, [markers, circles])

  const showFence = fenceMode === 'search' || fenceMode === 'transit'

  return (
    <div className={cn('relative z-0 isolate overflow-hidden rounded-[var(--radius-lg)] border border-border', height, className)}>
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
        <MapFitBounds points={fitPoints} />
        {pinMode && <PinClickHandler onPin={handlePin} />}

        {circles.map((c, i) =>
          c.pulse ? (
            <PulsingFence key={`pulse-${i}`} center={c.center} radiusMeters={c.radiusMeters} />
          ) : (
            <StaticFence key={`circle-${i}`} center={c.center} radiusMeters={c.radiusMeters} />
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

      {showFence && <GeofenceOverlay mode={fenceMode} />}

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
