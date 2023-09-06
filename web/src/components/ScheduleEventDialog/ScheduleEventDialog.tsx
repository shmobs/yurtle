import { getLocalTimeZone } from '@internationalized/date'
import { DateValue } from 'react-aria'
import { EventStatus } from 'types/graphql'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog'

import { useUpdateEventMutation } from '../Event/useUpdateEventMutation'
import { Button } from '../ui/button'
import { DateTimePicker } from '../ui/date-time-picker/date-time-picker'

interface IScheduleEventDialogProps {
  action: 'schedule' | 'reschedule'
  eventId: string
  eventName: string
  setEventStatus: (status: EventStatus) => void
  setEventDate: (date: string | null | undefined) => void
  /**
   * Because we need to be able to programmatically open and close the dialog, we need to pass in the open state
   */
  isOpen: boolean
  /**
   * Because we need to be able to programmatically open and close the dialog, we need to pass in the open setter
   */
  setIsOpen: (isOpen: boolean) => void
}

const ScheduleEventDialog = ({
  action,
  eventId,
  eventName,
  setEventStatus,
  setEventDate,
  isOpen,
  setIsOpen,
}: IScheduleEventDialogProps) => {
  const [selectedDate, setSelectedDate] = React.useState<DateValue | null>(null)

  const { updateEvent, loading: updateEventLoading } = useUpdateEventMutation({
    onUpdateEventComplete: (updateEvent) => {
      setEventStatus(updateEvent.status)
      setEventDate(updateEvent.date)
      setIsOpen(false)
    },
  })

  const onSubmit = () => {
    updateEvent({
      id: eventId,
      input: {
        // Because we disable the submit button until a date is selected, we know that selectedDate is not null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        date: selectedDate!.toDate(getLocalTimeZone()).toISOString(),
        status: 'PUBLISHED',
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5 text-center">
            {action === 'reschedule' ? 'Reschedule' : 'Schedule'} {eventName}
          </DialogTitle>
          <DialogDescription className="pb-5 text-left">
            {action === 'reschedule'
              ? 'To change the event date and time, pick a new date and time, and then click the Reschedule button.'
              : 'To schedule this event, pick a date and time, and then click the Schedule button.'}
            <br />
            <br />
            We don&apos;t currently have a mechanism for notifying interested
            attendees, but we&apos;re working on it 😁
          </DialogDescription>
          <div className="mx-auto pb-5">
            <DateTimePicker
              inline
              granularity={'minute'}
              onChange={(value) => setSelectedDate(value)}
            />
          </div>
          <div className="text-center text-xs">
            Time is in your current time zone
          </div>
          <Button onClick={onSubmit} disabled={!selectedDate}>
            Schedule Event
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleEventDialog
