import {
  ClaimLocationMutation,
  ClaimLocationMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const CLAIM_LOCATION_MUTATION = gql`
  mutation ClaimLocationMutation($id: String!) {
    claimLocation(id: $id) {
      id
    }
  }
`

export type OnClaimLocationCompleteType = (
  claimLocation: ClaimLocationMutation['claimLocation']
) => void

interface IUseClaimLocationMutation {
  onClaimLocationComplete?: OnClaimLocationCompleteType
}

export const useClaimLocationMutation = ({
  onClaimLocationComplete,
}: IUseClaimLocationMutation) => {
  const [claimLocationMutation, { loading, error }] = useMutation<
    ClaimLocationMutation,
    ClaimLocationMutationVariables
  >(CLAIM_LOCATION_MUTATION, {
    onCompleted: (data) => {
      onClaimLocationComplete?.(data.claimLocation)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const claimLocation = async ({ id }: { id: string }) => {
    return await claimLocationMutation({
      variables: {
        id,
      },
    })
  }

  return {
    claimLocation,
    loading,
    error,
  }
}
