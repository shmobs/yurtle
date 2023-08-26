import { useLocation, useLocationContext } from './locationContext'
import { ISearchLocationInfo } from './locationContextUtils'
import { useReverseGeocodeQuery } from './useReverseGeocodeQuery'

export interface ILocationPromptProps {
  onLocation: (location: { latitude: number; longitude: number }) => void
}

const LocationPrompt = ({ onLocation }: ILocationPromptProps) => {
  const { location } = useLocationContext()

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
