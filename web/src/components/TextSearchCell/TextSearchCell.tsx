import type { TextSearchQuery, TextSearchQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ILocationCardProps } from 'src/components/LocationCard'
import Locations from 'src/components/Locations'

export const QUERY = gql`
  query TextSearchQuery($query: String!, $location: String!) {
    textSearch(query: $query, location: $location) {
      html_attributions
      status
      error_message
      info_messages
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

export const Loading = () => <Locations />

export const Empty = () => <Locations locations={[]} />

export const Failure = ({
  error,
}: CellFailureProps<TextSearchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: TextSearchQuery['textSearch']
): ILocationCardProps[] => {
  return nearbyLocations.results.map((location) => {
    return {
      id: location.rendyLocationId,
      gmapsPlaceId: location.place_id,
      businessName: location.name,
      backgroundImageUrl: location.mapboxStaticImageUrl,
    }
  })
}

export const Success = ({ textSearch }: CellSuccessProps<TextSearchQuery>) => {
  return <Locations locations={standardizeLocations(textSearch)} />
}
