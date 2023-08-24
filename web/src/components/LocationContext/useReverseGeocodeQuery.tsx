import { useLazyQuery, ApolloError } from '@apollo/client'
import { ReverseGeocodeQuery } from 'types/graphql'

import {
  ISearchLocationInfo,
  mapboxReverseGeocodeToObject,
} from './locationContextUtils'

const REVERSE_GEOCODE_QUERY = gql`
  query ReverseGeocodeQuery($lng: Float!, $lat: Float!) {
    reverseGeocode(longitude: $lng, latitude: $lat) {
      query
      features {
        id
        place_type
        text
      }
    }
  }
`

export const useReverseGeocodeQuery = (
  onComplete?: (searchLocInfo: ISearchLocationInfo) => void,
  onError?: (error: ApolloError) => void
) => {
  const [getReverseGeocode, { data, error, loading }] =
    useLazyQuery<ReverseGeocodeQuery>(REVERSE_GEOCODE_QUERY, {
      onCompleted: (data) => {
        onComplete && onComplete(mapboxReverseGeocodeToObject(data))
      },
      onError: (error) => {
        onError && onError(error)
      },
    })

  return {
    getReverseGeocode,
    data: data?.reverseGeocode,
    error,
    loading,
  }
}
