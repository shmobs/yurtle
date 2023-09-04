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
    setEventInterest(eventId: $eventId, isInterested: $isInterested)
  }
`

export type OnSetEventInterestCompleteType = (interestCount: number) => void

interface IUseSetEventInterestMutation {
  onSetEventInterestComplete?: OnSetEventInterestCompleteType
}

export const useSetEventInterestMutation = ({
  onSetEventInterestComplete,
}: IUseSetEventInterestMutation) => {
  const [setEventInterestMutation] = useMutation<
    SetEventInterestMutation,
    SetEventInterestMutationVariables
  >(SET_EVENT_INTEREST_MUTATION, {
    onCompleted: (data) => {
      onSetEventInterestComplete?.(data.setEventInterest)
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
  }
}
