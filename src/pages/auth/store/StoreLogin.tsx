import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, RefreshCw } from 'lucide-react'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { useOnboarding } from '../../../context/OnboardingContext'
import { generatePassword } from '../../../lib/utils'

const FORM_ID = 'store-login-form'

export function StoreLogin() {
  const { store, setStore, company, setUserName, addStore } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGeneratePassword = () => {
    setStore({ password: generatePassword() })
  }

  const handleCopy = async () => {
    const text = `Store: ${store.storeName}\nEmail: ${store.storeEmail}\nPassword: ${store.password}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')

    const data = new FormData(event.currentTarget)
    const managerName = String(data.get('managerName') ?? '').trim()
    const storeEmail = String(data.get('storeEmail') ?? '').trim()
    const password = String(data.get('password') ?? '').trim()

    const e: Record<string, string> = {}
    if (!managerName) e.managerName = 'Manager name is required'
    if (!storeEmail) e.storeEmail = 'Store email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(storeEmail)) e.storeEmail = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'Password must be at least 8 characters'
    setErrors(e)

    if (Object.keys(e).length > 0) {
      setSubmitError('Please complete all credential fields to create your store.')
      const firstKey = Object.keys(e)[0]
      const fieldIds: Record<string, string> = {
        managerName: 'store-manager-name',
        storeEmail: 'store-email',
        password: 'store-password',
      }
      document.getElementById(fieldIds[firstKey])?.focus()
      return
    }

    const updatedStore = { ...store, managerName, storeEmail, password }
    setStore({ managerName, storeEmail, password })
    addStore(updatedStore)
    setUserName(managerName.split(' ')[0] || 'Aryan')
    navigate('/auth/store/success')
  }

  return (
    <AuthLayout>
      <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-8 pb-28">
        {/* footer inside form — button submits natively, avoids form= attribute race */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal dark:text-zinc-100 tracking-tight">
            Create store login
          </h1>
          <p className="text-graphite dark:text-zinc-400">
            Credentials for the store manager to access the dashboard.
          </p>
        </div>

        {submitError && (
          <Alert type="error" title="Missing information">
            {submitError}
          </Alert>
        )}

        <div className="space-y-5">
          <Input
            id="store-manager-name"
            name="managerName"
            label="Store Manager Name"
            placeholder="Full name"
            value={store.managerName}
            onChange={(e) => {
              const name = e.target.value
              setStore({ managerName: name })
              if (!store.storeEmail && company.businessEmail) {
                const domain = company.businessEmail.split('@')[1]
                const slug = name.toLowerCase().replace(/\s+/g, '.')
                if (domain && slug) setStore({ storeEmail: `${slug}@${domain}` })
              }
            }}
            error={errors.managerName}
            autoComplete="name"
          />
          <Input
            id="store-email"
            name="storeEmail"
            label="Store Email"
            type="email"
            placeholder="manager@store.brand.com"
            value={store.storeEmail}
            onChange={(e) => setStore({ storeEmail: e.target.value })}
            error={errors.storeEmail}
            autoComplete="email"
          />
          <div>
            <Input
              id="store-password"
              name="password"
              label="Password"
              type="text"
              placeholder="Create a strong password"
              value={store.password}
              onChange={(e) => setStore({ password: e.target.value })}
              error={errors.password}
              autoComplete="new-password"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              <Button type="button" variant="outline" size="sm" onClick={handleGeneratePassword}>
                <RefreshCw className="h-3.5 w-3.5" />
                Generate Strong Password
              </Button>
              {store.password && store.storeEmail && (
                <Button type="button" variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? 'Copied' : 'Copy Credentials'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-[200] border-t border-border dark:border-zinc-700 bg-off-white/95 dark:bg-[#141416]/95 backdrop-blur-md px-6 py-4">
          <div className="max-w-xl mx-auto flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={() => navigate('/auth/store')}
            >
              Back
            </Button>
            <Button type="submit" className="flex-1" size="lg">
              Create Store
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
