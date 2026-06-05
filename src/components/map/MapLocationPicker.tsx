import { useCallback, useEffect, useState } from 'react'
import { Loader2, MapPin, Search } from 'lucide-react'
import { Button } from '../ui/Button'
import { OsrmMap } from './OsrmMap'
import { geocodeAddress } from '../../lib/geocode'
import { BENGALURU_CENTER } from '../../lib/locations'
import type { LatLng } from '../../lib/osrm'

interface MapLocationPickerProps {
  initialSearch?: string
  initialCoords?: LatLng
  mapHeight?: string
  mapZoom?: number
  markerLabel?: string
  markerColor?: string
  autoSearchOnMount?: boolean
  onCoordsChange?: (coords: LatLng) => void
  onSearchChange?: (query: string) => void
}

export function MapLocationPicker({
  initialSearch = '',
  initialCoords,
  mapHeight = 'h-44',
  mapZoom = 15,
  markerLabel = 'Pinned location',
  markerColor = 'store',
  autoSearchOnMount = false,
  onCoordsChange,
  onSearchChange,
}: MapLocationPickerProps) {
  const [coords, setCoords] = useState<LatLng>(initialCoords ?? BENGALURU_CENTER)
  const [search, setSearch] = useState(initialSearch)
  const [resolvedLabel, setResolvedLabel] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  const updateCoords = useCallback(
    (next: LatLng) => {
      setCoords(next)
      onCoordsChange?.(next)
    },
    [onCoordsChange]
  )

  const runSearch = useCallback(async (query?: string) => {
    const q = (query ?? search).trim()
    if (q.length < 2) {
      setSearchError('Enter at least 2 characters to search')
      return
    }

    setSearching(true)
    setSearchError('')
    setResolvedLabel('')

    const result = await geocodeAddress(q)
    setSearching(false)

    if (!result) {
      setSearchError('Location not found. Try a Bengaluru area or landmark.')
      return
    }

    updateCoords({ lat: result.lat, lng: result.lng })
    setResolvedLabel(result.label)
  }, [search, updateCoords])

  useEffect(() => {
    if (autoSearchOnMount && initialSearch.trim().length >= 2) {
      void runSearch(initialSearch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount when seeded
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite dark:text-zinc-400 z-10 pointer-events-none" />
          <input
            type="text"
            className="w-full h-11 pl-9 pr-3 rounded-[var(--radius-md)] border border-border-strong dark:border-white/20 bg-white dark:bg-white/5 text-sm text-charcoal dark:text-zinc-100 placeholder:text-graphite/60 dark:placeholder:text-zinc-500 focus:border-accent dark:focus:border-accent-light focus:ring-2 focus:ring-accent/20 focus:outline-none"
            placeholder="Type full address, area, or landmark"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              onSearchChange?.(e.target.value)
              setSearchError('')
              setResolvedLabel('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void runSearch()
              }
            }}
            aria-label="Search address on map"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="shrink-0"
          loading={searching}
          onClick={() => void runSearch()}
        >
          Search
        </Button>
      </div>

      {searchError && (
        <p className="text-xs text-error dark:text-error-light" role="alert">
          {searchError}
        </p>
      )}

      {searching && (
        <p className="text-xs text-graphite dark:text-zinc-400 flex items-center gap-1.5">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Finding location…
        </p>
      )}

      {resolvedLabel && !searchError && (
        <p className="text-xs text-success dark:text-success-light">
          Map centered on: {resolvedLabel}
        </p>
      )}

      <div data-map-picker className="map-picker-shell">
        <OsrmMap
          height={mapHeight}
          center={coords}
          zoom={mapZoom}
          pinMode
          onPin={updateCoords}
          markers={[{ position: coords, label: markerLabel, color: markerColor }]}
        />
      </div>

      <p className="text-xs text-graphite dark:text-zinc-400 flex items-center gap-1.5">
        <MapPin className="h-3.5 w-3.5" />
        Tap map to fine-tune · {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
      </p>
    </div>
  )
}
