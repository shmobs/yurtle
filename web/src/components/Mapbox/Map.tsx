import React, { useEffect, useRef } from 'react'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_KEY

interface IMapViewProps {
  lat: number
  long: number
  zoom: number
}

const MapView: React.FC<IMapViewProps> = ({ lat, long, zoom }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) {
      // if the map is already initialized, just change the center
      map.current.setCenter([long, lat])
    } else {
      // initialize the map
      map.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        // style: 'mapbox://styles/mapbox/streets-v11',
        style: 'mapbox://styles/rendyapp/cllu728xe005601r980xs80oy',
        center: [long, lat],
        zoom: zoom,
      })

      map.current.addControl(new mapboxgl.FullscreenControl())
    }

    new mapboxgl.Marker({ color: 'black' })
      .setLngLat([long, lat])
      .addTo(map.current)
  }, [lat, long, zoom])

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
  )
}

export default MapView
