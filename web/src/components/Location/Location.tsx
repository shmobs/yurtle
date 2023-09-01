import { LocationQuery } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import PlaceVibesCell from 'src/components/PlaceVibesCell'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

import MapView from '../Mapbox/Map'

interface ILocationProps {
  location: LocationQuery['location']
}

const Location = ({ location }: ILocationProps) => {
  console.log(location)
  return (
    <>
      <SimpleHeader
        title={location.business.name}
        subtitle={location.address}
        subtitleIsAddress
      />

      <main className="relative z-0 flex-1 overflow-y-auto rounded bg-white focus:outline-none">
        <div
          id="map"
          className="relative h-36 w-full overflow-clip border-t-2 border-white shadow sm:h-56 sm:rounded-t-md sm:border-l-2 sm:border-r-2"
        >
          <MapView
            lat={location.latitude}
            long={location.longitude}
            zoom={16}
          />
        </div>

        <h3 className="ml-2 mt-2 text-xl">Venue Description</h3>
        <p className="mx-4 text-sm sm:mx-6 sm:text-base">
          {location.business.description}
        </p>

        <section>
          <div className="mx-2 mt-5 ">
            <h3 className="text-xl">Curated event suggestions</h3>
            <p className="mx-4 mb-3 text-sm leading-5 sm:text-base">
              We&apos;ve curated these for this venue. To request one, just tap
              on it!
            </p>
          </div>
          <div className="mt-1 overflow-visible sm:mb-36">
            <PlaceVibesCell locationId={location.id} />
          </div>
        </section>
      </main>
    </>
  )
}

export default Location
