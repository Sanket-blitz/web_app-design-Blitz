import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_STORES, type Store } from '../lib/stores'
import { MOCK_ORDERS, type Order } from '../lib/orders'

export interface CompanyData {
  brandName: string
  registeredName: string
  businessEmail: string
  phoneCountryCode: string
  phone: string
  website: string
  monthlyOrders: string
  gstCertificate: File | null
  pan: File | null
  businessRegistration: File | null
  accountHolder: string
  accountNumber: string
  ifsc: string
  bankName: string
  branch: string
  addressLine1: string
  addressLine2: string
  landmark: string
  city: string
  state: string
  pincode: string
}

export interface StoreData {
  storeName: string
  storeCode: string
  storeAddress: string
  openTime: string
  closeTime: string
  managerName: string
  storeEmail: string
  password: string
}

const defaultCompany: CompanyData = {
  brandName: '',
  registeredName: '',
  businessEmail: '',
  phoneCountryCode: '+91',
  phone: '',
  website: '',
  monthlyOrders: '',
  gstCertificate: null,
  pan: null,
  businessRegistration: null,
  accountHolder: '',
  accountNumber: '',
  ifsc: '',
  bankName: '',
  branch: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
}

const defaultStore: StoreData = {
  storeName: '',
  storeCode: '',
  storeAddress: '',
  openTime: '09:00',
  closeTime: '22:00',
  managerName: '',
  storeEmail: '',
  password: '',
}

interface OnboardingContextType {
  company: CompanyData
  setCompany: (data: Partial<CompanyData>) => void
  store: StoreData
  setStore: (data: Partial<StoreData>) => void
  stores: Store[]
  activeStoreId: string
  setActiveStoreId: (id: string) => void
  addStore: (data: StoreData) => Store
  deleteStore: (id: string) => void
  activeStore: Store
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (id: string, data: Partial<Order>) => void
  lastSaved: Date | null
  userName: string
  setUserName: (name: string) => void
  isExistingLogin: boolean
  setIsExistingLogin: (v: boolean) => void
  seedDemoStores: () => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

const COMPANY_KEY = 'blitz_company'
const STORES_KEY = 'blitz_stores'
const ACTIVE_STORE_KEY = 'blitz_active_store'
const ORDERS_KEY = 'blitz_orders'

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    /* ignore */
  }
  return fallback
}

function generateId(code: string) {
  return code.toLowerCase().replace(/\s+/g, '-') || `store-${Date.now()}`
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [company, setCompanyState] = useState<CompanyData>(() => {
    const loaded = loadFromStorage<Partial<CompanyData>>(COMPANY_KEY, {})
    return { ...defaultCompany, ...loaded }
  })
  const [store, setStoreState] = useState<StoreData>(defaultStore)
  const [stores, setStores] = useState<Store[]>(() =>
    loadFromStorage(STORES_KEY, [])
  )
  const [activeStoreId, setActiveStoreId] = useState(() =>
    loadFromStorage(ACTIVE_STORE_KEY, '')
  )
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage(ORDERS_KEY, MOCK_ORDERS)
  )
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [userName, setUserName] = useState('Aryan')
  const [isExistingLogin, setIsExistingLogin] = useState(false)

  const activeStore = stores.find((s) => s.id === activeStoreId) ?? stores[0] ?? DEFAULT_STORES[0]

  const seedDemoStores = () => {
    if (stores.length === 0) {
      setStores(DEFAULT_STORES)
      setActiveStoreId(DEFAULT_STORES[0].id)
    }
  }

  const setCompany = (data: Partial<CompanyData>) => {
    setCompanyState((prev) => ({ ...prev, ...data }))
  }

  const setStore = (data: Partial<StoreData>) => {
    setStoreState((prev) => ({ ...prev, ...data }))
  }

  const addStore = (data: StoreData): Store => {
    const newStore: Store = { ...data, id: generateId(data.storeCode) }
    setStores((prev) => {
      const exists = prev.find((s) => s.storeCode === data.storeCode)
      if (exists) return prev.map((s) => (s.storeCode === data.storeCode ? newStore : s))
      return [...prev, newStore]
    })
    setActiveStoreId(newStore.id)
    return newStore
  }

  const deleteStore = (id: string) => {
    setStores((prev) => prev.filter((s) => s.id !== id))
    setActiveStoreId((cur) => {
      if (cur !== id) return cur
      const remaining = stores.filter((s) => s.id !== id)
      return remaining[0]?.id ?? ''
    })
    setOrders((prev) => prev.filter((o) => o.storeId !== id))
  }

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev])

  const updateOrder = (id: string, data: Partial<Order>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...data } : o)))
  }

  useEffect(() => {
    const { gstCertificate, pan, businessRegistration, ...serializable } = company
    void gstCertificate
    void pan
    void businessRegistration
    localStorage.setItem(COMPANY_KEY, JSON.stringify(serializable))
    setLastSaved(new Date())
  }, [company])

  useEffect(() => {
    localStorage.setItem(STORES_KEY, JSON.stringify(stores))
    setLastSaved(new Date())
  }, [stores])

  useEffect(() => {
    localStorage.setItem(ACTIVE_STORE_KEY, activeStoreId)
  }, [activeStoreId])

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }, [orders])

  const reset = () => {
    setCompanyState(defaultCompany)
    setStoreState(defaultStore)
    setStores(DEFAULT_STORES)
    setActiveStoreId(DEFAULT_STORES[0].id)
    setOrders(MOCK_ORDERS)
    localStorage.removeItem(COMPANY_KEY)
    localStorage.removeItem(STORES_KEY)
    localStorage.removeItem(ACTIVE_STORE_KEY)
    localStorage.removeItem(ORDERS_KEY)
  }

  return (
    <OnboardingContext.Provider
      value={{
        company,
        setCompany,
        store,
        setStore,
        stores,
        activeStoreId,
        setActiveStoreId,
        addStore,
        deleteStore,
        activeStore,
        orders,
        addOrder,
        updateOrder,
        lastSaved,
        userName,
        setUserName,
        isExistingLogin,
        setIsExistingLogin,
        seedDemoStores,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
