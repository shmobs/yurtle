import type { Meta, StoryObj } from '@storybook/react'

import AuthPage from './AuthPage'

const meta: Meta<typeof AuthPage> = {
  component: AuthPage,
}

export default meta

type Story = StoryObj<typeof AuthPage>

export const Primary: Story = {}
