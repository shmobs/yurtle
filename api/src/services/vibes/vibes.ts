import OpenAI from 'openai'
import { QueryResolvers, VibeType } from 'types/graphql'

const openai = new OpenAI()

import { placeDetails } from '../mapSearch/mapSearch'

export const getPlaceVibes: QueryResolvers['getPlaceVibes'] = async ({
  gmapsPlaceId,
  vibeCount = 5,
}) => {
  const placeInfo = await placeDetails({ gmapsPlaceId: gmapsPlaceId })

  const prompt = `
  Given a venue with the following details: ${JSON.stringify(
    placeInfo,
    null,
    2
  )}
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
      const functionArgsArray = functionArgs.vibes as VibeType[]
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
}
