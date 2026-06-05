# Blitz Fulfillment OS - UI Component Usage Guide

## Quick Start

All new UI components are available in `src/components/ui/index.ts` for easy importing.

## Component Overview & Examples

### 1. Button Component

**Variants:** primary, secondary, accent, ghost, outline, on-dark, success, warning, error

**Sizes:** xs, sm, md, lg, xl

```tsx
import { Button } from '@/components/ui'

export function Example() {
  return (
    <div className="space-y-4">
      {/* Color variants */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="on-dark">On Dark</Button>

      {/* Sizes */}
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>

      {/* Loading state */}
      <Button loading>Loading...</Button>

      {/* Disabled state */}
      <Button disabled>Disabled</Button>
    </div>
  )
}
```

### 2. Card Component

**Variants:** default, gradient, interactive

```tsx
import { Card } from '@/components/ui'

export function Example() {
  return (
    <div className="space-y-4">
      {/* Basic card */}
      <Card padding="md">
        <h3 className="font-semibold">Standard Card</h3>
        <p className="text-sm text-graphite mt-1">Regular card with default styling</p>
      </Card>

      {/* Gradient background */}
      <Card variant="gradient" padding="lg">
        <h3 className="font-semibold">Gradient Card</h3>
        <p className="text-sm mt-1">Enhanced visual with gradient background</p>
      </Card>

      {/* Interactive hover */}
      <Card hover padding="md">
        <h3 className="font-semibold">Interactive Card</h3>
        <p className="text-sm text-graphite mt-1">Hovers with shadow elevation</p>
      </Card>

      {/* Selected state */}
      <Card selected padding="md">
        <h3 className="font-semibold">Selected Card</h3>
        <p className="text-sm text-graphite mt-1">Shows selection ring and accent border</p>
      </Card>
    </div>
  )
}
```

### 3. Stat Component

Perfect for dashboard metrics and KPIs.

```tsx
import { Stat } from '@/components/ui'
import { Package, TrendingUp } from 'lucide-react'

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat
        label="Total Orders"
        value={245}
        icon={<Package />}
        change={{ value: 12, direction: 'up' }}
      />
      <Stat
        label="In Transit"
        value={12}
        icon={<TrendingUp />}
      />
    </div>
  )
}
```

### 4. Skeleton Component

Use for loading states and placeholders.

```tsx
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/ui'

export function LoadingState() {
  return (
    <div className="space-y-4">
      {/* Basic skeleton */}
      <Skeleton className="h-12 w-full" />

      {/* Multiple lines */}
      <Skeleton count={3} className="h-4" />

      {/* Text skeleton */}
      <SkeletonText count={4} />

      {/* Card skeleton */}
      <SkeletonCard />
    </div>
  )
}
```

### 5. Toast Notifications

Global notification system for user feedback.

```tsx
import { Button } from '@/components/ui'
import { getToastContext } from '@/components/ui/ToastContainer'

export function NotificationExample() {
  const toast = getToastContext()

  return (
    <div className="space-y-2">
      <Button onClick={() => toast.success('Success!', 'Operation completed')}>
        Show Success
      </Button>
      <Button onClick={() => toast.error('Error!', 'Something went wrong')}>
        Show Error
      </Button>
      <Button onClick={() => toast.warning('Warning', 'Please check this')}>
        Show Warning
      </Button>
      <Button onClick={() => toast.info('Info', 'This is informational')}>
        Show Info
      </Button>

      {/* With action */}
      <Button onClick={() => toast.show({
        type: 'success',
        title: 'Undo action?',
        action: { label: 'Undo', onClick: () => console.log('Undone') }
      })}>
        Show with Action
      </Button>
    </div>
  )
}
```

### 6. Alert Component

In-page alerts for important messages.

```tsx
import { Alert } from '@/components/ui'

export function AlertExample() {
  return (
    <div className="space-y-4">
      <Alert type="success" title="Success">
        Your changes have been saved successfully.
      </Alert>

      <Alert type="error" title="Error" onClose={() => {}}>
        Failed to save changes. Please try again.
      </Alert>

      <Alert type="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>

      <Alert type="info" title="Information">
        New features are now available in your account.
      </Alert>
    </div>
  )
}
```

### 7. EmptyState Component

Elegant empty state design for no data scenarios.

```tsx
import { EmptyState } from '@/components/ui'
import { Package } from 'lucide-react'

export function NoOrders() {
  return (
    <EmptyState
      icon={<Package className="h-12 w-12" />}
      title="No orders yet"
      description="Create your first delivery to get started"
      action={{
        label: 'Create Delivery',
        onClick: () => console.log('Create delivery')
      }}
    />
  )
}
```

### 8. Input Component

Enhanced form inputs with validation states.

```tsx
import { Input } from '@/components/ui'
import { useState } from 'react'

export function FormExample() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    // Validation
    if (value && !value.includes('@')) {
      setError('Please enter a valid email')
    } else {
      setError('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Basic input */}
      <Input
        label="Email Address"
        placeholder="your@email.com"
        value={email}
        onChange={handleChange}
        error={error}
      />

      {/* With hint */}
      <Input
        label="Password"
        type="password"
        hint="Minimum 8 characters"
      />

      {/* Success state */}
      <Input
        label="Verification Code"
        success
      />

      {/* Disabled state */}
      <Input
        label="Read Only"
        disabled
        defaultValue="Cannot edit"
      />
    </div>
  )
}
```

### 9. Badge Component

Status indicators and tags.

```tsx
import { Badge } from '@/components/ui'

export function BadgeExample() {
  return (
    <div className="space-y-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Active</Badge>
      <Badge variant="success">Delivered</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Information</Badge>
    </div>
  )
}
```

### 10. Tabs Component

Tabbed navigation with smooth transitions.

```tsx
import { Tabs } from '@/components/ui'
import { useState } from 'react'
import { Package, Truck, BarChart3 } from 'lucide-react'

export function TabsExample() {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { id: 'home', label: 'Home', icon: <Package /> },
    { id: 'orders', label: 'Orders', icon: <Truck /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 /> },
  ]

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      
      <div className="p-6">
        {activeTab === 'home' && <p>Home content</p>}
        {activeTab === 'orders' && <p>Orders content</p>}
        {activeTab === 'analytics' && <p>Analytics content</p>}
      </div>
    </div>
  )
}
```

## Dark Mode

All components automatically support both light and dark modes.

```tsx
import { useTheme } from '@/context/ThemeContext'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current: {theme} | Toggle Theme
    </button>
  )
}
```

The theme is:
- Stored in localStorage as `blitz_theme`
- Respected from system preferences if not set
- Applied via `dark` class on the HTML element

## CSS Custom Properties

Use Tailwind classes for styling, but you can also access CSS variables directly:

```css
/* Colors */
var(--color-white)
var(--color-off-white)
var(--color-surface)
var(--color-border)
var(--color-charcoal)
var(--color-graphite)
var(--color-accent)
var(--color-success)
var(--color-warning)
var(--color-error)
var(--color-info)

/* Shadows */
var(--shadow-xs)
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-xl)
var(--shadow-2xl)

/* Radius */
var(--radius-xs)   /* 4px */
var(--radius-sm)   /* 8px */
var(--radius-md)   /* 10px */
var(--radius-lg)   /* 12px */
var(--radius-xl)   /* 14px */
var(--radius-2xl)  /* 16px */
```

## Animations

Built-in animations for common UI patterns:

```tsx
<div className="animate-fadeInUp">Fade in with upward motion</div>
<div className="animate-slideInLeft">Slide in from left</div>
<div className="animate-pulse-slow">Gentle pulsing</div>
<div className="animate-shimmer">Shimmer loading effect</div>
<div className="animate-scale-in">Scale animation</div>
```

## Accessibility Features

- All interactive elements have proper ARIA labels
- Keyboard navigation supported throughout
- Focus rings on all focusable elements
- Screen reader friendly alerts and notifications
- Proper semantic HTML structure

## Performance Tips

1. **Lazy Load Modals**: Keep modals unmounted until needed
2. **Use Skeletons**: Show skeleton placeholders while loading data
3. **Memoize Components**: Use React.memo for frequently rendered components
4. **Avoid Inline Styles**: Use Tailwind classes for better performance

## Mobile Responsive Design

All components are mobile-first and responsive:

```tsx
{/* This works on all screen sizes */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards will stack on mobile, 2 columns on tablet, 4 on desktop */}
</div>
```

## Common Patterns

### Loading a Page
```tsx
export function OrdersPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  if (loading) {
    return <SkeletonCard />
  }

  if (!data || data.length === 0) {
    return <EmptyState title="No orders" />
  }

  return <OrdersList data={data} />
}
```

### Form with Validation
```tsx
export function OrderForm() {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = async () => {
    const newErrors = validate(formData)
    if (Object.keys(newErrors).length === 0) {
      // Valid - submit
      const toast = getToastContext()
      toast.success('Order created!')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form>
      <Input
        label="Customer Name"
        error={errors.name}
        {...}
      />
      <Button onClick={handleSubmit}>Create Order</Button>
    </form>
  )
}
```

### Dashboard Stats
```tsx
export function Dashboard() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label="Orders" value={245} icon={<Package />} change={{ value: 12, direction: 'up' }} />
      <Stat label="In Transit" value={12} icon={<Truck />} />
      <Stat label="Delivered" value={198} icon={<CheckCircle />} change={{ value: 8, direction: 'up' }} />
      <Stat label="Returns" value={3} icon={<RotateCcw />} />
    </div>
  )
}
```

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari 14+, Chrome Android)

## Need Help?

Refer to the component files in `src/components/ui/` for more detailed implementations and options.
