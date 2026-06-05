import { ArrowUpRight, Clock, TrendingUp, Package, ArrowDown } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'

const caseStudies = [
  {
    brand: 'Urban Thread',
    category: 'D2C Fashion',
    stores: 12,
    metric: '34%',
    metricLabel: 'conversion lift',
    before: '3.2 day delivery',
    after: '42 min avg',
    revenue: '+₹2.4Cr',
    quote: 'Same-day delivery from our Bengaluru stores turned browse-abandoners into buyers.',
    stats: [
      { icon: Clock, value: '42 min', label: 'Avg. delivery' },
      { icon: Package, value: '8.2K', label: 'Orders/month' },
      { icon: TrendingUp, value: '96%', label: 'On-time SLA' },
    ],
    accent: 'accent',
  },
  {
    brand: 'Maison Élise',
    category: 'Premium Retail',
    stores: 28,
    metric: '2.4×',
    metricLabel: 'store productivity',
    before: '18% idle inventory',
    after: '4% idle inventory',
    revenue: '+₹8.1Cr',
    quote: 'Inventory sitting in stores now generates revenue within hours, not weeks.',
    stats: [
      { icon: Clock, value: '38 min', label: 'Avg. delivery' },
      { icon: Package, value: '24K', label: 'Orders/month' },
      { icon: TrendingUp, value: '99%', label: 'On-time SLA' },
    ],
    accent: 'success',
  },
  {
    brand: 'Loom Collective',
    category: 'Multi-brand Outlet',
    stores: 6,
    metric: '₹1.2Cr',
    metricLabel: 'monthly GMV unlocked',
    before: 'No same-day option',
    after: '87% same-day',
    revenue: '+340% GMV',
    quote: 'We compete with e-commerce on speed without building our own logistics team.',
    stats: [
      { icon: Clock, value: '51 min', label: 'Avg. delivery' },
      { icon: Package, value: '3.1K', label: 'Orders/month' },
      { icon: TrendingUp, value: '94%', label: 'On-time SLA' },
    ],
    accent: 'warning',
  },
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24">
      <div className="text-center mb-14">
        <Badge variant="accent" className="mb-4">Case Studies</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
          Brands fulfilling faster with Blitz
        </h2>
        <p className="mt-3 text-graphite max-w-lg mx-auto">
          Real results from fashion retailers who turned stores into fulfillment centers.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <Card key={cs.brand} padding="lg" hover className="relative overflow-hidden group border-2 border-border dark:border-zinc-600">
            <div className={cn('absolute inset-0 opacity-40 dark:opacity-20', cs.accent === 'accent' && 'bg-gradient-to-br from-accent/10 to-transparent', cs.accent === 'success' && 'bg-gradient-to-br from-success/10 to-transparent', cs.accent === 'warning' && 'bg-gradient-to-br from-warning/10 to-transparent')} />
            <div className="relative space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-slate flex items-center justify-center text-pure-white text-sm font-bold mb-3">
                    {cs.brand[0]}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{cs.brand}</h3>
                  <p className="text-sm text-graphite">{cs.category} · {cs.stores} stores</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-charcoal">{cs.metric}</p>
                  <p className="text-xs text-graphite">{cs.metricLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface dark:bg-zinc-800/80 border border-border dark:border-zinc-600">
                <div className="flex-1 text-center">
                  <p className="text-[10px] text-graphite uppercase">Before</p>
                  <p className="text-xs font-medium text-charcoal mt-0.5">{cs.before}</p>
                </div>
                <ArrowDown className="h-4 w-4 text-success rotate-[-90deg]" />
                <div className="flex-1 text-center">
                  <p className="text-[10px] text-graphite uppercase">After</p>
                  <p className="text-xs font-bold text-success mt-0.5">{cs.after}</p>
                </div>
              </div>

              <blockquote className="text-sm text-charcoal leading-relaxed border-l-2 border-accent pl-4">
                &ldquo;{cs.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-success-soft/50 dark:bg-emerald-950/40 border border-success/20 dark:border-emerald-600/30">
                <span className="text-xs text-graphite">Revenue impact</span>
                <span className="text-sm font-bold text-success">{cs.revenue}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {cs.stats.map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-lg bg-pure-white dark:bg-zinc-800 border border-border dark:border-zinc-600">
                    <s.icon className="h-3.5 w-3.5 text-graphite mx-auto mb-1" />
                    <p className="text-sm font-bold text-charcoal">{s.value}</p>
                    <p className="text-[9px] text-graphite">{s.label}</p>
                  </div>
                ))}
              </div>

              <button type="button" className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
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
