import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import UsersLocationsCell from 'src/components/UsersLocationsCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout'

const MyLocationsPage = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Redirect to={routes.home()} />
  }

  return (
    <>
      <SimplePageHeader title="My Venues" />

      <UsersLocationsCell userId={currentUser.id} />
    </>
  )
}

export default MyLocationsPage
