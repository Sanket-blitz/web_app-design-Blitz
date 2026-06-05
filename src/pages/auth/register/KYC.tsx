import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'
import { ProgressIndicator } from '../../../components/ui/ProgressIndicator'
import { FileUpload } from '../../../components/ui/FileUpload'
import { Button } from '../../../components/ui/Button'
import { useOnboarding } from '../../../context/OnboardingContext'

type DocStatus = 'idle' | 'processing' | 'verified' | 'action'

function useDocStatus(file: File | null, delay = 1500): DocStatus {
  const [status, setStatus] = useState<DocStatus>('idle')

  useEffect(() => {
    if (!file) {
      setStatus('idle')
      return
    }
    setStatus('processing')
    const timer = setTimeout(() => setStatus('verified'), delay)
    return () => clearTimeout(timer)
  }, [file, delay])

  return status
}

export function KYC() {
  const { company, setCompany } = useOnboarding()
  const navigate = useNavigate()

  const gstStatus = useDocStatus(company.gstCertificate)
  const panStatus = useDocStatus(company.pan, 2000)
  const regStatus = useDocStatus(company.businessRegistration, 2500)

  const allUploaded = company.gstCertificate && company.pan && company.businessRegistration
  const allVerified = gstStatus === 'verified' && panStatus === 'verified' && regStatus === 'verified'

  return (
    <AuthLayout
      progress={
        <ProgressIndicator
          currentStep={2}
          totalSteps={4}
          minutesLeft={2}
          message={allUploaded && !allVerified ? 'Your documents are being verified.' : undefined}
        />
      }
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
            Verify your business
          </h1>
          <p className="text-graphite">
            Upload your KYC documents. We'll verify them instantly.
          </p>
        </div>

        <div className="space-y-6">
          <FileUpload
            label="GST Certificate"
            file={company.gstCertificate}
            status={gstStatus}
            onFile={(f) => setCompany({ gstCertificate: f })}
          />
          <FileUpload
            label="PAN"
            file={company.pan}
            status={panStatus}
            onFile={(f) => setCompany({ pan: f })}
          />
          <FileUpload
            label="Business Registration Document"
            file={company.businessRegistration}
            status={regStatus}
            onFile={(f) => setCompany({ businessRegistration: f })}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" size="lg" onClick={() => navigate('/auth/register/company')}>
            Back
          </Button>
          <Button
            className="flex-1"
            size="lg"
            disabled={!allUploaded}
            onClick={() => navigate('/auth/register/bank')}
          >
            Continue
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
