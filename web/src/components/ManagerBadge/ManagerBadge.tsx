import { cn } from 'src/lib/utils'

interface IManagerBadgeProps {
  location: 'event' | 'location'
  className?: string
}

const ManagerBadge = ({ location, className }: IManagerBadgeProps) => {
  return (
    <div
      className={cn(
        'border-white bg-green-100 py-2 text-center text-sm text-green-700 sm:max-w-xs  sm:text-base',
        location === 'location'
          ? 'sm:absolute sm:right-0 sm:z-50 sm:-mt-20 sm:rounded-l-lg sm:border-r-2 sm:px-5'
          : 'sm:mt-5 ',
        className
      )}
    >
      You manage this location.
      <br />
      To schedule an event, tap on it!
    </div>
  )
}

export default ManagerBadge
