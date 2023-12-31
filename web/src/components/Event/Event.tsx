import { EventQuery, SetEventInterestOrRSVPMutation } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import AddressLink from '../AddressLink'
import EventDate from '../EventDate/EventDate'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'
import ManagerBadge from '../ManagerBadge/ManagerBadge'
import MapView from '../Mapbox/Map'
import ScheduleEventDialog from '../ScheduleEventDialog/ScheduleEventDialog'
import SectionHeader from '../SectionHeader'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

import InterestedBtn from './InterestedBtn'
import RSVPBtn from './RSVPButton'
import ScheduleBtn from './ScheduleBtn'
import { useSetEventInterestOrRSVPMutation } from './useSetEventInterestOrRSVPMutation'

const LocationBtn = ({
  locationId,
  className,
}: {
  locationId?: string
  className?: string
}) => (
  <div
    id="location-btn"
    className={cn('mt-4 flex justify-center md:mt-5 md:justify-end', className)}
  >
    {locationId ? (
      <Button variant="secondary" asChild>
        <Link to={routes.location({ id: locationId })}>
          View other events at this venue
        </Link>
      </Button>
    ) : (
      <Skeleton className="h-10 w-60" />
    )}
  </div>
)

interface IEventProps {
  event?: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const {
    name,
    type,
    description,
    date,
    location,
    isCurrentUserInterested,
    isCurrentUserAttending,
    status: statusInit,
  } = event || {}

  const [status, setCurrStatus] = React.useState(statusInit)

  const [scheduleEventDialogOpen, setScheduleEventDialogOpen] =
    React.useState(false)
  const [scheduledForDate, setScheduledForDate] = React.useState(date)

  const [isInterested, setIsInterested] = React.useState(
    !!isCurrentUserInterested
  )
  const [interestCount, setInterestCount] = React.useState(event?.interestCount)

  const [isAttending, setIsAttending] = React.useState(!!isCurrentUserAttending)
  const [attendingCount, setAttendingCount] = React.useState(event?.rsvpCount)

  const onSetEventInterestOrRSVPComplete = ({
    status,
    interestCount,
    rsvpCount,
    isCurrentUserInterested,
    isCurrentUserAttending,
  }: SetEventInterestOrRSVPMutation['event']) => {
    setInterestCount(interestCount)
    setAttendingCount(rsvpCount)
    setCurrStatus(status)
    setIsInterested(!!isCurrentUserInterested)
    setIsAttending(!!isCurrentUserAttending)
  }

  const { setEventInterestOrRSVP, loading: setInterestOrRSVPLoading } =
    useSetEventInterestOrRSVPMutation({
      onSetEventInterestOrRSVPComplete,
    })

  const onSetEventInterest = (withOAuthRedirect?: boolean) =>
    setEventInterestOrRSVP({
      eventId: event!.id,
      // if we're calling this on the OAuth redirect, we want to set isInterested to true
      isInterestedOrAttending: withOAuthRedirect ? true : !isInterested,
      action: 'INTEREST',
    })

  const onSetEventRSVP = (withOAuthRedirect?: boolean) =>
    setEventInterestOrRSVP({
      eventId: event!.id,
      // if we're calling this on the OAuth redirect, we want to set isInterested to true
      isInterestedOrAttending: withOAuthRedirect ? true : !isAttending,
      action: 'RSVP',
    })

  return (
    <>
      {name && <SimplePageHeader title={name} subtitle={type} />}

      {event && (
        <ScheduleEventDialog
          action={status === 'SCHEDULED' ? 'reschedule' : 'schedule'}
          eventId={event.id}
          eventName={name!}
          setEventStatus={setCurrStatus}
          setEventDate={setScheduledForDate}
          isOpen={scheduleEventDialogOpen}
          setIsOpen={setScheduleEventDialogOpen}
        />
      )}

      <div className="md:flex md:min-h-full md:gap-5 lg:m-5 lg:gap-10">
        {/* Event info */}
        <div className="md:w-1/2">
          <div className="md:flex md:h-full md:flex-col">
            {location?.isManagedByCurrentUser && (
              <ManagerBadge location="event" />
            )}
            <div
              className={cn(
                'flex justify-between',
                location?.isManagedByCurrentUser && 'mt-12 md:mt-4'
              )}
            >
              <EventStatusBadge
                status={status || 'loading'}
                interestCount={interestCount}
                attendingCount={attendingCount}
              />

              {location?.isManagedByCurrentUser && event ? (
                <ScheduleBtn
                  event={event}
                  setScheduleEventDialogOpen={setScheduleEventDialogOpen}
                />
              ) : event ? (
                status === 'SCHEDULED' ? (
                  <RSVPBtn
                    onSetEventRSVP={onSetEventRSVP}
                    setInterestOrRSVPLoading={setInterestOrRSVPLoading}
                    isAttending={isAttending}
                  />
                ) : (
                  <InterestedBtn
                    onSetEventInterest={onSetEventInterest}
                    setInterestOrRSVPLoading={setInterestOrRSVPLoading}
                    isInterested={isInterested}
                  />
                )
              ) : (
                <Skeleton className="h-10 w-32" />
              )}
            </div>
            <SectionHeader
              title={
                location && (
                  <span>
                    Hosted by{' '}
                    <Link
                      to={routes.business({ id: location.business.id })}
                      className="link"
                    >
                      {location.business.name}
                    </Link>
                    {scheduledForDate && (
                      <EventDate dateStr={scheduledForDate} />
                    )}
                  </span>
                )
              }
            />
            <p className="text-base text-gray-500">{description}</p>
            <LocationBtn locationId={location?.id} className="hidden md:flex" />
          </div>
        </div>
        {/* Location info */}
        <div className="md:w-1/2">
          <div className="mt-5 h-56 w-full overflow-clip rounded-md md:mt-0 md:h-96">
            {location ? (
              <MapView
                lat={location.latitude}
                long={location.longitude}
                zoom={17}
              />
            ) : (
              <Skeleton />
            )}
          </div>
          {location && (
            <AddressLink
              className="link mt-1 block text-center text-sm"
              text={location.address}
              searchStr={`${location.business.name}, ${location.address}`}
            />
          )}
          <LocationBtn locationId={location?.id} className="flex md:hidden" />
        </div>
      </div>
    </>
  )
}

export default Event
