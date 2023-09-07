import { EventShortInfo } from 'types/graphql'

import { cn } from 'src/lib/utils'

import EventCard from '../EventCard/EventCard'
import SectionHeader from '../SectionHeader'

export interface IEventsSectionLabels {
  titleIfEmpty: string
  subtitleIfEmpty: string
  titleIfNotEmpty: string
  subtitleIfNotEmpty: string
}

interface IEventsSectionProps {
  events?: EventShortInfo[]
  labels?: IEventsSectionLabels
  /**
   * Because this is sometimes used on a page with no padding, we sometimes need to add it back
   */
  withPadding?: boolean
}

const EventsSection = ({
  events,
  labels,
  withPadding = false,
}: IEventsSectionProps) => {
  if (!labels || !events) {
    return (
      <section
        className={cn(
          'grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3',
          withPadding && 'px-5 sm:px-6'
        )}
      >
        <EventCard />
        <EventCard />
        <EventCard />
      </section>
    )
  } else {
    return (
      <section>
        {events.length > 0 ? (
          <>
            <SectionHeader
              withPadding={withPadding}
              title={labels.titleIfNotEmpty}
              subtitle={labels.subtitleIfNotEmpty}
            />
            <ul
              className={cn(
                'grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3',
                withPadding && 'px-5 sm:px-6'
              )}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ul>
          </>
        ) : (
          <SectionHeader
            withPadding={withPadding}
            title={labels.titleIfEmpty}
            subtitle={labels.subtitleIfEmpty}
          />
        )}
      </section>
    )
  }
}

export default EventsSection
