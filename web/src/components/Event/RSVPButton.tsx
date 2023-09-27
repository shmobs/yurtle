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
        disabled={setInterestOrRSVPLoading}
      >
        Going <Checkbox onDarkBg checked={isAttending} />
      </Button>
    }
    openDialogButton={
      <Button className="flex gap-2">
        Going <Checkbox onDarkBg checked={isAttending} />
      </Button>
    }
    onAuthenticated={onSetEventRSVP}
  />
)

export default RSVPBtn
