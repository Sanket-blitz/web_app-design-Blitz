import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'

export function RegistrationSuccess() {
  const { company } = useOnboarding()
  const navigate = useNavigate()
  const displayName = company.brandName || company.registeredName || 'Your Organization'

  return (
    <AuthLayout narrow>
      <div className="space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mx-auto"
        >
          <div className="relative h-20 w-20 mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="h-20 w-20 rounded-full bg-success-soft flex items-center justify-center"
            >
              <Check className="h-10 w-10 text-success" strokeWidth={2} />
            </motion.div>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 h-2 w-2 -ml-1 -mt-1 rounded-full bg-accent"
                style={{ transform: `rotate(${i * 60}deg) translateY(-20px)` }}
              />
            ))}
          </div>
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Your organization is ready.
          </h1>
          <p className="text-graphite">Verification is in progress. You can add stores now.</p>
        </div>

        <Card padding="lg" className="text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Company</span>
              <span className="text-sm font-semibold text-charcoal">{displayName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Verification Status</span>
              <Badge variant="warning">Processing</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Next Step</span>
              <span className="text-sm font-medium text-charcoal">Add your first store</span>
            </div>
          </div>
        </Card>

        <Button size="lg" className="w-full" onClick={() => navigate('/auth/store')}>
          Add First Store
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </AuthLayout>
  )
}
