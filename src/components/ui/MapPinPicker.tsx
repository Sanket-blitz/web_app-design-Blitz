import { OsrmMap } from '../map/OsrmMap'
import { cn } from '../../lib/utils'

interface MapPinPickerProps {
  className?: string
  height?: string
  onPin?: () => void
}

export function MapPinPicker({ className, height = 'h-48', onPin }: MapPinPickerProps) {
  return (
    <OsrmMap
      className={cn(className)}
      height={height}
      pinMode
      onPin={() => onPin?.()}
      zoom={13}
    />
  )
}
