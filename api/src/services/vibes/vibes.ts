import { MutationResolvers, QueryResolvers } from 'types/graphql'

import { generateAndStoreVibes, retrieveVibes } from './vibeUtils'

export const getPlaceVibes: QueryResolvers['getPlaceVibes'] = async ({
  locationId,
  vibeCount = 3 as number,
}) => {
  const existingVibes = await retrieveVibes({
    locationId,
    vibeCount: vibeCount as number, // idk why this is necessary
  })

  if (existingVibes) {
    return existingVibes
  }

  // if this place doesn't have enough vibes, generate some and store them in the database, then return them
  await generateAndStoreVibes({ locationId, vibeCount: vibeCount as number })

  const vibesToReturn = await retrieveVibes({
    locationId,
    vibeCount: vibeCount as number, // idk why this is necessary
  })

  // if we still don't have enough vibes, return an empty array (this should never happen)
  if (!vibesToReturn) {
    console.log(
      'ERROR: generateAndStoreVibes failed to generate enough vibes, for some reason'
    )
    return []
  }

  return vibesToReturn
}

// @ts-expect-error generateAndStoreVibes optionally returns the newly generated vibes, but we're passing the param for it to do so, so we know it will return the vibes and not a boolean
export const generatePlaceVibes: MutationResolvers['generatePlaceVibes'] = ({
  locationId,
  vibeCount = 3 as number,
}) => {
  return generateAndStoreVibes({
    locationId,
    vibeCount: vibeCount as number,
    returnNewVibes: true,
  })
}
