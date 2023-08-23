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
  const placeIds = responseCopy.results.map((result) => result.place_id)

  // Find existing locations in Prisma with matching place_ids
  const locations: Location[] = await prisma.location.findMany({
    where: {
      gmapsPlaceId: {
        in: placeIds,
      },
    },
  })

  // Map place_ids to their corresponding Location records
  const placeIdToLocation = new Map()
  locations.forEach((location) => {
    placeIdToLocation.set(location.gmapsPlaceId, location)
  })

  // Add rendyLocationId to each result in responseCopy if a matching Location record exists, otherwise set it to undefined
  responseCopy.results = responseCopy.results.map((result) => {
    const location = placeIdToLocation.get(result.place_id)
    result.rendyLocationId = location ? location.id : undefined
    return result
  })

  return responseCopy
}
