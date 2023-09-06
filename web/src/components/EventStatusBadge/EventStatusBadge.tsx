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
  <>
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
  </>
)

export default EventStatusBadge
