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
  query trips {
    users {
      users {
        _id
        email
        firstname
        lastname
      }
    }
  }
`;

export const SEARCH_TRIPS = gql`
query SearchTrips($departureLocation: String) {
  searchTrips(departureLocation: $departureLocation) {
    _id
    creator {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
    title
    description
    departureLocation
    destination
    startDate
    endDate
    tripType {
      _id
      tripType
    }
    meetupPoint
    approvedTrip
    published
    image
    travelmates {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
  }
}
`;
