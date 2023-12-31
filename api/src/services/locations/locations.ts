import type {
  QueryResolvers,
  MutationResolvers,
  LocationRelationResolvers,
} from 'types/graphql'

import { ICurrentUser, requireLocationClaimAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { placeDetails } from '../mapSearch/mapSearch'
import { getMapboxStaticImageUrl } from '../mapSearch/mapSearchUtils'

import { gmapsPlaceDetailsToLocationDetails } from './locationsUtils'

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

export const claimLocation: MutationResolvers['claimLocation'] = async ({
  id,
}) => {
  requireLocationClaimAuth(id)

  return db.location.update({
    where: { id },
    data: {
      managedBy: {
        connect: {
          // Because we have `requireLocationClaimAuth` above, we know that there is a currentUser
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: context.currentUser!.id,
        },
      },
    },
  })
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
  eventsScheduled: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'SCHEDULED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  eventsArchived: async (_obj, { root }) => {
    return db.event.findMany({
      where: { locationId: root?.id, status: 'ARCHIVED' },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    })
  },
  managedBy: async (_obj, { root }) => {
    return (
      (await db.location.findUnique({ where: { id: root?.id } }).managedBy()) ||
      []
    )
  },
  isManagedByCurrentUser: async (_obj, { root, context }) => {
    const currentUser = context.currentUser as unknown as
      | ICurrentUser
      | null
      | undefined
    if (!currentUser) {
      return false
    }

    const maybeManagedBy = await db.location
      .findUnique({ where: { id: root?.id } })
      .managedBy()
    if (!maybeManagedBy) {
      return false
    }

    return maybeManagedBy.some((user) => user.id === currentUser.id)
  },

  mapboxStaticImageUrl: async (_obj, { root }) => {
    return getMapboxStaticImageUrl(root.latitude, root.longitude)
  },
}
