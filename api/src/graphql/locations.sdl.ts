export const schema = gql`
  type Location {
    id: String!
    address: String!
    gmapsPlaceId: String!
    businessId: String!
    business: Business!
    events: [Event]!

    latitude: Float
    longitude: Float

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    locations: [Location!]! @requireAuth
    location(id: String!): Location @requireAuth
  }

  input CreateLocationInput {
    address: String!
    gmapsPlaceId: String!
    businessId: String!
  }

  input UpdateLocationInput {
    address: String
    gmapsPlaceId: String
    businessId: String
  }

  type Mutation {
    createLocation(input: CreateLocationInput!): Location! @requireAuth
    updateLocation(id: String!, input: UpdateLocationInput!): Location!
      @requireAuth
    deleteLocation(id: String!): Location! @requireAuth

    importFromGMaps(gmapsPlaceId: String!): Location! @requireAuth
  }
`