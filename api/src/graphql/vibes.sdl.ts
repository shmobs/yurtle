export const schema = gql`
  type Vibe {
    eventName: String!
    eventType: String!
    eventDescription: String!
  }

  type Query {
    """
    Valuable Insights Based Event Suggester
    locationId: String! - ID of the location to get vibes for.
    minVibeCount: Int - Number of suggestions to generate if none exist. Default is 3.

    Use this to always get back a list of vibes, even if none have been generated yet
    """
    getPlaceVibes(locationId: String!, minVibeCount: Int): [Event!]! @skipAuth
  }

  """
  Valuable Insights Based Event Suggester
  locationId: String! - ID of the location to generate vibes for.
  vibeCount: Int - Number of suggestions to generate. Default is 3.

  Use this to generate vibes for a location, even if already has some
  """
  type Mutation {
    generatePlaceVibes(locationId: String!, vibeCount: Int): [Event!]! @skipAuth
  }
`
