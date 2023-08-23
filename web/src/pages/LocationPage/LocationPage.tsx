import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

interface ILocationPageProps {
  id?: string
  gmapsPlaceId?: string
}

const LocationPage = ({ id, gmapsPlaceId }: ILocationPageProps) => {
  // if ID is included, then we have already created a record for it
  // if gmapsPlaceId is included, then we need to create a record for it
  // if neither are included, then we need to go back to the welcome page
  if (!id && !gmapsPlaceId) {
    navigate(routes.welcome())
  }

  console.log({ id, gmapsPlaceId })

  return (
    <>
      <MetaTags title="Location" description="Location page" />

      <h1>LocationPage</h1>
      <p>
        Find me in <code>./web/src/pages/LocationPage/LocationPage.tsx</code>
      </p>
      <p>
        My default route is named <code>location</code>, link to me with `
        <Link to={routes.location()}>Location</Link>`
      </p>
    </>
  )
}

export default LocationPage
