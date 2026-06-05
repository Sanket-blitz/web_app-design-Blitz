import { useState } from 'react'
import { Check, MapPin, Search } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { OsrmMap } from '../map/OsrmMap'
import { BENGALURU_CENTER } from '../../lib/locations'
import type { LatLng } from '../../lib/osrm'

interface MapPinModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (coords: LatLng, label: string) => void
  initialCoords?: LatLng
}

export function MapPinModal({ open, onClose, onConfirm, initialCoords }: MapPinModalProps) {
  const [coords, setCoords] = useState<LatLng>(initialCoords ?? BENGALURU_CENTER)
  const [search, setSearch] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
    onConfirm(coords, search || 'Pinned location')
    setTimeout(onClose, 600)
  }

  return (
    <Modal open={open} onClose={onClose} title="Pin Location" size="lg">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
          <Input
            className="pl-9"
            placeholder="Search area or landmark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <OsrmMap
          height="h-64"
          center={coords}
          zoom={14}
          pinMode
          onPin={(c) => { setCoords(c); setConfirmed(false) }}
          markers={[{ position: coords, label: 'Delivery point', color: 'customer' }]}
        />

        <p className="text-xs text-graphite flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Drag map or tap to place pin · {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </p>

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
