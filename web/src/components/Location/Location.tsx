import { LocationQuery } from 'types/graphql'

import PlaceVibesCell from 'src/components/PlaceVibesCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

import EventsSection from '../EventsSection'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader'
import { Button } from '../ui/button'

interface ILocationProps {
  location: LocationQuery['location']
}

const Location = ({ location }: ILocationProps) => {
  return (
    <>
      <SimplePageHeader
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
          <Button
            variant="secondary"
            className="absolute bottom-2 left-7 right-7 z-50 m-auto h-7 lg:bottom-4 lg:left-auto lg:right-4 lg:h-9"
          >
            To start hosting events, claim this location
          </Button>
        </div>

        <SectionHeader
          title="Venue Description"
          subtitle={location.business.description}
        />

        <EventsSection
          withPadding
          events={location.eventsPublished}
          titleIfEmpty="There are not currently any scheduled events"
          subtitleIfEmpty="View requests below to express interest!"
          titleIfNotEmpty="Scheduled events"
          subtitleIfNotEmpty="These events are currently scheduled. To RSVP or see more information, just tap on it!"
        />
        <EventsSection
          withPadding
          events={location.eventsRequested}
          titleIfEmpty="There are not currently any open event requests"
          subtitleIfEmpty="View suggestions below to create a request!"
          titleIfNotEmpty="Open event requests"
          subtitleIfNotEmpty="The community has requested these events. To express interest or see more information, just tap on it!"
        />

        <section>
          <SectionHeader
            title="Curated event suggestions"
            subtitle="We've curated these for this venue. To express interest or see more information, just tap on it!"
          />

          <div className="mt-1 overflow-visible sm:mb-36">
            <PlaceVibesCell locationId={location.id} />
          </div>
        </section>
      </main>
    </>
  )
}

export default Location
