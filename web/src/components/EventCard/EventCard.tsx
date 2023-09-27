import { EventShortInfo } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { cn } from 'src/lib/utils'

import EventDate from '../EventDate/EventDate'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

interface IEventLinkProps {
  eventId: string
}

const EventLink = ({ eventId }: IEventLinkProps) => (
  <Link
    to={routes.event({ id: eventId })}
    className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-indigo-900/0 text-center text-white transition-colors"
  />
)
interface IEventCardProps {
  event?: EventShortInfo
  hideBadges?: boolean
}

const EventCard = ({ event, hideBadges }: IEventCardProps) => {
  if (!event) {
    return (
      <Card className="h-72">
        <Skeleton className="h-full w-full" />
      </Card>
    )
  }
  const {
    name,
    id: eventId,
    status,
    type,
    date,
    description,
    interestCount,
    rsvpCount,
    isCurrentUserAttending,
    isCurrentUserInterested,
    location: { isManagedByCurrentUser },
  } = event
  return (
    <Card
      key={name}
      className={cn(
        'group relative h-full w-full overflow-clip',
        status === 'SUGGESTED' &&
          'border-4 border-dashed border-gray-300 transition-all hover:border-gray-400'
      )}
    >
      <EventLink eventId={eventId} />
      <div className="relative z-20 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
        <CardTitle className="text-base sm:text-xl">{name}</CardTitle>
        <CardDescription className="mb-2 italic text-white sm:mb-3">
          {type}
        </CardDescription>

        {/* badges */}
        {!hideBadges && (
          <div className="mb-4 inline-flex gap-2">
            {isCurrentUserAttending ? (
              <Badge variant="green">attending</Badge>
            ) : isCurrentUserInterested ? (
              <Badge variant="purple">interested</Badge>
            ) : isManagedByCurrentUser ? (
              <Badge variant="indigo">host</Badge>
            ) : null}

            <EventStatusBadge
              onOneLine
              status={status}
              interestCount={interestCount}
              attendingCount={rsvpCount}
            />
          </div>
        )}

        {date && (
          <EventDate className="mb-2 text-xs text-white" dateStr={date} />
        )}
        <CardDescription className="prose font-normal tracking-wide text-white">
          {description}
        </CardDescription>
      </div>
      {/* Bg overlay */}
      <div className="absolute inset-0 z-10 bg-indigo-900/50 transition-colors group-hover:bg-indigo-900/70" />
      <div
        className="absolute left-0 top-0 z-0 h-full w-full blur-[10px]"
        style={{
          backgroundImage: `url('https://source.unsplash.com/250x250/?${name}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </Card>
  )
}

export default EventCard
