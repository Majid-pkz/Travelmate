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
