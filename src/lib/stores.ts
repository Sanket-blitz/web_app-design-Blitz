import type { StoreData } from '../context/OnboardingContext'

export interface Store extends StoreData {
  id: string
}

export const DEFAULT_STORES: Store[] = [
  {
    id: 'krm-01',
    storeName: 'Koramangala Flagship',
    storeCode: 'KRM-01',
    storeAddress: '80 Feet Road, Koramangala 4th Block',
    openTime: '09:00',
    closeTime: '22:00',
    managerName: 'Aryan Shah',
    storeEmail: 'aryan@urbanthread.com',
    password: '',
  },
  {
    id: 'ind-02',
    storeName: 'Indiranagar Store',
    storeCode: 'IND-02',
    storeAddress: '100 Feet Road, Indiranagar',
    openTime: '10:00',
    closeTime: '21:00',
    managerName: 'Priya Menon',
    storeEmail: 'priya@urbanthread.com',
    password: '',
  },
  {
    id: 'mgr-03',
    storeName: 'MG Road Boutique',
    storeCode: 'MGR-03',
    storeAddress: 'MG Road, Bengaluru',
    openTime: '09:30',
    closeTime: '22:30',
    managerName: 'Rahul Verma',
    storeEmail: 'rahul@urbanthread.com',
    password: '',
  },
]
