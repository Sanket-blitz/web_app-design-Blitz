import { BENGALURU_CENTER, LOCATIONS } from './locations'

export interface GeocodeResult {
  lat: number
  lng: number
  label: string
}

function matchLocal(query: string): GeocodeResult | null {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return null

  for (const loc of Object.values(LOCATIONS)) {
    if (loc.label.toLowerCase().includes(q) || q.includes(loc.label.toLowerCase().split(' ')[0]!)) {
      return { lat: loc.lat, lng: loc.lng, label: loc.label }
    }
  }

  const aliases: Record<string, keyof typeof LOCATIONS> = {
    hsr: 'hsr',
    koramangala: 'koramangala',
    kormangala: 'koramangala',
    indiranagar: 'indiranagar',
    'mg road': 'mgRoad',
    whitefield: 'whitefield',
    jayanagar: 'jayanagar',
    malleshwaram: 'malleshwaram',
    'electronic city': 'electronicCity',
  }

  for (const [alias, key] of Object.entries(aliases)) {
    if (q.includes(alias)) {
      const loc = LOCATIONS[key]
      return { lat: loc.lat, lng: loc.lng, label: loc.label }
    }
  }

  return null
}

export async function geocodeAddress(query: string): Promise<GeocodeResult | null> {
  const trimmed = query.trim()
  if (trimmed.length < 2) return null

  const local = matchLocal(trimmed)
  if (local) return local

  try {
    const params = new URLSearchParams({
      q: `${trimmed}, Bengaluru, Karnataka, India`,
      format: 'json',
      limit: '1',
      viewbox: '77.35,12.75,77.85,13.15',
      bounded: '1',
    })

    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
    })

    if (!res.ok) return null

    const data = (await res.json()) as { lat: string; lon: string; display_name: string }[]
    const hit = data[0]
    if (!hit) return null

    return {
      lat: parseFloat(hit.lat),
      lng: parseFloat(hit.lon),
      label: hit.display_name.split(',').slice(0, 2).join(', '),
    }
  } catch {
    return null
  }
}

export { BENGALURU_CENTER }
