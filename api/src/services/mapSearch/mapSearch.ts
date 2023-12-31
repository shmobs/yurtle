import { fetch } from '@whatwg-node/fetch'
import {
  GMapsApiTextSearchResponseType as TextSearchResponse,
  GMapsApiPlaceDetailsResponseType,
  GMapsApiSearchNearbyResponseType as SearchNearbyResponse,
  QueryResolvers,
  MapboxGeocodeResponseType,
  MapboxSearchBoxResponseType,
  GMapsApiSearchNearbyResponseTypeRelationResolvers,
  EventStatus,
  GMapsApiTextSearchResponseTypeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { addMapboxStaticImages, addYurtleLocationIds } from './mapSearchUtils'

export const searchNearby: QueryResolvers['searchNearby'] = async ({
  location,
  radius = undefined,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlaceSearchRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

  const options = {
    location: location,
    radius: radius ? radius.toString() : undefined,
    type: 'restaurant',
    rankby: radius === undefined ? 'distance' : undefined,
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-nearby#optional-parameters
  }

  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(([_key, value]) => value !== undefined)
  )

  const qsp = new URLSearchParams(
    // we filter out any undefined values from the options object but TS isn't smart enough to know that
    filteredOptions as Record<string, string>
  ).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as SearchNearbyResponse

  const withYurtleLocationIds = await addYurtleLocationIds(resContent)
  const withMapboxStaticImages = await addMapboxStaticImages(
    withYurtleLocationIds
  )

  return withMapboxStaticImages
}

export const textSearch: QueryResolvers['textSearch'] = async ({
  query,
  location,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/search-find-place#TextSearchRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
  // const rootUrl =
  //   'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

  const options = {
    query,
    location,
    inputtype: 'textquery',
    // as this only returns the fields we specify, GMapsTextSearchType needs to be kept inline with this.
    fields: 'formatted_address,name,place_id',
    rankby: 'distance',
    // more options we can add are here: https://developers.google.com/maps/documentation/places/web-service/search-find-place#optional-parameters
  }

  const qsp = new URLSearchParams(options).toString()

  const searchUrl = `${rootUrl}?${qsp}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as TextSearchResponse

  const withYurtleLocationIds = await addYurtleLocationIds(resContent)
  const withMapboxStaticImages = await addMapboxStaticImages(
    withYurtleLocationIds
  )

  return await addYurtleLocationIds(withMapboxStaticImages)
}

export const placeDetails: QueryResolvers['placeDetails'] = async ({
  gmapsPlaceId,
}) => {
  // https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
  const rootUrl = 'https://maps.googleapis.com/maps/api/place/details/json'

  const options = {
    place_id: gmapsPlaceId,
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

export const searchForArea: QueryResolvers['searchForArea'] = async ({
  searchText,
}) => {
  const rootUrl = 'https://api.mapbox.com/search/searchbox/v1/suggest?q='

  const searchUrl = `${rootUrl}${searchText}&access_token=${
    process.env.MAPBOX_API_KEY
  }&session_token=${'9aRLTNekCeum7nbt2b6hvNYuNqCqwbWtoURveQTKRfX7ENCgS3ne3B33sJpzmUP8'}&types=${MAPBOX_GEOCODING_TYPES.join(
    ','
  )}`

  const res = await fetch(searchUrl)

  const resContent = (await res.json()) as MapboxSearchBoxResponseType

  return resContent
}

type SearchNearbyRootType = Omit<
  SearchNearbyResponse,
  | 'eventsArchived'
  | 'eventsDraft'
  | 'eventsRequested'
  | 'eventsScheduled'
  | 'eventsSuggested'
>

type TextSearchRootType = Omit<
  TextSearchResponse,
  | 'eventsArchived'
  | 'eventsDraft'
  | 'eventsRequested'
  | 'eventsScheduled'
  | 'eventsSuggested'
>

const findEventsByStatus = async (
  root: SearchNearbyRootType | TextSearchRootType,
  status: EventStatus
) => {
  const gmapsPlaceIds = root.results.map((result) => result.place_id)
  return db.event.findMany({
    where: {
      location: {
        gmapsPlaceId: {
          in: gmapsPlaceIds,
        },
      },
      status: status,
    },
    orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
  })
}

export const GMapsApiSearchNearbyResponseType: GMapsApiSearchNearbyResponseTypeRelationResolvers =
  {
    eventsSuggested: (_obj, { root }) => findEventsByStatus(root, 'SUGGESTED'),
    eventsRequested: (_obj, { root }) => findEventsByStatus(root, 'REQUESTED'),
    eventsDraft: (_obj, { root }) => findEventsByStatus(root, 'DRAFT'),
    eventsScheduled: (_obj, { root }) => findEventsByStatus(root, 'SCHEDULED'),
    eventsArchived: (_obj, { root }) => findEventsByStatus(root, 'ARCHIVED'),
  }

export const GMapsApiTextSearchResponseType: GMapsApiTextSearchResponseTypeRelationResolvers =
  {
    eventsSuggested: (_obj, { root }) => findEventsByStatus(root, 'SUGGESTED'),
    eventsRequested: (_obj, { root }) => findEventsByStatus(root, 'REQUESTED'),
    eventsDraft: (_obj, { root }) => findEventsByStatus(root, 'DRAFT'),
    eventsScheduled: (_obj, { root }) => findEventsByStatus(root, 'SCHEDULED'),
    eventsArchived: (_obj, { root }) => findEventsByStatus(root, 'ARCHIVED'),
  }
