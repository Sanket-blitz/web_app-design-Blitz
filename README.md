# Blitz Fulfillment OS

Production-ready clickable prototype for **Store-to-Door** merchant onboarding — Blitz Hackathon 2026.

Turn retail stores and warehouses into same-day fulfillment centers. Built with Stripe-level clarity, Linear minimalism, and Shopify-grade merchant operations.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

## Prototype Flows

| Route | Experience |
|-------|------------|
| `/` | Landing page — hero network viz, trust metrics, features |
| `/auth` | Entry — New Company vs Existing Company |
| `/auth/register/*` | 4-step company registration wizard (~3 min) |
| `/auth/store/*` | Store creation + credentials (~60 sec) |
| `/auth/login` | Existing company store login |
| `/auth/welcome` | Welcome back screen |
| `/dashboard` | Operational dashboard with live metrics |
| `/gtm` | Investor-grade GTM strategy (Hackathon Problem 03) |
| `/design-system` | Full design system documentation |

### Recommended Walkthrough

1. **Landing** → Click **Start Free**
2. **New Company** → Complete registration (try pincode `560034`, IFSC `HDFC0001234`)
3. **Add First Store** → Set up store + generate password
4. **Go To Dashboard** → Create Delivery, Contact Support

Or: **Sign in** → any credentials → Welcome → Dashboard

## Design System

- **Typography:** Inter (400–700)
- **Palette:** White, off-white, graphite, charcoal, accent blue `#3B6FD9`
- **Radius:** 10–14px · **Shadows:** Soft, layered
- **Motion:** 200ms transitions, subtle spring on success states

See `/design-system` for components, states, and accessibility specs.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- React Router 7
- Lucide icons

## Project Structure

```
src/
├── components/
│   ├── ui/          # Button, Card, Input, Modal, MapPinPicker, etc.
│   ├── layout/      # AuthLayout, Footer, BlitzLogo
│   ├── landing/     # HeroNetwork, BookDemoModal
│   └── dashboard/   # CreateDeliveryModal
├── context/         # OnboardingContext (auto-save to localStorage)
├── pages/
│   ├── auth/        # Entry, register, store, login flows
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx
│   ├── GTMStrategyPage.tsx
│   └── DesignSystemPage.tsx
└── lib/utils.ts     # PINCODE_DATA, IFSC_BANKS, helpers
```

## Features

- Progressive disclosure onboarding with progress + time estimates
- Auto-save on every field change
- Drag-and-drop KYC with verification states
- IFSC auto-fetch and pincode city/state lookup
- Interactive map pin picker
- Live hero network visualization (Store → Rider → Customer)
- Keyboard-friendly focus states throughout

## GTM Strategy

Full go-to-market strategy for **Store to Door** at `/gtm` covering product naming, TAM/SAM/SOM, customer segments, pricing, competitive analysis, launch roadmap, financial model, and risk mitigation.

**Selected product name:** Blitz Fulfillment OS
