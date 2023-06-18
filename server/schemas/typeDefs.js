const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the  models
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    isAdmin: Boolean
   
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
    label: [String!]!
  }

  type Profile {
    _id: ID!
    profileUser: User
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

  type Auth {
    token: ID!
    user: User
  }
  
  
  type Mutation {
    createUser( firstname: String!, lastname: String!, email: String!, password: String!,
      isAdmin: Boolean): Auth

    createProfile(profileUser:ID!, location: String, joinedDate: String, gender: String,
        age: Int, bio: String, interests:[ID],image: String, verified: Boolean,
        subscribed: Boolean, createdTrips:ID, tripCount: Int): Profile

    createTrip(creator: ID!, title: String!, description: String!,
       departureLocation: String!, destination: String!, startDate: String,
        endDate: String, tripType: ID, meetupPoint: String, 
        approvedTrip: Boolean, published: Boolean, image: String): Trip

    createTripType( tripType: String!): TripType
    createInterests( label: String!): Interest

    updateUser(id: ID!, firstname: String, lastname: String, email: String, password: String): User

    updateProfile(id: ID!, location: String, gender: String, age: Int, bio: String,
      interests: ID, image: String, verified: Boolean,
      subscribed: Boolean): Profile

   

    removeTrip(id:ID!):Trip

    deleteProfile(id: ID!): Profile 

    # delet user and profile deletion on delete
    deleteUser(id:ID!): User

    joinTrip(id: ID!, userJoining: ID!):Trip  
    
    removeAnInterest(id:ID!, interestId:ID!):Profile

    addAnInterest(id:ID!, interestId:ID!):Profile

    login(email: String!, password: String!): Auth


  }
  
  

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    trips: [Trip]
    profiles: [Profile]
    usersAndItsTrip:[User]
    tripTypes:[TripType]
    interests:[Interest]
    # Define a query with an ID parameter to return a single of that  object

    trip(id: ID!): Trip   
    searchTrips(departureLocation: String): [Trip] 
    user(id: ID!): User    
    tripType(id: ID!): TripType
    profile(id: ID!): Profile
    profileExist(profileUser: ID!): Profile
    interest(id:ID!): Interest

  }
`;

module.exports = typeDefs;
