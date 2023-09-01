export const schema = gql`
  type Event {
    id: String!
    name: String!
    type: String!
    description: String!
    status: EventStatus!
    date: DateTime
    locationId: String
    location: Location
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum EventStatus {
    SUGGESTED
    REQUESTED
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type Query {
    events(locationId: String!, eventStatuses: [EventStatus!]!): [Event!]!
      @requireAuth
    event(id: String!): Event! @requireAuth
  }

  input CreateEventInput {
    name: String!
    type: String!
    description: String!
    status: EventStatus!
    date: DateTime
    locationId: String
  }

  input UpdateEventInput {
    name: String
    type: String
    description: String
    status: EventStatus
    date: DateTime
    locationId: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
