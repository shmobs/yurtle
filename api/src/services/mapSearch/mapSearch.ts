import { fetch } from '@whatwg-node/fetch'
import {
  GMapsApiFindPlaceResponseType,
  GMapsApiSearchNearbyResponseType,
  QueryResolvers,
} from 'types/graphql'

export const searchNearby: QueryResolvers['searchNearby'] = async ({
  location,
  radius,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlaceSearchRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

  const options = {
    location: location,
    radius: radius.toString(),
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-nearby#optional-parameters
  }

  const qsp = new URLSearchParams(options).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as GMapsApiSearchNearbyResponseType

  return resContent
}

export const findPlace: QueryResolvers['findPlace'] = async ({ input }) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-find-place#FindPlaceRequests
  const rootUrl =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

  const options = {
    input: input,
    inputtype: 'textquery',
    // as this only returns the fields we specify, GMapsFindPlaceType needs to be kept inline with this.
    fields: 'formatted_address,name,place_id',
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-find-place#optional-parameters
  }

  const qsp = new URLSearchParams(options).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as GMapsApiFindPlaceResponseType

  return resContent
}
