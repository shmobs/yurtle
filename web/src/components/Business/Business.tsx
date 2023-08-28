import { IconExternalLink, IconMapPin } from '@tabler/icons-react'
import { FindBusinessQuery } from 'types/graphql'

import { Link } from '@redwoodjs/router'

import { cn } from 'src/lib/utils'

import MapView from '../Mapbox/Map'

interface IBusinessProps {
  business: FindBusinessQuery['business']
}
const Business = ({ business }: IBusinessProps) => {
  console.log(business)
  const [selectedLocation, setSelectedLocation] = React.useState(
    business.locations[0]
  )
  return (
    <main className="relative z-0 mx-auto flex-1 overflow-y-auto rounded bg-white focus:outline-none xl:order-last">
      <article>
        <div>
          <div className="relative">
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={`https://source.unsplash.com/1600x900/?${business.name}`}
              alt=""
            />
          </div>
          <div className="-gray-700 absolute top-0"></div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="mb-10 text-base">{business.description}</p>
          <h3 className="text-lg font-semibold">Locations</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              {business.locations.map((loc) => (
                <div key={loc.id} className="mt-2 flex">
                  <div className={cn('h-[34px] py-2')}>
                    <IconMapPin
                      className={cn(
                        '-mt-1 mr-1 inline h-5 w-5',
                        loc.id === selectedLocation.id
                          ? 'text-indigo-600'
                          : 'text-gray-400'
                      )}
                    />
                  </div>
                  <button
                    className={cn(
                      'h-[34px] cursor-pointer px-[2px] py-2',
                      loc.id === selectedLocation.id
                        ? 'border-b-2 border-indigo-600'
                        : ''
                    )}
                    onClick={() =>
                      setSelectedLocation(
                        business.locations.find((l) => l.id === loc.id)
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        setSelectedLocation(
                          business.locations.find((l) => l.id === loc.id)
                        )
                      }
                    }}
                    tabIndex={0}
                  >
                    {loc.address}
                  </button>
                </div>
              ))}
            </div>

            <div
              id="map"
              className="relative order-first mt-2 h-72 rounded-lg shadow sm:order-last sm:mt-0 sm:h-96"
            >
              <MapView
                lat={selectedLocation.latitude}
                long={selectedLocation.longitude}
                zoom={13}
              />
              <div
                className="group absolute bottom-0 z-10 inline w-full rounded-b-lg bg-white
                    p-4 text-center font-sans text-base font-semibold sm:p-3 sm:text-sm"
              >
                <Link to={`/location/${selectedLocation.id}`}>
                  {selectedLocation.address}
                  <IconExternalLink className="ml-2 mt-[2px] inline h-4 w-4 align-top text-gray-500 group-hover:text-indigo-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Business
