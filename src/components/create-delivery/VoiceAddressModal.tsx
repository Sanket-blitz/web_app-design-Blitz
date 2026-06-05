import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { parseVoiceAddress } from '../../lib/deliveryIntel'

interface VoiceAddressModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (parsed: ReturnType<typeof parseVoiceAddress>) => void
}

const DEMO_PHRASE = 'House 42, 5th Main Road, Indiranagar near Empire Restaurant, 560038'

export function VoiceAddressModal({ open, onClose, onConfirm }: VoiceAddressModalProps) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [parsed, setParsed] = useState<ReturnType<typeof parseVoiceAddress> | null>(null)

  useEffect(() => {
    if (!open) {
      setListening(false)
      setTranscript('')
      setParsed(null)
    }
  }, [open])

  const startListening = () => {
    setListening(true)
    setTranscript('')
    setParsed(null)

    type SpeechCtor = new () => {
      lang: string
      interimResults: boolean
      start: () => void
      stop: () => void
      onresult: ((e: { results: Iterable<{ 0: { transcript: string } }> }) => void) | null
      onend: (() => void) | null
      onerror: (() => void) | null
    }
    const Win = window as unknown as { SpeechRecognition?: SpeechCtor; webkitSpeechRecognition?: SpeechCtor }
    const SpeechRecognition = Win.SpeechRecognition ?? Win.webkitSpeechRecognition

    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.lang = 'en-IN'
      rec.interimResults = true
      let latest = ''
      rec.onresult = (e) => {
        latest = Array.from(e.results).map((r) => r[0].transcript).join('')
        setTranscript(latest)
      }
      rec.onend = () => finish(latest)
      rec.onerror = () => finish(DEMO_PHRASE)
      rec.start()
      setTimeout(() => rec.stop(), 5000)
    } else {
      setTimeout(() => finish(DEMO_PHRASE), 1800)
    }
  }

  const finish = (text: string) => {
    const t = text || DEMO_PHRASE
    setTranscript(t)
    setParsed(parseVoiceAddress(t))
    setListening(false)
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Address by Voice" size="md">
      <div className="space-y-4">
        <button
          type="button"
          onClick={startListening}
          disabled={listening}
          className={`w-full flex flex-col items-center gap-3 p-8 rounded-[var(--radius-xl)] border-2 transition-all ${
            listening
              ? 'border-accent bg-accent-soft animate-pulse'
              : 'border-border hover:border-accent hover:bg-surface'
          }`}
        >
          {listening ? (
            <Mic className="h-10 w-10 text-accent" />
          ) : (
            <MicOff className="h-10 w-10 text-graphite" />
          )}
          <span className="text-sm font-medium text-charcoal">
            {listening ? 'Listening… speak your address' : 'Tap to start voice entry'}
          </span>
          <span className="text-xs text-graphite text-center max-w-xs">
            e.g. "House 42, 5th Main Road, Indiranagar near Empire Restaurant"
          </span>
        </button>

        {transcript && (
          <div className="p-3 rounded-[var(--radius-lg)] bg-surface border border-border text-sm text-graphite italic">
            "{transcript}"
          </div>
        )}

        {parsed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs font-medium text-graphite uppercase tracking-wide">Parsed address — edit if needed</p>
            <Input label="Address Line 1" value={parsed.line1 ?? ''} onChange={(e) => setParsed({ ...parsed, line1: e.target.value })} />
            <Input label="Address Line 2" value={parsed.line2 ?? ''} onChange={(e) => setParsed({ ...parsed, line2: e.target.value })} />
            <Input label="Landmark" value={parsed.landmark ?? ''} onChange={(e) => setParsed({ ...parsed, landmark: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Pincode" value={parsed.pincode ?? ''} onChange={(e) => setParsed({ ...parsed, pincode: e.target.value })} />
              <Input label="City" value={parsed.city ?? ''} onChange={(e) => setParsed({ ...parsed, city: e.target.value })} />
            </div>
            <Button className="w-full" onClick={() => { onConfirm(parsed); onClose() }}>
              <Check className="h-4 w-4" /> Use this address
            </Button>
          </motion.div>
        )}
      </div>
    </Modal>
  )
}