import { LocationQuery } from 'types/graphql'

import { cn } from 'src/lib/utils'

import EventCard from '../EventCard/EventCard'
import SectionHeader from '../SectionHeader'

interface IEventsSectionProps {
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

const EventsSection = ({
  events,
  titleIfEmpty,
  subtitleIfEmpty,
  titleIfNotEmpty,
  subtitleIfNotEmpty,
  withPadding = false,
}: IEventsSectionProps) => (
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

export default EventsSection
