import React, { useEffect } from "react"

import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_KEY

interface IMapViewProps {
  lat: number
  long: number
  zoom: number
}

const MapView: React.FC<IMapViewProps> = ({ lat, long, zoom }) => {
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", //stylesheet location
      center: [long, lat],
      zoom: zoom
    })

    map.addControl(new mapboxgl.FullscreenControl())

    var marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat([long, lat])
      .addTo(map)
  }, [])
  return <div></div>
}

export default MapView
