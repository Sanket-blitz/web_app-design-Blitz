import { useNavigate, useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

export function FloatingCreateButton() {
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/dashboard/create') return null

  return (
    <button
      type="button"
      onClick={() => navigate('/dashboard/create')}
      className={cn(
        'fixed bottom-6 right-6 z-40 h-14 px-5 rounded-full',
        'bg-accent text-pure-white shadow-[var(--shadow-xl)]',
        'flex items-center gap-2 text-sm font-semibold',
        'hover:bg-accent-hover active:scale-[0.98] transition-all',
        'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2'
      )}
      aria-label="Create delivery"
    >
      <Plus className="h-5 w-5" />
      <span className="hidden sm:inline">Create Delivery</span>
    </button>
  )
}
