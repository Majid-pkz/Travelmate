import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
          firstname
          lastname
          email
          _id
        }
      }
    
  }
`;
export const CREATE_USER = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstname
      }
    }
  }
`;

// createUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
//   user {
//     firstname
//   }
//   token
// }
// }

export const CREATE_PROFILE = gql`
mutation createProfile(
    $profileUser: ID!
    $location: String
    $joinedDate: String
    $gender: String
    $age: Int
    $bio: String
    $interests: ID!
    $image: String
    $verified: Boolean
    $subscribed: Boolean
    $createdTrips: ID
    $tripCount: Int
  ) {
    createProfile(
      profileUser: $profileUser
      location: $location
      joinedDate: $joinedDate
      gender: $gender
      age: $age
      bio: $bio
      interests: $interests
      image: $image
      verified: $verified
      subscribed: $subscribed
      createdTrips: $createdTrips
      tripCount: $tripCount
    ) {
        _id
        profileUser {
          firstname
          _id
        }
        age
        bio
        createdTrips {
          _id
          creator {
            _id
            firstname
          }
        }
        interests {
          _id
          label
        }
        tripCount
        location
      }
    }
  
`;
export const CREATE_TRIP = gql`
  mutation createTrip(
    $creator: ID!
    $title: String!
    $description: String!
    $departureLocation: String!
    $destination: String!
    $startDate: String
    $endDate: String
  ) {
    createTrip(
      creator: $creator
      title: $title
      description: $description
      departureLocation: $departureLocation
      destination: $destination
      startDate: $startDate
      endDate: $endDate
    ) {
      
      title
      travelmates {
        email
      }
      tripType {
        tripType
      }
    }
  }
`;
