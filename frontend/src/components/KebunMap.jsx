import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function createPinIcon(isActive, isEducation) {
  const fill = isActive ? '#14452B' : isEducation ? '#d89536' : '#ffffff'
  const stroke = isActive ? '#ffffff' : isEducation ? '#ffffff' : '#14452B'
  const size = isActive ? 36 : 28

  return L.divIcon({
    className: 'bumikopyor-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${fill};
        border:2.5px solid ${stroke};
        box-shadow:0 6px 16px rgba(17,59,36,0.28);
        display:flex;
        align-items:center;
        justify-content:center;
        transition:transform 0.2s ease;
      ">
        <svg width="${Math.round(size * 0.48)}" height="${Math.round(size * 0.48)}" viewBox="0 0 24 24" fill="none" stroke="${isActive || isEducation ? '#ffffff' : '#14452B'}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
  })
}

export default function KebunMap({ farms, selected, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef(new Map())

  // Initialize Leaflet map once
  useEffect(() => {
    const el = containerRef.current
    if (!el || mapRef.current) return

    const initialCenter = selected ? [selected.lat, selected.lng] : [-6.54, 111.03]
    const map = L.map(el, {
      center: initialCenter,
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    mapRef.current = map

    const markers = markersRef.current

    return () => {
      map.remove()
      mapRef.current = null
      markers.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync markers with farms list & active selection
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Remove stale markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    farms.forEach((farm) => {
      const isActive = selected?.id === farm.id
      const tags = Array.isArray(farm.tags) ? farm.tags : [farm.tags]
      const isEducation = tags.includes('Wisata Edukasi') || farm.filter === 'Wisata Edukasi'

      const marker = L.marker([farm.lat, farm.lng], {
        icon: createPinIcon(isActive, isEducation),
        zIndexOffset: isActive ? 500 : 100,
      }).addTo(map)

      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${farm.lat},${farm.lng}`
      marker.bindPopup(
        `<div style="min-width:170px;font-family:Inter,sans-serif;">
          <div style="font-weight:700;font-size:12px;color:#113B24;margin-bottom:2px;">${farm.name}</div>
          <div style="font-size:11px;color:#4b5563;margin-bottom:6px;">${farm.address}, ${farm.location}</div>
          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#14452B;color:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:9999px;text-decoration:none;">
            Buka Petunjuk Arah →
          </a>
        </div>`,
      )

      marker.on('click', () => {
        onSelect(farm.id)
      })

      markersRef.current.set(farm.id, marker)
    })
  }, [farms, selected, onSelect])

  // Fly to selected farm when selection changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selected) return

    map.flyTo([selected.lat, selected.lng], 13, {
      duration: 0.65,
    })

    const activeMarker = markersRef.current.get(selected.id)
    if (activeMarker) {
      activeMarker.setZIndexOffset(600)
    }
  }, [selected])

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[320px] w-full sm:min-h-[400px]"
      aria-label="Peta lokasi kebun kopyor Pati"
    />
  )
}
