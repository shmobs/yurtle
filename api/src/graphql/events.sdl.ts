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

    isCurrentUserInterested: Boolean!
    interestCount: Int!
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

  type RSVPInterestResponse {
    currentState: Boolean!
    count: Int!
  }

  type Mutation {
    """
    Use this to set whether or not a user is interested in an event.
    Sets the interest for the current user.
    Returns the number of users interested in the event, and the current state of the user's interest.
    """
    setEventInterest(
      eventId: String!
      isInterested: Boolean!
    ): RSVPInterestResponse! @requireAuth
    """
    Use this to set whether or not a user is attending an event.
    Sets the RSVP for the current user.
    Returns the number of users attending the event, and the current state of the user's RSVP.
    """
    setEventRSVP(
      eventId: String!
      isAttending: Boolean!
    ): RSVPInterestResponse! @requireAuth

    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
