import { EventStatus } from 'types/graphql'

import { Badge } from 'src/components/ui/badge'
import { cn } from 'src/lib/utils'

interface IEventStatusBadgeProps {
  status: EventStatus
  interestCount?: number | null
  attendingCount?: number | null
  className?: string
}
const EventStatusBadge = ({
  status,
  interestCount,
  attendingCount,
  className,
}: IEventStatusBadgeProps) => (
  <div className={cn('inline-flex gap-2', className)}>
    <Badge
      variant={(() => {
        switch (status) {
          case 'SUGGESTED':
            return 'indigo'
          case 'REQUESTED':
            return 'yellow'
          case 'SCHEDULED':
            return 'green'
          default:
            return 'gray'
        }
      })()}
    >
      {status.toLocaleLowerCase()}
      {status === 'REQUESTED' && ` by ${interestCount}`}
    </Badge>
    <div className="my-auto flex flex-col text-xs">
      <div>{status === 'SCHEDULED' && `${interestCount} interested`}</div>
      <div>
        {status === 'SCHEDULED' &&
          !!attendingCount &&
          `${attendingCount} going`}
      </div>
    </div>
  </div>
)

export default EventStatusBadge
