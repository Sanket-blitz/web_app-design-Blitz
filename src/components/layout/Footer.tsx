import { Link } from 'react-router-dom'
import { BlitzLogo } from './BlitzLogo'

const links: Record<string, { label: string; to: string }[]> = {
  Product: [
    { label: 'Features', to: '/#features' },
    { label: 'Design System', to: '/design-system' },
    { label: 'Get Started', to: '/auth' },
  ],
  Support: [
    { label: 'Help Center', to: '/#' },
    { label: 'Contact', to: 'mailto:hello@blitz.fulfillment' },
    { label: 'Status', to: '/#' },
    { label: 'Documentation', to: '/design-system' },
  ],
  Legal: [
    { label: 'Terms', to: '/#' },
    { label: 'Privacy', to: '/#' },
    { label: 'Security', to: '/#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-off-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <BlitzLogo />
            <p className="mt-4 text-sm text-graphite leading-relaxed">
              Fulfillment infrastructure for fashion brands. Deliver from every store.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-charcoal mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.to.startsWith('mailto:') || item.to.includes('#') ? (
                      <a href={item.to} className="text-sm text-graphite hover:text-charcoal transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} className="text-sm text-graphite hover:text-charcoal transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-graphite">© 2026 Blitz Fulfillment OS. All rights reserved.</p>
          <a href="mailto:hello@blitz.fulfillment" className="text-sm text-graphite hover:text-accent transition-colors">
            hello@blitz.fulfillment
          </a>
        </div>
      </div>
    </footer>
  )
}
