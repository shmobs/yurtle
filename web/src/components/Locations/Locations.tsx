import LocationCard, { ILocationCardProps } from '../LocationCard/LocationCard'

interface ILocationsProps {
  locations: ILocationCardProps[]
}

const Locations = ({ locations }: ILocationsProps) => {
  return (
    <ul>
      {locations.map((location) => {
        return (
          <LocationCard
            key={location.id || location.gmapsPlaceId}
            gmapsPlaceId={location.gmapsPlaceId}
            businessName={location.businessName}
            address={location.address}
          />
        )
      })}
    </ul>
  )
}

export default Locations
