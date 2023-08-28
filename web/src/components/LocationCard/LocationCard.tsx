import { navigate, routes } from '@redwoodjs/router'

import { Card, CardDescription, CardTitle } from 'src/components/ui/card'
import { cn } from 'src/lib/utils'

import { Skeleton } from '../ui/skeleton'

/**
 * This needs to support both what we get back from the Google Places API and what we get back from our own API
 */
export interface ILocationCardProps {
  /** If this is included, it means that we have already created a record for it */
  id?: string
  /** This must be included if `id` is not included. We use it to create the record for it if it doesn't yet exist. */
  gmapsPlaceId?: string
  onImportFromGMaps?: (placeId: string) => void
  /** Leaving this out will render the card as a loading skeleton */
  businessName?: string
  address?: string
  backgroundImageUrl?: string
}

const LocationCard = ({
  id,
  gmapsPlaceId,
  onImportFromGMaps,
  businessName,
  address,
  backgroundImageUrl,
}: ILocationCardProps) => {
  return (
    <li key={id || gmapsPlaceId}>
      <Card
        className="h-32 bg-slate-800 text-white hover:shadow-md"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        {businessName ? (
          <button
            className="h-full w-full px-3 py-3"
            onClick={() => {
              if (id) {
                navigate(routes.location({ id }))
              }
              if (gmapsPlaceId) {
                console.log(
                  "didn't get an id, but got a gmapsPlaceId, so we should create a record for it"
                )
                onImportFromGMaps(gmapsPlaceId)
              }
            }}
          >
            <CardTitle>{businessName}</CardTitle>
            {address && <CardDescription>{address}</CardDescription>}
          </button>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </Card>
    </li>
  )
}

export default LocationCard
