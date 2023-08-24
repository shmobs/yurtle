export const schema = gql`
  type MapBoxReverseGeocodeResponseType {
    type: String
    query: [Float]
    features: [MapBoxFeatureType]
    attribution: String
  }

  type MapBoxFeatureType {
    id: String!
    type: String!
    place_type: [String]!
    relevance: Int!
    address: String
    properties: MapBoxFeaturePropertiesType
  }

  type MapBoxFeaturePropertiesType {
    accuracy: String
    address: String
    category: String
    maki: String
    """
    Will be in format [minX,minY,maxX,maxY]
    """
    bbox: [Float]
    """
    Will be in format [longitude,latitude]
    """
    center: [Float]
  }
`
