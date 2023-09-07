import { cn } from 'src/lib/utils'

interface IManagerBadgeProps {
  location: 'event' | 'location'
  className?: string
}

const ManagerBadge = ({ location, className }: IManagerBadgeProps) => {
  return (
    <div
      className={cn(
        'border-white bg-green-100 py-2 text-center text-sm text-green-700 sm:text-base',
        location === 'location'
          ? 'sm:absolute sm:right-0 sm:z-50 sm:-mt-20 sm:max-w-xs sm:rounded-l-lg sm:border-r-2 sm:px-5  '
          : 'absolute left-0 right-0 top-0 py-4 sm:rounded-t-md md:relative md:w-full md:rounded-md',
        className
      )}
    >
      {location === 'location'
        ? 'You manage this venue.'
        : "You manage this event's venue."}
      <br />
      {location === 'location' && 'To schedule an event, tap on it!'}
    </div>
  )
}

export default ManagerBadge
