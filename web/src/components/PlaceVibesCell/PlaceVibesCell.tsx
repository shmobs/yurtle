import type { GetPlaceVibesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import Vibes from '../Vibes/Vibes'
import VibesLoading from '../VibesLoading/VibesLoading'

interface IPlaceVibesCellExtraProps {
  locationName: string
  withPadding?: boolean
}

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

export const Loading = ({
  locationName,
  withPadding,
}: IPlaceVibesCellExtraProps) => (
  <VibesLoading withPadding={withPadding} locationName={locationName} />
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  placeVibes,
  locationName,
  withPadding,
}: CellSuccessProps<GetPlaceVibesQuery> & IPlaceVibesCellExtraProps) => {
  return (
    <Vibes
      placeVibes={placeVibes}
      locationName={locationName}
      withPadding={withPadding}
    />
  )
}
