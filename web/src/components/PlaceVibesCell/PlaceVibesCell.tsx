import type { GetPlaceVibesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Vibes from '../Vibes/Vibes'

export const QUERY = gql`
  query GetPlaceVibesQuery($gmapsPlaceId: String!, $vibeCount: Int) {
    placeVibes: getPlaceVibes(
      gmapsPlaceId: $gmapsPlaceId
      vibeCount: $vibeCount
    ) {
      eventName
      eventType
      eventDescription
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
