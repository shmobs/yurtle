import { PrismaClient, Location } from '@prisma/client'
import _ from 'lodash'
import {
  GMapsApiSearchNearbyResponseType,
  GMapsApiTextSearchResponseType,
} from 'types/graphql'

const prisma = new PrismaClient()

type GmapsApiResponseType =
  | GMapsApiSearchNearbyResponseType
  | GMapsApiTextSearchResponseType

export async function addRendyLocationIds<T extends GmapsApiResponseType>(
  apiResponse: T
): Promise<T> {
  // Create a deep copy of apiResponse
  const responseCopy = _.cloneDeep(apiResponse)

  // Extract place_ids from responseCopy
  const gmapsPlaceIds = responseCopy.results.map((result) => result.place_id)

  // Find existing locations in Prisma with matching place_ids
  const locations: Location[] = await prisma.location.findMany({
    where: {
      gmapsPlaceId: {
        in: gmapsPlaceIds,
      },
    },
  })

  // Map place_ids to their corresponding Location records
  const gmapsPlaceIdToLocation = new Map()
  locations.forEach((location) => {
    gmapsPlaceIdToLocation.set(location.gmapsPlaceId, location)
  })

  // Add rendyLocationId to each result in responseCopy if a matching Location record exists, otherwise set it to undefined
  responseCopy.results = responseCopy.results.map((result) => {
    const location = gmapsPlaceIdToLocation.get(result.place_id)
    result.rendyLocationId = location ? location.id : undefined
    return result
  })

  return responseCopy
}

export async function addMapboxStaticImages<T extends GmapsApiResponseType>(
  apiResponse: T
): Promise<T> {
  // Create a deep copy of apiResponse
  const responseCopy = _.cloneDeep(apiResponse)

  // for each item in response.results, add a mapboxStaticImageUrl
  // the format is: https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${lng},${lat},12.5,0/300x200@2x?access_token=${MAPBOX_API_KEY}
  // https://docs.mapbox.com/playground/static/
  responseCopy.results = responseCopy.results.map((result) => {
    const mapboxStaticImageUrl = `https://api.mapbox.com/styles/v1/rendyapp/cllu728xe005601r980xs80oy/static/${result.geometry.location.lng},${result.geometry.location.lat},16,0/300x200@2x?attribution=false&logo=false&access_token=${process.env.MAPBOX_API_KEY}`
    result.mapboxStaticImageUrl = mapboxStaticImageUrl
    return result
  })

  return responseCopy
}
