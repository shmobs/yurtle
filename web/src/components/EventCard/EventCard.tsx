import { EventShortInfo } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { cn } from 'src/lib/utils'

import EventDate from '../EventDate/EventDate'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'
import { Card, CardDescription, CardTitle } from '../ui/card'

interface IEventLinkProps {
  eventId: string
}

const EventLink = ({ eventId }: IEventLinkProps) => (
  <Link
    to={routes.event({ id: eventId })}
    className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-indigo-900/0 text-center text-white transition-colors group-hover:bg-indigo-900/50"
  />
)
interface IEventCardProps {
  event: EventShortInfo
  hideBadge?: boolean
}

const EventCard = ({ event, hideBadge }: IEventCardProps) => {
  const {
    name,
    id: eventId,
    status,
    type,
    date,
    description,
    interestCount,
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
      <div className="relative z-10 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
        <CardTitle className="text-base sm:text-xl">{name}</CardTitle>
        <CardDescription className="mb-2 italic text-white sm:mb-3">
          {type}
        </CardDescription>
        {!hideBadge && (
          <EventStatusBadge
            className="mb-4"
            status={status}
            interestCount={interestCount}
          />
        )}
        {date && (
          <EventDate className="mb-2 text-xs text-white" dateStr={date} />
        )}
        <CardDescription className="prose font-light tracking-wide text-white">
          {description}
        </CardDescription>
      </div>
      <div
        className="absolute left-0 top-0 z-0 h-full w-full blur-[2px]"
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
