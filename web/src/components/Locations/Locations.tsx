import { navigate, routes } from '@redwoodjs/router'

import { cn } from 'src/lib/utils'

import LocationCard, { ILocationCardProps } from '../LocationCard/LocationCard'

import useImportFromGMapsMutation from './useImportFromGMapsMutation'

interface ILocationsProps {
  locations?: ILocationCardProps[]
  withPadding?: boolean
}

const Locations = ({ locations, withPadding }: ILocationsProps) => {
  const { onImport: onImportFromGMaps } = useImportFromGMapsMutation({
    onImportComplete: (newLocation) => {
      navigate(routes.location({ id: newLocation.id }))
    },
  })

  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3',
        withPadding && 'px-5 sm:px-6'
      )}
    >
      {locations ? (
        locations.map((location) => {
          return (
            <LocationCard
              key={location.id || location.gmapsPlaceId}
              id={location.id}
              gmapsPlaceId={location.gmapsPlaceId}
              onImportFromGMaps={onImportFromGMaps}
              businessName={location.businessName}
              address={location.address}
              backgroundImageUrl={location.backgroundImageUrl}
            />
          )
        })
      ) : (
        <>
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </>
      )}
    </ul>
  )
}

export default Locations
