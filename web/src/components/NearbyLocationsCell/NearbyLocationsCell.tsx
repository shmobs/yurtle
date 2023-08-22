import type { NearbyLocationsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Locations from '../Locations/Locations'

export const QUERY = gql`
  query NearbyLocationsQuery($location: String!, $radius: Int) {
    nearbyLocations: searchNearby(location: $location, radius: $radius) {
      html_attributions
      status
      error_message
      info_messages
      next_page_token
      results {
        place_id
        name
        business_status
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: NearbyLocationsQuery['nearbyLocations']
) => {
  return nearbyLocations.results.map((location) => {
    return {
      gmapsPlaceId: location.place_id,
      businessName: location.name,
    }
  })
}

export const Success = ({
  nearbyLocations,
}: CellSuccessProps<NearbyLocationsQuery>) => {
  return <Locations locations={standardizeLocations(nearbyLocations)} />
}
