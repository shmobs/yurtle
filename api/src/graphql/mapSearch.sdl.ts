export const schema = gql`
  """
  All general map searching queries go here, regardless of their underlying API.
  """
  type Query {
    """
    location: String! - The point around which to retrieve place information. This must be specified as latitude,longitude.
    radius: Int! - Defines the distance (in meters) within which to return place results. The maximum allowed radius is 50,000 meters. Note that radius must not be included if rankby=distance (described under Optional parameters below) is specified.
    """
    searchNearby(
      location: String!
      """
      Leaving this out will do rankby distance.
      """
      radius: Int
    ): GMapsApiSearchNearbyResponseType! @skipAuth

    """
    Return a list of places based on a search string.
    """
    textSearch(
      """
      query: String! - This must be a place name, address, or category of establishments.
      """
      query: String!
      """
      location: String! - The point around which to retrieve place information. This must be specified as latitude,longitude.
      """
      location: String!
    ): GMapsApiTextSearchResponseType! @skipAuth

    placeDetails(
      """
      place_id: String! - A textual identifier that uniquely identifies a place, returned from a Place Search.
      """
      gmapsPlaceId: String!
    ): GMapsApiPlaceDetailsResponseType! @skipAuth

    """
    Given a longitude and latitude, return human readable location information.
    """
    reverseGeocode(
      longitude: Float!
      latitude: Float!
    ): MapboxGeocodeResponseType! @skipAuth

    """
    Given a search string, find a single location.
    """
    forwardGeocode(searchText: String!): MapboxGeocodeResponseType! @skipAuth

    """
    Given a search string, find a geographic area.
    """
    searchForArea(searchText: String!): MapboxSearchBoxResponseType! @skipAuth
  }
`
