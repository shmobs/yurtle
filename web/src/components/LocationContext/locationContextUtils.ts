import { ReverseGeocodeQuery } from 'types/graphql'

export interface ISearchLocationInfo {
  lng: number
  lat: number
  neighborhood: string
  place: string
  region: string
  country: string
}

/** The Mapbox API returns data in a rather annoying format, so this maps it to something more useful */
export const mapboxReverseGeocodeToObject = (
  data: ReverseGeocodeQuery
): ISearchLocationInfo => {
  const locationInfo: ISearchLocationInfo = {
    lat: data.reverseGeocode.query ? data.reverseGeocode.query[1] : 0,
    lng: data.reverseGeocode.query ? data.reverseGeocode.query[0] : 0,
    neighborhood: '',
    place: '',
    region: '',
    country: '',
  }

  data.reverseGeocode.features?.forEach((feature) => {
    if (feature) {
      const type = feature.place_type[0]
      if (type === 'neighborhood') {
        locationInfo.neighborhood = feature.text
      } else if (type === 'place') {
        locationInfo.place = feature.text
      } else if (type === 'region') {
        locationInfo.region = feature.text
      } else if (type === 'country') {
        locationInfo.country = feature.text
      }
    }
  })

  return locationInfo
}
