import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        'flex gap-1 border-b border-border dark:border-white/10',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative disabled:opacity-50 disabled:cursor-not-allowed',
            activeTab === tab.id
              ? 'text-charcoal dark:text-charcoal text-accent dark:text-accent-light'
              : 'text-graphite dark:text-graphite hover:text-charcoal dark:hover:text-charcoal'
          )}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent dark:bg-accent-light rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
