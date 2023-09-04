import type {
  QueryResolvers,
  MutationResolvers,
  EventRelationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const events: QueryResolvers['events'] = ({
  locationId,
  eventStatuses,
}) => {
  return db.event.findMany({
    where: {
      locationId,
      status: {
        in: eventStatuses,
      },
    },
    orderBy: [{ status: 'asc' }, { date: 'asc' }],
  })
}

export const event: QueryResolvers['event'] = async ({ id }) => {
  const maybeEvent = await db.event.findUnique({
    where: { id },
  })
  if (!maybeEvent) {
    throw new Error(`Unable to find Event:${id}`)
  }
  return maybeEvent
}

export const createEvent: MutationResolvers['createEvent'] = ({ input }) => {
  return db.event.create({
    data: input,
  })
}

export const updateEvent: MutationResolvers['updateEvent'] = ({
  id,
  input,
}) => {
  return db.event.update({
    data: input,
    where: { id },
  })
}

export const deleteEvent: MutationResolvers['deleteEvent'] = ({ id }) => {
  return db.event.delete({
    where: { id },
  })
}

export const setInterestEvent: MutationResolvers['setInterestEvent'] = ({
  eventId,
  isInterested,
}) => {
  requireAuth()

  // Because we have `requireAuth` above, we know that there is a currentUser
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentUserId = context.currentUser!.id

  if (isInterested) {
    return db.eventInterest.create({
      data: {
        user: {
          connect: {
            id: currentUserId,
          },
        },
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    })
  } else {
    return db.eventInterest.delete({
      where: {
        eventId_userId: {
          eventId,
          userId: currentUserId,
        },
      },
    })
  }
}

export const setRSVPEvent: MutationResolvers['setRSVPEvent'] = ({
  eventId,
  isAttending,
}) => {
  requireAuth()

  // Because we have `requireAuth` above, we know that there is a currentUser
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentUserId = context.currentUser!.id

  if (isAttending) {
    return db.eventRSVP.create({
      data: {
        user: {
          connect: {
            id: currentUserId,
          },
        },
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    })
  } else {
    return db.eventRSVP.delete({
      where: {
        eventId_userId: {
          eventId,
          userId: currentUserId,
        },
      },
    })
  }
}

export const Event: EventRelationResolvers = {
  location: async (_obj, { root }) => {
    const maybeLocation = await db.event
      .findUnique({ where: { id: root?.id } })
      .location()
    if (!maybeLocation) {
      throw new Error(`Unable to find Location for Event:${root?.id}`)
    }
    return maybeLocation
  },
}
