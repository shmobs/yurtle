import type { Prisma, Location } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LocationCreateArgs>({
  location: {
    one: {
      data: {
        address: 'String',
        gmapsPlaceId: 'String',
        business: { create: { name: 'String', description: 'String' } },
      },
    },
    two: {
      data: {
        address: 'String',
        gmapsPlaceId: 'String',
        business: { create: { name: 'String', description: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Location, 'location'>
