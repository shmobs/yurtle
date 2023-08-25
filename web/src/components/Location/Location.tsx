import { Location } from 'types/graphql'

interface ILocationProps {
  location: Location
}

const LocationDetails = ({ location }: ILocationProps) => {
  console.log(location)
  return (
    <main className="relative z-0 mx-auto max-w-4xl flex-1 overflow-y-auto rounded-xl bg-white shadow-lg focus:outline-none sm:mt-8 xl:order-last">
      <article>
        <div>
          <div className="relative">
            <img
              className="h-32 w-full object-cover lg:h-48"
              // src={`https://www.bu.edu/dining/files/2021/05/dunkin-donuts-box-1200x675.jpg`}
              src={`https://source.unsplash.com/1600x900/?${location.business.name}`}
              alt=""
            />
          </div>
          <div className="-gray-700 absolute top-0"></div>
          <div className="mx-auto max-w-5xl px-4 sm:pl-6 lg:pl-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="mt-6 sm:mt-14 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden"></div>
                <div className="mt-16 min-w-0 flex-1 sm:hidden">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {location.business.name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block">
              <h1 className="text-2xl font-bold text-gray-900">
                {location.business.name}
              </h1>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4
                  text-sm font-medium text-gray-900"
                >
                  About
                </button>
                <button
                  className="whitespace-nowrap border-b-2 px-1 py-4 text-sm
                  font-medium text-gray-900 transition-all duration-100 ease-in hover:border-blue-500"
                >
                  Events
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="">
              {/* <div className="flex">
                  <div className="mr-3">
                    <UsersIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                    <span className="align-middle">
                      {guestsAccepted.length} going
                    </span>
                  </div>
                </div> */}
              {/* <p className="mt-2">
                  <StarIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle">
                    Hosted by{" "}
                    <span className="font-semibold">
                      {event.Host?.firstName} {event.Host?.lastName}
                    </span>
                  </span>
                </p> */}
              <p className="mt-2">
                {/* <LocationMarkerIcon className="mr-2 h-5 w-5 text-gray-400 inline" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-map-pin mr-2 mt-[2px] inline h-5 w-5 align-top text-gray-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                </svg>
                {location.address}
              </p>
            </div>
            <div
              id="map"
              className="relative mt-2 h-72 rounded-lg shadow sm:mt-0 sm:h-96"
            >
              <img
                className="rounded-lg"
                src="https://i.imgur.com/oFypSZG.jpg"
              ></img>
              {/* {mapBoxReset && (
                  <MapBox
                    lat={event.Address[0].latitude}
                    long={event.Address[0].longitude}
                    zoom={13}
                  />
                )} */}
              {/* <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/search?q=${location.address}&key=`}
              ></iframe> */}
              <div
                className="absolute bottom-0 z-10 w-full rounded-b-lg bg-white
                    p-4 text-center font-sans text-base font-semibold sm:p-3 sm:text-sm"
              >
                {location.address}
                <br></br>
                {/* {event.Address[0].city ? event.Address[0].city + ", " : ""}
                  {event.Address[0].state} */}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 pb-24 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-lg font-bold text-gray-900">Details</dt>
              <dd
                className={`mt-1 max-w-prose space-y-5 text-sm text-gray-900`}
              >
                {location.business.description}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  )
}

export default LocationDetails
