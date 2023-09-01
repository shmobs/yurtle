import React, { useEffect, useRef } from 'react'

import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'

mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_KEY || ''

const MapMarker = () => (
  <svg
    width="22px"
    height="40px"
    viewBox="0 0 22 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Artboard"
        transform="translate(-613.000000, -264.000000)"
        fill="#FFFFFF"
        stroke="#4F46E5"
        strokeWidth="2"
      >
        <path
          d="M622.574861,266.827061 C622.867377,266.077088 623.696856,265.695524 624.451691,265.95075 L633.41971,287.332739 C633.576988,287.723139 633.558286,288.139677 633.401827,288.495819 C633.247382,288.847373 632.958608,289.140087 632.572249,289.290308 C632.406188,289.354875 632.235638,289.387854 632.066776,289.391965 C628.956935,287.990406 626.478633,287.34922 623.970816,287.34922 C621.493998,287.34922 619.058453,287.974573 616.669186,289.211193 C616.302012,289.405133 615.891257,289.431177 615.524081,289.316779 C615.005448,289.155194 614.573694,288.713109 614.476256,288.067593 Z"
          id="Path"
          transform="translate(624.000000, 277.500000) rotate(-180.000000) translate(-624.000000, -277.500000) "
        ></path>
      </g>
    </g>
  </svg>
)

interface IMapViewProps {
  lat: number
  long: number
  zoom: number
}

const MapView: React.FC<IMapViewProps> = ({ lat, long, zoom }) => {
  const mapContainer = useRef<HTMLElement>(null)
  const map = useRef<mapboxgl.Map>(null)

  const markerDiv = document.createElement('div')
  ReactDOM.render(<MapMarker />, markerDiv)

  useEffect(() => {
    if (map.current && mapContainer.current) {
      // if the map is already initialized, just change the center
      map.current.setCenter([long, lat])
    } else {
      // initialize the map
      map.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        // style: 'mapbox://styles/mapbox/streets-v11',
        style: 'mapbox://styles/rendyapp/cllx64zfy007j01rc34he2scb',
        center: [long, lat],
        zoom: zoom,
        dragPan: false,
        scrollZoom: false,
        touchZoomRotate: true,
      })
    }

    new mapboxgl.Marker({
      element: markerDiv,
    })
      .setLngLat([long, lat])
      .addTo(map.current)
  }, [lat, long, zoom, markerDiv])

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
  )
}

export default MapView
