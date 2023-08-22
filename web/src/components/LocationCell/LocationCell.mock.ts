// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  location: {
    id: 'loc123',
    address: '123 Main St, Anytown, USA',
    gmapsPlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    business: {
      id: 'bus456',
      name: "Joe's Coffee Shop",
      description:
        'A cozy place for coffee, tea, and pastries in the heart of Anytown.',
    },
  },
})
