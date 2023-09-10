import { LocationQuery, LocationQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { EVENT_SHORT_INFO_FRAGMENT } from 'src/components/EventCell/eventFragments'
import Location from 'src/components/Location'

import { Skeleton } from '../ui/skeleton'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query LocationQuery($id: String!) {
    location(id: $id) {
      id
      address
      gmapsPlaceId
      businessId
      business {
        id
        name
        description
        website
      }

      eventsRequested {
        ...EventShortInfo
      }
      eventsScheduled {
        ...EventShortInfo
      }

      managedBy {
        id
      }
      isManagedByCurrentUser
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <Location />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<LocationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  location,
}: CellSuccessProps<LocationQuery, LocationQueryVariables>) => {
  return <Location location={location} />
}
