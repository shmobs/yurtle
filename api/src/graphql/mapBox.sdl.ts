export const schema = gql`
  type MapboxReverseGeocodeResponseType {
    type: String
    """
    Format [longitude,latitude]
    """
    query: [Float]
    features: [MapboxFeatureType]
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
