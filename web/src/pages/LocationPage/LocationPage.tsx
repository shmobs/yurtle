import { MetaTags } from '@redwoodjs/web'

interface ILocationPageProps {
  id: string
}

const LocationPage = ({ id }: ILocationPageProps) => {
  return (
    <>
      <MetaTags title="Location" description="Location page" />

      <h1>LocationPage for location {id}</h1>
      <p>
        Find me in <code>./web/src/pages/LocationPage/LocationPage.tsx</code>
      </p>
    </>
  )
}

export default LocationPage
