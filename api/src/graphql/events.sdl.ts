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

    isCurrentUserInterested: Boolean
    interestCount: Int

    isCurrentUserAttending: Boolean
    rsvpCount: Int

    """
    This field might only be (???) available when querying the event directly, not in nested queries.
    If you're querying a location, use the \`isManagedByCurrentUser\` field on the event instead.
    """
    isManagedByCurrentUser: Boolean

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
    SCHEDULED
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

  enum EventAction {
    INTEREST
    RSVP
  }

  type Mutation {
    """
    Use this to set whether or not a user is interested in an event.
    Sets the interest for the current user.
    Returns the number of users interested in the event, and the current state of the user's interest.
    """
    setEventInterestOrRSVP(
      eventId: String!
      isInterestedOrAttending: Boolean!
      action: EventAction!
    ): Event! @requireAuth

    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
