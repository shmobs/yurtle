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

export const Loading = () => <Locations />

export const Empty = () => <Locations locations={[]} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: NearbyLocationsQuery['nearbyLocations']
) => {
  return nearbyLocations.results.map((location) => {
    return {
      id: location.rendyLocationId,
      gmapsPlaceId: location.place_id,
      businessName: location.name,
      backgroundImageUrl: location.mapboxStaticImageUrl,
    }
  })
}

export const Success = ({
  nearbyLocations,
}: CellSuccessProps<NearbyLocationsQuery>) => {
  return <Locations locations={standardizeLocations(nearbyLocations)} />
}
