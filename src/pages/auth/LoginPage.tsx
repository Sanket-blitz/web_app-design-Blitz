import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useOnboarding } from '../../context/OnboardingContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { setIsExistingLogin, seedDemoStores } = useOnboarding()
  const [workspaceId, setWorkspaceId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleLogin = async () => {
    const e: Record<string, string> = {}
    if (!workspaceId.trim()) e.workspaceId = 'Workspace ID is required'
    if (!email.trim()) e.email = 'Email is required'
    if (!password.trim()) e.password = 'Password is required'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setIsExistingLogin(true)
    seedDemoStores()
    navigate('/auth/stores')
  }

  return (
    <AuthLayout narrow>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Sign in to your store
          </h1>
          <p className="text-graphite">Enter your workspace credentials.</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Company Workspace ID"
            placeholder="e.g. urban-thread-blr"
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            error={errors.workspaceId}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@store.brand.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <Button className="w-full" size="lg" loading={loading} onClick={handleLogin}>
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-off-white px-3 text-graphite">or</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="md">Magic Link</Button>
          <Button variant="outline" size="md">SSO</Button>
        </div>

        <p className="text-center text-sm text-graphite">
          New to Blitz?{' '}
          <Link to="/auth" className="text-accent hover:text-accent-hover font-medium">
            Create organization
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
