import { useLazyQuery, ApolloError } from '@apollo/client'
import { MapboxRetrieveSuggestionQuery } from 'types/graphql'

const MAPBOX_RETRIEVE_SUGGESTION_QUERY = gql`
  query MapboxRetrieveSuggestionQuery($mapboxId: String!) {
    mapboxRetrieveSuggestion(mapboxId: $mapboxId) {
      features {
        geometry {
          coordinates
        }
        properties {
          feature_type
          name
          place_formatted
        }
      }
    }
  }
`

export const useMapboxRetrieveSuggestionQuery = (
  onComplete?: (data: MapboxRetrieveSuggestionQuery) => void,
  onError?: (error: ApolloError) => void
) => {
  const [getMapboxRetrieveSuggestion, { data, error, loading }] =
    useLazyQuery<MapboxRetrieveSuggestionQuery>(
      MAPBOX_RETRIEVE_SUGGESTION_QUERY,
      {
        onCompleted: (data) => {
          onComplete && onComplete(data)
        },
        onError: (error) => {
          onError && onError(error)
        },
      }
    )

  return {
    getMapboxRetrieveSuggestion,
    data: data,
    error,
    loading,
  }
}
