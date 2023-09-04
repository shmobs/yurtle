import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String4778636', username: 'String5211111' } },
    two: { data: { email: 'String3975319', username: 'String1073348' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
