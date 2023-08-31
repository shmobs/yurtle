// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  placeVibes: [
    {
      name: 'Bread Baking Masterclass',
      type: 'Educational Workshop',
      description:
        'A hands-on learning experience where participants will be guided by a professional baker. Learn the science and art of bread baking and take home your freshly baked loaf.',
      __typename: 'VibeType',
    },
    {
      name: 'Artisan Food Fair',
      type: 'Food Fair',
      description:
        'Showcase and celebration of local food artisans. Each vendor will provide a selection of their products for purchase and samples to try.',
      __typename: 'VibeType',
    },
    {
      name: 'Local Farmers Breakfast',
      type: 'Breakfast Gathering',
      description:
        'Start your day with a hearty breakfast, featuring local produce. A great opportunity to connect with fellow community members and support local farmers.',
      __typename: 'VibeType',
    },
    {
      name: 'Poetry and Pastry Night',
      type: 'Cultural Gathering',
      description:
        'An evening of spoken verse complemented by a selection of pastries from the bakery. Enjoy a relaxed atmosphere as you listen to local poets or share your own writings.',
      __typename: 'VibeType',
    },
    {
      name: 'Coffee Cupping and Tasting Workshop',
      type: 'Educational Workshop',
      description:
        'Ideal for coffee enthusiasts, this workshop will guide participants through the intricacies of coffee tasting and cupping. Discover new flavors and deepen your appreciation for coffee.',
      __typename: 'VibeType',
    },
  ],
})
