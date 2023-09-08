import type { UsersLocationsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Locations from '../Locations/Locations'

export const QUERY = gql`
  query UsersLocationsQuery($userId: String!) {
    user(id: $userId) {
      id
      managedLocations {
        id
        business {
          name
        }
        address
        mapboxStaticImageUrl
      }
    }
  }
`

export const Loading = () => <Locations />

const NotManagingAnyLocations = () => (
  <div className="mx-2 text-center sm:mt-16">
    <div className="text-xl">You don&apos;t manage any venues!</div>
    <div>
      If you&apos;re looking for your business so that you can start hosting
      events, you can
      <br />
      <Link className="link" to={routes.textSearch()}>
        search for it by name
      </Link>{' '}
      or
      <br />
      <Link className="link" to={routes.home()}>
        see nearby locations
      </Link>
      .
    </div>
  </div>
)

export const Empty = () => <NotManagingAnyLocations />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<UsersLocationsQuery>) => {
  const locations = user.managedLocations

  if (locations.length === 0) {
    return <NotManagingAnyLocations />
  } else {
    return (
      <Locations
        locations={locations.map((location) => ({
          id: location.id,
          businessName: location.business.name,
          address: location.address,
          backgroundImageUrl: location.mapboxStaticImageUrl,
        }))}
      />
    )
  }
}
