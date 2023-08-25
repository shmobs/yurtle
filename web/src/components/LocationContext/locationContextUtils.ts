import { ReverseGeocodeQuery, ForwardGeocodeQuery } from 'types/graphql'

export interface ISearchLocationInfo {
  lng: number
  lat: number
  neighborhood: string
  place: string
  region: string
  country: string
}

/** The Mapbox API returns data in a rather annoying format, so this maps it to something more useful */
export const mapboxGeocodeToObject = (
  data: ReverseGeocodeQuery & ForwardGeocodeQuery
): ISearchLocationInfo => {
  const locationInfo: ISearchLocationInfo = {
    lat: data.geocode.query ? data.geocode.query[1] : 0,
    lng: data.geocode.query ? data.geocode.query[0] : 0,
    neighborhood: '',
    place: '',
    region: '',
    country: '',
  }

  data.geocode.features?.forEach((feature) => {
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
