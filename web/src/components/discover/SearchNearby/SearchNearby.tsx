import { useSearchLocationContext } from 'src/components/LocationContext/locationContext'
import NearbyLocationsCell from 'src/components/NearbyLocationsCell'

const SearchNearby = () => {
  const { searchLocation } = useSearchLocationContext()

  // get user's current location as lat/long
  return (
    <>
      {searchLocation && (
        <NearbyLocationsCell
          // TODO fix the location type so that it instead accepts lat and lng
          location={`${searchLocation.lat},${searchLocation.lng}`}
        />
      )}
    </>
  )
}

export default SearchNearby
