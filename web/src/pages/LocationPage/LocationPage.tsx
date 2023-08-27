import { MetaTags, useQuery } from '@redwoodjs/web'
import LocationDetails from 'src/components/Location/Location'
import { Location, LocationQuery } from 'types/graphql'

interface ILocationPageProps {
  id: string
}

const LOCATION_QUERY = gql`
  query LocationQuery($id: String!) {
    location(id: $id) {
      id
      address
      gmapsPlaceId
      businessId
      business {
        id
        name
        description
      }
      events {
        id
        name
      }
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`

const LocationPage = ({ id }: ILocationPageProps) => {
  const { data, loading, error } = useQuery<LocationQuery>(LOCATION_QUERY, { variables: { id } })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <MetaTags title="Location" description="Location page" />

      {/* <h1>LocationPage for location {id}</h1>
      <p>{JSON.stringify(data)}</p> */}
      {
        data.location && <LocationDetails location={data.location as Location}/>
      }
    </>
  )
}

export default LocationPage
