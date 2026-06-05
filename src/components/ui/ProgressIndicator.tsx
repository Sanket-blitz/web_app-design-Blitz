import { cn } from '../../lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  minutesLeft: number
  message?: string
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  minutesLeft,
  message,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-graphite">
          Step {currentStep} of {totalSteps}
          <span className="mx-2 text-border-strong">•</span>
          ~{minutesLeft} min{minutesLeft !== 1 ? 's' : ''} left
        </span>
        {message && <span className="text-accent font-medium">{message}</span>}
      </div>
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
        />
      </div>
    </div>
  )
}

export function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i + 1 <= current ? 'w-8 bg-accent' : 'w-1.5 bg-border-strong'
          )}
        />
      ))}
    </div>
  )
}
