import { fetch } from '@whatwg-node/fetch'
import {
  GMapsApiTextSearchResponseType,
  GMapsApiPlaceDetailsResponseType,
  GMapsApiSearchNearbyResponseType,
  QueryResolvers,
  MapboxGeocodeResponseType,
} from 'types/graphql'

import { addRendyLocationIds } from './mapSearchUtils'

export const searchNearby: QueryResolvers['searchNearby'] = async ({
  location,
  radius = undefined,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlaceSearchRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

  const options = {
    location: location,
    radius: radius !== undefined ? radius.toString() : undefined,
    type: 'restaurant',
    rankby: radius === undefined ? 'distance' : undefined,
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-nearby#optional-parameters
  }

  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(([_key, value]) => value !== undefined)
  )

  const qsp = new URLSearchParams(filteredOptions).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as GMapsApiSearchNearbyResponseType

  return await addRendyLocationIds(resContent)
}

export const textSearch: QueryResolvers['textSearch'] = async ({ input }) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-find-place#TextSearchRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
  // const rootUrl =
  //   'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

  const options = {
    input: input,
    inputtype: 'textquery',
    // as this only returns the fields we specify, GMapsTextSearchType needs to be kept inline with this.
    fields: 'formatted_address,name,place_id',
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-find-place#optional-parameters
  }

  const qsp = new URLSearchParams(options).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as GMapsApiTextSearchResponseType

  return await addRendyLocationIds(resContent)
}

export const placeDetails: QueryResolvers['placeDetails'] = async ({
  placeId,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/details/json'

  const options = {
    place_id: placeId,
    // as this only returns the fields we specify, GMapsPlaceDetailsType needs to be kept inline with this.
    fields:
      'address_component,business_status,formatted_address,geometry,icon,icon_background_color,name,place_id,current_opening_hours,formatted_phone_number,website,dine_in,editorial_summary,price_level,rating,reservable,serves_beer,serves_breakfast,serves_brunch,serves_dinner,serves_lunch,serves_vegetarian_food,serves_wine',
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/details#optional-parameters
  }

  const qsp = new URLSearchParams(options).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as GMapsApiPlaceDetailsResponseType

  return resContent
}

const MAPBOX_GEOCODING_ROOT_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places' as const

// We can adjust the types to include more - https://docs.mapbox.com/api/search/geocoding/#data-types
const MAPBOX_GEOCODING_TYPES = [
  'neighborhood',
  'place',
  'region',
  'country',
] as const

export const reverseGeocode: QueryResolvers['reverseGeocode'] = async ({
  longitude,
  latitude,
}) => {
  const searchUrl = `${MAPBOX_GEOCODING_ROOT_URL}/${longitude},${latitude}.json?access_token=${
    process.env.MAPBOX_API_KEY
  }&types=${MAPBOX_GEOCODING_TYPES.join(',')}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as MapboxGeocodeResponseType

  return resContent
}

export const forwardGeocode: QueryResolvers['forwardGeocode'] = async ({
  searchText,
}) => {
  const searchUrl = `${MAPBOX_GEOCODING_ROOT_URL}/${searchText}.json?access_token=${
    process.env.MAPBOX_API_KEY
  }&types=${MAPBOX_GEOCODING_TYPES.join(',')}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as MapboxGeocodeResponseType

  return resContent
}
