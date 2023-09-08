import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { getMapboxStaticImageUrl } from '../mapSearch/mapSearchUtils'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  eventInterests: async (_obj, { root }) => {
    const maybeEventInterests = await db.event.findMany({
      where: {
        interests: {
          some: {
            userId: root?.id,
          },
        },
        rsvps: {
          none: {
            userId: root?.id,
          },
        },
      },
    })

    return maybeEventInterests ?? []
  },
  eventRSVPs: async (_obj, { root }) => {
    const maybeEventRSVPs = await db.event.findMany({
      where: {
        rsvps: {
          some: {
            userId: root?.id,
          },
        },
      },
    })
    return maybeEventRSVPs ?? []
  },

  // @ts-expect-error it's complaining because the mapboxStaticImageUrl field isn't part of the Location prisma model, but if it's requested, we return it
  managedLocations: async (_obj, { root, info }) => {
    const maybeManagedLocations = await db.location.findMany({
      where: {
        managedBy: {
          some: {
            id: root?.id,
          },
        },
      },
    })

    if (!maybeManagedLocations) {
      return []
    }

    // Check if mapboxStaticImageUrl is part of the GraphQL query
    const shouldIncludeMapboxStaticImageUrl = info.fieldNodes.some(
      (node) => node.name.value === 'mapboxStaticImageUrl'
    )

    if (shouldIncludeMapboxStaticImageUrl) {
      return maybeManagedLocations.map((location) => {
        const mapboxStaticImageUrl = getMapboxStaticImageUrl(
          location.latitude,
          location.longitude
        )
        return { ...location, mapboxStaticImageUrl }
      })
    } else {
      return maybeManagedLocations
    }
  },
}
