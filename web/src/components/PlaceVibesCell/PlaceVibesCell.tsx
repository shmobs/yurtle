import type { GetPlaceVibesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Vibes from '../Vibes/Vibes'

export const QUERY = gql`
  query GetPlaceVibesQuery($locationId: String!, $minVibeCount: Int) {
    placeVibes: getPlaceVibes(
      locationId: $locationId
      minVibeCount: $minVibeCount
    ) {
      name
      type
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  placeVibes,
}: CellSuccessProps<GetPlaceVibesQuery>) => {
  return <Vibes placeVibes={placeVibes} />
}
