import type { Business } from '@prisma/client'

import {
  businesses,
  business,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from './businesses'
import type { StandardScenario } from './businesses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('businesses', () => {
  scenario('returns all businesses', async (scenario: StandardScenario) => {
    const result = await businesses()

    expect(result.length).toEqual(Object.keys(scenario.business).length)
  })

  scenario('returns a single business', async (scenario: StandardScenario) => {
    const result = await business({ id: scenario.business.one.id })

    expect(result).toEqual(scenario.business.one)
  })

  scenario('creates a business', async () => {
    const result = await createBusiness({
      input: { name: 'String', description: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a business', async (scenario: StandardScenario) => {
    const original = (await business({
      id: scenario.business.one.id,
    })) as Business
    const result = await updateBusiness({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a business', async (scenario: StandardScenario) => {
    const original = (await deleteBusiness({
      id: scenario.business.one.id,
    })) as Business
    const result = await business({ id: original.id })

    expect(result).toEqual(null)
  })
})
