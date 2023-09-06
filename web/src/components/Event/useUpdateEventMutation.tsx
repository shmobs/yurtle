import {
  UpdateEventMutation,
  UpdateEventInput,
  UpdateEventMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEventMutation($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      date
      status
    }
  }
`

export type OnUpdateEventCompleteType = (
  updateEvent: UpdateEventMutation['updateEvent']
) => void

interface IUseUpdateEventMutation {
  onUpdateEventComplete?: OnUpdateEventCompleteType
}

export const useUpdateEventMutation = ({
  onUpdateEventComplete,
}: IUseUpdateEventMutation) => {
  const [updateEventMutation, { loading, error }] = useMutation<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >(UPDATE_EVENT_MUTATION, {
    onCompleted: (data) => {
      onUpdateEventComplete?.(data.updateEvent)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateEvent = async ({
    id,
    input,
  }: {
    id: string
    input: UpdateEventInput
  }) => {
    return await updateEventMutation({
      variables: {
        id,
        input,
      },
    })
  }

  return {
    updateEvent,
    loading,
    error,
  }
}
