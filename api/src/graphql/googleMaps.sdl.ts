export const schema = gql`
  type GMapsApiSearchNearbyResponseType {
    results: [GMapsNearbyPlaceType!]!

    # The following fields are injected by the relation resolver based on the response from the Google Maps API
    eventsSuggested: [Event!]
    eventsRequested: [Event!]
    eventsDraft: [Event!]
    eventsScheduled: [Event!]
    eventsArchived: [Event!]

    status: GMapsPlacesSearchStatusType!
    error_message: String
    html_attributions: [String]!
    info_messages: [String]
    next_page_token: String
  }

  type GMapsApiTextSearchResponseType {
    results: [GMapsTextSearchType!]!

    # The following fields are injected by the relation resolver based on the response from the Google Maps API
    eventsSuggested: [Event!]
    eventsRequested: [Event!]
    eventsDraft: [Event!]
    eventsScheduled: [Event!]
    eventsArchived: [Event!]

    status: GMapsPlacesSearchStatusType!
    error_message: String
    html_attributions: [String]!
    info_messages: [String]
  }

  type GMapsApiPlaceDetailsResponseType {
    result: GMapsPlaceDetailsType!
    html_attributions: [String]!
    status: GMapsPlacesSearchStatusType!
    info_messages: [String]
  }

  """
  The Place Details API only returns the fields we specify. This type, therefore, needs to be kept inline with the fields we specify.
  """
  type GMapsPlaceDetailsType {
    # Basic fields
    address_components: [GMapsAddressComponentType]
    business_status: String
    formatted_address: String!
    geometry: GMapsGeometryType!
    icon: String
    icon_background_color: String
    name: String!
    place_id: String!

    # Contact fields
    current_opening_hours: GMapsOpeningHoursType
    formatted_phone_number: String
    website: String

    # Atmosphere fields
    dine_in: Boolean
    editorial_summary: GMapsEditorialSummaryType
    price_level: Int
    rating: Float
    reservable: Boolean
    serves_beer: Boolean
    serves_breakfast: Boolean
    serves_brunch: Boolean
    serves_dinner: Boolean
    serves_lunch: Boolean
    serves_vegetarian_food: Boolean
    serves_wine: Boolean
  }

  """
  The Find Place API only returns the fields we specify. This type, therefore, needs to be kept inline with the fields we specify.
  """
  type GMapsTextSearchType {
    formatted_address: String!
    name: String!
    place_id: String!
    geometry: GMapsGeometryType!
    """
    If a matching Location record exists in Prisma, this will be set to the id of that record.
    """
    rendyLocationId: String
    """
    This field gets added so that the frontend can display a mapbox static image for each result.
    """
    mapboxStaticImageUrl: String!
  }

  """
  Only a subset of the actual response is defined here, because it's a ton. I've only included the fields that I think we'll need.
  https://developers.google.com/maps/documentation/places/web-service/search-nearby#Place
  """
  type GMapsNearbyPlaceType {
    business_status: String
    geometry: GMapsGeometryType!
    icon: String
    icon_background_color: String
    icon_mask_base_uri: String
    name: String!
    photos: [GMapsPhotoType]
    place_id: String!
    """
    If a matching Location record exists in Prisma, this will be set to the id of that record.
    """
    rendyLocationId: String
    """
    This field gets added so that the frontend can display a mapbox static image for each result.
    """
    mapboxStaticImageUrl: String!
    types: [String]
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
    location: GMapsLatLngLiteralType!
    viewport: GMapsBoundsType!
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
