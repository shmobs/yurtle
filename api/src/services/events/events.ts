import type {
  QueryResolvers,
  MutationResolvers,
  EventRelationResolvers,
} from 'types/graphql'

import { removeNulls } from '@redwoodjs/api'

import { ICurrentUser, requireAuth } from 'src/lib/auth'
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
    data: removeNulls(input),
    where: { id },
  })
}

export const deleteEvent: MutationResolvers['deleteEvent'] = ({ id }) => {
  return db.event.delete({
    where: { id },
  })
}

export const setEventInterest: MutationResolvers['setEventInterest'] = ({
  eventId,
  isInterested,
}) => {
  requireAuth()

  let currentState: boolean
  let count: number

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

    const isCurrentlyInterested = !!(await tx.eventInterest.findFirst({
      where: {
        eventId,
        userId: currentUserId,
      },
    }))

    if (isInterested) {
      if (!isCurrentlyInterested) {
        await tx.eventInterest
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
            currentState = true
          })

        // if the user is interested, and they are the first, we need to update the event status
        if (currentInterests.length === 0) {
          await tx.event.update({
            where: {
              id: eventId,
            },
            data: {
              status: 'REQUESTED',
            },
          })
        }
      } else {
        currentState = true
      }
    } else {
      if (isCurrentlyInterested) {
        await tx.eventInterest
          .delete({
            where: {
              eventId_userId: {
                eventId,
                userId: currentUserId,
              },
            },
          })
          .then(() => {
            currentState = false
          })

        // if the user is no longer interested, and they were the last, we need to update the event status
        if (currentInterests.length === 1) {
          await tx.event.update({
            where: {
              id: eventId,
            },
            data: {
              status: 'SUGGESTED',
            },
          })
        }
      } else {
        currentState = false
      }
    }

    count = await tx.eventInterest.count({
      where: {
        eventId,
      },
    })

    return db.event.findFirstOrThrow({
      where: {
        id: eventId,
      },
    })
  })
}

// TODO fix this in line with how we did setEventInterest
export const setEventRSVP: MutationResolvers['setEventRSVP'] = async ({
  eventId,
  isAttending,
}) => {
  requireAuth()

  let currentState: boolean
  let count: number

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

  isCurrentUserInterested: async (_obj, { root, context }) => {
    if (!context.currentUser) {
      return false
    }

    const maybeInterest = await db.eventInterest.findFirst({
      where: {
        eventId: root.id,
        userId: (context.currentUser as unknown as ICurrentUser).id,
      },
    })

    return !!maybeInterest
  },

  interestCount: async (_obj, { root }) => {
    return db.eventInterest.count({
      where: {
        eventId: root.id,
      },
    })
  },

  isManagedByCurrentUser: async (_obj, { root, context }) => {
    const currentUser = context.currentUser as unknown as
      | ICurrentUser
      | null
      | undefined
    if (!currentUser) {
      return false
    }

    const maybeLocationInfo = await db.event.findUnique({
      where: {
        id: root.id,
      },
      select: {
        location: {
          select: {
            managedBy: true,
          },
        },
      },
    })

    return (
      maybeLocationInfo?.location?.managedBy.some(
        (user) => user.id === currentUser.id
      ) ?? false
    )
  },
}
