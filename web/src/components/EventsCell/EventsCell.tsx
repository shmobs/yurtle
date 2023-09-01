import type { EventsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query EventsQuery($locationId: String!, $eventStatuses: [EventStatus!]!) {
    events(locationId: $locationId, eventStatuses: $eventStatuses) {
      id
      name
      type
      description
      status
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ events }: CellSuccessProps<EventsQuery>) => {
  return (
    <ul>
      {events.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
