export const schema = gql`
  type MapBoxReverseGeocodeResponseType {
    type: String
    """
    Format [longitude,latitude]
    """
    query: [Float]
    features: [MapBoxFeatureType]
  }

  type MapBoxFeatureType {
    """
    Format [minX,minY,maxX,maxY]
    """
    bbox: [Float]
    """
    Format [longitude,latitude]
    """
    center: [Float]
    context: [MapBoxFeatureContextType]
    id: String!
    place_type: [String]!
    properties: MapBoxFeaturePropertiesType
    text: String!
    type: String!
  }

  type MapBoxFeaturePropertiesType {
    mapbox_id: String!
    wikidata: String
  }

  type MapBoxFeatureContextType {
    id: String!
    mapbox_id: String!
    text: String!
    wikidata: String
    short_code: String
  }
`
