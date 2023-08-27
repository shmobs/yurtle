import { useLazyQuery, ApolloError } from '@apollo/client'
import { debounce } from 'lodash'
import { ForwardGeocodeQuery } from 'types/graphql'

import {
  ISearchLocationInfo,
  mapboxParseGeocode,
} from './locationContextUtils'

const FORWARD_GEOCODE_QUERY = gql`
  query ForwardGeocodeQuery($searchText: String!) {
    geocode: forwardGeocode(searchText: $searchText) {
      query
      features {
        id
        place_type
        text
      }
    }
  }
`

export const useForwardGeocodeQuery = (
  onComplete?: (searchLocInfo: ISearchLocationInfo) => void,
  onError?: (error: ApolloError) => void
) => {
  const [getForwardGeocode, { data, error, loading }] =
    useLazyQuery<ForwardGeocodeQuery>(FORWARD_GEOCODE_QUERY, {
      onCompleted: (data) => {
        onComplete && onComplete(mapboxParseGeocode(data))
      },
      onError: (error) => {
        onError && onError(error)
      },
    })

  const debouncedGetForwardGeocode = debounce(getForwardGeocode, 500)

  return {
    getForwardGeocode: debouncedGetForwardGeocode,
    data: data?.geocode,
    error,
    loading,
  }
}
