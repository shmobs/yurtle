import { PlusIcon } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import { cn } from 'src/lib/utils'

import { Card, CardDescription, CardTitle } from '../ui/card'

interface IDraftEventLinkProps {
  eventId: string
}

const DraftEventLink = ({ eventId }: IDraftEventLinkProps) => (
  <div className="absolute inset-0 z-50 hidden group-hover:block group-focus:block">
    <Link
      to={routes.event({ id: eventId })}
      className="flex h-full w-full items-center justify-center bg-indigo-900/60 text-center text-white backdrop-blur-sm"
    >
      <div>
        <PlusIcon className="mx-auto h-8 w-8" />
        <span className="block">Request this event</span>
      </div>
    </Link>
  </div>
)
interface IEventCardProps {
  eventId: string
  name: string
  type: string
  description: string
  isDraft?: boolean
}

const EventCard = ({
  eventId,
  name,
  type,
  description,
  isDraft,
}: IEventCardProps) => {
  return (
    <Card
      key={name}
      className={cn(
        'group relative h-full w-full overflow-clip',
        isDraft &&
          'border-4 border-dashed border-gray-300 hover:border-gray-400'
      )}
    >
      {isDraft && <DraftEventLink eventId={eventId} />}
      <div className="relative z-10 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
        <CardTitle className="text-base sm:text-xl">{name}</CardTitle>
        <CardDescription className="mb-2 italic text-white sm:mb-3">
          {type}
        </CardDescription>
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
