export const schema = gql`
  type MapboxGeocodeResponseType {
    type: String
    """
    Format [longitude,latitude] OR [searchString]
    """
    query: [String]
    features: [MapboxFeatureType]
  }

  type MapboxSearchBoxResponseType {
    suggestions: [MapboxSuggestionType]
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

  type MapboxFeatureType {
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
  }

  type MapboxFeaturePropertiesType {
    mapbox_id: String!
    wikidata: String
  }

  type MapboxFeatureContextType {
    id: String!
    mapbox_id: String!
    text: String!
    wikidata: String
    short_code: String
  }
`
