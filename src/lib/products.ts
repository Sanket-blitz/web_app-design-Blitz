export interface Product {
  sku: string
  barcode: string
  name: string
  price: number
  image?: string
  category: string
}

export const PRODUCT_CATALOG: Product[] = [
  { sku: 'UT-SLK-001', barcode: '8901234567890', name: 'Silk Wrap Dress — Ivory', price: 4299, category: 'Dresses' },
  { sku: 'UT-LIN-014', barcode: '8901234567891', name: 'Linen Overshirt — Sand', price: 2899, category: 'Tops' },
  { sku: 'ME-GLD-022', barcode: '8901234567892', name: 'Gold Hoop Earrings', price: 1899, category: 'Accessories' },
  { sku: 'NV-BLK-008', barcode: '8901234567893', name: 'Structured Blazer — Black', price: 5499, category: 'Outerwear' },
  { sku: 'LC-WHT-031', barcode: '8901234567894', name: 'Handloom Cotton Kurta', price: 2199, category: 'Ethnic' },
  { sku: 'SS-EMB-007', barcode: '8901234567895', name: 'Embroidered Clutch', price: 1599, category: 'Bags' },
  { sku: 'UT-DEN-019', barcode: '8901234567896', name: 'High-Rise Wide Denim', price: 3299, category: 'Bottoms' },
  { sku: 'ME-PRF-003', barcode: '8901234567897', name: 'Eau de Parfum — 50ml', price: 3999, category: 'Fragrance' },
]

export function findProductBySku(sku: string): Product | undefined {
  const q = sku.trim().toUpperCase()
  return PRODUCT_CATALOG.find((p) => p.sku.toUpperCase() === q || p.barcode === sku.trim())
}

export function findProductByBarcode(barcode: string): Product | undefined {
  return PRODUCT_CATALOG.find((p) => p.barcode === barcode.trim())
}

export function getRecentSkus(orderSkus: string[]): Product[] {
  const seen = new Set<string>()
  const result: Product[] = []
  for (const sku of orderSkus) {
    if (seen.has(sku)) continue
    const p = findProductBySku(sku)
    if (p) {
      seen.add(sku)
      result.push(p)
    }
    if (result.length >= 4) break
  }
  return result
}
