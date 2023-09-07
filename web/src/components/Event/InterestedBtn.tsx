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
        variant="outline"
        disabled={setInterestOrRSVPLoading}
      >
        Interested <Checkbox checked={isInterested} />
      </Button>
    }
    openDialogButton={
      <Button className="flex gap-2" variant="outline">
        Interested <Checkbox checked={isInterested} />
      </Button>
    }
    onAuthenticated={onSetEventInterest}
  />
)

export default InterestedBtn
