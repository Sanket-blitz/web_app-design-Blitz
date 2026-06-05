import {
  RetailStoreIllustration,
  MiddleMileHubIllustration,
  RiderIllustration,
  CustomerDestinationIllustration,
} from '../illustrations/FulfillmentFlow'
import { Card } from '../ui/Card'

const flowSteps = [
  {
    id: 'store',
    title: 'Retail Stores',
    description: 'Your inventory becomes fulfillment capacity. Register stores and manage stock with real-time visibility.',
    illustration: RetailStoreIllustration,
    features: ['Multi-store management', 'Real-time inventory', 'Stock optimization'],
    color: 'accent',
  },
  {
    id: 'hub',
    title: 'Middle Mile Hubs',
    description: 'Strategic consolidation centers that optimize routing across the city. Minimize delivery times.',
    illustration: MiddleMileHubIllustration,
    features: ['City-wide coverage', 'Smart routing', 'Peak capacity planning'],
    color: 'success',
  },
  {
    id: 'rider',
    title: 'Last Mile Riders',
    description: 'Our verified rider network ensures fast, reliable delivery. Every order reaches customers on time.',
    illustration: RiderIllustration,
    features: ['Vetted partners', 'Real-time tracking', 'Performance monitoring'],
    color: 'warning',
  },
  {
    id: 'customer',
    title: 'Customer Destinations',
    description: 'Same-day delivery to any location across the city. Customers see live tracking and get alerts.',
    illustration: CustomerDestinationIllustration,
    features: ['Live tracking', 'SMS/Email alerts', 'Proof of delivery'],
    color: 'error',
  },
]

export function FulfillmentFlowCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {flowSteps.map((step, index) => {
        const Illustration = step.illustration

        return (
          <Card key={step.id} padding="lg" hover className="flex flex-col">
            <div className="mb-4 flex justify-center">
              <Illustration size="md" />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-charcoal dark:text-charcoal">
                  {step.title}
                </h3>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft dark:bg-accent/20 text-xs font-bold text-accent dark:text-accent-light shrink-0 ml-2">
                  {index + 1}
                </span>
              </div>

              <p className="text-sm text-graphite dark:text-graphite leading-relaxed mb-4">
                {step.description}
              </p>

              <div className="space-y-2">
                {step.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs text-graphite dark:text-graphite">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-light mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
