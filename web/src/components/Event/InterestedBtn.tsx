import AuthRequiredDialog from '../AuthRequiredDialog'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

interface IInterestedBtnProps {
  onSetEventInterest: () => void
  setInterestOrRSVPLoading: boolean
  isInterested: boolean
}

const InterestedBtn = ({
  onSetEventInterest,
  setInterestOrRSVPLoading,
  isInterested,
}: IInterestedBtnProps) => (
  <AuthRequiredDialog
    buttonWhenAuthenticated={
      <Button
        className="flex gap-2"
        onClick={() => onSetEventInterest()}
        disabled={setInterestOrRSVPLoading}
      >
        Interested <Checkbox onDarkBg checked={isInterested} />
      </Button>
    }
    openDialogButton={
      <Button className="flex gap-2">
        Interested <Checkbox onDarkBg checked={isInterested} />
      </Button>
    }
    onAuthenticated={onSetEventInterest}
  />
)

export default InterestedBtn
