// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  business: {
    id: 'bus456',
    name: "Joe's Coffee Shop",
    description:
      'A cozy place for coffee, tea, and pastries in the heart of Anytown.',
    locations: [
      {
        id: 'loc123',
        address: '123 Main St, Anytown, USA',
      },
      {
        id: 'loc124',
        address: '456 Oak St, Anytown, USA',
      },
      {
        id: 'loc125',
        address: '789 Pine St, Anytown, USA',
      },
      {
        id: 'loc126',
        address: '321 Elm St, Anytown, USA',
      },
      {
        id: 'loc127',
        address: '654 Maple St, Anytown, USA',
      },
    ],
  },
})
