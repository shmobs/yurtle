import { Prisma } from '@prisma/client'
import { GMapsApiPlaceDetailsResponseType } from 'types/graphql'

export const gmapsPlaceDetailsToBusinessDetails = (
  gmapsData: GMapsApiPlaceDetailsResponseType
): Prisma.BusinessUpdateInput &
  Prisma.BusinessUpdateWithoutLocationsInput &
  Prisma.BusinessCreateInput &
  Prisma.BusinessCreateWithoutLocationsInput => {
  return {
    name: gmapsData.result.name,
    description: gmapsData.result.editorial_summary
      ? gmapsData.result.editorial_summary.overview
      : 'This venue does not have a description.', // provide a default value if `editorial_summary` is undefined
    website: gmapsData.result.website,
  }
}

export const gmapsPlaceDetailsToLocationDetails = (
  gmapsData: GMapsApiPlaceDetailsResponseType
): Prisma.LocationUpdateInput & Prisma.LocationCreateInput => {
  return {
    address: gmapsData.result.formatted_address,
    gmapsPlaceId: gmapsData.result.place_id,
    latitude: gmapsData.result.geometry.location.lat,
    longitude: gmapsData.result.geometry.location.lng,
    website: gmapsData.result.website,
    business: {
      connectOrCreate: {
        where: {
          name: gmapsData.result.name,
          // TODO for some reason this breaks it
          // OR: [
          //   // backup identifier
          //   { website: gmapsData.result.website },
          // ],
        },
        create: gmapsPlaceDetailsToBusinessDetails(gmapsData),
        // update: gmapsPlaceDetailsToBusinessDetails(gmapsData),
      },
    },
  }
}
