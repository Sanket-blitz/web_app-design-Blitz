import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

export function ThemeToggle({ className, showLabels }: { className?: string; showLabels?: boolean }) {
  const { theme, setTheme } = useTheme()

  if (showLabels) {
    return (
      <div className={cn('flex items-center p-1 rounded-[var(--radius-lg)] bg-surface border border-border', className)}>
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors',
            theme === 'light' ? 'bg-white text-charcoal shadow-sm font-medium' : 'text-graphite hover:text-charcoal'
          )}
          aria-label="Light mode"
        >
          <Sun className="h-3.5 w-3.5" />
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors',
            theme === 'dark' ? 'bg-white text-charcoal shadow-sm font-medium' : 'text-graphite hover:text-charcoal'
          )}
          aria-label="Dark mode"
        >
          <Moon className="h-3.5 w-3.5" />
          Dark
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        'h-9 w-9 rounded-[var(--radius-md)] border border-border bg-white flex items-center justify-center text-graphite hover:text-charcoal transition-colors',
        className
      )}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
