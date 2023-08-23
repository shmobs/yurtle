import { navigate, routes } from '@redwoodjs/router'

import { Card, CardDescription, CardTitle } from 'src/components/ui/card'

/**
 * This needs to support both what we get back from the Google Places API and what we get back from our own API
 */
export interface ILocationCardProps {
  /** If this is included, it means that we have already created a record for it */
  id?: string
  /** This must be included if `id` is not included. We use it to create the record for it if it doesn't yet exist. */
  gmapsPlaceId?: string
  onImportFromGMaps?: (placeId: string) => void
  businessName: string
  address?: string
}

const LocationCard = ({
  id,
  gmapsPlaceId,
  onImportFromGMaps,
  businessName,
  address,
}: ILocationCardProps) => {
  return (
    <li key={id || gmapsPlaceId}>
      <Card className="h-28 px-3 py-3">
        <button
          className="h-full w-full"
          onClick={() => {
            if (id) {
              navigate(routes.location({ id }))
            }
            if (gmapsPlaceId) {
              onImportFromGMaps(gmapsPlaceId)
            }
          }}
        >
          <CardTitle>{businessName}</CardTitle>
          {address && <CardDescription>{address}</CardDescription>}
        </button>
      </Card>
    </li>
  )
}

export default LocationCard
