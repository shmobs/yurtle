import type { Meta, StoryObj } from '@storybook/react'

import WelcomePage from './WelcomePage'

const meta: Meta<typeof WelcomePage> = {
  component: WelcomePage,
}

export default meta

type Story = StoryObj<typeof WelcomePage>

export const Primary: Story = {}
