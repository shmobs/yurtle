export const schema = gql`
  type Location {
    id: String!
    address: String!
    gmapsPlaceId: String!
    businessId: String!
    business: Business!
    website: String

    eventsSuggested: [Event!]!
    eventsRequested: [Event!]!
    eventsDraft: [Event!]!
    eventsPublished: [Event!]!
    eventsArchived: [Event!]!

    latitude: Float!
    longitude: Float!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    locations: [Location!]! @skipAuth
    location(id: String!): Location! @skipAuth
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
    createLocation(input: CreateLocationInput!): Location! @skipAuth
    updateLocation(id: String!, input: UpdateLocationInput!): Location!
      @requireAuth
    deleteLocation(id: String!): Location! @requireAuth

    claimLocation(id: String!): Location! @requireAuth

    importFromGMaps(gmapsPlaceId: String!): Location! @skipAuth
  }
`
