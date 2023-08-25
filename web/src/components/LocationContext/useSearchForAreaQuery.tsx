import { useLazyQuery, ApolloError } from '@apollo/client'
import { debounce } from 'lodash'
import { SearchForAreaQuery } from 'types/graphql'

const FORWARD_GEOCODE_QUERY = gql`
  query SearchForAreaQuery($searchText: String!) {
    searchForArea(searchText: $searchText) {
      suggestions {
        name
        place_formatted
        mapbox_id
      }
    }
  }
`

export const useSearchForAreaQuery = (
  onComplete?: (data: SearchForAreaQuery) => void,
  onError?: (error: ApolloError) => void
) => {
  const [getSearchForArea, { data, error, loading }] =
    useLazyQuery<SearchForAreaQuery>(FORWARD_GEOCODE_QUERY, {
      onCompleted: (data) => {
        onComplete && onComplete(data)
      },
      onError: (error) => {
        onError && onError(error)
      },
    })

  const debouncedGetSearchForArea = debounce(getSearchForArea, 500)

  return {
    getSearchForArea: debouncedGetSearchForArea,
    data: data,
    error,
    loading,
  }
}
