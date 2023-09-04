import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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
  EventInterests: async (_obj, { root }) => {
    const maybeEventInterests = await db.event.findMany({
      where: {
        interests: {
          every: {
            userId: root?.id,
          },
        },
      },
    })

    return maybeEventInterests ?? []
  },
  EventRSVPs: async (_obj, { root }) => {
    const maybeEventRSVPs = await db.event.findMany({
      where: {
        rsvps: {
          every: {
            userId: root?.id,
          },
        },
      },
    })
    return maybeEventRSVPs ?? []
  },
}
