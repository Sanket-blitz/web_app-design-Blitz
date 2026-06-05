import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { MapLocationPicker } from '../map/MapLocationPicker'
import { BENGALURU_CENTER } from '../../lib/locations'
import type { LatLng } from '../../lib/osrm'

interface MapPinModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (coords: LatLng, label: string) => void
  initialCoords?: LatLng
  initialSearch?: string
}

export function MapPinModal({
  open,
  onClose,
  onConfirm,
  initialCoords,
  initialSearch = '',
}: MapPinModalProps) {
  const [coords, setCoords] = useState<LatLng>(initialCoords ?? BENGALURU_CENTER)
  const [searchLabel, setSearchLabel] = useState(initialSearch)
  const [searchSeed, setSearchSeed] = useState(initialSearch)
  const [coordsSeed, setCoordsSeed] = useState(initialCoords)
  const [confirmed, setConfirmed] = useState(false)
  const wasOpen = useRef(false)

  useEffect(() => {
    const justOpened = open && !wasOpen.current
    wasOpen.current = open

    if (justOpened) {
      setCoords(initialCoords ?? BENGALURU_CENTER)
      setSearchSeed(initialSearch)
      setSearchLabel(initialSearch)
      setCoordsSeed(initialCoords)
      setConfirmed(false)
    }
  }, [open, initialCoords, initialSearch])

  const handleConfirm = () => {
    setConfirmed(true)
    onConfirm(coords, searchLabel.trim() || 'Pinned location')
    setTimeout(onClose, 600)
  }

  return (
    <Modal open={open} onClose={onClose} title="Pin Location" size="lg">
      <div className="space-y-4">
        <MapLocationPicker
          key={open ? `${searchSeed}-${coordsSeed?.lat ?? 'new'}` : 'closed'}
          initialSearch={searchSeed}
          initialCoords={coordsSeed}
          mapHeight="h-64"
          mapZoom={15}
          markerLabel="Delivery point"
          markerColor="customer"
          onCoordsChange={setCoords}
          onSearchChange={setSearchLabel}
        />

        {confirmed && (
          <p className="text-sm text-success flex items-center gap-1.5">
            <Check className="h-4 w-4" /> Precise delivery location captured
          </p>
        )}

        <Button className="w-full" size="lg" onClick={handleConfirm}>
          Confirm Location
        </Button>
      </div>
    </Modal>
  )
}
