export const schema = gql`
  type VibeType {
    eventName: String!
    eventType: String!
    eventDescription: String!
  }

  type Query {
    """
    Valuable Insights Based Event Suggester
    locationId: String! - ID of the location to get vibes for.
    vibeCount: Int - Number of suggestions to return. Default is 3.
    """
    getPlaceVibes(locationId: String!, vibeCount: Int): [Event!]! @skipAuth
  }
`
