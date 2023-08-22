import type {
  FindBusinessQuery,
  FindBusinessQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindBusinessQuery($id: String!) {
    business: business(id: $id) {
      id
      name
      description
      locations {
        id
        address
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBusinessQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  business,
}: CellSuccessProps<FindBusinessQuery, FindBusinessQueryVariables>) => {
  return <div>{JSON.stringify(business)}</div>
}
