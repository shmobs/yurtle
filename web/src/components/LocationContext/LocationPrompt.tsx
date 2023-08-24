import { ISearchLocationInfo } from './locationContextUtils'
import { useReverseGeocodeQuery } from './useReverseGeocodeQuery'

export interface ILocationPromptProps {
  onLocation: (location: { latitude: number; longitude: number }) => void
}

const LocationPrompt = ({ onLocation }: ILocationPromptProps) => {
  const [location, setLocation] = React.useState<ISearchLocationInfo | null>(
    null
  )

  const onCompleteGetReverseGeocode = (searchLocInfo: ISearchLocationInfo) => {
    setLocation(searchLocInfo)
    onLocation({
      latitude: searchLocInfo.lat,
      longitude: searchLocInfo.lng,
    })
  }

  const { getReverseGeocode } = useReverseGeocodeQuery(
    onCompleteGetReverseGeocode
  )

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          getReverseGeocode({
            variables: {
              lat: latitude,
              lng: longitude,
            },
          })
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [getReverseGeocode])

  return (
    <div>
      {location && (
        <div>
          Latitude: {location.lat} <br />
          Longitude: {location.lng} <br />
          {location.neighborhood}, {location.place}, {location.region},{' '}
          {location.country}
        </div>
      )}
    </div>
  )
}

export default LocationPrompt
