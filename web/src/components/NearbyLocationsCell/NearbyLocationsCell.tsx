import type { NearbyLocationsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ILocationCardProps } from 'src/components/LocationCard'
import Locations from 'src/components/Locations'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import LocationsAndEvents from '../LocationsAndEvents/LocationsAndEvents'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query NearbyLocationsQuery($location: String!, $radius: Int) {
    nearbyLocations: searchNearby(location: $location, radius: $radius) {
      html_attributions
      status
      error_message
      info_messages
      next_page_token
      eventsScheduled {
        ...EventShortInfo
      }
      eventsRequested {
        ...EventShortInfo
      }
      eventsSuggested {
        ...EventShortInfo
      }
      results {
        place_id
        rendyLocationId
        name
        business_status
        mapboxStaticImageUrl
        geometry {
          location {
            lat
            lng
          }
          viewport {
            northeast {
              lat
              lng
            }
            southwest {
              lat
              lng
            }
          }
        }
        icon
        icon_background_color
        icon_mask_base_uri
        photos {
          height
          html_attributions
          photo_reference
          width
        }
        types
      }
    }
  }
`

export const Loading = () => <Locations withPadding />

export const Empty = () => <Locations withPadding locations={[]} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: NearbyLocationsQuery['nearbyLocations']
): ILocationCardProps[] => {
  if (!nearbyLocations.results) return []
  return nearbyLocations.results.map((location) => {
    return {
      id: location.rendyLocationId || undefined,
      gmapsPlaceId: location.place_id,
      businessName: location.name,
      backgroundImageUrl: location.mapboxStaticImageUrl,
    }
  })
}

export const Success = ({
  nearbyLocations,
}: CellSuccessProps<NearbyLocationsQuery>) => {
  return (
    <LocationsAndEvents
      locations={standardizeLocations(nearbyLocations)}
      eventsByStatus={{
        REQUESTED: nearbyLocations.eventsRequested ?? [],
        SCHEDULED: nearbyLocations.eventsScheduled ?? [],
        SUGGESTED: nearbyLocations.eventsSuggested ?? [],
      }}
    />
  )
}
