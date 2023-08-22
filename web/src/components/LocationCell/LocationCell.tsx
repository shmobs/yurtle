import type {
  FindLocationQuery,
  FindLocationQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindLocationQuery($id: String!) {
    location: location(id: $id) {
      id
      address
      gmapsPlaceId
      business {
        id
        name
        description
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindLocationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  location,
}: CellSuccessProps<FindLocationQuery, FindLocationQueryVariables>) => {
  return <div>{JSON.stringify(location)}</div>
}
