import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

export function ThemeToggle({ className, showLabels }: { className?: string; showLabels?: boolean }) {
  const { theme, setTheme } = useTheme()

  if (showLabels) {
    return (
      <div
        className={cn(
          'relative grid grid-cols-2 p-1 rounded-[var(--radius-lg)] bg-surface dark:bg-zinc-800/80 border border-border dark:border-zinc-600',
          className
        )}
      >
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-[var(--radius-md)] bg-white dark:bg-zinc-600 shadow-sm"
          animate={{ left: theme === 'light' ? 4 : 'calc(50%)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.7 }}
          aria-hidden
        />
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors duration-300',
            theme === 'light'
              ? 'text-charcoal dark:text-white font-medium'
              : 'text-graphite dark:text-zinc-400 hover:text-charcoal dark:hover:text-zinc-200'
          )}
          aria-label="Light mode"
          aria-pressed={theme === 'light'}
        >
          <Sun className="h-3.5 w-3.5" />
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors duration-300',
            theme === 'dark'
              ? 'text-charcoal dark:text-white font-medium'
              : 'text-graphite dark:text-zinc-400 hover:text-charcoal dark:hover:text-zinc-200'
          )}
          aria-label="Dark mode"
          aria-pressed={theme === 'dark'}
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
        'relative h-9 w-9 rounded-[var(--radius-md)] border border-border dark:border-zinc-600 bg-white dark:bg-zinc-800 flex items-center justify-center text-graphite dark:text-zinc-300 hover:text-charcoal dark:hover:text-white transition-colors duration-300 overflow-hidden',
        className
      )}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
