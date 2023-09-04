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

  return db.$transaction(async (tx) => {
    // get the current interests
    const currentInterests = await tx.eventInterest.findMany({
      where: {
        eventId,
      },
    })

    if (isInterested) {
      tx.eventInterest.create({
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

      // if the user is interested, and they are the first, we need to update the event status
      if (currentInterests.length === 0) {
        tx.event.update({
          where: {
            id: eventId,
          },
          data: {
            status: 'REQUESTED',
          },
        })
      }
    } else {
      tx.eventInterest.delete({
        where: {
          eventId_userId: {
            eventId,
            userId: currentUserId,
          },
        },
      })

      // if the user is no longer interested, and they were the last, we need to update the event status
      if (currentInterests.length === 1) {
        tx.event.update({
          where: {
            id: eventId,
          },
          data: {
            status: 'SUGGESTED',
          },
        })
      }
    }

    return tx.eventInterest.count({
      where: {
        eventId,
      },
    })
  })
}

export const setRSVPEvent: MutationResolvers['setRSVPEvent'] = async ({
  eventId,
  isAttending,
}) => {
  requireAuth()

  // Because we have `requireAuth` above, we know that there is a currentUser
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentUserId = context.currentUser!.id

  if (isAttending) {
    return db.eventRSVP
      .create({
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
      .then(() => {
        return db.eventRSVP.count({
          where: {
            eventId,
          },
        })
      })
  } else {
    return db.eventRSVP
      .delete({
        where: {
          eventId_userId: {
            eventId,
            userId: currentUserId,
          },
        },
      })
      .then(() => {
        return db.eventRSVP.count({
          where: {
            eventId,
          },
        })
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
