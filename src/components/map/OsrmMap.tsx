import { useEffect, useState, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Crosshair, Loader2 } from 'lucide-react'
import { fetchOsrmRoute, type LatLng } from '../../lib/osrm'
import { BENGALURU_CENTER } from '../../lib/locations'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import 'leaflet/dist/leaflet.css'

interface OsrmMapProps {
  className?: string
  height?: string
  center?: LatLng
  zoom?: number
  /** Pin picker mode — click to set location */
  pinMode?: boolean
  onPin?: (coords: LatLng) => void
  /** Route waypoints to draw via OSRM */
  waypoints?: LatLng[]
  markers?: { position: LatLng; label?: string; color?: string }[]
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

const markerColors: Record<string, string> = {
  store: '#1d1d1f',
  hub: '#3b6fd9',
  rider: '#1a7f4b',
  customer: '#b45309',
  default: '#3b6fd9',
}

export function OsrmMap({
  className,
  height = 'h-48',
  center = BENGALURU_CENTER,
  zoom = 12,
  pinMode = false,
  onPin,
  waypoints = [],
  markers = [],
  interactive = true,
}: OsrmMapProps) {
  const [pin, setPin] = useState<LatLng | null>(null)
  const [route, setRoute] = useState<LatLng[]>([])
  const [loading, setLoading] = useState(false)

  const loadRoute = useCallback(async (points: LatLng[]) => {
    if (points.length < 2) {
      setRoute(points)
      return
    }
    setLoading(true)
    const result = await fetchOsrmRoute(points)
    setRoute(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (waypoints.length >= 2) loadRoute(waypoints)
    else setRoute(waypoints)
  }, [waypoints, loadRoute])

  const handlePin = (coords: LatLng) => {
    setPin(coords)
    onPin?.(coords)
  }

  const handleSetLocation = () => {
    const c = { lat: 12.9352 + (Math.random() - 0.5) * 0.02, lng: 77.6245 + (Math.random() - 0.5) * 0.02 }
    handlePin(c)
  }

  const mapCenter = pin ?? (waypoints[0] ?? center)
  const displayMarkers = markers.length > 0
    ? markers
    : pin ? [{ position: pin, label: 'Pinned', color: 'default' }] : []

  return (
    <div className={cn('relative rounded-[var(--radius-lg)] border border-border overflow-hidden', height, className)}>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        className="h-full w-full z-0"
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
        {pinMode && <PinClickHandler onPin={handlePin} />}

        {route.length > 1 && (
          <Polyline
            positions={route.map((p) => [p.lat, p.lng] as [number, number])}
            pathOptions={{ color: '#3b6fd9', weight: 4, opacity: 0.8, dashArray: waypoints.length > 2 ? undefined : '8 6' }}
          />
        )}

        {displayMarkers.map((m, i) => (
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
        ))}

        {pin && pinMode && (
          <Marker position={[pin.lat, pin.lng]} icon={L.divIcon({
            className: '',
            html: `<div style="background:#3b6fd9;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })} />
        )}
      </MapContainer>

      {loading && (
        <div className="absolute top-3 right-3 z-[500] flex items-center gap-1.5 bg-white/90 dark:bg-surface/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs text-graphite shadow-sm">
          <Loader2 className="h-3 w-3 animate-spin" />
          OSRM routing
        </div>
      )}

      {pinMode && !pin && (
        <div className="absolute inset-0 z-[400] flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-2 bg-white/90 dark:bg-surface/90 backdrop-blur-sm px-6 py-4 rounded-[var(--radius-lg)] shadow-md pointer-events-auto">
            <Crosshair className="h-5 w-5 text-accent mx-auto" />
            <p className="text-sm text-charcoal">Click map or pin location</p>
            <Button variant="outline" size="sm" onClick={handleSetLocation}>
              Set Location
            </Button>
          </div>
        </div>
      )}

      {pin && pinMode && (
        <div className="absolute bottom-3 left-3 right-3 z-[500] flex items-center justify-between bg-white/95 dark:bg-surface/95 backdrop-blur-sm px-3 py-2 rounded-[var(--radius-md)] border border-border text-xs shadow-sm">
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
