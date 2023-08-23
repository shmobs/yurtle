import { navigate, routes } from '@redwoodjs/router'

import LocationCard, { ILocationCardProps } from '../LocationCard/LocationCard'

import useImportFromGMapsMutation from './useImportFromGMapsMutation'

interface ILocationsProps {
  locations: ILocationCardProps[]
}

const Locations = ({ locations }: ILocationsProps) => {
  const { onImport: onImportFromGMaps } = useImportFromGMapsMutation({
    onImportComplete: (newLocation) => {
      navigate(routes.location({ id: newLocation.id }))
    },
  })
  return (
    <ul className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
      {locations.map((location) => {
        return (
          <LocationCard
            key={location.id || location.gmapsPlaceId}
            gmapsPlaceId={location.gmapsPlaceId}
            onImportFromGMaps={onImportFromGMaps}
            businessName={location.businessName}
            address={location.address}
          />
        )
      })}
    </ul>
  )
}

export default Locations
