import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'

import SetLocationForm from './SetLocationForm'

interface ISetLocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
const SetLocationDialog = ({ open, onOpenChange }: ISetLocationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Location</DialogTitle>
          <DialogDescription>
            Where do you want to search for events?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SetLocationForm />
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetLocationDialog
