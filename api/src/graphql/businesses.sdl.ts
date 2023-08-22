export const schema = gql`
  type Business {
    id: String!
    name: String!
    description: String!
    website: String
    locations: [Location]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    businesses: [Business!]! @requireAuth
    business(id: String!): Business @requireAuth
  }

  input CreateBusinessInput {
    name: String!
    description: String!
  }

  input UpdateBusinessInput {
    name: String
    description: String
  }

  type Mutation {
    createBusiness(input: CreateBusinessInput!): Business! @requireAuth
    updateBusiness(id: String!, input: UpdateBusinessInput!): Business!
      @requireAuth
    deleteBusiness(id: String!): Business! @requireAuth
  }
`
