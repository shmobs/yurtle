import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import UsersEventsCell from 'src/components/UsersEventsCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout'

const MyEventsPage = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Redirect to={routes.home()} />
  }

  return (
    <>
      <SimplePageHeader title="My Events" />

      <UsersEventsCell userId={currentUser.id} />
    </>
  )
}

export default MyEventsPage
