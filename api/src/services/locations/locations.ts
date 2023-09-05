import { Prisma } from '@prisma/client'
import type {
  QueryResolvers,
  MutationResolvers,
  LocationRelationResolvers,
  GMapsApiPlaceDetailsResponseType,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { placeDetails } from '../mapSearch/mapSearch'

export const locations: QueryResolvers['locations'] = () => {
  return db.location.findMany()
}

export const location: QueryResolvers['location'] = async ({ id }) => {
  const location = await db.location.findUnique({
    where: { id },
  })

  if (!location) {
    throw new Error(`Location with id ${id} not found`)
  }

  return location
}

export const createLocation: MutationResolvers['createLocation'] = ({
  input,
}) => {
  return db.location.create({
    // @ts-expect-error TODO this needs to be updated to use the businessId or it'll fail
    data: input,
  })
}

export const updateLocation: MutationResolvers['updateLocation'] = ({
  id,
  input,
}) => {
  return db.location.update({
    data: input,
    where: { id },
  })
}

export const deleteLocation: MutationResolvers['deleteLocation'] = ({ id }) => {
  return db.location.delete({
    where: { id },
  })
}

const gmapsPlaceDetailsToBusinessDetails = (
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

const gmapsPlaceDetailsToLocationDetails = (
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

/**
 * create or update a Location object in the database, and either
 * creates a new Business object or (attempts to) updated an existing one
 */
export const importFromGMaps: MutationResolvers['importFromGMaps'] = async ({
  gmapsPlaceId,
}) => {
  const infoFromGMaps = await placeDetails({ gmapsPlaceId: gmapsPlaceId })

  const locationData = gmapsPlaceDetailsToLocationDetails(infoFromGMaps)

  const location = await db.location.upsert({
    where: {
      gmapsPlaceId,
    },
    create: locationData,
    update: locationData,
  })

  return location
}

export const Location: LocationRelationResolvers = {
  business: async (_obj, { root }) => {
    const maybeBusiness = await db.location
      .findUnique({ where: { id: root?.id } })
      .business()
    if (!maybeBusiness) {
      throw new Error(`Business with id ${root?.id} not found`)
    }
    return maybeBusiness
  },
  eventsSuggested: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'SUGGESTED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  eventsRequested: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'REQUESTED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  eventsDraft: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'DRAFT' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  eventsPublished: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'PUBLISHED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  eventsArchived: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'ARCHIVED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },

  // events: async (_obj, { root }) => {
  //   const maybeEvents = await db.location
  //     .findUnique({ where: { id: root?.id } })
  //     .events({ orderBy: [{ status: 'asc' }, { date: 'asc' }] })
  //   if (!maybeEvents) {
  //     throw new Error(`Events with id ${root?.id} not found`)
  //   }
  //   return maybeEvents
  // },
}
