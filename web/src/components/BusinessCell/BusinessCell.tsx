import type { BusinessQuery, BusinessQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Business from '../Business'
import { Skeleton } from '../ui/skeleton'

export const QUERY = gql`
  query BusinessQuery($id: String!) {
    business(id: $id) {
      id
      name
      description
      website
      createdAt
      updatedAt
      locations {
        id
        address
        mapboxStaticImageUrl
      }
    }
  }
`

export const Loading = () => <Business />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<BusinessQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  business,
}: CellSuccessProps<BusinessQuery, BusinessQueryVariables>) => {
  return <Business business={business} />
}
