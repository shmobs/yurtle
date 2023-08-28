import { Location } from 'types/graphql'
import MapView from '../Mapbox/Map'
import { IconBuilding, IconInfoSquare, IconLink, IconMapPin } from '@tabler/icons-react'
import { Link } from '@redwoodjs/router'

interface ILocationProps {
  location: Location
}

const LocationDetails = ({ location }: ILocationProps) => {
  console.log(location)
  return (
    <main className="relative z-0 mx-auto flex-1 overflow-y-auto rounded bg-white focus:outline-none xl:order-last">
      <article>
        <div>
          <div
            id="map"
            className="relative mt-2 h-72 rounded-lg shadow sm:mt-0 sm:h-96"
          >
            <MapView
              lat={location.latitude}
              long={location.longitude}
              zoom={13}
            />
          </div>
          <div className="-gray-700 absolute top-0"></div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="">
              <div className="flex">
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
              </div>
              {
                location.business.website &&
                <p className="mt-2">
                <IconLink className="mr-2 inline h-5 w-5 text-gray-400" />
                <span className="align-middle">
                  <a
                    href={location.business.website}
                    className="text-indigo-600 hover:underline"
                  >
                    {location.business.website.replace("https://", "").replace("http://", "").split('/')[0]}
                  </a>
                </span>
              </p>
              }
              <p className="mt-2">
                <IconInfoSquare className="-mt-1 mr-1 inline h-5 w-5 text-gray-400" />
                {location.business.description}
              </p>
              <p className="mt-2">
                <IconMapPin className="-mt-1 mr-1 inline h-5 w-5 text-gray-400" />
                {location.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 pb-24 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-lg font-bold text-gray-900">Events</dt>
              <dd
                className={`mt-1 max-w-prose space-y-5 text-sm text-gray-900`}
              >
                {/* {location.events.map(event => {})} */}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  )
}

export default LocationDetails
