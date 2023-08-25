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

import SetLocationPopover from './SetLocationPopover'

interface ISetLocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
const SetLocationDialog = ({ open, onOpenChange }: ISetLocationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <SetLocationPopover />
      </DialogContent>
    </Dialog>
  )
}

export default SetLocationDialog
