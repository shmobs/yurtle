import { ImportFromGMapsMutation } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const IMPORT_FROM_GMAPS_MUTATION = gql`
  mutation ImportFromGMapsMutation($placeId: String!) {
    location: importFromGMaps(gmapsPlaceId: $placeId) {
      id
    }
  }
`

interface IUseImportFromGMapsMutation {
  onImportComplete?: (newLocation: ImportFromGMapsMutation['location']) => void
}

const useImportFromGMapsMutation = ({
  onImportComplete,
}: IUseImportFromGMapsMutation) => {
  const [importFromGMaps, { loading, error }] =
    useMutation<ImportFromGMapsMutation>(IMPORT_FROM_GMAPS_MUTATION, {
      onCompleted: (data) => {
        onImportComplete && onImportComplete(data.location)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const onImport = (placeId: string) => {
    importFromGMaps({ variables: { placeId } })
  }

  return { onImport, loading, error }
}

export default useImportFromGMapsMutation
