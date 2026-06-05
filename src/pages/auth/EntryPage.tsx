import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Store } from 'lucide-react'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

type EntryType = 'new' | 'existing' | null

export function EntryPage() {
  const [selected, setSelected] = useState<EntryType>(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (selected === 'new') navigate('/auth/register/company')
    if (selected === 'existing') navigate('/auth/login')
  }

  return (
    <AuthLayout narrow>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Let's get you started
          </h1>
          <p className="text-graphite">Choose how you'd like to join Blitz.</p>
        </div>

        <div className="space-y-4">
          <Card
            hover
            selected={selected === 'new'}
            padding="lg"
            onClick={() => setSelected('new')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelected('new')}
            className="cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                'h-12 w-12 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-colors',
                selected === 'new' ? 'bg-accent text-white' : 'bg-surface text-charcoal'
              )}>
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-charcoal">New Company</h2>
                <p className="mt-1 text-sm text-graphite leading-relaxed">
                  Create your organization. For brands new to Blitz.
                </p>
              </div>
            </div>
          </Card>

          <Card
            hover
            selected={selected === 'existing'}
            padding="lg"
            onClick={() => setSelected('existing')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelected('existing')}
            className="cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                'h-12 w-12 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-colors',
                selected === 'existing' ? 'bg-accent text-white' : 'bg-surface text-charcoal'
              )}>
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-charcoal">Existing Company</h2>
                <p className="mt-1 text-sm text-graphite leading-relaxed">
                  Join your organization's store. For stores already invited.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}
