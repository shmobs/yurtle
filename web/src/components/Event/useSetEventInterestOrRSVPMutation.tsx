import {
  SetEventInterestOrRSVPMutation,
  SetEventInterestOrRSVPMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const SET_EVENT_INTEREST_OR_RSVP_MUTATION = gql`
  mutation SetEventInterestOrRSVPMutation(
    $eventId: String!
    $isInterestedOrAttending: Boolean!
    $action: EventAction!
  ) {
    event: setEventInterestOrRSVP(
      eventId: $eventId
      isInterestedOrAttending: $isInterestedOrAttending
      action: $action
    ) {
      status
      interestCount
      isCurrentUserInterested
      rsvpCount
      isCurrentUserAttending
    }
  }
`

export type OnSetEventInterestOrRSVPCompleteType = (
  event: SetEventInterestOrRSVPMutation['event']
) => void

interface IUseSetEventInterestOrRSVPMutation {
  onSetEventInterestOrRSVPComplete?: OnSetEventInterestOrRSVPCompleteType
}

export const useSetEventInterestOrRSVPMutation = ({
  onSetEventInterestOrRSVPComplete,
}: IUseSetEventInterestOrRSVPMutation) => {
  const [setEventInterestOrRSVPMutation, { loading, error }] = useMutation<
    SetEventInterestOrRSVPMutation,
    SetEventInterestOrRSVPMutationVariables
  >(SET_EVENT_INTEREST_OR_RSVP_MUTATION, {
    onCompleted: (data) => {
      onSetEventInterestOrRSVPComplete?.(data.event)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const setEventInterestOrRSVP = async ({
    eventId,
    isInterestedOrAttending,
    action,
  }: SetEventInterestOrRSVPMutationVariables) => {
    return await setEventInterestOrRSVPMutation({
      variables: {
        eventId,
        isInterestedOrAttending,
        action,
      },
    })
  }

  return {
    setEventInterestOrRSVP,
    loading,
    error,
  }
}
