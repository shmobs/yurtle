import {
  SetEventInterestMutation,
  SetEventInterestMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const SET_EVENT_INTEREST_MUTATION = gql`
  mutation SetEventInterestMutation(
    $eventId: String!
    $isInterested: Boolean!
  ) {
    event: setEventInterestOrRSVP(
      eventId: $eventId
      isInterestedOrAttending: $isInterested
      action: INTEREST
    ) {
      status
      interestCount
      isCurrentUserInterested
    }
  }
`

export type OnSetEventInterestCompleteType = (
  event: SetEventInterestMutation['event']
) => void

interface IUseSetEventInterestMutation {
  onSetEventInterestComplete?: OnSetEventInterestCompleteType
}

export const useSetEventInterestMutation = ({
  onSetEventInterestComplete,
}: IUseSetEventInterestMutation) => {
  const [setEventInterestMutation, { loading, error }] = useMutation<
    SetEventInterestMutation,
    SetEventInterestMutationVariables
  >(SET_EVENT_INTEREST_MUTATION, {
    onCompleted: (data) => {
      onSetEventInterestComplete?.(data.event)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const setEventInterest = async ({
    eventId,
    isInterested,
  }: {
    eventId: string
    isInterested: boolean
  }) => {
    return await setEventInterestMutation({
      variables: {
        eventId,
        isInterested,
      },
    })
  }

  return {
    setEventInterest,
    loading,
    error,
  }
}
