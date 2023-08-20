export const schema = gql`
  type Query {
    """
    location: String! - The point around which to retrieve place information. This must be specified as latitude,longitude.
    radius: Int! - Defines the distance (in meters) within which to return place results. The maximum allowed radius is 50,000 meters. Note that radius must not be included if rankby=distance (described under Optional parameters below) is specified.
    """
    searchNearby(
      location: String!
      radius: Int!
    ): GMapsApiSearchNearbyResponseType! @skipAuth

    findPlace(
      """
      input: String! - This must be a place name, address, or category of establishments.
      """
      input: String!
    ): GMapsApiFindPlaceResponseType! @skipAuth
  }
`
