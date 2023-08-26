export const schema = gql`
  type MapboxGeocodeResponseType {
    type: String
    """
    Format [longitude,latitude] OR [searchString]
    """
    query: [String]
    features: [MapboxGeocodeFeatureType]
  }

  type MapboxSearchBoxResponseType {
    suggestions: [MapboxSuggestionType]
  }

  type MapboxSuggestionRetrievalResponseType {
    features: [MapboxSearchBoxFeatureType]
  }

  """
  There is more to add to this but it's fuckin late and this is all we will likely need
  https://docs.mapbox.com/api/search/search-box/
  """
  type MapboxSuggestionType {
    name: String
    place_formatted: String
    """
    Need this to make another query to get any actually useful information, ie geometry
    """
    mapbox_id: String
  }

  type MapboxGeocodeFeatureType {
    """
    Format [minX,minY,maxX,maxY]
    """
    bbox: [Float]
    """
    Format [longitude,latitude]
    """
    center: [Float]
    context: [MapboxFeatureContextType]
    id: String!
    place_type: [String]!
    properties: MapboxFeaturePropertiesType
    text: String!
    type: String!
    geometry: MapboxGeometryType
  }

  type MapboxSearchBoxFeatureType {
    geometry: MapboxGeometryType
    properties: MapboxSearchBoxFeaturePropertiesType
  }

  type MapboxGeometryType {
    type: String
    """
    In the format [longitude,latitude]
    """
    coordinates: [Float]
  }

  type MapboxFeaturePropertiesType {
    mapbox_id: String!
    wikidata: String
  }

  """
  There is more we can add here, if we want: https://docs.mapbox.com/api/search/search-box/#response-retrieve-a-suggested-feature
  """
  type MapboxSearchBoxFeaturePropertiesType {
    """
    Format [minX,minY,maxX,maxY]
    """
    bbox: [Float]!
    feature_type: String!
    mapbox_id: String!
    name: String!
    place_formatted: String!
  }

  type MapboxFeatureContextType {
    id: String!
    mapbox_id: String!
    text: String!
    wikidata: String
    short_code: String
  }

  """
  All Mapbox specific queries go here
  """
  type Query {
    mapboxRetrieveSuggestion(
      mapboxId: String!
    ): MapboxSuggestionRetrievalResponseType @skipAuth
  }
`
