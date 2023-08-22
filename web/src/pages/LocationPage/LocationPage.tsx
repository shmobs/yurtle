import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LocationPage = () => {
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
