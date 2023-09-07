import { EventQuery } from 'types/graphql'

import { Button } from 'src/components/ui/button'

interface IScheduleBtnProps {
  event: EventQuery['event']
  setScheduleEventDialogOpen: (open: boolean) => void
}

const ScheduleBtn = ({
  event,
  setScheduleEventDialogOpen,
}: IScheduleBtnProps) => (
  <Button
    variant={event.status === 'SCHEDULED' ? 'secondary' : 'default'}
    onClick={() => setScheduleEventDialogOpen(true)}
  >
    {event.status === 'SCHEDULED' ? 'Reschedule' : 'Schedule'}
  </Button>
)

export default ScheduleBtn
