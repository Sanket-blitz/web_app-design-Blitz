import { ArrowUpRight, Clock, TrendingUp, Package } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

const caseStudies = [
  {
    brand: 'Urban Thread',
    category: 'D2C Fashion',
    stores: 12,
    metric: '34%',
    metricLabel: 'conversion lift',
    quote: 'Same-day delivery from our Bengaluru stores turned browse-abandoners into buyers.',
    stats: [
      { icon: Clock, value: '42 min', label: 'Avg. delivery' },
      { icon: Package, value: '8.2K', label: 'Orders/month' },
      { icon: TrendingUp, value: '96%', label: 'On-time SLA' },
    ],
    gradient: 'from-accent/10 to-accent-soft',
  },
  {
    brand: 'Maison Élise',
    category: 'Premium Retail',
    stores: 28,
    metric: '2.4×',
    metricLabel: 'store productivity',
    quote: 'Inventory sitting in stores now generates revenue within hours, not weeks.',
    stats: [
      { icon: Clock, value: '38 min', label: 'Avg. delivery' },
      { icon: Package, value: '24K', label: 'Orders/month' },
      { icon: TrendingUp, value: '99%', label: 'On-time SLA' },
    ],
    gradient: 'from-success/10 to-success-soft',
  },
  {
    brand: 'Loom Collective',
    category: 'Multi-brand Outlet',
    stores: 6,
    metric: '₹1.2Cr',
    metricLabel: 'monthly GMV unlocked',
    quote: 'We compete with e-commerce on speed without building our own logistics team.',
    stats: [
      { icon: Clock, value: '51 min', label: 'Avg. delivery' },
      { icon: Package, value: '3.1K', label: 'Orders/month' },
      { icon: TrendingUp, value: '94%', label: 'On-time SLA' },
    ],
    gradient: 'from-warning/10 to-warning-soft',
  },
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24">
      <div className="text-center mb-16">
        <Badge variant="accent" className="mb-4">Case Studies</Badge>
        <h2 className="text-3xl md:text-4xl font-semibold text-charcoal tracking-tight">
          Brands fulfilling faster with Blitz
        </h2>
        <p className="mt-3 text-graphite max-w-lg mx-auto">
          Real results from fashion retailers who turned stores into fulfillment centers.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <Card key={cs.brand} padding="lg" hover className="relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${cs.gradient} opacity-50`} />
            <div className="relative space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal">{cs.brand}</h3>
                  <p className="text-sm text-graphite">{cs.category} · {cs.stores} stores</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-charcoal">{cs.metric}</p>
                  <p className="text-xs text-graphite">{cs.metricLabel}</p>
                </div>
              </div>

              <blockquote className="text-sm text-charcoal leading-relaxed border-l-2 border-accent pl-4">
                "{cs.quote}"
              </blockquote>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {cs.stats.map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-[var(--radius-md)] bg-white/60 dark:bg-white/5">
                    <s.icon className="h-3.5 w-3.5 text-graphite mx-auto mb-1" />
                    <p className="text-sm font-semibold text-charcoal">{s.value}</p>
                    <p className="text-[10px] text-graphite">{s.label}</p>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                Read full story
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
