import type { Meta, StoryObj } from '@storybook/react'

import SearchNearbyPage from './SearchNearbyPage'

const meta: Meta<typeof SearchNearbyPage> = {
  component: SearchNearbyPage,
}

export default meta

type Story = StoryObj<typeof SearchNearbyPage>

export const Primary: Story = {}
