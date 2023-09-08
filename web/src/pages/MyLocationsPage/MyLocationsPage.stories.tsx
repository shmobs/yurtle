import type { Meta, StoryObj } from '@storybook/react'

import MyLocationsPage from './MyLocationsPage'

const meta: Meta<typeof MyLocationsPage> = {
  component: MyLocationsPage,
}

export default meta

type Story = StoryObj<typeof MyLocationsPage>

export const Primary: Story = {}
