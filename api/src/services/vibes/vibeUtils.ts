import { Prisma } from '@prisma/client'
import OpenAI from 'openai'
import { Vibe, Event } from 'types/graphql'

import { db } from 'src/lib/db'

import { placeDetails } from '../mapSearch/mapSearch'

interface IRetrieveVibes {
  locationId: string
  vibeCount: number
  randomize?: boolean
}

/**
 * Given a location and a number of vibes, returns either
 * - a random subset of the existing vibes for that location
 * - `null` if there aren't enough existing vibes
 *
 * If `randomize` is `true` (the default), returns a random subset of the existing vibes.
 * Otherwise, returns the most recently generated vibes.
 */
export const retrieveVibes = async ({
  locationId,
  vibeCount,
  randomize = true,
}: IRetrieveVibes) => {
  const location = await db.location.findUnique({
    where: { id: locationId },
    include: {
      events: {
        where: { status: 'SUGGESTED' },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  // if this place already has at least as many vibes as we're asking for, return a random subset
  if (location?.events && location?.events.length >= vibeCount) {
    if (randomize) {
      const randomVibes = location.events
        .sort(() => 0.5 - Math.random())
        .slice(0, vibeCount)

      return randomVibes
    } else {
      const mostRecentVibes = location.events.slice(0, vibeCount)

      return mostRecentVibes
    }
  } else {
    return null
  }
}

interface IGenerateAndStoreVibes {
  locationId: string
  vibeCount: number
  /**
   * If `true`, returns the newly generated vibes.
   * Note that it needs to do a database lookup to get the newly generated vibes, so use it only if you need to.
   */
  returnNewVibes?: boolean
}

/**
 * Given a location and a number of vibes, generates that many vibes and stores them in the database.
 * Returns `true` if successful, `false` if there was some error.
 * You should then call `retrieveVibes` to get the vibes.
 */
export const generateAndStoreVibes = async ({
  locationId,
  vibeCount,
  returnNewVibes = false,
}: IGenerateAndStoreVibes) => {
  const location = await db.location.findUnique({
    where: { id: locationId },
    select: { gmapsPlaceId: true },
  })

  if (!location) {
    console.log(
      "In generateAndStoreVibes, couldn't find a location with that ID"
    )
    return false
  }

  const gmapsPlaceInfo = await placeDetails({
    gmapsPlaceId: location.gmapsPlaceId,
  })

  const gmapsPlaceInfoStr = JSON.stringify(gmapsPlaceInfo, null, 2)

  const generatedVibes = await getVibesFromGPT(gmapsPlaceInfoStr, vibeCount)
    .then((vibes) => vibes)
    .catch(() => {
      return null
    })

  if (!generatedVibes) {
    console.log('In generateAndStoreVibes, GPT returned an error')
    return false
  }

  // take the generated vibes and store them in the database as suggested events
  const suggestedEvents: Prisma.EventCreateManyInput[] = generatedVibes.map(
    (vibe) => {
      return {
        name: vibe.eventName,
        type: vibe.eventType,
        description: vibe.eventDescription,
        status: 'SUGGESTED',
        locationId,
      }
    }
  )

  await db.event.createMany({
    data: suggestedEvents,
    skipDuplicates: true,
  })

  if (returnNewVibes) {
    return await db.event.findMany({
      where: {
        OR: suggestedEvents.map((event) => {
          return {
            name: event.name,
            type: event.type,
            description: event.description,
            status: 'SUGGESTED',
            locationId,
          }
        }),
      },
    })
  }

  return true
}

const getVibesFromGPT = async (
  locationInfo: string,
  vibeCount: number
): Promise<Vibe[]> => {
  const openai = new OpenAI()

  const prompt = `
  Given a venue with the following details: ${locationInfo}
  Generate a list of community events that could be held there.

  Please provide ${vibeCount} event suggestions.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4-0613',
    // model: 'gpt-3.5-turbo-0613',
    messages: [
      {
        role: 'system',
        content:
          'You are the Valuable Insights Based Event Suggester (VIBES). Your purpose is to generate a list of fun and engaging community events that could be held at a given venue.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    /**
     * because we always want structured data back, we can tell GPT that we're looking
     * to use its output to call a function
     * https://platform.openai.com/docs/guides/gpt/function-calling
     */
    function_call: {
      name: 'returnVibes',
    },
    functions: [
      {
        name: 'returnVibes',
        description: 'Returns a list of event suggestions',
        parameters: {
          type: 'object',
          properties: {
            vibes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  eventName: {
                    type: 'string',
                    description: 'Name of the event',
                  },
                  eventType: {
                    type: 'string',
                    description: 'Type of event',
                  },
                  eventDescription: {
                    type: 'string',
                    description: 'Brief description of the event',
                  },
                },
                required: ['eventName', 'eventType', 'eventDescription'],
              },
            },
          },
          required: ['vibes'],
        },
      },
    ],
  })

  const responseMessage = response.choices[0].message

  // confirm GPT wanted to call the function
  if (responseMessage.function_call) {
    // confirm GPT called the right function
    if (responseMessage.function_call.name === 'returnVibes') {
      // confirm GPT returned the right data type
      const functionArgsStr = responseMessage.function_call.arguments
      const functionArgs = JSON.parse(functionArgsStr)
      const functionArgsArray = functionArgs.vibes as Vibe[]
      if (functionArgsArray.length !== vibeCount) {
        throw new Error(
          `GPT returned the wrong number of vibes. Expected ${vibeCount}, got ${functionArgsArray.length}`
        )
      }
      if (
        functionArgsArray[0].eventName &&
        functionArgsArray[0].eventType &&
        functionArgsArray[0].eventDescription
      ) {
        return functionArgsArray
      }
    } else {
      throw new Error(
        `GPT returned the wrong data structure for returnVibes, response message is ${responseMessage}`
      )
    }
  } else {
    throw new Error('GPT called the wrong function')
  }

  throw new Error('Ran into an unexpected error in getVibesFromGPT')
}
