import NearbyLocationsCell from 'src/components/NearbyLocationsCell'

import LocationPrompt from '../../LocationContext/LocationPrompt'

const SearchNearby = () => {
  const [location, setLocation] = React.useState<string>(null)

  const handleLocation = (loc: { latitude: number; longitude: number }) => {
    setLocation(`${loc.latitude},${loc.longitude}`)
  }
  // get user's current location as lat/long
  return (
    <>
      <LocationPrompt onLocation={handleLocation} />
      {location && <NearbyLocationsCell location={location} />}
    </>
  )
}

export default SearchNearby
