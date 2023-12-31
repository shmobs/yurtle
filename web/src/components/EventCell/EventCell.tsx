import type { EventQuery, EventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Event from 'src/components/Event'

export const QUERY = gql`
  query EventQuery($id: String!) {
    event: event(id: $id) {
      id
      name
      type
      description
      status
      date
      isCurrentUserInterested
      interestCount
      isCurrentUserAttending
      rsvpCount
      location {
        id
        isManagedByCurrentUser
        latitude
        longitude
        address
        website
        business {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <Event />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<EventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<EventQuery, EventQueryVariables>) => {
  return <Event event={event} />
}
