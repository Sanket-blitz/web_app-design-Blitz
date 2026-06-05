import { Cloud } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'

export function AutoSaveIndicator() {
  const { lastSaved } = useOnboarding()

  if (!lastSaved) return null

  return (
    <div className="flex items-center gap-1.5 text-xs text-graphite" aria-live="polite">
      <Cloud className="h-3.5 w-3.5" />
      <span>Saved</span>
    </div>
  )
}
