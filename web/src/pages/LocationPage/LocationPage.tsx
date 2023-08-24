import { MetaTags, useQuery } from '@redwoodjs/web'
import Location from 'src/components/Location/Location'

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
  const { data, loading, error } = useQuery(LOCATION_QUERY, { variables: { id } })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <MetaTags title="Location" description="Location page" />

      <h1>LocationPage for location {id}</h1>
      <p>{JSON.stringify(data)}</p>
      <Location/>
    </>
  )
}

export default LocationPage
