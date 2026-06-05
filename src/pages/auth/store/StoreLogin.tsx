import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, RefreshCw } from 'lucide-react'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'
import { generatePassword } from '../../../lib/utils'

export function StoreLogin() {
  const { store, setStore, company, setUserName, addStore } = useOnboarding()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const validate = () => {
    const e: Record<string, string> = {}
    if (!store.managerName.trim()) e.managerName = 'Manager name is required'
    if (!store.storeEmail.trim()) e.storeEmail = 'Store email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.storeEmail)) e.storeEmail = 'Enter a valid email'
    if (!store.password.trim()) e.password = 'Password is required'
    else if (store.password.length < 8) e.password = 'Password must be at least 8 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Create store login
          </h1>
          <p className="text-graphite">Credentials for the store manager to access the dashboard.</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Store Manager Name"
            placeholder="Full name"
            value={store.managerName}
            onChange={(e) => {
              setStore({ managerName: e.target.value })
              if (!store.storeEmail && company.businessEmail) {
                const domain = company.businessEmail.split('@')[1]
                const slug = e.target.value.toLowerCase().replace(/\s+/g, '.')
                if (domain) setStore({ storeEmail: `${slug}@${domain}` })
              }
            }}
            error={errors.managerName}
          />
          <Input
            label="Store Email"
            type="email"
            placeholder="manager@store.brand.com"
            value={store.storeEmail}
            onChange={(e) => setStore({ storeEmail: e.target.value })}
            error={errors.storeEmail}
          />
          <div>
            <Input
              label="Password"
              type="text"
              placeholder="Create a strong password"
              value={store.password}
              onChange={(e) => setStore({ password: e.target.value })}
              error={errors.password}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={handleGeneratePassword}>
                <RefreshCw className="h-3.5 w-3.5" />
                Generate Strong Password
              </Button>
              {store.password && store.storeEmail && (
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? 'Copied' : 'Copy Credentials'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" size="lg" onClick={() => navigate('/auth/store')}>
            Back
          </Button>
          <Button className="flex-1" size="lg" onClick={() => {
            if (validate()) {
              addStore(store)
              setUserName(store.managerName.split(' ')[0] || 'Aryan')
              navigate('/auth/store/success')
            }
          }}>
            Create Store
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
