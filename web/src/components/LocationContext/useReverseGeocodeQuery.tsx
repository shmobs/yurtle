import { useLazyQuery, ApolloError } from '@apollo/client'
import { ReverseGeocodeQuery } from 'types/graphql'

import { IParsedLocationInfo, mapboxParseGeocode } from './locationContextUtils'

const REVERSE_GEOCODE_QUERY = gql`
  query ReverseGeocodeQuery($lng: Float!, $lat: Float!) {
    geocode: reverseGeocode(longitude: $lng, latitude: $lat) {
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
  onComplete?: (searchLocInfo: IParsedLocationInfo) => void,
  onError?: (error: ApolloError) => void
) => {
  const [getReverseGeocode, { data, error, loading }] =
    useLazyQuery<ReverseGeocodeQuery>(REVERSE_GEOCODE_QUERY, {
      onCompleted: (data) => {
        onComplete && onComplete(mapboxParseGeocode(data))
      },
      onError: (error) => {
        onError && onError(error)
      },
    })

  return {
    getReverseGeocode,
    data: data?.geocode,
    error,
    loading,
  }
}
