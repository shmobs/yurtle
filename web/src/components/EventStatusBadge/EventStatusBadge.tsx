import { EventStatus } from 'types/graphql'

import { Badge } from 'src/components/ui/badge'
import { cn } from 'src/lib/utils'

interface IEventStatusBadgeProps {
  status: EventStatus | "loading"
  interestCount?: number | null
  attendingCount?: number | null
  className?: string
  onOneLine?: boolean
}
const EventStatusBadge = ({
  status,
  interestCount,
  attendingCount,
  className,
  onOneLine,
}: IEventStatusBadgeProps) => (
  <div className={cn('inline-flex gap-2', className)}>
    <Badge
      className={ status === 'loading' ? 'w-24' : undefined}
      variant={(() => {
        switch (status) {
          case 'loading':
            return 'loading'
          case 'SUGGESTED':
            return 'indigo'
          case 'REQUESTED':
            return 'yellow'
          case 'SCHEDULED':
            return 'blue'
          default:
            return 'gray'
        }
      })()}
    >
      {status !== 'loading' && status.toLocaleLowerCase()}
      {status === 'REQUESTED' && ` by ${interestCount}`}
    </Badge>
    {status === 'SCHEDULED' && (
      <div className={cn('my-auto text-xs')}>
        {onOneLine ? (
          `${
            attendingCount ? `${attendingCount} going, ` : ''
          }${interestCount} interested`
        ) : (
          <>
            <div>{!!attendingCount && `${attendingCount} going`}</div>
            <div>{interestCount} interested</div>
          </>
        )}
      </div>
    )}
  </div>
)

export default EventStatusBadge
