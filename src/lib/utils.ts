import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePassword(length = 16): string {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export const PINCODE_DATA: Record<string, { city: string; state: string }> = {
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '560034': { city: 'Bengaluru', state: 'Karnataka' },
  '560038': { city: 'Bengaluru', state: 'Karnataka' },
  '560066': { city: 'Bengaluru', state: 'Karnataka' },
  '560102': { city: 'Bengaluru', state: 'Karnataka' },
  '560095': { city: 'Bengaluru', state: 'Karnataka' },
  '560078': { city: 'Bengaluru', state: 'Karnataka' },
  '560041': { city: 'Bengaluru', state: 'Karnataka' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
}

const PINCODE_PREFIX_FALLBACK: Record<string, { city: string; state: string }> = {
  '560': { city: 'Bengaluru', state: 'Karnataka' },
  '561': { city: 'Bengaluru', state: 'Karnataka' },
  '562': { city: 'Bengaluru', state: 'Karnataka' },
  '400': { city: 'Mumbai', state: 'Maharashtra' },
  '110': { city: 'New Delhi', state: 'Delhi' },
  '600': { city: 'Chennai', state: 'Tamil Nadu' },
}

export function lookupPincode(pincode: string): { city: string; state: string } | null {
  const digits = pincode.replace(/\D/g, '')
  if (digits.length !== 6) return null
  return PINCODE_DATA[digits] ?? PINCODE_PREFIX_FALLBACK[digits.slice(0, 3)] ?? { city: 'Bengaluru', state: 'Karnataka' }
}

export const IFSC_BANKS: Record<string, { bank: string; branch: string }> = {
  HDFC0001234: { bank: 'HDFC Bank', branch: 'Koramangala Branch' },
  ICIC0001234: { bank: 'ICICI Bank', branch: 'Indiranagar Branch' },
  SBIN0001234: { bank: 'State Bank of India', branch: 'MG Road Branch' },
}
