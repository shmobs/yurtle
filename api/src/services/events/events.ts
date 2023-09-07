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

export const setEventInterestOrRSVP: MutationResolvers['setEventInterestOrRSVP'] =
  ({ eventId, isInterestedOrAttending, action }) => {
    requireAuth()

    // Because we have `requireAuth` above, we know that there is a currentUser
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentUserId = context.currentUser!.id

    const dbModelBeingAccessed =
      action === 'INTEREST' ? 'eventInterest' : 'eventRSVP'

    return db.$transaction(async (tx) => {
      // need to cast this as any because otherwise TS gets tripped up on not knowing which type of accessor we're using.
      // however, we know that their model in the database is identical, so this is fine
      const dbActionAccessor = tx[dbModelBeingAccessed] as any

      const currentInterestsOrRSVPs = await dbActionAccessor.findMany({
        where: {
          eventId,
        },
      })

      const isCurrentlyInterestedOrAttending =
        !!(await dbActionAccessor.findFirst({
          where: {
            eventId,
            userId: currentUserId,
          },
        }))

      if (isInterestedOrAttending) {
        if (!isCurrentlyInterestedOrAttending) {
          await dbActionAccessor.create({
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
          if (currentInterestsOrRSVPs.length === 0 && action === 'INTEREST') {
            await tx.event.update({
              where: {
                id: eventId,
              },
              data: {
                status: 'REQUESTED',
              },
            })
          }
        }
      } else {
        if (isCurrentlyInterestedOrAttending) {
          await dbActionAccessor.delete({
            where: {
              eventId_userId: {
                eventId,
                userId: currentUserId,
              },
            },
          })

          // if the user is no longer interested, and they were the last, we need to update the event status
          if (currentInterestsOrRSVPs.length === 1 && action === 'INTEREST') {
            await tx.event.update({
              where: {
                id: eventId,
              },
              data: {
                status: 'SUGGESTED',
              },
            })
          }
        }
      }

      return db.event.findFirstOrThrow({
        where: {
          id: eventId,
        },
      })
    })
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

  isCurrentUserAttending: async (_obj, { root, context }) => {
    if (!context.currentUser) {
      return false
    }

    const maybeRSVP = await db.eventRSVP.findFirst({
      where: {
        eventId: root.id,
        userId: (context.currentUser as unknown as ICurrentUser).id,
      },
    })

    return !!maybeRSVP
  },

  interestCount: async (_obj, { root }) => {
    return db.eventInterest.count({
      where: {
        eventId: root.id,
      },
    })
  },

  rsvpCount: async (_obj, { root }) => {
    return db.eventRSVP.count({
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
