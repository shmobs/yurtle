import type { Prisma, Event } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        name: 'String',
        type: 'String',
        description: 'String',
        status: 'REQUESTED',
      },
    },
    two: {
      data: {
        name: 'String',
        type: 'String',
        description: 'String',
        status: 'REQUESTED',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
