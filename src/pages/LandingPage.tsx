import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Monitor,
  ShoppingCart,
  Users,
  Zap,
  Shield,
  Sparkles,
  Clock,
} from 'lucide-react'
import { BlitzLogo } from '../components/layout/BlitzLogo'
import { Store2DoorMark } from '../components/layout/Store2DoorMark'
import { Footer } from '../components/layout/Footer'
import { HeroOutcomes } from '../components/landing/HeroOutcomes'
import { BookDemoModal } from '../components/landing/BookDemoModal'
import { CoverageEngine } from '../components/landing/CoverageEngine'
import { HowItWorksMerchant } from '../components/landing/HowItWorksMerchant'
import { Store2DoorEconomics } from '../components/landing/Store2DoorEconomics'
import { ValuePillars } from '../components/landing/ValuePillars'
import { PainPoints } from '../components/landing/PainPoints'
import { AnimatedMetrics } from '../components/landing/AnimatedMetrics'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

const features = [
  { icon: Monitor, title: 'POS connections', desc: 'Direct point-of-sale system connections.' },
  { icon: ShoppingCart, title: 'Native checkout shipping', desc: 'Native checkout shipping options on your site.' },
  { icon: Users, title: 'Brand-first experiences', desc: 'Your brand, your customers, your margins.' },
  { icon: Zap, title: '60-min hyper-logistics', desc: '60-minute to same-day delivery for orders up to 5 PM.' },
  { icon: Shield, title: '100% data sovereignty', desc: 'You own phones, emails, and full remarketing.' },
  { icon: Clock, title: 'Same-day by 11 PM', desc: 'Blitz same-day delivery by 11 PM for orders up to 5 PM.' },
]

const navLinks = [
  { href: '#coverage', label: 'Coverage' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#economics', label: 'Economics' },
  { href: '#why-store2door', label: 'Value pillars' },
]

export function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-off-white dark:bg-[#0a0a0f] transition-colors duration-300">
      <nav className="sticky top-0 z-50 bg-pure-white/85 dark:bg-zinc-900/90 backdrop-blur-lg border-b-2 border-border dark:border-zinc-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-3 overflow-visible">
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <BlitzLogo size="lg" className="shrink-0" />
            <Store2DoorMark size="lg" />
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 rounded-lg text-sm font-medium text-graphite hover:text-charcoal hover:bg-surface dark:hover:bg-zinc-800 transition-all">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle showLabels className="hidden sm:flex" />
            <ThemeToggle className="sm:hidden" />
            <Link to="/auth/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/auth"><Button variant="primary" size="sm">Start Free</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh dark:opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,92,246,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="accent" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                Introducing Blitz STORE2DOOR™
              </Badge>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-charcoal leading-[1.08] text-balance">
                  Meet demand <em className="text-violet-600 dark:text-violet-400 not-italic font-bold">exactly</em> where it lives.
                </h1>
                <p className="text-lg text-graphite leading-relaxed max-w-lg">
                  If your stock is already sitting in a Tier-1 metro store layout, shipping it from an out-of-state or city hub makes no economic sense.
                </p>
                <p className="text-base text-graphite leading-relaxed max-w-lg">
                  Convert physical storefront retail inventory into hyper-local fulfillment networks. Avoid warehouse delays entirely.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/auth">
                  <Button size="lg">Start Free <ArrowRight className="h-4 w-4" /></Button>
                </Link>
                <Button variant="outline" size="lg" onClick={() => setDemoOpen(true)}>Book Demo</Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-2 text-sm text-graphite">
                <span>Orders before <strong className="text-charcoal">5 PM</strong> → same day</span>
                <span><strong className="text-charcoal">60 min</strong> to 6 hours delivery</span>
                <span>Up to <strong className="text-charcoal">40 km</strong> from stores</span>
              </div>
            </div>
            <HeroOutcomes />
          </div>
        </div>
      </section>

      <AnimatedMetrics brands={[]} />

      <PainPoints />

      {/* Coverage */}
      <section id="coverage" className="relative pt-20 pb-10 md:pt-24 md:pb-12 overflow-hidden bg-surface dark:bg-[#0c0c12]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.05),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.1),transparent)] pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-600/70 dark:text-violet-400/70 mb-3">Powered via Blitz STORE2DOOR™</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight text-balance">
              Meet Demand Exactly Where It Lives
            </h2>
            <p className="mt-5 text-base md:text-lg text-graphite max-w-2xl mx-auto leading-relaxed">
              Native site traffic + Blitz same-day = 100% margin control.
            </p>
            <p className="mt-3 text-sm text-graphite max-w-xl mx-auto">
              Blitz same-day delivery by <strong className="text-charcoal">11 PM</strong> for orders up to <strong className="text-charcoal">5 PM</strong>.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/auth"><Button size="lg">Start Free <ArrowRight className="h-4 w-4" /></Button></Link>
              <Button variant="outline" size="lg" onClick={() => setDemoOpen(true)}>Book Demo</Button>
            </div>
          </div>
          <CoverageEngine />
        </div>
      </section>

      <Store2DoorEconomics />
      <ValuePillars />

      <section id="how-it-works" className="py-24 md:py-28 bg-off-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-graphite mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">Introducing Blitz STORE2DOOR™</h2>
            <p className="mt-4 text-base md:text-lg text-graphite max-w-2xl mx-auto">
              Shorter timelines = higher confidence = zero lost revenue.
            </p>
          </div>
          <HowItWorksMerchant />
        </div>
      </section>

      <section id="features" className="border-y-2 border-border dark:border-zinc-700 bg-surface/50 dark:bg-zinc-900/30 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">Powered Independently Via Blitz STORE2DOOR™</h2>
            <p className="mt-3 text-graphite">Shipping velocity is your new revenue driver.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <Card key={f.title} hover padding="md" className="border-2 border-border dark:border-zinc-600">
                <div className="h-10 w-10 rounded-lg bg-surface dark:bg-zinc-800 border border-border dark:border-zinc-600 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-charcoal" />
                </div>
                <h3 className="text-base font-semibold text-charcoal">{f.title}</h3>
                <p className="mt-1.5 text-sm text-graphite leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-2xl bg-slate-banner border-0 shadow-2xl overflow-hidden relative p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.2)_0%,transparent_50%)]" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pure-white">Instant delivery secures the order.</h2>
              <p className="mt-3 text-pure-white/80 max-w-md">Immediate distribution = lower RTO = protected margins.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/auth"><Button variant="secondary" size="lg">Start Free</Button></Link>
              <Button variant="on-dark" size="lg" onClick={() => setDemoOpen(true)}>Book Demo</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}
