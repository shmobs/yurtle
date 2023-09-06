import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog'

interface IScheduleEventDialogProps {
  eventId: string
  eventName: string
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
  eventId,
  eventName,
  isOpen,
  setIsOpen,
}: IScheduleEventDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5 text-center">
            Schedule {eventName}
          </DialogTitle>
          <DialogDescription className="pb-5 text-left">
            To schedule this event, pick a date and time, and then click the
            Schedule button. We don&apos;t currently have a mechanism for
            notifying interested attendees, and we&apos;re working on it 😁
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleEventDialog
