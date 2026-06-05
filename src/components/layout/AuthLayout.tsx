import type { ReactNode } from 'react'
import { BlitzLogo } from './BlitzLogo'
import { AutoSaveIndicator } from '../ui/AutoSaveIndicator'
import { ThemeToggle } from '../ui/ThemeToggle'

interface AuthLayoutProps {
  children: ReactNode
  progress?: ReactNode
  narrow?: boolean
}

export function AuthLayout({ children, progress, narrow }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <header className="sticky top-0 z-10 bg-off-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <BlitzLogo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AutoSaveIndicator />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-10 md:py-16">
        <div className={narrow ? 'w-full max-w-md' : 'w-full max-w-xl'}>
          {progress && <div className="mb-8">{progress}</div>}
          {children}
        </div>
      </main>
    </div>
  )
}
