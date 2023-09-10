import type { UsersEventsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import { EventsByStatus } from '../EventsByStatus'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query UsersEventsQuery($userId: String!) {
    events: user(id: $userId) {
      id
      eventInterests {
        ...EventShortInfo
      }
      eventRSVPs {
        ...EventShortInfo
      }
    }
  }
`

export const Loading = () => <EventsByStatus usageLocation="myEvents" />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ events }: CellSuccessProps<UsersEventsQuery>) => {
  return (
    <EventsByStatus
      usageLocation="myEvents"
      eventsByStatus={{
        REQUESTED: events.eventInterests,
        SCHEDULED: events.eventRSVPs,
      }}
    />
  )
}
