import { MetaTags, useQuery } from '@redwoodjs/web'
import LocationDetails from 'src/components/Location/Location'
import { Skeleton } from 'src/components/ui/skeleton'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'
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
        website
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
  const { data, loading, error } = useQuery<LocationQuery>(LOCATION_QUERY, {
    variables: { id },
  })

  if (loading) {
    return (
      <main className="relative z-0 mx-auto flex-1 overflow-y-auto rounded bg-white focus:outline-none xl:order-last">
      <article>
        <div>
          <div className="relative">
            <Skeleton className="h-32 w-full object-cover lg:h-48" />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:pl-6 lg:pl-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="mt-6 sm:mt-14 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-16 min-w-0 flex-1 sm:hidden">
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block">
              <Skeleton className="h-8 w-96" />
            </div>
          </div>
        </div>
        <div className="mt-16 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 pb-24 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dd className={`mt-1 max-w-prose space-y-5 text-sm text-gray-900`}>
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <MetaTags title="Location" description="Location page" />

      <SimpleHeader title={data.location.address} />
      {data.location && (
        <LocationDetails location={data.location as Location} />
      )}
    </>
  )
}

export default LocationPage
