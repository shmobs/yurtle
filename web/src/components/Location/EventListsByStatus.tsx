import { LocationQuery } from 'types/graphql'

import EventsSection from '../EventsSection/EventsSection'

interface IEventsByStatus {
  suggested: LocationQuery['location']['eventsSuggested'] | JSX.Element
  requested: LocationQuery['location']['eventsRequested']
  published: LocationQuery['location']['eventsPublished']
}

interface IEventListsByStatusProps {
  eventsByStatus: IEventsByStatus
}

const EventListsByStatus = ({ eventsByStatus }: IEventListsByStatusProps) => {
  const [priorityOrder, setPriorityOrder] = React.useState([
    { status: 'PUBLISHED', events: eventsByStatus.published },
    { status: 'REQUESTED', events: eventsByStatus.requested },
    { status: 'SUGGESTED', events: eventsByStatus.suggested },
  ])

  React.useEffect(() => {
    const newPriorityOrder = []
    if (eventsByStatus.published && eventsByStatus.published.length > 0) {
      newPriorityOrder.push({
        status: 'PUBLISHED',
        events: eventsByStatus.published,
      })
    }
    if (eventsByStatus.requested && eventsByStatus.requested.length > 0) {
      newPriorityOrder.push({
        status: 'REQUESTED',
        events: eventsByStatus.requested,
      })
    }
    if (eventsByStatus.suggested) {
      newPriorityOrder.push({
        status: 'SUGGESTED',
        events: eventsByStatus.suggested,
      })
    }
    if (eventsByStatus.published && eventsByStatus.published.length === 0) {
      newPriorityOrder.push({
        status: 'PUBLISHED',
        events: eventsByStatus.published,
      })
    }
    if (eventsByStatus.requested && eventsByStatus.requested.length === 0) {
      newPriorityOrder.push({
        status: 'REQUESTED',
        events: eventsByStatus.requested,
      })
    }
    setPriorityOrder(newPriorityOrder)
  }, [eventsByStatus])
  return (
    <>
      {priorityOrder.map((list) => {
        if (list.status === 'PUBLISHED') {
          return (
            <EventsSection
              key={list.status}
              withPadding
              events={eventsByStatus.published}
              titleIfEmpty="There are not currently any scheduled events"
              subtitleIfEmpty="View requests below to express interest!"
              titleIfNotEmpty="Scheduled events"
              subtitleIfNotEmpty="These events are currently scheduled. To RSVP or see more information, just tap on it!"
            />
          )
        }
        //
        else if (list.status === 'REQUESTED') {
          return (
            <EventsSection
              key={list.status}
              withPadding
              events={eventsByStatus.requested}
              titleIfEmpty="There are not currently any open event requests"
              subtitleIfEmpty="View suggestions below to create a request!"
              titleIfNotEmpty="Open event requests"
              subtitleIfNotEmpty="The community has requested these events. To express interest or see more information, just tap on it!"
            />
          )
        }
        //
        else if (list.status === 'SUGGESTED') {
          if (isJSXElement(eventsByStatus.suggested)) {
            return (
              <EventsSection
                key={list.status}
                withPadding
                events={
                  eventsByStatus.suggested as LocationQuery['location']['eventsSuggested']
                }
                titleIfEmpty="There are not currently any suggested events"
                subtitleIfEmpty="View published events above to join!"
                titleIfNotEmpty="Suggested events"
                subtitleIfNotEmpty="These events are suggested by the community. To express interest or see more information, just tap on it!"
              />
            )
          }
          //
          else {
            return eventsByStatus.suggested as JSX.Element
          }
        }
      })}
    </>
  )
}

export default EventListsByStatus

function isJSXElement(variable: any) {
  return (
    typeof variable === 'object' &&
    variable !== null &&
    typeof variable.type === 'function' &&
    Object.prototype.hasOwnProperty.call(variable, 'props')
  )
}
