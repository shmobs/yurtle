import { EventShortInfo, EventStatus } from 'types/graphql'

import EventsSection, {
  IEventsSectionLabels,
} from 'src/components/EventsSection'

export type EventData = {
  [key in EventStatus]: EventShortInfo[] | JSX.Element
}

export type LabelsConfigType = {
  [key in EventStatus]: IEventsSectionLabels
}

const statusConfig: Partial<LabelsConfigType> = {
  SCHEDULED: {
    titleIfEmpty: 'There are not currently any scheduled events',
    subtitleIfEmpty:
      'Check out open requests or curated suggestions to express interest!',
    titleIfNotEmpty: 'Scheduled events',
    subtitleIfNotEmpty:
      'These events are currently scheduled. To RSVP or see more information, just tap on it!',
  },
  REQUESTED: {
    titleIfEmpty: 'There are not currently any open event requests',
    subtitleIfEmpty: 'Check out our curated suggestions to create a request!',
    titleIfNotEmpty: 'Open event requests',
    subtitleIfNotEmpty:
      'The community has requested these events. To express interest or see more information, just tap on it!',
  },
  SUGGESTED: {
    // there should NEVER be empty suggested requests, but just in case...
    titleIfEmpty: 'There are not currently any suggested events',
    subtitleIfEmpty: 'View scheduled events above to join!',
    titleIfNotEmpty: 'Curated event suggestions',
    subtitleIfNotEmpty:
      "We've curated these for this venue. To express interest or see more information, just tap on it!",
  },
}

interface IEventsByStatusProps {
  eventsByStatus?: Partial<EventData>
  withPadding?: boolean
}

export function EventsByStatus({
  eventsByStatus,
  withPadding,
}: IEventsByStatusProps) {
  // loading state
  if (!eventsByStatus) {
    return (
      <div>
        <EventsSection />
      </div>
    )
  }

  // Define the order of priority
  const order: EventStatus[] = [
    'SCHEDULED',
    'REQUESTED',
    'SUGGESTED',
    'DRAFT',
    'ARCHIVED',
  ]

  // Split the data into two groups: nonEmpty and empty
  const nonEmpty: Partial<EventData>[] = []
  const empty: Partial<EventData>[] = []

  for (const key of order) {
    const events = eventsByStatus[key]
    if (Array.isArray(events)) {
      if (events.length > 0) {
        nonEmpty.push({ [key]: events })
      } else {
        empty.push({ [key]: events })
      }
    } else if (events) {
      nonEmpty.push({ [key]: events })
    }
  }

  // Merge the two groups back into one, with nonEmpty first
  const mergedData = [...nonEmpty, ...empty]

  return (
    <div>
      {mergedData.map((events) => {
        const key = Object.keys(events)[0] as EventStatus
        const value = events[key]
        const labels = statusConfig[key]
        if (value && labels) {
          if (Array.isArray(value)) {
            return (
              <EventsSection
                withPadding={withPadding}
                key={key}
                events={value}
                labels={labels}
              />
            )
          } else {
            return value
          }
        }
      })}
    </div>
  )
}
