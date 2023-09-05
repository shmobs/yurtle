import { LocationQuery } from 'types/graphql'

import PlaceVibesCell from 'src/components/PlaceVibesCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'
import { cn } from 'src/lib/utils'

import EventCard from '../EventCard/EventCard'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Button } from '../ui/button'

interface IEventSectionProps {
  events:
    | LocationQuery['location']['eventsRequested']
    | LocationQuery['location']['eventsPublished']
  titleIfEmpty: string
  subtitleIfEmpty: string
  titleIfNotEmpty: string
  subtitleIfNotEmpty: string
  /**
   * Because this is sometimes used on a page with no padding, we sometimes need to add it back
   */
  withPadding?: boolean
}

const EventSection = ({
  events,
  titleIfEmpty,
  subtitleIfEmpty,
  titleIfNotEmpty,
  subtitleIfNotEmpty,
  withPadding = false,
}: IEventSectionProps) => (
  <section>
    {events.length > 0 ? (
      <>
        <SectionHeader title={titleIfNotEmpty} subtitle={subtitleIfNotEmpty} />
        <ul
          className={cn(
            'grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3',
            withPadding && 'px-5 sm:px-6'
          )}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              eventId={event.id}
              name={event.name}
              type={event.type}
              description={event.description}
              status={event.status}
            />
          ))}
        </ul>
      </>
    ) : (
      <SectionHeader title={titleIfEmpty} subtitle={subtitleIfEmpty} />
    )}
  </section>
)

interface ILocationProps {
  location: LocationQuery['location']
}

const Location = ({ location }: ILocationProps) => {
  console.log(location)
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
            className="absolute bottom-2 right-2 z-50 h-7 lg:bottom-4 lg:right-4 lg:h-9"
          >
            Claim this location
          </Button>
        </div>

        <SectionHeader
          title="Venue Description"
          subtitle={location.business.description}
        />

        <EventSection
          withPadding
          events={location.eventsPublished}
          titleIfEmpty="There are not currently any scheduled events"
          subtitleIfEmpty="View requests below to express interest!"
          titleIfNotEmpty="Scheduled events"
          subtitleIfNotEmpty="These events are currently scheduled. To RSVP or see more information, just tap on it!"
        />
        <EventSection
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
