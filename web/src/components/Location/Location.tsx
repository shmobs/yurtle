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
      <MetaTags title="Location" description="Location page" />
      <SimpleHeader
        title={location.business.name}
        subtitle={location.address}
        subtitleIsAddress
      />

      <main className="relative z-0 flex-1 overflow-y-auto rounded bg-white focus:outline-none xl:order-last">
        <div>
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
          <div className="-gray-700 absolute top-0"></div>
        </div>

        <div className="mx-auto mt-2 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div>
            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"> */}
            <div className="">
              {/* <div className="flex">
                  <div className="mr-3">
                    <IconBuilding className="mr-2 inline h-5 w-5 text-gray-400" />
                    <span className="align-middle">
                      <Link
                        to={`/business/${location.business.id}`}
                        className="hover:text-indigo-600 hover:underline"
                      >
                        {location.business.name}
                      </Link>
                    </span>
                  </div>
                </div> */}
              {/* {location.business.website && (
                  <p className="mt-2">
                    <IconLink className="mr-2 inline h-5 w-5 text-gray-400" />
                    <span className="align-middle">
                      <a
                        href={location.business.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {
                          location.business.website
                            .replace('https://', '')
                            .replace('http://', '')
                            .split('/')[0]
                        }
                      </a>
                    </span>
                  </p>
                )} */}
              <p className="text-sm sm:text-base">
                {location.business.description}
              </p>
              {/* <p className="mt-2">
                  <IconMapPin className="-mt-1 mr-1 inline h-5 w-5 text-gray-400" />
                  {location.address}
                </p> */}
            </div>
          </div>
        </div>
        <div className="mt-5 overflow-visible sm:mb-36">
          <PlaceVibesCell locationId={location.id} />
        </div>
      </main>
    </>
  )
}

export default Location
