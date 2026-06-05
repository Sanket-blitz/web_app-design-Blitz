export interface LatLng {
  lat: number
  lng: number
}

const OSRM_BASE = 'https://router.project-osrm.org'

export async function fetchOsrmRoute(waypoints: LatLng[]): Promise<LatLng[]> {
  if (waypoints.length < 2) return waypoints

  const coords = waypoints.map((p) => `${p.lng},${p.lat}`).join(';')
  const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.[0]?.geometry?.coordinates) {
      return waypoints
    }
    return data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }))
  } catch {
    return waypoints
  }
}
