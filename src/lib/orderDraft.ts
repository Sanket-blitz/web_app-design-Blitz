export interface OrderDraft {
  customerName: string
  phone: string
  email: string
  sku: string
  productName: string
  quantity: number
  price: number
  paymentType: 'prepaid' | 'cod'
  addressLine1: string
  addressLine2: string
  landmark: string
  pincode: string
  city: string
  deliveryOption: 'fastest' | 'same_day' | null
  lat?: number
  lng?: number
  savedAt: string
}

const draftKey = (storeId: string) => `blitz_order_draft_${storeId}`

export function loadDraft(storeId: string): OrderDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(storeId))
    if (raw) return JSON.parse(raw) as OrderDraft
  } catch {
    /* ignore */
  }
  return null
}

export function saveDraft(storeId: string, draft: Omit<OrderDraft, 'savedAt'>) {
  const payload: OrderDraft = { ...draft, savedAt: new Date().toISOString() }
  localStorage.setItem(draftKey(storeId), JSON.stringify(payload))
}

export function clearDraft(storeId: string) {
  localStorage.removeItem(draftKey(storeId))
}

export const EMPTY_DRAFT: Omit<OrderDraft, 'savedAt'> = {
  customerName: '',
  phone: '',
  email: '',
  sku: '',
  productName: '',
  quantity: 1,
  price: 0,
  paymentType: 'prepaid',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  pincode: '',
  city: '',
  deliveryOption: null,
}
