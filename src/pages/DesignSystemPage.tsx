import { Link } from 'react-router-dom'
import { ArrowLeft, Package, Store, MapPin } from 'lucide-react'
import { BlitzLogo } from '../components/layout/BlitzLogo'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { RadioGroup } from '../components/ui/RadioGroup'
import { ProgressIndicator } from '../components/ui/ProgressIndicator'
import { FileUpload } from '../components/ui/FileUpload'

const colors = [
  { name: 'White', token: 'white', hex: '#FFFFFF' },
  { name: 'Off-white', token: 'off-white', hex: '#FAFAFA' },
  { name: 'Surface', token: 'surface', hex: '#F5F5F7' },
  { name: 'Graphite', token: 'graphite', hex: '#6E6E73' },
  { name: 'Charcoal', token: 'charcoal', hex: '#1D1D1F' },
  { name: 'Accent', token: 'accent', hex: '#3B6FD9' },
  { name: 'Success', token: 'success', hex: '#1A7F4B' },
  { name: 'Warning', token: 'warning', hex: '#B45309' },
  { name: 'Error', token: 'error', hex: '#C41E3A' },
]

const typeScale = [
  { name: 'Display', size: '3.25rem / 52px', weight: 'Semibold 600', sample: 'Deliver faster.' },
  { name: 'Heading 1', size: '2rem / 32px', weight: 'Semibold 600', sample: 'Dashboard overview' },
  { name: 'Heading 2', size: '1.5rem / 24px', weight: 'Semibold 600', sample: 'Store health' },
  { name: 'Body', size: '1rem / 16px', weight: 'Regular 400', sample: 'Turn stores into fulfillment centers.' },
  { name: 'Small', size: '0.875rem / 14px', weight: 'Regular 400', sample: 'Orders pending · 8' },
  { name: 'Caption', size: '0.75rem / 12px', weight: 'Medium 500', sample: 'STEP 1 OF 4 · ~2 MINS LEFT' },
]

export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <BlitzLogo />
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <div className="space-y-3">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Design System</p>
          <h1 className="text-4xl font-semibold text-charcoal tracking-tight">Blitz Fulfillment OS</h1>
          <p className="text-lg text-graphite max-w-xl">
            Production design language — Stripe clarity, Linear minimalism, Shopify operations.
          </p>
        </div>

        {/* Principles */}
        <Section title="Design Principles">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Calm & Focused', desc: 'Neutral palette, generous whitespace, no visual noise.' },
              { title: 'Operational Density', desc: 'High information density without feeling crowded.' },
              { title: 'Trust by Default', desc: 'Verification states, progress indicators, auto-save visible.' },
              { title: 'Subtle Motion', desc: 'Motion only when it improves clarity — 200ms transitions.' },
              { title: 'Keyboard First', desc: 'Full keyboard navigation, focus rings on all interactives.' },
              { title: 'Mobile Responsive', desc: 'Tablet and laptop optimized; touch-friendly targets (44px).' },
            ].map((p) => (
              <Card key={p.title} padding="md">
                <h3 className="font-semibold text-charcoal">{p.title}</h3>
                <p className="mt-2 text-sm text-graphite">{p.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Colors */}
        <Section title="Color System">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {colors.map((c) => (
              <div key={c.token} className="space-y-2">
                <div
                  className="h-16 rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-sm)]"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <p className="text-xs font-medium text-charcoal">{c.name}</p>
                  <p className="text-xs text-graphite font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <p className="text-sm text-graphite mb-6">Inter — weights 400, 500, 600, 700. Feature settings: cv02, cv03, cv04, cv11.</p>
          <div className="space-y-6">
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-6 border-b border-border last:border-0">
                <div className="w-32 shrink-0">
                  <p className="text-xs font-medium text-graphite uppercase tracking-wider">{t.name}</p>
                  <p className="text-xs text-graphite mt-1">{t.size}</p>
                  <p className="text-xs text-graphite">{t.weight}</p>
                </div>
                <p className={
                  t.name === 'Display' ? 'text-[3.25rem] font-semibold tracking-tight text-charcoal leading-none' :
                  t.name === 'Heading 1' ? 'text-[2rem] font-semibold text-charcoal' :
                  t.name === 'Heading 2' ? 'text-2xl font-semibold text-charcoal' :
                  t.name === 'Small' ? 'text-sm text-graphite' :
                  t.name === 'Caption' ? 'text-xs font-medium uppercase tracking-wider text-graphite' :
                  'text-base text-charcoal'
                }>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing & Radius */}
        <Section title="Spacing & Radius">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card padding="md">
              <h3 className="font-semibold text-charcoal mb-4">Border Radius</h3>
              <div className="space-y-3">
                {[
                  { name: 'sm', value: '8px' },
                  { name: 'md', value: '10px' },
                  { name: 'lg', value: '12px' },
                  { name: 'xl', value: '14px' },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-4">
                    <div className={`h-10 w-20 bg-surface border border-border rounded-[var(--radius-${r.name})]`} />
                    <span className="text-sm text-graphite">{r.name} — {r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card padding="md">
              <h3 className="font-semibold text-charcoal mb-4">Shadows</h3>
              <div className="space-y-3">
                {['sm', 'md', 'lg', 'xl'].map((s) => (
                  <div
                    key={s}
                    className="h-12 rounded-[var(--radius-lg)] bg-white border border-border flex items-center px-4 text-sm text-graphite"
                    style={{ boxShadow: `var(--shadow-${s})` }}
                  >
                    shadow-{s}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="accent">In transit</Badge>
            <Badge variant="success">Delivered</Badge>
            <Badge variant="warning">Processing</Badge>
            <Badge variant="error">Action required</Badge>
          </div>
        </Section>

        {/* Form elements */}
        <Section title="Form Elements">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            <Input label="Default" placeholder="Enter value" />
            <Input label="With hint" placeholder="Enter value" hint="Helper text" />
            <Input label="Error state" placeholder="Enter value" error="This field is required" />
            <Input label="Success state" placeholder="Auto-filled" defaultValue="Bengaluru" success />
          </div>
          <div className="mt-6 max-w-md">
            <RadioGroup
              label="Monthly Order Volume"
              name="demo"
              options={[
                { value: 'a', label: '0 – 1,000' },
                { value: 'b', label: '1,000 – 5,000' },
              ]}
              value="a"
              onChange={() => {}}
            />
          </div>
        </Section>

        {/* Progress & Upload */}
        <Section title="Onboarding Components">
          <div className="space-y-8 max-w-xl">
            <ProgressIndicator currentStep={2} totalSteps={4} minutesLeft={2} message="Your documents are being verified." />
            <FileUpload label="GST Certificate" file={null} status="idle" onFile={() => {}} />
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card padding="md">
              <Package className="h-5 w-5 text-charcoal mb-3" />
              <h3 className="font-semibold text-charcoal">Default</h3>
              <p className="text-sm text-graphite mt-1">Standard card with soft shadow.</p>
            </Card>
            <Card padding="md" hover>
              <Store className="h-5 w-5 text-charcoal mb-3" />
              <h3 className="font-semibold text-charcoal">Hover</h3>
              <p className="text-sm text-graphite mt-1">Elevated on hover for clickables.</p>
            </Card>
            <Card padding="md" selected>
              <MapPin className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-semibold text-charcoal">Selected</h3>
              <p className="text-sm text-graphite mt-1">Accent ring for selection state.</p>
            </Card>
          </div>
        </Section>

        {/* Motion */}
        <Section title="Motion Specifications">
          <Card padding="lg">
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-charcoal mb-3">Transitions</h3>
                <ul className="space-y-2 text-graphite">
                  <li>Default: 200ms ease</li>
                  <li>Hover elevation: 200ms ease</li>
                  <li>Modal enter: 200ms scale + fade</li>
                  <li>Page progress: spring (stiffness 200)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-3">Accessibility</h3>
                <ul className="space-y-2 text-graphite">
                  <li>Focus-visible: 2px accent outline, 2px offset</li>
                  <li>Color contrast: WCAG AA minimum</li>
                  <li>Reduced motion: respect prefers-reduced-motion</li>
                  <li>ARIA: roles on dialogs, alerts, progress</li>
                </ul>
              </div>
            </div>
          </Card>
        </Section>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-charcoal tracking-tight border-b border-border pb-4">{title}</h2>
      {children}
    </section>
  )
}
