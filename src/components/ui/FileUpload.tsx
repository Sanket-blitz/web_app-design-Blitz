import { useCallback, useState } from 'react'
import { Upload, Check, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from './Badge'

type UploadStatus = 'idle' | 'processing' | 'verified' | 'action'

interface FileUploadProps {
  label: string
  status?: UploadStatus
  file: File | null
  onFile: (file: File | null) => void
}

const statusConfig: Record<UploadStatus, { icon: typeof Check; badge: 'success' | 'warning' | 'error' | 'default'; text: string }> = {
  idle: { icon: Upload, badge: 'default', text: '' },
  processing: { icon: Clock, badge: 'warning', text: 'Processing' },
  verified: { icon: Check, badge: 'success', text: 'Verified' },
  action: { icon: AlertTriangle, badge: 'error', text: 'Action Required' },
}

export function FileUpload({ label, status = 'idle', file, onFile }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const config = status !== 'idle' ? statusConfig[status] : null

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const dropped = e.dataTransfer.files[0]
      if (dropped) onFile(dropped)
    },
    [onFile]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-charcoal">{label}</span>
        {config && (
          <Badge variant={config.badge}>
            <config.icon className="h-3 w-3" />
            {config.text}
          </Badge>
        )}
      </div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 p-6 rounded-[var(--radius-lg)] border-2 border-dashed cursor-pointer transition-all duration-200',
          dragOver ? 'border-accent bg-accent-soft' : 'border-border-strong hover:border-accent/50 hover:bg-off-white',
          file && status === 'verified' && 'border-success/40 bg-success-soft/30'
        )}
      >
        <input
          type="file"
          className="sr-only"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
        <Upload className="h-5 w-5 text-graphite" />
        {file ? (
          <span className="text-sm text-charcoal font-medium">{file.name}</span>
        ) : (
          <>
            <span className="text-sm text-charcoal">Drop file or click to upload</span>
            <span className="text-xs text-graphite">PDF, JPG, PNG up to 10MB</span>
          </>
        )}
      </label>
    </div>
  )
}
