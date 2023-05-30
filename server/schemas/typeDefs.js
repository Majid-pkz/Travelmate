const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the  models
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    location: String
    joinedDate: String
    gender: String
    age: Int
    bio: String
    interests: [Interest]
    image: String
    verified: Boolean
    subscribed: Boolean
    createdTrips: [Trip!]
    
    tripCount: Int!
   
  }
  
  type Trip {
    _id: ID!
    creator: User!
    title: String!
    description: String
    departureLocation: String!
    destination: String!
    startDate: String
    endDate: String
    tripType: TripType
    meetupPoint: String
    approvedTrip: Boolean
    published: Boolean
    image: String
    travelmates:[User!]
    
  }
  
  type TripType{
    _id: ID!
    tripType: String!

  }
  type Interest{
    _id: ID!
    label: String!
  }

  
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createTrip(creator: ID!, title: String!, description: String!,
       departureLocation: String!, destination: String!, startDate: String,
        endDate: String, tripType: ID!, meetupPoint: String, 
        approvedTrip: Boolean, published: Boolean, image: String): Trip
    updateUser(id: ID!,username:String!): User
    createTripType( tripType: String!): TripType
    removeTrip(id:ID!):Trip
    joinTrip(id: ID!, userJoining: ID!):Trip
  }
  
  

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    trips: [Trip]
    # Define a query with an ID parameter to return a single Trip object
    trip(id: ID!): Trip
    usersAndItsTrip:[User]

    # Define a query with an ID parameter to return a single User object
    user(id: ID!): User

    tripTypes:[TripType]
    tripType(id: ID!): TripType
    

    
  }
`;

module.exports = typeDefs;
