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

const statusConfigLocation: Partial<LabelsConfigType> = {
  SCHEDULED: {
    titleIfEmpty: 'There are not currently any scheduled events at this venue',
    subtitleIfEmpty:
      'Check out open requests or curated suggestions to express interest!',
    titleIfNotEmpty: 'Scheduled events',
    subtitleIfNotEmpty:
      'These events are currently scheduled. To RSVP or see more information, just tap on it!',
  },
  REQUESTED: {
    titleIfEmpty:
      'There are not currently any open event requests at this venue',
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

const statusConfigSearch: Partial<LabelsConfigType> = {
  SCHEDULED: {
    titleIfEmpty:
      'There are not currently any scheduled events in your search area',
    subtitleIfEmpty:
      'Check out requests or suggestions or browse venues to find events!',
    titleIfNotEmpty: 'Scheduled events in your search area',
    subtitleIfNotEmpty:
      'These events are currently scheduled. To RSVP or see more information, just tap on it!',
  },
  REQUESTED: {
    titleIfEmpty:
      'There are not currently any open event requests in your search area',
    subtitleIfEmpty:
      'Check out our curated suggestions or browse venues to find events!',
    titleIfNotEmpty: 'Open event requests in your search area',
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

const statusConfigMyEvents: Partial<LabelsConfigType> = {
  SCHEDULED: {
    titleIfEmpty: 'You have not RSVPed to any events yet',
    subtitleIfEmpty:
      'Check out requests or suggestions or browse venues to find events!',
    titleIfNotEmpty: "Events you're attending",
    subtitleIfNotEmpty:
      'You have RSVPed to these events. To see more information, just tap on it!',
  },
  REQUESTED: {
    titleIfEmpty: 'You have not expressed interest in any events yet',
    subtitleIfEmpty:
      'Check out our curated suggestions or browse venues to find events!',
    titleIfNotEmpty: 'Events you are interested in',
    subtitleIfNotEmpty:
      'You have expressed interest in these events. To see more information, just tap on it!',
  },
}

interface IEventsByStatusProps {
  eventsByStatus?: Partial<EventData>
  withPadding?: boolean
  usageLocation: 'location' | 'search' | 'myEvents'
}

export function EventsByStatus({
  eventsByStatus,
  withPadding,
  usageLocation,
}: IEventsByStatusProps) {
  // loading state
  if (!eventsByStatus) {
    return (
      <div>
        <EventsSection withPadding />
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
        const labels = (() => {
          switch (usageLocation) {
            case 'location':
              return statusConfigLocation[key]
            case 'myEvents':
              return statusConfigMyEvents[key]
            case 'search':
            default:
              return statusConfigSearch[key]
          }
        })()
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
