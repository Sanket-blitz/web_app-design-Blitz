import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Users,
  Zap,
  IndianRupee,
  Shield,
  Rocket,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { BlitzLogo } from '../components/layout/BlitzLogo'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'

const sections = [
  { id: 'overview', label: 'Executive Summary', icon: Target },
  { id: 'naming', label: 'Product Naming', icon: Zap },
  { id: 'market', label: 'Market Opportunity', icon: TrendingUp },
  { id: 'segments', label: 'Target Customers', icon: Users },
  { id: 'product', label: 'Product Strategy', icon: Shield },
  { id: 'pricing', label: 'Pricing', icon: IndianRupee },
  { id: 'competitive', label: 'Competitive Analysis', icon: BarChart3 },
  { id: 'launch', label: 'Launch Plan', icon: Rocket },
  { id: 'financials', label: 'Financial Model', icon: IndianRupee },
  { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
]

const brandNames = [
  { name: 'Blitz Store+', meaning: 'Store-as-fulfillment hub', audience: 'Retail chains', pros: 'Clear, extensible', cons: 'Generic suffix' },
  { name: 'Blitz Instant Retail', meaning: 'Speed from retail', audience: 'D2C brands', pros: 'Speed emphasis', cons: 'Long name' },
  { name: 'Blitz Doorstep', meaning: 'Last-mile focus', audience: 'Consumers', pros: 'Customer-centric', cons: 'Less B2B appeal' },
  { name: 'Blitz Local', meaning: 'Hyperlocal delivery', audience: 'Local retailers', pros: 'Simple, memorable', cons: 'Crowded category' },
  { name: 'Blitz Direct', meaning: 'Store-to-customer', audience: 'Omnichannel brands', pros: 'Direct relationship', cons: 'Ambiguous scope' },
  { name: 'Blitz Now', meaning: 'Immediate fulfillment', audience: 'Express shoppers', pros: 'Urgency', cons: 'Consumer-only feel' },
  { name: 'Blitz Fulfillment OS', meaning: 'Operating system for fulfillment', audience: 'Enterprise ops', pros: 'Platform positioning', cons: 'Technical' },
  { name: 'Blitz Pulse', meaning: 'Live operational heartbeat', audience: 'Store managers', pros: 'Modern, dynamic', cons: 'Abstract' },
  { name: 'Blitz Relay', meaning: 'Store → rider → customer relay', audience: 'Operations teams', pros: 'Process metaphor', cons: 'Less brand recall' },
  { name: 'Blitz Swift', meaning: 'Speed and agility', audience: 'Fashion brands', pros: 'Premium feel', cons: 'Common word' },
]

const segments = [
  {
    id: 'A',
    title: 'Large Retail Chains',
    examples: 'Westside, Pantaloons, Reliance Trends, Lifestyle, Max',
    pain: 'Inventory trapped in 200+ stores; no unified same-day delivery',
    need: 'Centralized dispatch, multi-store visibility, SLA guarantees',
    revenue: '₹2–8 Cr ARR per brand',
  },
  {
    id: 'B',
    title: 'D2C Brands',
    examples: 'Snitch, The Souled Store, Rare Rabbit, Bewakoof',
    pain: 'Warehouse-only fulfillment; missed same-day demand in metros',
    need: 'Store-as-warehouse, API integration, COD support',
    revenue: '₹40L–2 Cr ARR per brand',
  },
  {
    id: 'C',
    title: 'Sports & Specialty',
    examples: 'Adidas, Puma, Decathlon',
    pain: 'Size-specific inventory in stores; online stockouts',
    need: 'Store-level inventory sync, express delivery for try-at-home',
    revenue: '₹1–5 Cr ARR per brand',
  },
  {
    id: 'D',
    title: 'Local Retailers',
    examples: 'Independent boutiques, multi-brand outlets',
    pain: 'No delivery infrastructure; losing to e-commerce',
    need: 'Simple onboarding, pay-per-order, no tech team required',
    revenue: '₹2–15L ARR per store',
  },
]

const competitors = [
  { name: 'Blitz Store2Door', pricing: 'Rs. 70–80', speed: '95–98% SDD', network: 'Store-as-hub', tech: 'POS + checkout', merchant: '100% data', customer: '<1–2% RTO', highlight: true },
  { name: 'Traditional E-Com', pricing: 'Rs. 80–90', speed: '0% SDD', network: 'Warehouse', tech: 'Marketplace', merchant: 'Walled garden', customer: '15–30% RTO' },
  { name: 'Porter On-Demand', pricing: 'Rs. 150–250+', speed: '99% immediate', network: 'Unbatched', tech: 'Transactional', merchant: 'No brand data', customer: 'Reverse billing' },
  { name: 'SDFX SDD', pricing: 'Rs. 90–130', speed: '75–85% SDD', network: 'Central hub', tech: '3PL tracking', merchant: 'Hub dependent', customer: '5–8% RTO' },
  { name: 'Shiprocket SDD/NDD', pricing: 'Rs. 110–160+', speed: '65–80% SDD', network: '25+ couriers', tech: 'Fragmented', merchant: 'Heavy labeling', customer: '10–18% RTO' },
]

export function GTMStrategyPage() {
  const [active, setActive] = useState('overview')

  return (
    <div className="min-h-screen bg-off-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BlitzLogo />
            <Badge variant="accent">GTM Strategy 2026</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Prototype
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="hidden lg:block sticky top-24 self-start space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id)
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors text-left',
                  active === s.id ? 'bg-charcoal text-white' : 'text-graphite hover:bg-white hover:text-charcoal'
                )}
              >
                <s.icon className="h-4 w-4 shrink-0" />
                {s.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="space-y-16 min-w-0">
            {/* Hero */}
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-accent uppercase tracking-wider">Blitz Hackathon 2026 · Problem 03</p>
                <h1 className="text-4xl font-semibold text-charcoal tracking-tight text-balance">
                  Store to Door — Complete GTM Strategy
                </h1>
                <p className="text-lg text-graphite max-w-2xl leading-relaxed">
                  Investor-grade go-to-market strategy for launching hyperlocal store fulfillment across India's fashion retail ecosystem.
                </p>
              </div>
              <Card padding="lg" className="bg-charcoal text-white border-0">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Selected Product</p>
                    <p className="text-xl font-semibold mt-1">Blitz Fulfillment OS</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Launch City</p>
                    <p className="text-xl font-semibold mt-1">Bengaluru</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Year 3 Revenue (Base)</p>
                    <p className="text-xl font-semibold mt-1">₹142 Cr</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Executive Summary */}
            <Section id="overview" title="Executive Summary" subtitle="What is Store to Door?">
              <div className="prose-blitz space-y-4 text-sm text-graphite leading-relaxed">
                <p>
                  <strong className="text-charcoal">Store to Door</strong> is Blitz's merchant-facing vertical that turns every retail store and warehouse into a same-day fulfillment node. Brands connect inventory, create deliveries in seconds, and Blitz's rider network handles last-mile delivery with live tracking.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 not-prose">
                  {[
                    { label: 'For Brands', value: 'Unlock trapped store inventory, offer same-day delivery, increase conversion 12–18%' },
                    { label: 'For Consumers', value: 'Get fashion delivered in 30–90 minutes from the nearest store' },
                    { label: 'For Blitz', value: 'High-frequency orders, premium margins, defensible store network moat' },
                    { label: 'Why We Win', value: 'Purpose-built merchant OS + fashion-specialized ops + sub-60s onboarding' },
                  ].map((item) => (
                    <Card key={item.label} padding="md">
                      <p className="text-xs font-medium text-accent uppercase tracking-wider">{item.label}</p>
                      <p className="mt-2 text-sm text-charcoal">{item.value}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </Section>

            {/* Naming */}
            <Section id="naming" title="Product Naming" subtitle="20 options evaluated — Blitz Fulfillment OS selected">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-semibold text-charcoal">Name</th>
                      <th className="pb-3 font-semibold text-charcoal">Meaning</th>
                      <th className="pb-3 font-semibold text-charcoal hidden md:table-cell">Audience</th>
                      <th className="pb-3 font-semibold text-charcoal hidden lg:table-cell">Pros</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {brandNames.map((b) => (
                      <tr key={b.name} className={b.name === 'Blitz Fulfillment OS' ? 'bg-accent-soft/50' : ''}>
                        <td className="py-3 font-medium text-charcoal">
                          {b.name}
                          {b.name === 'Blitz Fulfillment OS' && <Badge variant="accent" className="ml-2">Selected</Badge>}
                        </td>
                        <td className="py-3 text-graphite">{b.meaning}</td>
                        <td className="py-3 text-graphite hidden md:table-cell">{b.audience}</td>
                        <td className="py-3 text-graphite hidden lg:table-cell">{b.pros}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Card padding="md" className="mt-4 border-accent/30 bg-accent-soft/30">
                <p className="text-sm text-charcoal">
                  <strong>Recommendation:</strong> Blitz Fulfillment OS positions the product as infrastructure — not just delivery, but the operating system for store-based fulfillment. Aligns with Stripe/Linear aesthetic and enterprise expansion path.
                </p>
              </Card>
            </Section>

            {/* Market */}
            <Section id="market" title="Market Opportunity" subtitle="India retail — TAM / SAM / SOM">
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'TAM', value: '₹4.2L Cr', desc: 'India organized retail (2026)' },
                  { label: 'SAM', value: '₹18,400 Cr', desc: 'Fashion + lifestyle last-mile addressable' },
                  { label: 'SOM', value: '₹890 Cr', desc: 'Year 5 capture (5% SAM, top 8 metros)' },
                ].map((m) => (
                  <Card key={m.label} padding="md" className="text-center">
                    <p className="text-xs font-medium text-graphite uppercase tracking-wider">{m.label}</p>
                    <p className="text-3xl font-semibold text-charcoal mt-2">{m.value}</p>
                    <p className="text-xs text-graphite mt-1">{m.desc}</p>
                  </Card>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { cat: 'Fashion', size: '₹1.8L Cr', growth: '11% CAGR' },
                  { cat: 'Footwear', size: '₹85K Cr', growth: '13% CAGR' },
                  { cat: 'Beauty', size: '₹1.2L Cr', growth: '15% CAGR' },
                  { cat: 'Electronics', size: '₹2.1L Cr', growth: '9% CAGR' },
                  { cat: 'Grocery', size: '₹11L Cr', growth: '18% CAGR' },
                  { cat: 'Lifestyle', size: '₹42K Cr', growth: '12% CAGR' },
                ].map((c) => (
                  <div key={c.cat} className="flex items-center justify-between p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                    <span className="text-sm font-medium text-charcoal">{c.cat}</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-charcoal">{c.size}</p>
                      <p className="text-xs text-success">{c.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Segments */}
            <Section id="segments" title="Target Customers" subtitle="Four segments, phased penetration">
              <div className="space-y-4">
                {segments.map((s) => (
                  <Card key={s.id} padding="md">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-[var(--radius-lg)] bg-charcoal text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {s.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-charcoal">{s.title}</h4>
                        <p className="text-xs text-graphite mt-0.5">{s.examples}</p>
                        <div className="grid sm:grid-cols-3 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-xs text-graphite uppercase tracking-wider">Pain</p>
                            <p className="text-charcoal mt-1">{s.pain}</p>
                          </div>
                          <div>
                            <p className="text-xs text-graphite uppercase tracking-wider">Need</p>
                            <p className="text-charcoal mt-1">{s.need}</p>
                          </div>
                          <div>
                            <p className="text-xs text-graphite uppercase tracking-wider">Revenue Potential</p>
                            <p className="text-charcoal font-semibold mt-1">{s.revenue}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Product */}
            <Section id="product" title="Product Strategy" subtitle="Platform capabilities across three surfaces">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Merchant',
                    features: ['Store onboarding (<60s)', 'Inventory sync', 'Order management', 'Delivery creation', 'Analytics & returns'],
                  },
                  {
                    title: 'Customer',
                    features: ['Real-time tracking', 'ETA updates', 'Delivery notifications', 'Returns initiation', 'In-app support'],
                  },
                  {
                    title: 'Operations',
                    features: ['Smart rider assignment', 'SLA monitoring', 'Route optimization', 'Exception handling', 'Demand forecasting'],
                  },
                ].map((p) => (
                  <Card key={p.title} padding="md">
                    <h4 className="font-semibold text-charcoal mb-3">{p.title}</h4>
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-graphite">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Pricing */}
            <Section id="pricing" title="Pricing Strategy" subtitle="Hybrid model recommended">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { model: 'Per Order', price: '₹65–110/delivery', margin: '32–38%', best: 'Segment D' },
                  { model: 'Subscription', price: '₹15K–80K/month', margin: '55–65%', best: 'Segment B' },
                  { model: 'Enterprise', price: 'Custom SLA contracts', margin: '40–50%', best: 'Segment A' },
                  { model: 'Hybrid ✓', price: 'Base sub + per-order', margin: '45–52%', best: 'All segments', selected: true },
                ].map((p) => (
                  <Card key={p.model} padding="md" className={p.selected ? 'border-accent ring-2 ring-accent/20' : ''}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-charcoal">{p.model}</h4>
                      {p.selected && <Badge variant="accent">Recommended</Badge>}
                    </div>
                    <p className="text-lg font-semibold text-charcoal mt-2">{p.price}</p>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-graphite">Gross margin</span>
                      <span className="font-medium text-charcoal">{p.margin}</span>
                    </div>
                    <p className="text-xs text-graphite mt-2">Best for {p.best}</p>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Competitive */}
            <Section id="competitive" title="Competitive Analysis" subtitle="The unit economics don't lie — how Blitz STORE2DOOR compares to the market">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      {['Player', 'Pricing', 'Speed', 'Network', 'Tech', 'Merchant UX', 'Customer UX'].map((h) => (
                        <th key={h} className="pb-3 pr-4 font-semibold text-charcoal whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {competitors.map((c) => (
                      <tr key={c.name} className={c.highlight ? 'bg-accent-soft/40' : ''}>
                        <td className="py-3 font-medium text-charcoal pr-4">
                          {c.name}
                          {c.highlight && <Badge variant="accent" className="ml-2">Us</Badge>}
                        </td>
                        <td className="py-3 text-graphite pr-4">{c.pricing}</td>
                        <td className="py-3 text-graphite pr-4">{c.speed}</td>
                        <td className="py-3 text-graphite pr-4">{c.network}</td>
                        <td className="py-3 text-graphite pr-4">{c.tech}</td>
                        <td className="py-3 text-graphite pr-4">{c.merchant}</td>
                        <td className="py-3 text-graphite">{c.customer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Launch */}
            <Section id="launch" title="Launch & Scale Roadmap" subtitle="Bengaluru → 8 metros → national">
              <div className="space-y-4">
                {[
                  {
                    phase: 'Phase 1 — Pilot',
                    timeline: 'Q2 2026',
                    city: 'Bengaluru',
                    targets: '50 stores, 15 brands, 500 orders/day',
                    budget: '₹2.4 Cr',
                  },
                  {
                    phase: 'Phase 2 — Multi-city',
                    timeline: 'Q4 2026',
                    city: 'Mumbai, Delhi, Hyderabad, Pune',
                    targets: '400 stores, 80 brands, 4,000 orders/day',
                    budget: '₹12 Cr',
                  },
                  {
                    phase: 'Phase 3 — National',
                    timeline: '2027–2028',
                    city: '15+ cities',
                    targets: '2,500 stores, 300 brands, 25,000 orders/day',
                    budget: '₹45 Cr',
                  },
                ].map((p, i) => (
                  <Card key={p.phase} padding="md">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-charcoal text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-charcoal">{p.phase}</p>
                          <p className="text-xs text-graphite">{p.timeline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-graphite uppercase">Cities</p>
                          <p className="text-charcoal mt-0.5">{p.city}</p>
                        </div>
                        <div>
                          <p className="text-xs text-graphite uppercase">Targets</p>
                          <p className="text-charcoal mt-0.5">{p.targets}</p>
                        </div>
                        <div>
                          <p className="text-xs text-graphite uppercase">Budget</p>
                          <p className="text-charcoal font-semibold mt-0.5">{p.budget}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Financials */}
            <Section id="financials" title="3-Year Financial Model" subtitle="Conservative · Base · Aggressive">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-semibold text-charcoal">Metric</th>
                      <th className="pb-3 font-semibold text-charcoal">Y1</th>
                      <th className="pb-3 font-semibold text-charcoal">Y2</th>
                      <th className="pb-3 font-semibold text-charcoal">Y3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { metric: 'Revenue (Base)', y1: '₹8.2 Cr', y2: '₹42 Cr', y3: '₹142 Cr' },
                      { metric: 'Gross Margin', y1: '38%', y2: '44%', y3: '48%' },
                      { metric: 'EBITDA', y1: '-₹6.1 Cr', y2: '-₹2.8 Cr', y3: '₹18 Cr' },
                      { metric: 'Active Stores', y1: '180', y2: '950', y3: '2,800' },
                      { metric: 'Orders/Day', y1: '850', y2: '6,200', y3: '22,000' },
                    ].map((r) => (
                      <tr key={r.metric}>
                        <td className="py-3 font-medium text-charcoal">{r.metric}</td>
                        <td className="py-3 text-graphite">{r.y1}</td>
                        <td className="py-3 text-graphite">{r.y2}</td>
                        <td className="py-3 text-charcoal font-semibold">{r.y3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-graphite mt-4">Break-even projected at Month 28 (base scenario). Conservative case: Month 34.</p>
            </Section>

            {/* Risks */}
            <Section id="risks" title="Risk Analysis" subtitle="Key risks with mitigation">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { risk: 'Operational — rider shortage in peak', mitigation: 'Surge pricing + partner fleet buffer (20% capacity)' },
                  { risk: 'Merchant adoption — slow enterprise sales', mitigation: 'Pilot-first model, 30-day free trial, dedicated CSM' },
                  { risk: 'Competitive — Dunzo/Swiggy expansion', mitigation: 'Fashion-specialized SLA, merchant OS moat' },
                  { risk: 'Financial — unit economics in Tier 2', mitigation: 'City-level P&L gates before expansion' },
                  { risk: 'Regulatory — gig worker compliance', mitigation: 'Proactive compliance team, insurance coverage' },
                ].map((r) => (
                  <Card key={r.risk} padding="md">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-charcoal">{r.risk}</p>
                        <p className="text-sm text-graphite mt-1">{r.mitigation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* North Star + CTA */}
            <section className="space-y-6">
              <Card padding="lg" className="bg-charcoal text-white border-0">
                <h3 className="text-xl font-semibold">North Star Metrics</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
                  {['Orders/day', 'Active stores', 'Active brands', 'Revenue', 'Delivery SLA'].map((m) => (
                    <div key={m}>
                      <p className="text-2xl font-semibold">↑</p>
                      <p className="text-sm text-white/70 mt-1">{m}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg">
                    Try the Prototype
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/design-system">
                  <Button variant="outline" size="lg">View Design System</Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight">{title}</h2>
        <p className="mt-1 text-graphite">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
