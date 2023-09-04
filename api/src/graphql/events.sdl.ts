export const schema = gql`
  type Event {
    id: String!
    name: String!
    type: String!
    description: String!
    status: EventStatus!
    date: DateTime
    locationId: String
    location: Location!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type EventInterest {
    eventId: String!
    event: Event!
    userId: String!
    user: User!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type EventRSVP {
    eventId: String!
    event: Event!
    userId: String!
    user: User!

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
      @skipAuth
    event(id: String!): Event! @skipAuth
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
    setInterestEvent(eventId: String!, isInterested: Boolean!): EventInterest!
      @requireAuth
    setRSVPEvent(eventId: String!, isAttending: Boolean!): EventRSVP!
      @requireAuth

    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
