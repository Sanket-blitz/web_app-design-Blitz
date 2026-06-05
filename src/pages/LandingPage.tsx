import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Package,
  MapPin,
  BarChart3,
  Users,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react'
import { BlitzLogo } from '../components/layout/BlitzLogo'
import { Footer } from '../components/layout/Footer'
import { HeroNetwork } from '../components/landing/HeroNetwork'
import { BookDemoModal } from '../components/landing/BookDemoModal'
import { FulfillmentInfographic } from '../components/landing/FulfillmentInfographic'
import { CaseStudies } from '../components/landing/CaseStudies'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

const trustMetrics = [
  { value: '99.4%', label: 'Delivery reliability' },
  { value: '87%', label: 'Same-day fulfillment' },
  { value: '240+', label: 'Fashion brands' },
  { value: '2.1M', label: 'Orders / month' },
]

const howItWorks = [
  { icon: Building2, title: 'Connect', description: 'Register company and stores in under 3 minutes.' },
  { icon: Package, title: 'Fulfill', description: 'Create deliveries instantly from any store location.' },
  { icon: MapPin, title: 'Track', description: 'Monitor every shipment across hubs in real time.' },
]

const features = [
  { icon: Building2, title: 'Multi-store operations', desc: 'Manage every location from one dashboard.' },
  { icon: Zap, title: 'Same day delivery', desc: 'Fulfill orders within hours, not days.' },
  { icon: MapPin, title: 'Live tracking', desc: 'Real-time visibility for every shipment.' },
  { icon: Shield, title: 'Centralized controls', desc: 'Policies, SLAs, and permissions in one place.' },
  { icon: BarChart3, title: 'Performance analytics', desc: 'Insights that drive operational excellence.' },
  { icon: Users, title: 'Rider network', desc: 'City-wide coverage with vetted partners.' },
]

const brands = ['Maison Élise', 'Urban Thread', 'Silk & Stone', 'NOVA Apparel', 'Loom Collective']

export function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-off-white">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-white/5 backdrop-blur-md border-b border-border dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <BlitzLogo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-graphite dark:text-graphite hover:text-charcoal dark:hover:text-charcoal transition-colors">How it works</a>
            <a href="#case-studies" className="text-sm text-graphite dark:text-graphite hover:text-charcoal dark:hover:text-charcoal transition-colors">Case studies</a>
            <a href="#features" className="text-sm text-graphite dark:text-graphite hover:text-charcoal dark:hover:text-charcoal transition-colors">Features</a>
            <Link to="/gtm" className="text-sm text-graphite dark:text-graphite hover:text-charcoal dark:hover:text-charcoal transition-colors">GTM Strategy</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle showLabels className="hidden sm:flex" />
            <ThemeToggle className="sm:hidden" />
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/auth">
              <Button variant="primary" size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="accent" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                Store to Door · 2026
              </Badge>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-charcoal dark:text-charcoal leading-[1.1] text-balance">
                  Deliver from every store. Faster than ever.
                </h1>
                <p className="text-lg text-graphite dark:text-graphite leading-relaxed max-w-lg">
                  Turn your retail stores and warehouses into fulfillment centers. Offer same-day and express delivery across your city with a few clicks.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/auth">
                  <Button size="lg">
                    Start Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={() => setDemoOpen(true)}>Book Demo</Button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                {trustMetrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <p className="text-xl font-semibold text-charcoal dark:text-charcoal">{m.value}</p>
                    <p className="text-xs text-graphite dark:text-graphite">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <HeroNetwork />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="bg-off-white dark:bg-surface/30 border-y border-border dark:border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {trustMetrics.map((m) => (
              <div key={m.label} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-semibold text-charcoal dark:text-charcoal tracking-tight">{m.value}</div>
                <div className="mt-1 text-sm text-graphite dark:text-graphite">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-medium text-graphite/60 dark:text-graphite/70 tracking-wide">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Infographic */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal dark:text-charcoal tracking-tight">How it works</h2>
          <p className="mt-3 text-graphite dark:text-graphite max-w-xl mx-auto">
            Your stores connect to middle mile hubs. Our rider network reaches every corner of the city — from Malleshwaram to Whitefield.
          </p>
        </div>

        <FulfillmentInfographic />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {howItWorks.map((step, i) => (
            <Card key={step.title} padding="lg" className="relative">
              <div className="h-11 w-11 rounded-[var(--radius-lg)] bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-light flex items-center justify-center mb-5">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="absolute top-6 right-6 text-xs font-medium text-graphite/40 dark:text-graphite/60">0{i + 1}</div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm text-graphite dark:text-graphite leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <div className="max-w-6xl mx-auto px-6">
        <CaseStudies />
      </div>

      {/* Features */}
      <section id="features" className="bg-off-white dark:bg-surface/30 border-y border-border dark:border-white/10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-charcoal dark:text-charcoal tracking-tight">Built for operations</h2>
            <p className="mt-3 text-graphite dark:text-graphite">Everything you need to fulfill at scale.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <Card key={f.title} hover padding="md">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-white dark:bg-white/10 border border-border dark:border-white/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-charcoal dark:text-charcoal" />
                </div>
                <h3 className="text-base font-semibold text-charcoal dark:text-charcoal">{f.title}</h3>
                <p className="mt-1.5 text-sm text-graphite dark:text-graphite leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-[var(--radius-xl)] bg-slate-banner border-0 shadow-[var(--shadow-xl)] overflow-hidden relative p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,111,217,0.2)_0%,transparent_50%)]" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pure-white">Ready to fulfill faster?</h2>
              <p className="mt-3 text-pure-white/70 max-w-md">Set up your organization in under 3 minutes. First store live in 60 seconds.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/auth">
                <Button variant="secondary" size="lg">Start Free</Button>
              </Link>
              <Button variant="on-dark" size="lg" onClick={() => setDemoOpen(true)}>
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}
