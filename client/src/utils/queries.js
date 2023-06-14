import { gql } from '@apollo/client';

export const QUERY_TRIPS = gql`
  query trips {
    trips {
      _id
      creator {
        firstname
      }
      title
      description
      departureLocation
      destination
      startDate
      endDate
      tripType {
        tripType
      }
      meetupPoint
      approvedTrip
      published
      image
      travelmates {
        firstname
        email
      }
    }
  }
`;


export const QUERY_USERS = gql`
  query users {
    users {
      _id
      firstname
      lastname
      email
      isAdmin
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      _id
      firstname
      lastname
      email
      isAdmin
    }
  }
`;

export const QUERY_PROFILE = gql`
query profile {
  _id
  age
  bio
  createdTrips {
    title
    travelmates {
      firstname
    }
  }
  gender
  image
  interests {
    label
  }
  profileUser {
    _id
    firstname
  }
  joinedDate
  location
  tripCount
  verified
}
`;
export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      age
      bio
      createdTrips {
        title
        travelmates {
          firstname
        }
        _id
        image
        departureLocation
        description
        destination
      }
      gender
      image
      interests {
        label
      }
      joinedDate
      location
      profileUser {
        firstname
        _id
      }
      subscribed
      tripCount
      verified
    }
  }
`;
