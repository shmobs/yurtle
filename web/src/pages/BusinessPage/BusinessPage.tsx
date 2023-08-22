import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const BusinessPage = () => {
  return (
    <>
      <MetaTags title="Business" description="Business page" />

      <h1>BusinessPage</h1>
      <p>
        Find me in <code>./web/src/pages/BusinessPage/BusinessPage.tsx</code>
      </p>
      <p>
        My default route is named <code>business</code>, link to me with `
        <Link to={routes.business()}>Business</Link>`
      </p>
    </>
  )
}

export default BusinessPage
