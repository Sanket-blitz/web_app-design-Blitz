import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

type Placement = 'top' | 'bottom' | 'left' | 'right'

interface SmartTooltipProps {
  anchorRef: React.RefObject<HTMLElement | null>
  visible: boolean
  children: ReactNode
  className?: string
}

export function SmartTooltip({ anchorRef, visible, children, className }: SmartTooltipProps) {
  const tipRef = useRef<HTMLDivElement>(null)
  const [placement, setPlacement] = useState<Placement>('top')
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    if (!visible || !anchorRef.current || !tipRef.current) return

    const anchor = anchorRef.current.getBoundingClientRect()
    const tip = tipRef.current.getBoundingClientRect()
    const pad = 10
    const vw = window.innerWidth
    const vh = window.innerHeight

    const space = {
      top: anchor.top,
      bottom: vh - anchor.bottom,
      left: anchor.left,
      right: vw - anchor.right,
    }

    let place: Placement = 'top'
    if (space.top < tip.height + pad && space.bottom > space.top) place = 'bottom'
    if (space.right < tip.width + pad && space.left > space.right) place = 'left'
    if (space.left < tip.width + pad && space.right > space.left) place = 'right'
    if (anchor.top < 80) place = 'bottom'
    if (anchor.bottom > vh - 80) place = 'top'

    const cx = anchor.left + anchor.width / 2
    const cy = anchor.top + anchor.height / 2
    let top = 0
    let left = 0

    switch (place) {
      case 'top':
        top = anchor.top - tip.height - pad
        left = Math.min(Math.max(pad, cx - tip.width / 2), vw - tip.width - pad)
        break
      case 'bottom':
        top = anchor.bottom + pad
        left = Math.min(Math.max(pad, cx - tip.width / 2), vw - tip.width - pad)
        break
      case 'left':
        top = Math.min(Math.max(pad, cy - tip.height / 2), vh - tip.height - pad)
        left = anchor.left - tip.width - pad
        break
      case 'right':
        top = Math.min(Math.max(pad, cy - tip.height / 2), vh - tip.height - pad)
        left = anchor.right + pad
        break
    }

    setPlacement(place)
    setCoords({ top, left })
  }, [visible, anchorRef, children])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={tipRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'fixed z-[200] pointer-events-none max-w-[260px]',
            className
          )}
          style={{ top: coords.top, left: coords.left }}
          data-placement={placement}
        >
          <div className="rounded-xl border border-border-strong dark:border-zinc-500 bg-pure-white dark:bg-zinc-900 px-3.5 py-3 text-xs shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
