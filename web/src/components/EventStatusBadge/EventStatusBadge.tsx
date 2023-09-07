import { EventQuery } from 'types/graphql'

import { Badge } from 'src/components/ui/badge'

interface IEventStatusBadgeProps {
  status: EventQuery['event']['status']
  interestCount: EventQuery['event']['interestCount']
}
const EventStatusBadge = ({
  status,
  interestCount,
}: IEventStatusBadgeProps) => (
  <div className="inline-flex gap-2">
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
    <div className="my-auto text-xs">
      {status === 'SCHEDULED' && `${interestCount} interested`}
    </div>
  </div>
)

export default EventStatusBadge
