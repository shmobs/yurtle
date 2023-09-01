import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Event from 'src/components/Event'

export const QUERY = gql`
  query FindEventQuery($id: String!) {
    event: event(id: $id) {
      id
      name
      type
      description
      status
      date
      location {
        id
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventQuery, FindEventQueryVariables>) => {
  return <Event event={event} />
}
