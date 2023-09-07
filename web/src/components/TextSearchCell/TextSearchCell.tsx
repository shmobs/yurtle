import type { TextSearchQuery, TextSearchQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ILocationCardProps } from 'src/components/LocationCard'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import LocationsAndEvents from '../LocationsAndEvents/LocationsAndEvents'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query TextSearchQuery($query: String!, $location: String!) {
    textSearch(query: $query, location: $location) {
      html_attributions
      status
      error_message
      info_messages

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
        mapboxStaticImageUrl
        name
        formatted_address
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
      }
    }
  }
`

export const Loading = () => <LocationsAndEvents />

export const Empty = () => <LocationsAndEvents locations={[]} />

export const Failure = ({
  error,
}: CellFailureProps<TextSearchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: TextSearchQuery['textSearch']
): ILocationCardProps[] => {
  return nearbyLocations.results.map((location) => {
    // the formatted address string is hella long, so just grab the first part of it, which is likely the street address
    const addressTrimmed = location.formatted_address.split(',')[0]
    return {
      id: location.rendyLocationId || undefined,
      gmapsPlaceId: location.place_id,
      businessName: location.name,
      backgroundImageUrl: location.mapboxStaticImageUrl,
      address: addressTrimmed,
    }
  })
}

export const Success = ({ textSearch }: CellSuccessProps<TextSearchQuery>) => {
  return (
    <LocationsAndEvents
      locations={standardizeLocations(textSearch)}
      eventsByStatus={{
        REQUESTED: textSearch.eventsRequested ?? [],
        SCHEDULED: textSearch.eventsScheduled ?? [],
        SUGGESTED: textSearch.eventsSuggested ?? [],
      }}
    />
  )
}
