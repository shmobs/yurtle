export const schema = gql`
  type GMapsApiSearchNearbyResponseType {
    html_attributions: [String]!
    results: [GMapsNearbyPlaceType]!
    status: GMapsPlacesSearchStatusType!
    error_message: String
    info_messages: [String]
    next_page_token: String
  }

  type GMapsApiFindPlaceResponseType {
    candidates: [GMapsFindPlaceType]!
    status: GMapsPlacesSearchStatusType!
    error_message: String
    info_messages: [String]
  }

  """
  The Find Place API only returns the fields we specify. This type, therefore, needs to be kept inline with the fields we specify.
  """
  type GMapsFindPlaceType {
    formatted_address: String
    name: String
    place_id: String
  }

  """
  Only a subset of the actual response is defined here, because it's a ton. I've only included the fields that I think we'll need.
  https://developers.google.com/maps/documentation/places/web-service/search-nearby#Place
  """
  type GMapsNearbyPlaceType {
    # address_components: [GMapsAddressComponentType]
    business_status: String
    # current_opening_hours: GMapsOpeningHoursType
    # dine_in: Boolean
    # editorial_summary: GMapsEditorialSummaryType
    # formatted_address: String
    # formatted_phone_number: String
    geometry: GMapsGeometryType
    icon: String
    icon_background_color: String
    icon_mask_base_uri: String
    # international_phone_number: String
    name: String
    # opening_hours: GMapsOpeningHoursType
    photos: [GMapsPhotoType]
    place_id: String
    # price_level: Int
    # rating: Float
    # reservable: Boolean
    # serves_beer: Boolean
    # serves_breakfast: Boolean
    # serves_brunch: Boolean
    # serves_dinner: Boolean
    # serves_lunch: Boolean
    # serves_vegetarian_food: Boolean
    # serves_wine: Boolean
    types: [String]
    # url: String
    # website: String
    # wheelchair_accessible_entrance: Boolean
  }

  type GMapsAddressComponentType {
    long_name: String!
    short_name: String!
    types: [String]!
  }

  """
  There is more to add here - https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlaceOpeningHours
  """
  type GMapsOpeningHoursType {
    open_now: Boolean
  }

  type GMapsEditorialSummaryType {
    language: String
    overview: String
  }

  type GMapsGeometryType {
    location: GMapsLatLngLiteralType
    viewport: GMapsBoundsType
  }

  type GMapsLatLngLiteralType {
    lat: Float!
    lng: Float!
  }

  type GMapsBoundsType {
    northeast: GMapsLatLngLiteralType!
    southwest: GMapsLatLngLiteralType!
  }

  """
  A photo of a Place. The photo can be accesed via the Place Photo API using an url in the following pattern:
  https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=photo_reference&key=YOUR_API_KEY
  """
  type GMapsPhotoType {
    height: Int!
    html_attributions: [String]!
    photo_reference: String!
    width: Int!
  }

  enum GMapsPlacesSearchStatusType {
    OK
    ZERO_RESULTS
    INVALID_REQUEST
    OVER_QUERY_LIMIT
    REQUEST_DENIED
    UNKNOWN_ERROR
  }
`
