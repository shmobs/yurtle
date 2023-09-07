import type { GetPlaceVibesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import Vibes from '../Vibes/Vibes'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query GetPlaceVibesQuery($locationId: String!, $minVibeCount: Int) {
    placeVibes: getPlaceVibes(
      locationId: $locationId
      minVibeCount: $minVibeCount
    ) {
      ...EventShortInfo
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
