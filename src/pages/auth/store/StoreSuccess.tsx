import { useNavigate } from 'react-router-dom'
import { Check, Plus, LayoutDashboard } from 'lucide-react'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'

export function StoreSuccess() {
  const { store, setStore } = useOnboarding()

  const handleAddAnother = () => {
    setStore({ storeName: '', storeCode: '', storeAddress: '', managerName: '', storeEmail: '', password: '' })
    navigate('/auth/store')
  }
  const navigate = useNavigate()

  return (
    <AuthLayout narrow>
      <div className="space-y-8 text-center">
        <div className="h-16 w-16 mx-auto rounded-full bg-success-soft flex items-center justify-center">
          <Check className="h-8 w-8 text-success" strokeWidth={2} />
        </div>

        <div className="space-y-2">
          <Badge variant="success" className="mb-2">Store Ready</Badge>
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Store created successfully.
          </h1>
        </div>

        <Card padding="lg" className="text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Store Name</span>
              <span className="text-sm font-semibold text-charcoal">{store.storeName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Store Code</span>
              <span className="text-sm font-mono font-medium text-charcoal">{store.storeCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Login Email</span>
              <span className="text-sm font-medium text-charcoal">{store.storeEmail}</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <Button variant="outline" size="lg" className="w-full" onClick={handleAddAnother}>
            <Plus className="h-4 w-4" />
            Add Another Store
          </Button>
          <Button size="lg" className="w-full" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="h-4 w-4" />
            Go To Dashboard
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
