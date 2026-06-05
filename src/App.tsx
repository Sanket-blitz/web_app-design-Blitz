import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingProvider } from './context/OnboardingContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from './components/ui/ToastContainer'
import { LandingPage } from './pages/LandingPage'
import { EntryPage } from './pages/auth/EntryPage'
import { CompanyInfo } from './pages/auth/register/CompanyInfo'
import { KYC } from './pages/auth/register/KYC'
import { BankDetails } from './pages/auth/register/BankDetails'
import { BusinessAddress } from './pages/auth/register/BusinessAddress'
import { RegistrationSuccess } from './pages/auth/register/RegistrationSuccess'
import { StoreInfo } from './pages/auth/store/StoreInfo'
import { StoreLogin } from './pages/auth/store/StoreLogin'
import { StoreSuccess } from './pages/auth/store/StoreSuccess'
import { LoginPage } from './pages/auth/LoginPage'
import { WelcomePage } from './pages/auth/WelcomePage'
import { StoreSelectPage } from './pages/auth/StoreSelectPage'
import { Dashboard } from './pages/Dashboard'
import { GTMStrategyPage } from './pages/GTMStrategyPage'
import { DesignSystemPage } from './pages/DesignSystemPage'

export default function App() {
  return (
    <ThemeProvider>
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<EntryPage />} />
          <Route path="/auth/register/company" element={<CompanyInfo />} />
          <Route path="/auth/register/kyc" element={<KYC />} />
          <Route path="/auth/register/bank" element={<BankDetails />} />
          <Route path="/auth/register/address" element={<BusinessAddress />} />
          <Route path="/auth/register/success" element={<RegistrationSuccess />} />
          <Route path="/auth/store" element={<StoreInfo />} />
          <Route path="/auth/store/login" element={<StoreLogin />} />
          <Route path="/auth/store/success" element={<StoreSuccess />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/stores" element={<StoreSelectPage />} />
          <Route path="/auth/welcome" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gtm" element={<GTMStrategyPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </OnboardingProvider>
    </ThemeProvider>
  )
}
