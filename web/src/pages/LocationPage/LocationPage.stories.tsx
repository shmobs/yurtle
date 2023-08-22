import type { Meta, StoryObj } from '@storybook/react'

import LocationPage from './LocationPage'

const meta: Meta<typeof LocationPage> = {
  component: LocationPage,
}

export default meta

type Story = StoryObj<typeof LocationPage>

export const Primary: Story = {}
