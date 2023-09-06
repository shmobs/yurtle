import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog'

import { useClaimLocationMutation } from '../Location/useClaimLocationMutation'
import { Button } from '../ui/button'

interface IClaimLocationDialogProps {
  locationId: string
  /**
   * The claimed state setter function to call when the location is claimed so that the component doesn't need to be rerendered
   */
  setIsClaimed: (state: boolean) => void
  /**
   * Because we need to be able to programmatically open and close the dialog, we need to pass in the open state
   */
  isOpen: boolean
  /**
   * Because we need to be able to programmatically open and close the dialog, we need to pass in the open setter
   */
  setIsOpen: (isOpen: boolean) => void
}
const ClaimLocationDialog = ({
  locationId,
  setIsClaimed,
  isOpen,
  setIsOpen,
}: IClaimLocationDialogProps) => {
  const { claimLocation, loading } = useClaimLocationMutation({
    onClaimLocationComplete: () => {
      setIsClaimed(true)
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5 text-center">Claim Location</DialogTitle>
          <DialogDescription className="pb-5 text-left">
            To host events, you must claim your location. Please note that this
            platform is currently a concept, so we don&apos;t do any ownership
            verification, and anyone can claim any location. We&apos;re working
            on a more robust solution.
          </DialogDescription>
          <Button
            disabled={loading}
            onClick={() => claimLocation({ id: locationId })}
          >
            I understand, claim this location
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ClaimLocationDialog
