import { EventQuery, SetEventInterestMutation } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import AddressLink from '../AddressLink'
import AuthRequiredDialog from '../AuthRequiredDialog/AuthRequiredDialog'
import EventDate from '../EventDate/EventDate'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'
import ManagerBadge from '../ManagerBadge/ManagerBadge'
import MapView from '../Mapbox/Map'
import ScheduleEventDialog from '../ScheduleEventDialog/ScheduleEventDialog'
import SectionHeader from '../SectionHeader'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

import { useSetEventInterestMutation } from './useSetEventInterestMutation'

const LocationBtn = ({
  locationId,
  className,
}: {
  locationId: string
  className?: string
}) => (
  <div
    className={cn('mt-4 flex justify-center md:mt-5 md:justify-end', className)}
  >
    <Button asChild>
      <Link to={routes.location({ id: locationId })}>
        View other events at this venue
      </Link>
    </Button>
  </div>
)

interface IEventProps {
  event: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const {
    name,
    type,
    description,
    date,
    location,
    isCurrentUserInterested,
    isManagedByCurrentUser,
    status: statusInit,
  } = event

  const [status, setCurrStatus] = React.useState(statusInit)

  const [scheduleEventDialogOpen, setScheduleEventDialogOpen] =
    React.useState(false)
  const [scheduledForDate, setScheduledForDate] = React.useState(date)

  const [isInterested, setIsInterested] = React.useState(
    !!isCurrentUserInterested
  )
  const [interestCount, setInterestCount] = React.useState(event.interestCount)

  const onSetEventInterestComplete = ({
    currentState,
    count,
  }: SetEventInterestMutation['setEventInterest']) => {
    setInterestCount(count)
    setCurrStatus(count > 0 ? 'REQUESTED' : 'SUGGESTED')
    setIsInterested(currentState)
  }

  const { setEventInterest, loading: setInterestLoading } =
    useSetEventInterestMutation({
      onSetEventInterestComplete,
    })

  const onSetEventInterest = (withOAuthRedirect?: boolean) =>
    setEventInterest({
      eventId: event.id,
      // if we're calling this on the OAuth redirect, we want to set isInterested to true
      isInterested: withOAuthRedirect ? true : !isInterested,
    })

  return (
    <>
      <SimplePageHeader title={name} subtitle={type} />

      <ScheduleEventDialog
        action={status === 'SCHEDULED' ? 'reschedule' : 'schedule'}
        eventId={event.id}
        eventName={name}
        setEventStatus={setCurrStatus}
        setEventDate={setScheduledForDate}
        isOpen={scheduleEventDialogOpen}
        setIsOpen={setScheduleEventDialogOpen}
      />

      <div className="md:flex md:min-h-full md:gap-5">
        {/* Event info */}
        <div className="md:w-1/2">
          <div className="md:flex md:h-full md:flex-col">
            {isManagedByCurrentUser && <ManagerBadge location="event" />}
            <div
              className={cn(
                'flex justify-between',
                isManagedByCurrentUser && 'mt-12 md:mt-4'
              )}
            >
              <EventStatusBadge status={status} interestCount={interestCount} />

              <AuthRequiredDialog
                buttonWhenAuthenticated={
                  isManagedByCurrentUser ? (
                    <Button
                      variant={status === 'SCHEDULED' ? 'secondary' : 'default'}
                      onClick={() => setScheduleEventDialogOpen(true)}
                    >
                      {status === 'SCHEDULED' ? 'Reschedule' : 'Schedule'}
                    </Button>
                  ) : (
                    <Button
                      className="flex gap-2"
                      onClick={() => onSetEventInterest()}
                      variant="outline"
                      disabled={setInterestLoading}
                    >
                      Interested <Checkbox checked={isInterested} />
                    </Button>
                  )
                }
                openDialogButton={
                  <Button className="flex gap-2" variant="outline">
                    Interested <Checkbox checked={isInterested} />
                  </Button>
                }
                onAuthenticated={onSetEventInterest}
              />
            </div>
            <SectionHeader
              title={
                <span>
                  Hosted by{' '}
                  <Link
                    to={routes.business({ id: location.business.id })}
                    className="link"
                  >
                    {location.business.name}
                  </Link>
                  {scheduledForDate && <EventDate dateStr={scheduledForDate} />}
                </span>
              }
            />
            <p className="text-base text-gray-500">{description}</p>
            <LocationBtn locationId={location.id} className="hidden md:flex" />
          </div>
        </div>
        {/* Location info */}
        <div className="md:w-1/2">
          <div className="mt-5 h-56 w-full overflow-clip rounded-md md:mt-0 md:h-96">
            <MapView
              lat={location.latitude}
              long={location.longitude}
              zoom={17}
            />
          </div>
          <AddressLink
            className="link mt-1 block text-center text-sm"
            text={location.address}
            searchStr={`${location.business.name}, ${location.address}`}
          />
          <LocationBtn locationId={location.id} className="flex md:hidden" />
        </div>
      </div>
    </>
  )
}

export default Event
