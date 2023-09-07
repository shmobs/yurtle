import { useSearchLocationContext } from 'src/components/LocationContext/locationContext'
import Locations from 'src/components/Locations/Locations'
import LocationsAndEvents from 'src/components/LocationsAndEvents/LocationsAndEvents'
import NearbyLocationsCell from 'src/components/NearbyLocationsCell'

const SearchNearby = () => {
  const { searchLocation } = useSearchLocationContext()

  // get user's current location as lat/long
  return (
    <>
      {searchLocation ? (
        <NearbyLocationsCell
          // TODO fix the location type so that it instead accepts lat and lng
          location={`${searchLocation.lat},${searchLocation.lng}`}
        />
      ) : (
        <LocationsAndEvents />
      )}
    </>
  )
}

export default SearchNearby
