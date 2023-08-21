import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import SearchNearby from 'src/components/discover/SearchNearby'
import NearbyLocationsCell from 'src/components/NearbyLocationsCell'

const SearchNearbyPage = () => {
  const [location, setLocation] = useState<string>(null)
  const radius = 8000

  const handleLocation = (loc: { latitude: number; longitude: number }) => {
    const coords = `${loc.latitude},${loc.longitude}`
    setLocation(coords)
    setLocation(coords)
  }

  return (
    <>
      <MetaTags title="SearchNearby" description="SearchNearby page" />

      <SearchNearby onLocation={handleLocation} />
      {location && <NearbyLocationsCell location={location} radius={radius} />}
    </>
  )
}

export default SearchNearbyPage
