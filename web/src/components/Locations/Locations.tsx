import LocationCard, { ILocationCardProps } from '../LocationCard/LocationCard'

interface ILocationsProps {
  locations: ILocationCardProps[]
}

const Locations = ({ locations }: ILocationsProps) => {
  return (
    <ul className='grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3'>
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
