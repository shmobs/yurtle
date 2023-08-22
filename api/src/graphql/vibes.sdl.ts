export const schema = gql`
  type VibeType {
    eventName: String!
    eventType: String!
    eventDescription: String!
  }

  type Query {
    """
    Valuable Insights Based Event Suggester
    placeId: String! - Google Maps place identifier.
    vibeCount: Int - Number of suggestions to return. Default is 5.
    """
    getPlaceVibes(placeId: String!, vibeCount: Int): [VibeType]! @skipAuth
  }
`