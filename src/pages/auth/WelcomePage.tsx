import { useNavigate } from 'react-router-dom'
import { ArrowRight, Store } from 'lucide-react'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'

export function WelcomePage() {
  const { userName, store } = useOnboarding()
  const navigate = useNavigate()
  const storeName = store.storeName || 'Koramangala Flagship'

  return (
    <AuthLayout narrow>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Welcome back, {userName}.
          </h1>
          <p className="text-graphite">Your store is ready to fulfill orders.</p>
        </div>

        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-accent-soft text-accent flex items-center justify-center shrink-0">
              <Store className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-graphite uppercase tracking-wider">Store</p>
                <p className="text-lg font-semibold text-charcoal">{storeName}</p>
              </div>
              <div>
                <p className="text-xs text-graphite uppercase tracking-wider">Today's Status</p>
                <Badge variant="success" className="mt-1">Ready to Fulfill</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Button size="lg" className="w-full" onClick={() => navigate('/dashboard')}>
          Open Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </AuthLayout>
  )
}
