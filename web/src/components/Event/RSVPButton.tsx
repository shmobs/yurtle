import AuthRequiredDialog from '../AuthRequiredDialog'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

interface IRSVPBtnProps {
  onSetEventRSVP: () => void
  setInterestOrRSVPLoading: boolean
  isAttending: boolean
}

const RSVPBtn = ({
  onSetEventRSVP,
  setInterestOrRSVPLoading,
  isAttending,
}: IRSVPBtnProps) => (
  <AuthRequiredDialog
    buttonWhenAuthenticated={
      <Button
        className="flex gap-2"
        onClick={() => onSetEventRSVP()}
        variant="outline"
        disabled={setInterestOrRSVPLoading}
      >
        Going <Checkbox checked={isAttending} />
      </Button>
    }
    openDialogButton={
      <Button className="flex gap-2" variant="outline">
        Going <Checkbox checked={isAttending} />
      </Button>
    }
    onAuthenticated={onSetEventRSVP}
  />
)

export default RSVPBtn
